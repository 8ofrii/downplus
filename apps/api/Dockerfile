# Multi-stage production Dockerfile for Down Plus NestJS API Gateway

# ── Stage 1: Build ──
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl libc6-compat

# Copy root workspace configs
COPY package*.json ./
COPY turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma/

# Install dependencies
RUN npm ci

# Copy API source code
COPY apps/api ./apps/api

# Generate Prisma Client & Build TypeScript
WORKDIR /app/apps/api
RUN npx prisma generate
RUN npm run build

# ── Stage 2: Production Runner ──
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root system user for HIPAA/PCI security compliance
RUN addgroup --system --gid 1001 downplus && \
    adduser --system --uid 1001 downplus

# Copy runtime node_modules and built dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

USER downplus

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["node", "dist/main.js"]
