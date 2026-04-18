import type { PlatformConfig } from './types';

/**
 * Default configuration for local development
 */
const defaultConfig: PlatformConfig = {
  baseUrl: 'https://digiorg.local',
  keycloak: {
    url: 'https://digiorg.local/keycloak',
    realm: 'digiorg-core-platform',
    clientId: 'landingpage'
  },
  servicesEndpoint: '/api/services'
};

/**
 * Get platform configuration
 * Runtime config is injected via window.__DIGIORG_CONFIG__
 * Falls back to defaults for local development
 */
export function getConfig(): PlatformConfig {
  const runtimeConfig = window.__DIGIORG_CONFIG__;
  
  if (runtimeConfig) {
    return {
      ...defaultConfig,
      ...runtimeConfig,
      keycloak: {
        ...defaultConfig.keycloak,
        ...runtimeConfig.keycloak
      }
    };
  }
  
  return defaultConfig;
}

/**
 * Build full URL from path
 */
export function buildUrl(path: string): string {
  const config = getConfig();
  const base = config.baseUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
