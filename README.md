# Vasant Valley School — Website Redesign

A modern, responsive, accessible redesign of **[vasantvalley.org](https://www.vasantvalley.org/)**, built for the
**Dettroin Full Stack Developer Internship — Round 1 (Website Redesign Challenge)**.

This is not a clone. The information architecture, visual language, motion design, component system and the
supporting Node API were all rebuilt from scratch, keeping the school's identity (sandstone red, the octagonal
motif, the motto *"Excellence in Deed"*) while fixing what the original site makes hard.

---

---

## Tech Stack

**Frontend**
- **React 18** with **Vite 5** — fast dev server, code-split production build
- **React Router 6** — client-side routing with lazy-loaded route chunks
- **Tailwind CSS 3** — custom design tokens (colour ramps, fluid type scale, easing, keyframes)
- **Framer Motion** — scroll reveals, carousel transitions, accordion height animation
- **lucide-react** — tree-shaken icon set

**Backend**
- **Node.js + Express** for local development (`server/`)
- **Vercel Serverless Functions** for production (`api/`)
- Both are thin adapters over the *same* transport-agnostic handlers in `server/lib/handlers.js`, so the API
  behaves identically in dev and in production.

**Tooling** — ESLint (react + hooks), PostCSS, Autoprefixer.

---

## Running Locally

```bash
git clone <your-repo-url>
cd DETTROIN-INT-vasantvalley
npm install

npm run dev        # frontend only        → http://localhost:5173
npm run dev:api    # API only             → http://localhost:5000/api/health
npm run dev:full   # both, side by side

npm run build      # production build → dist/
npm run preview    # serve the production build
npm run lint       # eslint
```

The frontend works with **or without** the API running: every read falls back to bundled seed data, so the site
never renders empty. The News page shows which source it is using.

---

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/events` | Events list. Supports `?category=`, `?q=`, `?limit=` |
| `GET` | `/api/announcements` | Announcement banner content |
| `POST` | `/api/enquiry` | Admissions / contact submissions |

`POST /api/enquiry` re-validates every field server-side, applies a fixed-window rate limit (5 requests per
minute per IP), silently absorbs honeypot hits, sanitises stored text, and returns a human-readable reference
(`VVA-260725-K3QP`) that the applicant can quote back to the office. Field-level errors come back as
`{ ok: false, fields: { email: "…" } }` and are merged straight into the form UI.

---

## Project Structure

```
├── api/                      # Vercel serverless functions (production API)
│   ├── announcements.js
│   ├── enquiry.js
│   ├── events.js
│   └── health.js
├── server/                   # Express dev server + shared backend logic
│   ├── index.js              # dev-only HTTP adapter
│   └── lib/
│       ├── dataset.js        # content store (swap for a DB in production)
│       ├── handlers.js       # transport-agnostic request handlers
│       ├── store.js          # enquiry persistence + rate limiting
│       └── validate.js       # server-side validation & sanitisation
├── public/                   # favicon, OG image, robots.txt, sitemap.xml
├── src/
│   ├── components/
│   │   ├── events/           # EventCard
│   │   ├── forms/            # EnquiryForm, ContactForm
│   │   ├── home/             # Hero, QuickLinks, Mission, Announcements,
│   │   │                     # StoryBlock, LearningWheel, Infrastructure,
│   │   │                     # EventsRail, InstagramStrip
│   │   ├── layout/           # Navbar, Footer, Layout, ScrollManager,
│   │   │                     # ScrollProgress, BackToTop, Logo, RouteFallback
│   │   ├── ui/               # Reveal, SmartImage, SectionHeading, Accordion,
│   │   │                     # PageHero, Icon
│   │   └── ErrorBoundary.jsx
│   ├── data/                 # all copy & content, separated from components
│   ├── hooks/                # useMediaQuery, useScrollLock, useCountUp,
│   │                         # useDocumentTitle
│   ├── lib/                  # api client, date/format helpers
│   ├── pages/                # Home, About, Learning, DayInSchool,
│   │                         # Admissions, News, Contact, NotFound
│   ├── App.jsx               # routes (lazy-loaded)
│   ├── main.jsx
│   └── index.css             # Tailwind layers + component classes
├── tailwind.config.js        # design tokens
├── vite.config.js            # build config + /api dev proxy
└── vercel.json               # SPA rewrites, cache & security headers
```

---

## Key Improvements Over the Original

### Information architecture
- The original hides everything behind a single hamburger icon — **on desktop as well as mobile**. This redesign
  exposes a full primary navigation bar with descriptive mega-menu panels, so visitors can see the whole site at
  a glance.
- A **quick-links strip** sits directly under the hero with the four tasks most visitors actually arrive to do:
  Admissions, Learning, Campus Life, News.
- Content that was scattered across the original homepage is now organised into seven purposeful pages, with
  deep-linkable anchors (`/learning#sen`, `/about#infrastructure`) used consistently in the nav and footer.

### UI / visual design
- A deliberate design system rather than ad-hoc styling: crimson/sandstone/pine colour ramps, a fluid type scale
  (`clamp()`-based, no fixed breakpoint jumps), consistent easing (`cubic-bezier(0.16, 1, 0.3, 1)`) and one
  shadow/radius language across every component.
- **Fraunces + Inter** pairing — warm and institutional for headings, highly legible for body text.
- The school's **octagonal motif** is reused as a real design element: the logo mark, image clips, the learning
  wheel and decorative frames.
- Text contrast raised throughout; body copy sits on generous line-height (1.8) with `text-wrap: balance` on
  headings and `pretty` on paragraphs.

### UX & interaction
- The static learning diagram is now an **interactive octagon** — hover, focus or tap any of the eight facets to
  read what it means in practice.
- The events timeline is a **snap-scrolling rail** with working arrow controls and disabled-state feedback;
  the News page adds live search, category filters and a month archive.
- The hero carousel has real controls: dots, prev/next, an explicit **play/pause**, arrow-key support, pause on
  hover/focus, and it stops when the tab is hidden.
- **Forms actually work.** Client validation for instant feedback, server validation as the source of truth,
  inline field errors, loading and success states, and a reference number on submission.
- Route-level scroll restoration, smooth hash navigation with sticky-header offset, a reading-progress bar and a
  back-to-top control.

### Responsiveness
- Built mobile-first and verified from 320px through ultrawide. Nothing is hidden on mobile — the drawer carries
  the full navigation with expandable sub-sections, plus direct call/email actions.
- Fluid typography and spacing mean layouts adapt continuously instead of snapping between breakpoints.
- Touch targets are ≥44px; horizontal rails use native scroll-snap so they feel right on touch devices.

### Accessibility
- Semantic landmarks (`header`/`nav`/`main`/`footer`), a working **skip-to-content** link, and one `<h1>` per page.
- Full keyboard support: focus-visible rings everywhere, `Esc` closes the menu, arrow keys drive the carousel,
  tabs/accordions carry proper `aria-selected` / `aria-expanded` / `aria-controls` wiring.
- `aria-live` regions announce carousel changes, filter results and form outcomes.
- **`prefers-reduced-motion` is respected globally** — animations are disabled and autoplay stops.
- Every image has meaningful `alt` text; decorative elements are `aria-hidden`.

### Performance
- Route-level code splitting: the home page is ~25 kB gzipped of app code; other pages load on demand.
- Vendor chunks split (react / motion) so app updates don't invalidate the framework cache.
- Responsive `srcset` + `sizes` on every photograph, lazy loading below the fold, eager + high priority for the
  hero, and skeleton placeholders that prevent layout shift.
- Fonts preconnected and loaded with `display=swap`; immutable cache headers on hashed assets; edge caching
  (`stale-while-revalidate`) on API reads.

### Engineering quality
- Content lives in `src/data/*` — pages compose components, components never hard-code copy.
- Reusable primitives (`Reveal`, `SmartImage`, `SectionHeading`, `Accordion`, `PageHero`, `Icon`) keep the pages
  declarative and consistent.
- An `ErrorBoundary` catches render failures, `SmartImage` degrades to a branded placeholder if the CDN fails,
  and the API client falls back to seed data — three independent failure paths, none of which produce a blank
  screen.
- Zero ESLint warnings; production build passes clean.

---

## Deployment (Vercel)

1. Push this repository to GitHub (public).
2. On [vercel.com](https://vercel.com), **Add New → Project** and import the repo.
3. Vercel detects Vite automatically — `vercel.json` already sets the build command, output directory, SPA
   rewrites (excluding `/api`), security headers and asset caching. No environment variables are required.
4. Deploy, then confirm `https://<your-project>.vercel.app/api/health` returns `{"ok":true,…}`.
5. Paste the deployment URL into the **Live Demo** row above and into `index.html`'s canonical tag.

---

## Notes on Content & Imagery

This is a **redesign concept built for a technical assessment** and is not affiliated with, endorsed by, or
operated on behalf of Vasant Valley School.

- Factual content (founding year and founders, the eight-acre Vasant Kunj campus, the motto, the eight-facet
  learning model, the Gurgaon announcement, contact details) is drawn from the school's public website.
- Supporting copy — admissions dates, the daily timetable, house names, leadership descriptions, FAQs — is
  **illustrative placeholder content** written to demonstrate the layouts.
- Photography is royalty-free stock from Unsplash standing in for the school's own images.
- The enquiry form does not send email and stores nothing in production; submissions are validated, given a
  reference and discarded.
