# Maison Verdant

**Frontend:** [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app)

**API:** [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com)

**Health:** [https://maison-verdant-api.onrender.com/health](https://maison-verdant-api.onrender.com/health)

Fine dining and an all-day café, presented as a composed evening — a public site for the house, and the API that keeps the book, the menu, and the journal.

## Overview

Maison Verdant is a two-part restaurant application. `Client/` is the Next.js site guests browse: home, menu, story, gallery, journal, private dining, and reservations, plus a small admin board. `Server/` is a NestJS API on PostgreSQL. Guests read the seasonal menu and journal, request a table against live cover counts, and send a private-dining inquiry. Staff sign in with a JWT and update reservation status.

The production API ships as one Docker web service. Postgres runs inside that image, the schema is pushed on boot, and the seed restores the house menu, journal, service periods, and admin user. A scheduled workflow pings [https://maison-verdant-api.onrender.com/health](https://maison-verdant-api.onrender.com/health) so the free-tier service stays awake.

## Key features

- Editorial home: hero, signature dishes, chef’s note, hours and address, private-dining teaser, photo mosaic, and a newsletter block
- Menu in five chapters — Lunch, Dinner, Tasting, Café, and Wine — with vegetarian, vegan, and gluten-free filters
- Reservations from the reserve drawer or `/reservations`, with lunch and dinner periods, 30-minute slots, remaining covers, and closure dates
- Private dining packages (Salon Lunch, Evening Tasting, Full Buyout) and an inquiry form
- Journal index and article pages, seeded with house notes
- Admin sign-in at `/admin` on [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app) and reservation status changes: pending, confirmed, cancelled, no-show
- Smooth scrolling with Lenis, and motion with GSAP and Framer Motion
- Public `GET /health` for uptime checks

## Tech stack

| Layer | Choices |
| --- | --- |
| Frontend | Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4 |
| Client data | TanStack Query, Redux Toolkit, Axios, Zod, React Hook Form |
| Motion | GSAP, Framer Motion, Lenis, Embla Carousel |
| API | NestJS 12, Passport JWT, class-validator |
| Data | Prisma 6, PostgreSQL |
| Runtime | Node.js 22 |
| Hosting | Netlify for the site, Render for the API image |

## Project structure

```
.
├── Client/                      Next.js site
│   ├── src/app/                 Routes: home, menu, story, gallery, journal, reservations, private dining, admin
│   ├── src/components/          Layout, home, menu, reserve, journal, private dining, admin, motion
│   ├── src/features/            Redux slices for auth and UI
│   ├── src/lib/                 Axios client and shared types
│   └── src/store/               Store and typed hooks
├── Server/                      NestJS API
│   ├── src/                     auth, menu, reservations, journal, private-inquiries, closures, prisma
│   ├── prisma/                  schema.prisma and seed.ts
│   ├── test/                    e2e spec
│   ├── Dockerfile               API image
│   ├── Dockerfile.render        Production image: API plus Postgres
│   ├── docker-compose.yml       Postgres 16 for development
│   └── docker-entrypoint.sh     Init database, push schema, seed, start Nest
├── .github/workflows/           Keep-alive ping of the live health URL
├── netlify.toml                 Netlify build (base Client, Next.js plugin)
└── render.yaml                  Render Docker web service
```

Folder names stay `Client/` and `Server/`. Netlify and Render read `netlify.toml` and `render.yaml` from the repository root, with Render’s Root Directory left empty and the service branch set to `main`.

### API surface

| Method | Path | Access |
| --- | --- | --- |
| `GET` | `/`, `/health` | Public |
| `GET` | `/menu` | Public |
| `POST`, `PATCH`, `DELETE` | `/menu/sections`, `/menu/items` | Admin |
| `GET` | `/reservations/availability?date=` | Public |
| `POST` | `/reservations` | Public |
| `GET`, `PATCH` | `/reservations`, `/reservations/:id` | Admin |
| `GET` | `/journal`, `/journal/:slug` | Public |
| `POST` | `/journal` | Admin |
| `POST` | `/private-inquiries` | Public |
| `GET` | `/private-inquiries` | Admin |
| `GET` | `/closures` | Public |
| `POST`, `PATCH`, `DELETE` | `/closures` | Admin |
| `POST` | `/auth/login` | Public |

Live base: [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com). Admin routes expect `Authorization: Bearer <accessToken>`. Tokens last seven days. CORS allows the origin named in `CLIENT_ORIGIN`.

## Getting started

Use Node.js 22. The deployed site is [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app). It calls [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com).

### Client

```bash
cd Client
npm ci
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `Client/.env.local` to [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com).

```bash
npm run build
npm run lint
npx tsc --noEmit
```

### Server

Postgres for development comes from Compose. The database name in `docker-compose.yml` is `restaurant_cafe_premium`. The Prisma schema is PostgreSQL. Put a Postgres connection string in `DATABASE_URL`. The sample value in `Server/.env.example` is not a Postgres URL, so replace it before `prisma db push`.

```bash
cd Server
docker compose up -d
```

Keys in `Server/.env`:

- `DATABASE_URL` — Postgres connection string for database `restaurant_cafe_premium`
- `JWT_SECRET` — signing secret for admin tokens
- `PORT` — port the API listens on
- `CLIENT_ORIGIN` — browser origin allowed by CORS. For the deployed site, set this to [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app)

```bash
npm ci
npx prisma generate
npx prisma db push
npx prisma db seed
npm run start:dev
```

Confirm the live API with [https://maison-verdant-api.onrender.com/health](https://maison-verdant-api.onrender.com/health). The response is `{ status, service, storage }`. The seed creates the menu, journal, lunch and dinner periods, and an admin user:

- Email: `admin@maisonverdant.com`
- Password: `Admin123!`

Sign in at [https://maison-verdant.netlify.app/admin](https://maison-verdant.netlify.app/admin).

```bash
npm run build
npm run lint
npx tsc --noEmit -p tsconfig.build.json
npm test
npm run test:e2e
```

`npm run start:prod` runs `node dist/main` after `npm run build`.

### Deployment layout

These files stay at the repository root so the existing dashboards keep working.

- **Netlify** reads `netlify.toml`: base directory `Client`, build `npm ci && npm run build`, publish `Client/.next`, plugin `@netlify/plugin-nextjs`, Node 22. The site is [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app).
- **Render** reads `render.yaml`: Docker web service `maison-verdant-api`, `dockerfilePath` `./Server/Dockerfile.render`, `dockerContext` `./Server`, health check `/health`. Root Directory is empty. The service tracks branch `main`. The image starts Postgres, runs `prisma db push` and the seed, then Nest on `PORT`. Set `CLIENT_ORIGIN` in the Render dashboard to [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app). The API is [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com).
- **GitHub Actions** (`.github/workflows/keep-alive.yml`) pings [https://maison-verdant-api.onrender.com/health](https://maison-verdant-api.onrender.com/health) every ten minutes. Override that with the `RENDER_HEALTH_URL` repository variable.

## Author

Amitav Roy Chowdhury — github.com/amitavrchy
