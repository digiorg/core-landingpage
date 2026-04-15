/**
 * DigiOrg Platform Runtime Configuration
 * 
 * This file is replaced at deployment time with actual values.
 * For local development, these defaults are used.
 */
window.__DIGIORG_CONFIG__ = {
  baseUrl: "http://digiorg.local",
  keycloak: {
    url: "http://digiorg.local/keycloak",
    realm: "digiorg-core-platform",
    clientId: "landingpage"
  },
  servicesEndpoint: "/api/services"
};
