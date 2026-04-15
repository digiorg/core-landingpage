import './style.css';
import { initAuth } from './auth';
import { initTheme } from './theme';
import { fetchServices } from './services';
import { renderApp, renderLoading, renderError } from './ui';

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    // Initialize theme first (prevents flash)
    const theme = initTheme();
    
    // Show loading state
    renderLoading();

    // Initialize authentication
    await initAuth();

    // Fetch available services
    const services = await fetchServices();

    // Render the application
    renderApp(services, theme);

  } catch (error) {
    console.error('Application initialization failed:', error);
    renderError(
      error instanceof Error 
        ? error.message 
        : 'Failed to initialize the application'
    );
  }
}

// Start the application
main();
