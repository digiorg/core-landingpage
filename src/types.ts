/**
 * Platform configuration injected at runtime
 */
export interface PlatformConfig {
  baseUrl: string;
  keycloak: {
    url: string;
    realm: string;
    clientId: string;
  };
  servicesEndpoint: string;
}

/**
 * Platform service definition
 */
export interface PlatformService {
  id: string;
  name: string;
  description: string;
  path: string;
  icon?: string;
  category?: ServiceCategory;
  requiresAuth?: boolean;
  displayOrder?: number;
}

/**
 * Service categories for grouping
 */
export type ServiceCategory =
  | 'security'
  | 'deployment'
  | 'monitoring'
  | 'observability'
  | 'developer'
  | 'data'
  | 'messaging'
  | 'devsecops'
  | 'other';

/**
 * Theme options
 */
export type Theme = 'light' | 'dark';

/**
 * User info from Keycloak token
 */
export interface UserInfo {
  username: string;
  email?: string;
  name?: string;
  roles?: string[];
}

/**
 * Application state
 */
export interface AppState {
  theme: Theme;
  user: UserInfo | null;
  services: PlatformService[];
  loading: boolean;
  error: string | null;
  authAvailable: boolean;
}

/**
 * Global config declaration
 */
declare global {
  interface Window {
    __DIGIORG_CONFIG__?: PlatformConfig;
  }
}
