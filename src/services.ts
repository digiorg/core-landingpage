import { getConfig, buildUrl } from './config';
import { getToken } from './auth';
import type { PlatformService } from './types';

/**
 * Default services for fallback/development
 */
const defaultServices: PlatformService[] = [
  {
    id: 'keycloak',
    name: 'Keycloak',
    description: 'Identity & Access Management',
    path: '/keycloak',
    icon: 'key',
    category: 'security'
  },
  {
    id: 'argocd',
    name: 'Argo CD',
    description: 'GitOps Continuous Delivery',
    path: '/argocd',
    icon: 'git-branch',
    category: 'deployment'
  },
  {
    id: 'grafana',
    name: 'Grafana',
    description: 'Observability & Dashboards',
    path: '/grafana',
    icon: 'chart',
    category: 'monitoring'
  },
  {
    id: 'backstage',
    name: 'Backstage',
    description: 'Developer Portal',
    path: '/backstage',
    icon: 'code',
    category: 'developer'
  },
  {
    id: 'gitea',
    name: 'Gitea',
    description: 'Git Repository Service',
    path: '/gitea',
    icon: 'git',
    category: 'developer'
  }
];

/**
 * Fetch platform services from API
 * Falls back to defaults if API is unavailable
 */
export async function fetchServices(): Promise<PlatformService[]> {
  const config = getConfig();
  
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      'Accept': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(buildUrl(config.servicesEndpoint), {
      headers,
      credentials: 'same-origin'
    });

    if (!response.ok) {
      console.warn(`Services API returned ${response.status}, using defaults`);
      return defaultServices;
    }

    const services: PlatformService[] = await response.json();
    return services.length > 0 ? services : defaultServices;
  } catch (error) {
    console.warn('Failed to fetch services, using defaults:', error);
    return defaultServices;
  }
}

/**
 * Group services by category
 */
export function groupByCategory(
  services: PlatformService[]
): Map<string, PlatformService[]> {
  const groups = new Map<string, PlatformService[]>();
  
  for (const service of services) {
    const category = service.category || 'other';
    const existing = groups.get(category) || [];
    groups.set(category, [...existing, service]);
  }
  
  return groups;
}

/**
 * Get category display name
 */
export function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    security: 'Security & Identity',
    deployment: 'Deployment & GitOps',
    monitoring: 'Monitoring & Observability',
    developer: 'Developer Tools',
    data: 'Data & Storage',
    messaging: 'Messaging & Events',
    other: 'Other Services'
  };
  
  return names[category] || category;
}
