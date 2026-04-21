import { buildUrl, getConfig } from './config';
import { getToken } from './auth';
import type { PlatformService, ServiceCategory } from './types';

/**
 * Default services with functional names (no product names)
 * Ordered by displayOrder for consistent layout
 */
const defaultServices: PlatformService[] = [
  {
    id: 'keycloak',
    name: 'Identities & Access',
    description: 'Authentication and authorization',
    path: '/keycloak',
    icon: 'key',
    category: 'security',
    requiresAuth: false,
    displayOrder: 1
  },
  {
    id: 'backstage',
    name: 'Components & Catalog',
    description: 'Service catalog and documentation',
    path: '/backstage',
    icon: 'code',
    category: 'developer',
    requiresAuth: true,
    displayOrder: 2
  },
  {
    id: 'gitea',
    name: 'Repositories & Pipelines',
    description: 'Git repositories and code review',
    path: '/gitea',
    icon: 'git',
    category: 'developer',
    requiresAuth: true,
    displayOrder: 3
  },
  {
    id: 'argocd',
    name: 'GitOps & Deployment',
    description: 'Continuous delivery and deployments',
    path: '/argocd',
    icon: 'rocket',
    category: 'deployment',
    requiresAuth: true,
    displayOrder: 4
  },
  {
    id: 'grafana',
    name: 'Logging & Monitoring',
    description: 'Metrics and dashboards',
    path: '/grafana',
    icon: 'chart',
    category: 'monitoring',
    requiresAuth: true,
    displayOrder: 5
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
      return sortServices(defaultServices);
    }

    const services: PlatformService[] = await response.json();
    return services.length > 0 ? sortServices(services) : sortServices(defaultServices);
  } catch (error) {
    console.warn('Failed to fetch services, using defaults:', error);
    return sortServices(defaultServices);
  }
}

/**
 * Sort services by displayOrder
 */
function sortServices(services: PlatformService[]): PlatformService[] {
  return [...services].sort((a, b) => {
    const orderA = a.displayOrder ?? 999;
    const orderB = b.displayOrder ?? 999;
    return orderA - orderB;
  });
}

/**
 * Get category display name
 */
export function getCategoryName(category: ServiceCategory | string): string {
  const names: Record<string, string> = {
    security: 'Security',
    deployment: 'Deployment',
    monitoring: 'Observability',
    developer: 'Developer',
    data: 'Data',
    messaging: 'Messaging',
    other: 'Other'
  };
  
  return names[category] || category;
}
