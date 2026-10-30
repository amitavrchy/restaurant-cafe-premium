# Maison Verdant — Restaurant / Café Premium

Fine-dining + all-day café product built from `PROJECT_SPEC.md`.

## Stack

- **Client:** Next.js, Redux Toolkit, TanStack Query, RHF + Zod, Framer Motion, GSAP, Lenis, Embla, react-day-picker
- **Server:** NestJS, Prisma (SQLite for local), JWT admin auth

## Quick start

### API (port 4000)

```bash
cd Server
npm install
# ensure .env has DATABASE_URL="file:./dev.db" JWT_SECRET=... PORT=4000
npx prisma generate
npx prisma db push
npx prisma db seed
npm run start:dev
```

Admin seed: `admin@maisonverdant.com` / `Admin123!`

### Client (port 3000)

```bash
cd Client
npm install
# NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Cinematic home |
| `/menu` | Chapters + dietary filters |
| `/reservations` | Full booking flow |
| `/private-dining` | Inquiry + packages |
| `/story` `/gallery` `/journal` | Brand pages |
| `/admin` | Reservation board |

Reservation drawer opens from the header / mobile bar site-wide.
