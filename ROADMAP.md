# Crown & Chrone — Product Roadmap

**Crown & Chrone** is a private members' club and digital home for collectors of luxury
watches, classic cars, fine handbags, and exceptional assets. It connects passionate
collectors with trusted dealers, market intelligence, and curated events.

This roadmap is derived from the design screenshots in `/images` and tracks the current
state of the build. It is kept up to date after every major change (per `CLAUDE.md`).

---

## Design Language

| Token | Value | Use |
|-------|-------|-----|
| Background | `#0b0b0d` | Page base |
| Panel | `#141416` | Cards, nav |
| Gold | `#c9a24b` | Primary accent, CTAs |
| Gold (bright) | `#e8c87a` | Highlights, hovers |
| Cream | `#f4efe3` | Headings / primary text |
| Muted | `#9b9690` | Secondary text |
| Display font | Playfair Display (serif) | Headlines |
| Body font | Jost (sans) | Body, labels, UI |

Visual style: dark, cinematic, high-contrast, gold-on-charcoal, generous spacing,
uppercase letter-spaced labels.

---

## Phase 1 — Homepage Design Prototype  ✅ (current iteration)

A front-end-only, fully responsive marketing homepage. **No login and no backend** — this
iteration is purely about design and interaction. All "account" actions open a styled
demo modal instead of hitting a server.

- [x] Project scaffold (static site, no build step)
- [x] Responsive top navigation (desktop bar → mobile slide-in menu + hamburger)
- [x] Hero section with headline, dual CTAs, and layered luxury imagery
- [x] Animated statistics bar (count-up on scroll)
- [x] "Explore Our Collections" category cards (Watches, Cars, Handbags, Fine Art)
- [x] "Why Join" membership-benefits feature row
- [x] Market Insights section with an animated line chart + auction index
- [x] Recent auction results list
- [x] Closing "Become a Member" call-to-action band
- [x] Footer with newsletter + social + sitemap links
- [x] Mobile app-style bottom tab bar (per phone layout in screenshot 2)
- [x] Interactions: sticky nav, scroll-reveal, animated counters, demo modals,
      back-to-top, live-feel market chart
- [x] Responsive across desktop / tablet (iPad) / mobile (phone) breakpoints
- [x] Photographic hero & category imagery matching the design screenshots
      (luxury watch, classic/exotic car, quilted handbag), with the brand logo
      and UI icons authored as crisp SVG
- [x] Every photo bundled at three resolutions (480 / 960 / 1600px) and served
      responsively via `srcset`/`sizes` for mobile, tablet, and desktop/Retina

### Responsive breakpoints
| Device | Width | Layout |
|--------|-------|--------|
| Desktop | ≥ 1024px | Full multi-column luxury layout |
| Tablet / iPad | 640–1023px | Simplified 2-column layout |
| Phone | < 640px | Single column + bottom app tab bar |

---

## Phase 2 — Membership & Accounts  (future)
- [ ] Real "Become a Member" sign-up flow
- [ ] Authentication (login / register / SSO)
- [ ] Member profiles & collection showcases
- [ ] Saved / followed collections

## Phase 3 — Collections & Marketplace  (future)
- [ ] Category landing & detail pages (Watches, Cars, Handbags, Fine Art)
- [ ] Listing pages with provenance & authenticity records
- [ ] Dealer directory and verification badges
- [ ] Search, filtering, and watch-lists

## Phase 4 — Market Intelligence  (future)
- [ ] Live market index data and historical charts
- [ ] Auction results feed & price tracking
- [ ] Personalized portfolio valuation

## Phase 5 — Community & Events  (future)
- [ ] Member messaging & forums
- [ ] Exclusive events calendar & RSVP
- [ ] Concierge service requests

---

## Tech Notes
- **Stack:** Vanilla HTML + CSS + JavaScript. No framework, no build step, no backend.
- **Run locally:** open `index.html` directly, or serve the folder
  (`python3 -m http.server 8000`) and visit `http://localhost:8000`.
- **Images:** Photography is royalty-free stock from [Unsplash](https://unsplash.com)
  (see `assets/img/CREDITS.md`), bundled locally at three widths (480 / 960 / 1600px)
  and delivered with `<img srcset sizes>` so each device downloads an appropriately
  sized file — satisfying the multi-resolution requirement in `CLAUDE.md`. The brand
  logo, favicon, and UI icons are SVG (resolution-independent vector).
