# Down Plus — Digital Health Engine

> 🧬 Empowering families of children with Down Syndrome through intelligent health tracking, AI-powered clinical insights, and seamless doctor collaboration.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend API | NestJS + TypeScript + Prisma |
| Mobile App | React Native (Expo) |
| Doctor Portal | Next.js 14 (App Router) |
| Database | PostgreSQL 16 + pgvector |
| Cache/Queue | Redis + BullMQ |
| Storage | AWS S3 |
| LLM Gateway | OpenRouter |
| Payments | Paymob |

## Getting Started

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose
- npm >= 10

### Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd down-plus

# 2. Copy environment file
cp .env.example .env
# Edit .env with your values

# 3. Start infrastructure (PostgreSQL, Redis, MinIO)
docker compose -f infrastructure/docker-compose.yml up -d

# 4. Install dependencies
npm install

# 5. Generate Prisma client
npm run prisma:generate --workspace=apps/api

# 6. Run database migrations
npm run prisma:migrate --workspace=apps/api

# 7. Seed the database
npm run prisma:seed --workspace=apps/api

# 8. Start development servers
npm run dev
```

### Development URLs

| Service | URL |
|---------|-----|
| API | http://localhost:3000 |
| API Docs (Swagger) | http://localhost:3000/api/docs |
| Mobile (Expo) | http://localhost:8081 |
| Doctor Portal | http://localhost:3001 |
| MinIO Console | http://localhost:9001 |
| Prisma Studio | http://localhost:5555 |

## Project Structure

```
down-plus/
├── apps/
│   ├── api/          # NestJS Backend
│   ├── mobile/       # React Native (Expo)
│   └── web/          # Next.js (Doctor Portal + Admin)
├── packages/
│   ├── shared-types/ # TypeScript interfaces
│   └── validation/   # Zod schemas
└── infrastructure/   # Docker, Terraform
```

## Architecture

The system is designed as a Multi-tenant Core Engine with disease-specific modules:

- **Core Engine:** Auth, RBAC, Child Profiles, Documents, Notifications, Payments
- **Down Plus Module:** AAP Health Supervision, Down-specific Milestones, Independence Matrix
- **Future Modules:** Cerebral Palsy, ADHD, Autism (pluggable)

## Security

- PII separated from clinical data
- AI Anonymization Boundary — zero PII reaches LLM APIs
- AES-256 encryption at rest, TLS 1.3 in transit
- Presigned URLs with 15-minute expiry
- RBAC enforced at every API endpoint

## License

Proprietary — All rights reserved.
