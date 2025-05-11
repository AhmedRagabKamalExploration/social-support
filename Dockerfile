FROM docker.io/library/node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Set up working directory
WORKDIR /app

# ----- DEPENDENCIES STAGE -----
FROM base AS dependencies

# Copy project configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/portal/package.json ./apps/portal/package.json
COPY packages/ui-core/package.json ./packages/ui-core/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# ----- BUILD STAGE -----
FROM dependencies AS builder

# Set environment to production for full error messages
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy all source files
COPY . .

# Build the ui-core package first
RUN pnpm --filter "@dge/ui-core" build

# Build the portal app
RUN pnpm --filter "@dge/portal" build

# ----- RUNNER STAGE -----
FROM base AS runner

# Set environment variables - keep in production mode to see full errors
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Add a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /app

# Copy built app
COPY --from=builder --chown=nextjs:nodejs /app/apps/portal/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/portal/.next/static ./apps/portal/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/portal/public ./apps/portal/public

# Switch to non-root user
USER nextjs

WORKDIR /app

# Expose port
EXPOSE 3000

# Set the command to run the application
CMD ["node", "apps/portal/server.js"]
