# DigiOrg Core Platform Landing Page

A lightweight, modern Single Page Application (SPA) serving as the central entry point to the DigiOrg Core Platform.

## Features

- 🔐 **Keycloak SSO** — Seamless OIDC authentication with the platform's Keycloak instance
- 🔍 **Service Discovery** — Dynamically displays all available platform services
- 🌓 **Theme Toggle** — Light/Dark mode with system preference detection
- ⚡ **Lightweight** — Vanilla TypeScript, ~50KB bundle size
- 📱 **Responsive** — Works on desktop and mobile devices
- 🐳 **Containerized** — Multi-arch Docker image via GitHub Actions

## Quick Start

### Prerequisites

- Node.js 22+
- npm 10+

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker

```bash
# Build image
docker build -t digiorg/core-landingpage .

# Run container
docker run -p 8080:8080 digiorg/core-landingpage
```

## Configuration

Runtime configuration is injected via `/config.js`:

```javascript
window.__DIGIORG_CONFIG__ = {
  baseUrl: "http://digiorg.local",
  keycloak: {
    url: "http://digiorg.local/keycloak",
    realm: "digiorg-core-platform",
    clientId: "landingpage"
  },
  servicesEndpoint: "/api/services"
};
```

### Environment Variables

For Kubernetes deployment, the config can be mounted from a ConfigMap.

## Service Registry

Services are fetched from `/api/services` (or static `services.json`):

```json
[
  {
    "id": "keycloak",
    "name": "Keycloak",
    "description": "Identity & Access Management",
    "path": "/keycloak",
    "icon": "key",
    "category": "security"
  }
]
```

### Service Categories

- `security` — Security & Identity
- `deployment` — Deployment & GitOps
- `monitoring` — Monitoring & Observability
- `developer` — Developer Tools
- `data` — Data & Storage
- `messaging` — Messaging & Events

### Available Icons

`key`, `shield`, `git-branch`, `git`, `rocket`, `chart`, `activity`, `code`, `terminal`, `database`, `message`, `box`

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Browser                       │
│  ┌─────────────────────────────────────────┐    │
│  │         Landing Page (SPA)              │    │
│  │  • keycloak-js for auth                 │    │
│  │  • Fetch services from API              │    │
│  │  • CSS Custom Properties theming        │    │
│  └─────────────────────────────────────────┘    │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐     ┌─────────────────────┐
│   Keycloak    │     │  Service Registry   │
│   (OIDC)      │     │  (ConfigMap/API)    │
└───────────────┘     └─────────────────────┘
```

## Project Structure

```
core-landingpage/
├── .github/workflows/
│   └── build-push.yaml      # CI/CD pipeline
├── src/
│   ├── main.ts              # Entry point
│   ├── auth.ts              # Keycloak integration
│   ├── config.ts            # Runtime configuration
│   ├── services.ts          # Service discovery
│   ├── theme.ts             # Theme toggle
│   ├── ui.ts                # DOM rendering
│   ├── icons.ts             # SVG icons
│   ├── types.ts             # TypeScript types
│   └── style.css            # Styles (CSS Custom Properties)
├── public/
│   ├── config.js            # Runtime config (placeholder)
│   ├── services.json        # Service registry (dev/fallback)
│   ├── silent-check-sso.html
│   └── favicon.svg
├── index.html
├── Dockerfile
├── nginx.conf
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Deployment

The container image is published to GHCR:

```bash
docker pull ghcr.io/digiorg/core-landingpage:main
```

### Kubernetes

See the main [digiorg/core](https://github.com/digiorg/core) repository for Kubernetes manifests.

## License

Apache-2.0
