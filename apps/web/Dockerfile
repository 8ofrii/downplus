# Multi-stage production Dockerfile for Down Plus Next.js Web Portal

# ── Stage 1: Build ──
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy workspace configs
COPY package*.json ./
COPY turbo.json ./
COPY apps/web/package*.json ./apps/web/

# Install dependencies
RUN npm ci

# Copy Web application source code
COPY apps/web ./apps/web

# Build Next.js in production standalone mode
WORKDIR /app/apps/web
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── Stage 2: Production Runner ──
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 downplus && \
    adduser --system --uid 1001 downplus

# Copy public assets & standalone build
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

USER downplus

EXPOSE 3001

CMD ["node", "apps/web/server.js"]
