# Multi-Tenant Pipeline Dashboard

A Turborepo monorepo showcasing reusable component architecture with multi-tenant and single-tenant deployment capabilities.

## Live Deployments

- **Admin App** (Multi-tenant): https://multi-tenant-pipeline-dashboard-adm.vercel.app
- **Embedded App** (Single-tenant): https://multi-tenant-pipeline-dashboard-emb.vercel.app

## Architecture

Turborepo monorepo with shared component library:

```
multi-tenant-pipeline-dashboard/
├── apps/
│   ├── admin/              # Multi-tenant app (green theme, port 3000)
│   └── embedded/           # Single-tenant app (blue theme, port 3001)
└── packages/
    └── ui/                 # Shared component library (@repo/ui)
        ├── components/     # PipelineTable, Button, Switch
        ├── providers/      # ThemeProvider
        ├── hooks/          # usePipelines (SWR data fetching)
        ├── styles/         # Theme CSS variables
        ├── lib/            # API functions, utilities
        └── types/          # TypeScript interfaces
```

## Key Features

- **Reusable Components**: Single `PipelineTable` component used in both apps
- **Multi-tenant Support**: Admin app shows all tenants, embedded app filters by tenant ID
- **ThemeProvider**: Centralized theming via `@repo/ui` with type-safe theme selection
- **Skeleton Loading**: Zero layout shift during data loading
- **Status Indicators**: Color-coded active/inactive pipeline status
- **Type Safety**: Full TypeScript coverage across packages

## Getting Started

### Prerequisites
- Node.js 18+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
# Run both apps
npm run dev

# Admin app: http://localhost:3000
# Embedded app: http://localhost:3001
```

### Build

```bash
npm run build        # Build all apps
npm run type-check   # TypeScript validation
npm run lint         # Code linting
```

## Component Reusability

The `PipelineTable` component uses props for behavior variation:

```tsx
// Admin App
<PipelineTable showTenantColumn={true} />

// Embedded App
<PipelineTable tenantId="xxx-ten-1" showTenantColumn={false} />
```

## Theming

Themes are managed centrally in `@repo/ui` via `ThemeProvider`:

```tsx
// apps/admin/src/app/layout.tsx
import { ThemeProvider } from '@repo/ui'

<ThemeProvider theme="admin">   {/* Green theme */}
  {children}
</ThemeProvider>

// apps/embedded/src/app/layout.tsx
<ThemeProvider theme="embedded"> {/* Blue theme */}
  {children}
</ThemeProvider>
```

Theme definitions in `packages/ui/src/styles/themes.css`:
- **admin**: `--primary: 142 76% 36%` (green)
- **embedded**: `--primary: 221 83% 53%` (blue)

## API Integration

Requests are proxied through Next.js API routes to avoid CORS:

```
/api/pipelines              → AWS API Gateway (all tenants)
/api/pipelines?tenantId=xxx → AWS API Gateway (filtered)
```

Data fetching via SWR with caching and revalidation.

## Deployment

Deployed as separate Vercel projects:

**Admin App:**
```
Root Directory: apps/admin
Build Command: turbo run build --filter=@repo/admin
URL: https://multi-tenant-pipeline-dashboard-adm.vercel.app
```

**Embedded App:**
```
Root Directory: apps/embedded
Build Command: turbo run build --filter=@repo/embedded
URL: https://multi-tenant-pipeline-dashboard-emb.vercel.app
```

## Tech Stack

- **Turborepo** - Monorepo build orchestration
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component patterns
- **SWR** - Data fetching and caching

## License

MIT
