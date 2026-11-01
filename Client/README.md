# Maison Verdant — Client

**Live:** [https://maison-verdant.netlify.app](https://maison-verdant.netlify.app)

**API:** [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com)

Next.js frontend for Maison Verdant: the public site and the reservation admin board.

The project overview, stack, and full setup live in the [repository README](../README.md).

## Setup

```bash
npm ci
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to [https://maison-verdant-api.onrender.com](https://maison-verdant-api.onrender.com).

```bash
npm run build
npm run lint
npx tsc --noEmit
```

Routes: `/`, `/menu`, `/story`, `/gallery`, `/journal`, `/journal/[slug]`, `/private-dining`, `/reservations`, `/admin`.
