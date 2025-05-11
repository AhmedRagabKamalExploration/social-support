# Social Support Portal Monorepo

## Overview

This monorepo contains the Social Support Portal application, a comprehensive solution for managing financial support requests. The application is built using a modern tech stack and follows best practices for scalable, maintainable web applications.

## Tech Stack

- **TypeScript**: Primary language for type-safe development
- **React**: Frontend library for building UI components
- **Next.js**: React framework for server-side rendering and static site generation
- **Zustand**: Lightweight state management
- **React Hook Form**: Form handling with Zod validation
- **Storybook**: Component development and documentation
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI primitives
- **Vitest**: Testing framework
- **ESLint**: JavaScript/TypeScript linting
- **i18n**: Internationalization support

## How to run the app for dev
- Define .env variables and paste with the variables will share it with you
- Go inside ui-core package and run Build

```bash
cd packages/ui-core && pnpm build
```

- Go inside portal app and run dev

```bash
cd apps/portal && pnpm dev
```

## Run from Root folder 

```bash
# Build UI components
pnpm --filter @dge/ui-core build
# Start only the portal app
pnpm --filter @dge/portal dev

```



## Monorepo Architecture

This project uses a monorepo architecture powered by [TurboRepo](https://turbo.build/repo), allowing for efficient development across multiple packages and applications.

### Structure

```
social-support/
├── apps/
│   ├── portal/            # Main web application
│   └── docs/              # Documentation site
├── packages/
│   ├── ui-core/           # Shared UI components
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
```

### Key Benefits

- **Shared Code**: Common components, utilities, and configurations
- **Consistent Tooling**: Unified development experience
- **Parallel Execution**: Task running across packages
- **Dependency Management**: Simplified with pnpm workspaces
- **Caching**: Optimized builds with TurboRepo

## Multi-Step Form Implementation

The portal includes a sophisticated multi-step form for financial request applications, divided into three main steps:

1. **Personal Information Form**
   - User details (name, ID, contact information)
   - Address and location data
   - Validation using Zod schemas

2. **Family & Financial Information Form**
   - Marital status and dependents
   - Employment information
   - Income and expense details

3. **Situation Descriptions Form**
   - Detailed explanation of financial needs
   - Supporting documentation

### Form Architecture

- **Component-Based**: Each field is a reusable component
- **Form State Management**: Using React Hook Form with Zod validation
- **Progressive Disclosure**: Information is collected in logical steps
- **Data Persistence**: Form data is preserved between steps
- **Validation**: Real-time field validation with comprehensive error messages
- **Internationalization**: All form fields and error messages support multiple languages

## Bundle Analysis

The portal app includes bundle analysis capabilities to monitor and optimize application size:

- Run `pnpm --filter @dge/portal analyze` to generate a detailed report
- Configured in `next.config.ts` using `@next/bundle-analyzer`
- Helps identify large dependencies and opportunities for optimization

## Key Packages

### UI Core (`@dge/ui-core`)

A comprehensive UI component library that serves as the foundation for all user interfaces:

- Built with Radix UI primitives for accessibility
- Styled with TailwindCSS
- Documented with Storybook
- Bundled with Vite for optimal performance
- Includes visualizer for bundle size analysis

### ESLint Configuration (`@dge/eslint-config`)

Shared ESLint configuration to ensure code quality across all packages:

- TypeScript-specific rules
- React best practices
- Performance optimizations
- Consistent formatting

### TypeScript Configuration (`@dge/typescript-config`)

Shared TypeScript configuration for type consistency across the monorepo:

- Strict type checking
- Consistent module resolution
- Path aliases

## Development Workflow

### Prerequisites

- Node.js (v22+ recommended)
- pnpm (v10+ recommended)

### Installation

```bash
pnpm install
```

### Development Commands

1. **Start Development Server**:

   ```bash
   pnpm dev
   ```

2. **Build All Packages**:

   ```bash
   pnpm build
   ```

3. **Run Storybook** (UI component development):

   ```bash
   pnpm --filter @dge/ui-core storybook
   ```

4. **Run Linting**:

   ```bash
   pnpm lint
   ```

5. **Run Type Checking**:

   ```bash
   pnpm check-types
   ```

6. **Run Tests**:

   ```bash
   # Unit tests
   pnpm --filter @dge/portal test
   
   # E2E tests
   pnpm --filter @dge/portal test:e2e
   
   # With UI
   pnpm --filter @dge/portal test:e2e:ui
   ```

### Package-Specific Commands

To run commands for specific packages:

```bash
pnpm --filter <package-name> <command>
```

Examples:
```bash
# Start only the portal app
pnpm --filter @dge/portal dev

# Build UI components
pnpm --filter @dge/ui-core build
```

## Monitoring and Error Tracking

The application uses Sentry for error tracking and monitoring:

- Automatic error reporting
- Performance monitoring
- Source maps for better debugging
- Custom tunneling route to bypass ad blockers

## Deployment

### Docker

The application can be deployed using Docker:

1. Build the Docker image:

   ```bash
   docker-compose build --no-cache
   ```

2. Run the application:

   ```bash
   docker-compose up -d
   ```

### Standalone Deployment

For standalone deployment, build the application first:

```bash
pnpm build
```

The portal app is configured with the `standalone` output option in Next.js, making it easy to deploy to various hosting platforms.
