/**
 * SVG icons for services
 * Using simple, recognizable icons
 */

const icons: Record<string, string> = {
  // DigiOrg Logo (Hub & Spoke)
  'digiorg-logo': `<svg viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
    <circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
    <circle cx="20" cy="20" r="6" fill="currentColor"/>
    <circle cx="20" cy="4" r="2.5" fill="currentColor"/>
    <circle cx="32" cy="10" r="2.5" fill="currentColor"/>
    <circle cx="36" cy="20" r="2.5" fill="currentColor"/>
    <circle cx="32" cy="30" r="2.5" fill="currentColor"/>
    <circle cx="20" cy="36" r="2.5" fill="currentColor"/>
    <circle cx="8" cy="30" r="2.5" fill="currentColor"/>
    <circle cx="4" cy="20" r="2.5" fill="currentColor"/>
    <circle cx="8" cy="10" r="2.5" fill="currentColor"/>
    <line x1="20" y1="6.5" x2="20" y2="14" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <line x1="30" y1="11" x2="24" y2="16" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <line x1="34" y1="20" x2="26" y2="20" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <line x1="30" y1="29" x2="24" y2="24" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <line x1="20" y1="33.5" x2="20" y2="26" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <line x1="10" y1="29" x2="16" y2="24" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <line x1="6" y1="20" x2="14" y2="20" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <line x1="10" y1="11" x2="16" y2="16" stroke="currentColor" stroke-width="1" opacity="0.5"/>
  </svg>`,
  
  // Security
  key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>`,
  
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`,
  
  // Git/Deployment
  'git-branch': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>`,
  
  git: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <circle cx="19" cy="12" r="2"/>
    <circle cx="5" cy="12" r="2"/>
    <line x1="7" y1="12" x2="9" y2="12"/>
    <line x1="15" y1="12" x2="17" y2="12"/>
  </svg>`,
  
  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>`,
  
  // Monitoring
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>`,
  
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>`,

  // Code Quality
  'code-quality': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10.5" cy="10.5" r="7.5"/>
  <line x1="21" y1="21" x2="15.8" y2="15.8"/>
  <polyline points="7.5 10.5 9.5 12.5 13.5 8.5"/>
</svg>`,

  tracing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1="12" x2="21" y2="12"/>
  <line x1="5" y1="7" x2="14" y2="7"/>
  <circle cx="5" cy="7" r="1.5" fill="currentColor" stroke="none"/>
  <circle cx="14" cy="7" r="1.5" fill="currentColor" stroke="none"/>
  <line x1="8" y1="17" x2="19" y2="17"/>
  <circle cx="8" cy="17" r="1.5" fill="currentColor" stroke="none"/>
  <circle cx="19" cy="17" r="1.5" fill="currentColor" stroke="none"/>
  <line x1="5" y1="12" x2="5" y2="7" stroke-dasharray="2 2"/>
  <line x1="14" y1="12" x2="14" y2="7" stroke-dasharray="2 2"/>
  <line x1="8" y1="12" x2="8" y2="17" stroke-dasharray="2 2"/>
  <line x1="19" y1="12" x2="19" y2="17" stroke-dasharray="2 2"/>
</svg>`,

  // Developer
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>`,
  
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>`,
  
  // Data
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>`,
  
  // Messaging
  message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`,
  
  // Generic
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>`,
  
  // Theme toggle
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`,
  
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`,
  
  // User
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>`,
  
  'log-out': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>`,
  
  'log-in': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>`,
  
  // Alert
  'alert-circle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>`
};

/**
 * Get icon SVG by name
 */
export function getIcon(name: string): string {
  return icons[name] || icons.box;
}
