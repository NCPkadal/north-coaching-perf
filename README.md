# North Coaching Performance (NCP)

Premium marketing website for North Coaching Performance — high-performance coaching for athletes and leaders.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** for subtle animations
- **shadcn-style** UI (Button, Card, Accordion) + **lucide-react** icons
- No external paid services; runs fully locally

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` — App Router pages (home, privacy, terms)
- `src/components/` — Header, Hero, About, Programs, Booking, Testimonials, Contact, Footer + `ui/`
- `src/lib/copy.ts` — All site copy (i18n-ready; add e.g. `copy.fr` for French)
- `src/data/programs.ts` — **Programs data model**: edit tiers, pricing, FAQs here

## Adding your logo

1. Place your NCP logo (SVG or PNG) in `public/` (e.g. `public/logo.svg`).
2. In `src/components/Header.tsx`, set:
   ```ts
   const LOGO_SRC = "/logo.svg";
   ```

## Formulaires (Formspree)

The “Request a Call” form stores submissions in **localStorage** (keys: `ncp-discovery-requests`, `ncp-contact-messages`) for development. To wire to email or CRM:

- Configure Formspree : copie `.env.example` en `.env.local`, ajoute tes IDs (NEXT_PUBLIC_FORMSPREE_BOOKING_ID, NEXT_PUBLIC_FORMSPREE_CONTACT_ID). Sans config, mode démo (localStorage).

## Calendly (optional)

To use Calendly instead of the custom form: add a section that embeds your Calendly link (iframe or redirect). No API keys required; use your Calendly scheduling URL.

## Build & lint

```bash
npm run build
npm run lint
```

## Design

- Dark theme (charcoal/black), silver accents, generous whitespace
- Subtle gradient + noise background (CSS only)
- Metallic hover on buttons; restrained Framer Motion (fade/slide)
- Responsive, accessible (ARIA, focus, contrast), SEO (metadata, OpenGraph)

## Disclaimer

Copy includes: *“Information provided is not medical advice. For injuries or medical concerns, consult a qualified healthcare professional.”*
