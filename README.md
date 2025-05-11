# Social Support DGE Monorepo

## Tech Stack

- **TypeScript**: Primary language for type-safe development
- **React**: Frontend library for building UI components
- **Storybook**: Component development and documentation
- **ESLint**: JavaScript/TypeScript linting
- **TypeScript ESLint**: TypeScript-specific linting rules

## Monorepo Structure

This project uses a monorepo architecture with multiple packages managed by [TurboRepo](https://turbo.build/repo).

### Key Features

- Shared dependencies across packages
- Isolated development environments
- Optimized builds with caching
- Parallel task execution

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- pnpm (install via `npm install -g pnpm`)

### Installation

```bash
pnpm install
```

### Running Packages

1. **Start all Development Server**:

   ```bash
   pnpm dev
   ```

2. **Build All Packages**:

   ```bash
   pnpm build
   ```

3. **Run Storybook**:

   ```bash
   pnpm storybook
   ```

4. **Run Linting**:

   ```bash
   pnpm lint
   ```

5. **Run Type Checking**:
   ```bash
   pnpm typecheck
   ```

### Package-Specific Commands

To run commands for specific packages:

```bash
pnpm --filter <package-name> <command>

```

## Development Workflow

1. Make changes in the respective package
2. Run package-specific tests/linting
3. Commit changes following conventional commits
4. Push to your feature branch
5. Create a pull request for review

## Deployment

1. Run docker compose build from Root

```bash
docker-compose build --no-cache
```

2. Run docker up

```bash
docker-compose up -d
```
