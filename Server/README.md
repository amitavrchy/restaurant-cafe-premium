# Maison Verdant — Server

**API:** [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com)

**Health:** [https://maison-verdant-api.onrender.com/health](https://maison-verdant-api.onrender.com/health)

**Frontend:** [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app)

NestJS API for Maison Verdant: menu, reservations, journal, private inquiries, closures, and admin auth. Data lives in PostgreSQL through Prisma.

The project overview, stack, and full setup live in the [repository README](../README.md).

## Setup

```bash
docker compose up -d
```

Compose creates database `restaurant_cafe_premium`. The Prisma schema is PostgreSQL. Set these keys in `.env`:

- `DATABASE_URL` — Postgres connection string for database `restaurant_cafe_premium`. The sample value in `.env.example` is not a Postgres URL.
- `JWT_SECRET` — signing secret for admin tokens
- `PORT` — port the API listens on
- `CLIENT_ORIGIN` — browser origin allowed by CORS. For the deployed site, use [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app)

```bash
npm ci
npx prisma generate
npx prisma db push
npx prisma db seed
npm run start:dev
```

Seeded admin: `admin@maisonverdant.com` / `Admin123!`. Sign in at [https://maison-verdant.netlify.app/admin](https://maison-verdant.netlify.app/admin).

```bash
npm run build
npm run lint
npx tsc --noEmit -p tsconfig.build.json
npm test
npm run test:e2e
```

`Dockerfile` builds the API image. `Dockerfile.render` is the production image Render builds (API and Postgres in one container). `render.yaml` stays at the repository root.
