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

# Install all dependencies including devDependencies (needed for TypeScript compiling/running)
RUN pnpm install --frozen-lockfile

# Stage 3: Development
FROM base AS development

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Expose the API port
EXPOSE 3001

# Command to run backend in development mode with ts-node-dev (hot reload)
CMD ["pnpm", "run", "dev"]

# Stage 4: Production (Ready for production deployments)
FROM base AS production

ENV NODE_ENV=production

# Copy only production dependencies to keep the image lightweight
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy application source code
COPY . .

# Expose the API port
EXPOSE 3001

# Run the app using start command
CMD ["pnpm", "start"]

