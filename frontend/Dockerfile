# Stage 1: Base
FROM node:24-alpine AS base

# Set CI=true to make pnpm non-interactive and avoid TTY prompts
ENV CI=true

# Install pnpm globally to match project lockfile
RUN npm install -g pnpm@11.1.2

WORKDIR /app

# Stage 2: Dependencies installer
FROM base AS dependencies

# Copy package files first to leverage caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies including devDependencies (needed for Next.js build)
RUN pnpm install --frozen-lockfile

# Stage 3: Development
FROM base AS development

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Expose Next.js default port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS="--require newrelic"

# Command to run Next.js in development mode (hot reload)
CMD ["pnpm", "run", "dev"]

# Stage 4: Builder (for production)
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Build Next.js application
RUN pnpm run build

# Stage 5: Production runner
FROM base AS production

ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED 1

# Copy build output and manifest files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/newrelic.js ./newrelic.js

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "start"]

