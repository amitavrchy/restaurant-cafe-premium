# Restaurant / Café Premium — Project Build Spec (Agent-Ready)

> Stack: Next.js + Redux + RQ + RHF/zod + framer-motion + **gsap, lenis, embla, date-fns, react-day-picker**. NestJS + Prisma + JWT. Optional: `@radix-ui/react-dialog`, `qrcode.react` (table menus), `leaflet` for location.

---

## 1. Vision & Audience

**Vision:** A Michelin-caliber digital presence for **“Maison Verdant”** — fine dining + all-day café concept. Editorial food photography, immersive scroll menus, frictionless reservations, private dining leads. Tone: Jamavar luxury × Bon Bouquet warmth × modern Awwwards food-drink craft (TÒPAS / Delta Cafés energy).

**Audience:** Diners booking 2–8 covers; tourists discovering tasting menus; private-event planners.

**Promise:** “An evening composed like a tasting menu.”

---

## 2. References

| Site | Steal | Link |
|------|-------|------|
| Jamavar Restaurants | Multi-venue luxury, slide-out reservations, journal | https://www.awwwards.com/sites/jamavar-restaurants |
| BON BOUQUET CAFÉ | Parisian brunch brand site | https://www.awwwards.com/sites/bon-bouquet-cafe |
| Cacao Bean | Chic interiors storytelling | https://www.awwwards.com/sites/cacao-bean-restaurant-and-cafe |
| Awwwards Food & Drink | Current category bar | https://www.awwwards.com/websites/food-drink/ |
| Awwwards Restaurant | Nominees collection | https://www.awwwards.com/websites/restaurant/ |

**Patterns:** Full-bleed dish photography; reservation as primary CTA; menu as editorial chapters; chef story; soft ambient motion; never stock “pizza clipart”.

---

## 3. Design System

### Color
| Token | Hex |
|-------|-----|
| `--cream` | `#F6F1E7` |
| `--ink` | `#1A1612` |
| `--olive` | `#3F4A3C` |
| `--terracotta` | `#C45C3A` |
| `--gold` | `#B08D57` |
| `--line` | `#E5DCCF` |
| `--muted` | `#7A7368` |

### Typography
- Display serif: `Cormorant Garamond` or `Fraunces`
- Body: `DM Sans` or `Inter`
- Menu prices mono-adjacent: `IBM Plex Mono` small caps feel via tracking

### Motion
- Lenis smooth scroll (marketing)
- GSAP: menu section pin, image reveal scrub
- Embla: dish highlights, horizontal wine list
- Reservation drawer: 350ms ease `[0.22,1,0.36,1]`
- Hover on dishes: slow zoom 1→1.05 / 800ms

---

## 4. Sitemap

### `/`
Hero cinematic still + reserve CTA; signature dishes Embla; chef quote; hours/location strip; private dining teaser; Instagram mosaic; newsletter.

### `/menu`
Chapters: Lunch / Dinner / Tasting / Café / Wine. Sticky chapter nav. Dietary filters (V, VG, GF). Pairing notes. Print PDF link.

### `/reservations`
Full page + slide-over: date (`react-day-picker`), party size, seating preference, time slots from API, guest details (RHF+zod), confirmation.

### `/private-dining`
Lead form + gallery + packages.

### `/story` (chef / philosophy)
### `/gallery`
### `/gift-cards` (stretch)
### `/journal` events & recipes
### Auth optional for recurring guests: saved preferences
### Admin: menu CRUD, reservation calendar, covers capacity

**Signature:** Off-canvas reservation; scroll-triggered plate photography; wine list horizontal snap.

---

## 5. Features

### MVP
- Public pages + menu from API
- Reservation create with slot validation & capacity
- Private dining inquiry
- Admin menu + reservations manage
- Hours / holiday closures model
- Email confirmation stub (log)

### Stretch
- SMS reminder
- Waitlist when full
- Multilingual (EN/FR)
- Table QR digital menu
- Wine inventory pairing AI (out of scope)

---

## 6. Frontend Architecture

```
components/reserve/ (ReservationDrawer, SlotPicker, PartySize)
components/menu/ (MenuChapter, DishCard, DietaryFilters)
features/ui/uiSlice.ts  # drawer open
features/auth/authSlice.ts
```

**React Query:** menu, availability query by date, create reservation mutation.
**Redux:** UI drawer; auth for admin.

**Adds:** `@radix-ui/react-dialog`, optional `leaflet`.

---

## 7. Backend Prisma

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

enum Role { GUEST ADMIN }
enum ReservationStatus { PENDING CONFIRMED CANCELLED NO_SHOW }
enum Dietary { NONE VEGAN VEGETARIAN GLUTEN_FREE }

model User {
  id String @id @default(cuid())
  email String @unique
  passwordHash String
  name String
  role Role @default(ADMIN)
}

model MenuSection {
  id String @id @default(cuid())
  slug String @unique
  title String
  sortOrder Int
  items MenuItem[]
}

model MenuItem {
  id String @id @default(cuid())
  sectionId String
  section MenuSection @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  name String
  description String
  price Decimal @db.Decimal(10,2)
  dietary String[]
  imageUrl String?
  available Boolean @default(true)
  sortOrder Int @default(0)
}

model ServicePeriod {
  id String @id @default(cuid())
  name String // Lunch Dinner
  startTime String // "18:00"
  endTime String
  slotMinutes Int @default(30)
  maxCovers Int @default(60)
}

model Reservation {
  id String @id @default(cuid())
  code String @unique @default(cuid())
  date DateTime @db.Date
  time String
  partySize Int
  name String
  email String
  phone String?
  notes String?
  seating String?
  status ReservationStatus @default(PENDING)
  createdAt DateTime @default(now())
  @@index([date, time])
}

model PrivateInquiry {
  id String @id @default(cuid())
  name String
  email String
  phone String?
  eventDate DateTime?
  guests Int?
  message String
  createdAt DateTime @default(now())
}

model Closure {
  id String @id @default(cuid())
  date DateTime @db.Date
  reason String?
}

model JournalPost {
  id String @id @default(cuid())
  slug String @unique
  title String
  body String
  coverImage String?
  publishedAt DateTime?
}
```

### Endpoints
| Method | Path | Auth |
|--------|------|------|
| GET | `/menu` | public |
| CRUD | `/menu/sections` `/menu/items` | ADMIN |
| GET | `/reservations/availability?date=` | public | returns slots + remaining covers |
| POST | `/reservations` | public |
| GET/PATCH | `/reservations` | ADMIN |
| POST | `/private-inquiries` | public |
| CRUD | `/closures` | ADMIN |
| GET | `/journal` | public |

**Business rule:** Reject booking if `sum(partySize)` for slot ≥ maxCovers; block Closure dates.

---

## 8. Perf / A11y / SEO

- Images: next/image, blur placeholders, max 1600w
- Prefers-reduced-motion disables Lenis/GSAP scrub
- Reservation form labels, error announcements
- Restaurant / Menu / ReserveAction JSON-LD; Open Graph dish images
- Mobile: sticky “Reserve” bar

---

## 9. Build Order

1. Design system + home + story static
2. Menu API + UI chapters
3. Availability + reservation flow
4. Admin auth + reservation board
5. Private dining + journal
6. GSAP/Lenis polish
7. SEO + a11y

## 10. Acceptance

- [ ] Guest can book available slot; overbook prevented
- [ ] Menu dietary filters work
- [ ] Admin can mark no-show / cancel
- [ ] Reservation drawer accessible on mobile
- [ ] Lighthouse a11y ≥ 90
