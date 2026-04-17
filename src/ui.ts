import { buildUrl } from './config';
import { login, logout, getUserInfo, isAuthenticated, isAuthAvailable, getAuthError } from './auth';
import { getCategoryName } from './services';
import { toggleTheme, getTheme } from './theme';
import { getIcon } from './icons';
import type { PlatformService, Theme } from './types';

/**
 * Render the complete application UI
 */
export function renderApp(services: PlatformService[], theme: Theme): void {
  const app = document.getElementById('app');
  if (!app) return;

  const user = getUserInfo();
  const authenticated = isAuthenticated();
  const authAvailable = isAuthAvailable();
  const authError = getAuthError();

  app.innerHTML = `
    <div class="app-container">
      ${renderHeader(authenticated, user?.username, theme, authAvailable)}
      <main class="main-content">
        ${authError ? renderAuthError(authError) : ''}
        ${authenticated ? renderWelcome(user?.name || user?.username) : renderLoginPrompt()}
        ${renderServices(services, authenticated)}
      </main>
      ${renderFooter()}
    </div>
  `;

  attachEventListeners(authAvailable);
}

/**
 * Render header with logo, user info, and theme toggle
 */
function renderHeader(authenticated: boolean, username?: string, theme?: Theme, authAvailable?: boolean): string {
  const currentTheme = theme || getTheme();
  
  return `
    <header class="header">
      <div class="header-left">
        <a href="/" class="logo" aria-label="DigiOrg Platform Home">
          ${getIcon('digiorg-logo')}
          <span class="logo-text">DigiOrg Platform</span>
        </a>
      </div>
      <div class="header-right">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
          ${currentTheme === 'dark' ? getIcon('sun') : getIcon('moon')}
        </button>
        ${authenticated ? `
          <div class="user-menu">
            <span class="user-icon">${getIcon('user')}</span>
            <span class="username">${escapeHtml(username || 'User')}</span>
            <button class="btn btn-ghost" id="logout-btn">
              ${getIcon('log-out')}
              <span>Logout</span>
            </button>
          </div>
        ` : `
          <button class="btn btn-primary" id="login-btn" ${!authAvailable ? 'disabled title="Authentication service unavailable"' : ''}>
            ${getIcon('log-in')}
            <span>Login</span>
          </button>
        `}
      </div>
    </header>
  `;
}

/**
 * Render auth error banner
 */
function renderAuthError(error: string): string {
  return `
    <div class="auth-error">
      ${getIcon('alert-circle')}
      <span>Authentication service unavailable: ${escapeHtml(error)}</span>
    </div>
  `;
}

/**
 * Render welcome message for authenticated users
 */
function renderWelcome(name?: string): string {
  const greeting = getGreeting();
  return `
    <section class="welcome">
      <h1>${greeting}${name ? `, ${escapeHtml(name)}` : ''}!</h1>
      <p>Welcome to the DigiOrg Core Platform. Select a service below to get started.</p>
    </section>
  `;
}

/**
 * Render login prompt for unauthenticated users
 */
function renderLoginPrompt(): string {
  return `
    <section class="welcome">
      <h1>Welcome to DigiOrg Platform</h1>
      <p>Please log in to access all platform services.</p>
    </section>
  `;
}

/**
 * Render services in a flat grid (no category separators)
 */
function renderServices(services: PlatformService[], authenticated: boolean): string {
  if (services.length === 0) {
    return `
      <section class="services">
        <div class="service-grid">
          <p>No services available.</p>
        </div>
      </section>
    `;
  }

  return `
    <section class="services">
      <div class="service-grid">
        ${services.map(service => renderServiceCard(service, authenticated)).join('')}
      </div>
    </section>
  `;
}

/**
 * Render individual service card (square tile with category badge)
 */
function renderServiceCard(service: PlatformService, authenticated: boolean): string {
  const url = buildUrl(service.path);
  const requiresAuth = service.requiresAuth !== false;
  const disabled = requiresAuth && !authenticated;
  const categoryName = service.category ? getCategoryName(service.category) : '';

  return `
    <a 
      href="${disabled ? '#' : url}"
      class="service-card ${disabled ? 'disabled' : ''}"
      ${disabled ? 'aria-disabled="true"' : ''}
      ${!disabled ? 'target="_blank" rel="noopener"' : ''}
    >
      <div class="service-icon">
        ${getIcon(service.icon || 'box')}
      </div>
      <div class="service-info">
        <h3 class="service-name">${escapeHtml(service.name)}</h3>
        ${categoryName ? `<span class="service-category">${escapeHtml(categoryName)}</span>` : ''}
      </div>
      ${disabled ? '<span class="service-lock">🔒</span>' : ''}
    </a>
  `;
}

/**
 * Render footer
 */
function renderFooter(): string {
  return `
    <footer class="footer">
      <p>DigiOrg Core Platform &copy; ${new Date().getFullYear()}</p>
    </footer>
  `;
}

/**
 * Attach event listeners
 */
function attachEventListeners(authAvailable: boolean): void {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const newTheme = toggleTheme();
    const icon = themeToggle.querySelector('svg');
    if (icon) {
      icon.outerHTML = newTheme === 'dark' ? getIcon('sun') : getIcon('moon');
    }
  });

  // Login button
  const loginBtn = document.getElementById('login-btn');
  loginBtn?.addEventListener('click', () => {
    if (!authAvailable) {
      alert('Authentication service is currently unavailable. Please try again later.');
      return;
    }
    
    try {
      login();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      alert(message);
    }
  });

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn?.addEventListener('click', () => logout());
}

/**
 * Render loading state
 */
export function renderLoading(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="loading-screen">
      <div class="spinner"></div>
      <p>Loading platform...</p>
    </div>
  `;
}

/**
 * Render error state
 */
export function renderError(message: string): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="error-screen">
      <div class="error-icon">⚠️</div>
      <h1>Something went wrong</h1>
      <p>${escapeHtml(message)}</p>
      <button class="btn btn-primary" onclick="location.reload()">
        Try Again
      </button>
    </div>
  `;
}

/**
 * Get time-based greeting
 */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
