import Keycloak from 'keycloak-js';
import { getConfig } from './config';
import type { UserInfo } from './types';

let keycloakInstance: Keycloak | null = null;
let authInitialized = false;
let authError: string | null = null;

/**
 * Initialize Keycloak authentication
 * Uses silent SSO check for better UX
 */
export async function initAuth(): Promise<boolean> {
  const config = getConfig();
  
  keycloakInstance = new Keycloak({
    url: config.keycloak.url,
    realm: config.keycloak.realm,
    clientId: config.keycloak.clientId
  });

  try {
    const authenticated = await keycloakInstance.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      checkLoginIframe: false, // Disabled due to modern browser restrictions
      pkceMethod: 'S256'
    });

    authInitialized = true;
    authError = null;

    if (authenticated) {
      // Set up token refresh
      setupTokenRefresh();
    }

    return authenticated;
  } catch (error) {
    console.error('Failed to initialize Keycloak:', error);
    authInitialized = false;
    authError = 'Authentication service is temporarily unavailable. Please try again later.';
    return false;
  }
}

/**
 * Trigger login flow
 * Throws error if Keycloak is not available
 */
export function login(): void {
  if (!keycloakInstance) {
    const errorMsg = 'Authentication service is not available. Please try again later.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  
  if (!authInitialized) {
    const errorMsg = authError || 'Authentication service failed to initialize.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  
  keycloakInstance.login();
}

/**
 * Trigger logout flow
 */
export function logout(): void {
  if (keycloakInstance) {
    keycloakInstance.logout({
      redirectUri: window.location.origin
    });
  }
}

/**
 * Get current user info from token
 */
export function getUserInfo(): UserInfo | null {
  if (!keycloakInstance?.authenticated || !keycloakInstance.tokenParsed) {
    return null;
  }

  const token = keycloakInstance.tokenParsed;
  
  return {
    username: token.preferred_username || token.sub || 'Unknown',
    email: token.email,
    name: token.name || token.given_name,
    roles: token.realm_access?.roles || []
  };
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return keycloakInstance?.authenticated || false;
}

/**
 * Check if auth service is available
 */
export function isAuthAvailable(): boolean {
  return authInitialized && keycloakInstance !== null;
}

/**
 * Get auth error message if any
 */
export function getAuthError(): string | null {
  return authError;
}

/**
 * Get access token for API calls
 */
export async function getToken(): Promise<string | null> {
  if (!keycloakInstance?.authenticated) {
    return null;
  }

  try {
    // Refresh if token expires in less than 30 seconds
    await keycloakInstance.updateToken(30);
    return keycloakInstance.token || null;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
}

/**
 * Set up automatic token refresh
 */
function setupTokenRefresh(): void {
  if (!keycloakInstance) return;

  // Refresh token when it's about to expire
  setInterval(async () => {
    if (keycloakInstance?.authenticated) {
      try {
        const refreshed = await keycloakInstance.updateToken(60);
        if (refreshed) {
          console.debug('Token refreshed');
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }
  }, 30000); // Check every 30 seconds
}
