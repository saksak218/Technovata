# Technovata

Software development company website built with Next.js App Router, React,
TypeScript, and Tailwind CSS 4. Use npm and the committed `package-lock.json`.

## Development

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The website includes Home,
Services, About, Contact, and a branded 404 page. Track completed work and
remaining scope in [PLAN.md](PLAN.md).

## Website preview

- The landing page follows the supplied Technovata inspiration and design system:
  midnight navy, electric mint, soft violet highlights, and dimensional artwork.
- Light and dark themes share the same structure and respect the system theme
  until you choose a theme using the header control.
- The hero uses the supplied emblem artwork and rendered animation. In dark
  mode, desktop playback is muted and pausable; it pauses offscreen and in
  hidden tabs. Phones start with static artwork. Reduced motion and light mode
  keep the original transparent image without downloading the animation.
- The inquiry form validates four required fields and displays **Demo complete.
  Nothing was sent.** It does not send or persist form data. Use sample details
  when reviewing it. The form stays disabled when JavaScript is unavailable.
- Company information is sample content. The preview has `noindex` metadata and
  no portfolio, testimonials, database, CMS, email delivery, or account system.

The original files in `design/` remain unchanged. Public brand images are copies;
the public animation is a smaller, audio-free MP4. Service devices and process
illustrations use CSS depth. There is no real-time WebGL renderer in this UI.

## UI foundation

- **shadcn/ui, Base UI, and Lucide**: buttons, cards, badges, FAQ accordion,
  navigation menu, mobile sheet, form fields, inputs, textarea, labels, separators.
- **Motion**: animation tools with user reduced-motion preferences configured.
- **Magic UI**: `BorderBeam` and `GridPattern`, installed as editable source.
- **next-themes**: system-aware light/dark mode using shadcn's class-based theme.
- **Tailwind CSS 4 and Geist**: existing styling and optimized fonts retained.

Components live in `components/ui/`; theme and motion defaults are in
`components/providers.tsx`; design tokens are in `app/globals.css`.

See [the research and usage notes](docs/ui-foundation.md) for the selection
rationale, sources, examples, and company website recommendations.
Copied component licenses are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

For browser tests, install the Playwright browsers once, then build into a
separate directory so the development server can keep running:

```bash
npx playwright install chromium firefox webkit
TECHNOVATA_BUILD_DIR=.next-production npm run build
npm run test:e2e
```

The test runner starts and stops a local production server on port 3100. Linux
hosts may also need the system libraries documented by Playwright. Browser
emulation does not replace checks on physical phones. See
[the UI validation report](docs/ui-preview-validation.md) for recorded results
and limitations.

## Add components

```bash
npx shadcn add dialog
npx shadcn add @magicui/blur-fade
```

Review generated source before using it. This project uses **Base UI** composition
(`render`); Radix examples using `asChild` need adapting. Reinstalling Magic UI
files can overwrite the local theme and accessibility adjustments.
