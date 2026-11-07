# Technovata UI foundation

Research checked on 6 November 2026 against the installed Next.js 16.4.5,
React 19.3.0, and Tailwind CSS 4.3.4. This prepares components and dependencies;
the company homepage and contact workflow have not been built.

## Selected tools

| Tool | Installed version | Purpose |
| --- | --- | --- |
| shadcn/ui | 4.23.0 | Editable component source, semantic tokens, and Tailwind 4 integration. |
| Base UI | 1.9.0 | Current shadcn default for new projects; interaction primitives. |
| Lucide React | 1.70.0 | One consistent SVG icon library, with individual icon imports. |
| Motion | 14.9.1 | One animation engine; import from `motion/react`. |
| next-themes | 0.4.6 | System preference and saved theme connected to shadcn's `.dark` class. |
| Magic UI source | Retrieved during setup | Static SVG grid and border highlight for selected hero or project surfaces. |

The preset is `base-nova`, with neutral colors and Lucide. Geist and Geist Mono
remain configured through `next/font`. The logo at `design/Technovata-Logo.png`
is untouched; no new brand palette has been applied. `cn`,
`class-variance-authority`, and `tw-animate-css` support generated components.
The shadcn package also supplies the imported `shadcn/tailwind.css` stylesheet.

Sources: [shadcn Next.js setup](https://ui.shadcn.com/docs/installation/next),
[Base UI default announcement](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default),
[Lucide React](https://lucide.dev/guide/react),
[Motion installation](https://motion.dev/docs/react-installation),
[shadcn themes](https://ui.shadcn.com/docs/dark-mode/next), and
[Magic UI installation](https://magicui.design/docs/installation).

## Installed components and usage

`components/ui/` contains `button`, `badge`, `card`, `accordion`,
`navigation-menu`, `sheet`, `separator`, `input`, `textarea`, `label`, `field`,
`border-beam`, and `grid-pattern`.

Use Accordion for FAQs, Sheet with a SheetTitle for mobile navigation, and
FieldGroup / Field / FieldLabel for labeled contact controls. Installing these
building blocks does not create working site navigation or deliver contact messages.
Base UI components use `render` for composition; Radix examples using `asChild`
need adapting. For example:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

<Button render={<Link href="/" />} nativeButton={false}>
  Home
</Button>;
```

Place BorderBeam inside a positioned container, such as a Card with
`className="relative"`. It uses semantic theme colors, is hidden from assistive
technology, and makes one four-second pass by default. It is hidden under reduced
motion. Continuous decorative animation needs a pause or stop mechanism.
GridPattern uses semantic muted colors and React-generated IDs, so multiple grids
can coexist. Both effects ignore pointer input. Reinstalling these files can
overwrite the local theme and accessibility adjustments.

`components/providers.tsx` configures `MotionConfig reducedMotion="user"` and
`ThemeProvider attribute="class" defaultTheme="dark"`. Saved theme choices take
precedence over the dark default. The root layout stays
a Server Component and passes server-rendered children through those providers.
The hydration exception is scoped to the HTML element whose theme class changes.
Global CSS shortens CSS animations and transitions under reduced motion; custom
JavaScript animations still need their own reduced-motion behavior.

Sources: [Motion accessibility](https://motion.dev/docs/react-accessibility),
[Border Beam](https://magicui.design/docs/components/border-beam),
[Grid Pattern](https://magicui.design/docs/components/grid-pattern), and
[W3C guidance on moving content](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Other options researched

| Option | Finding and decision |
| --- | --- |
| [Aceternity UI](https://ui.aceternity.com/docs/cli) | Supports component installation through shadcn. Keep as a source for a future specific effect; Magic UI covers this setup. |
| [React Bits](https://reactbits.dev/get-started/installation) | Another visual component source. No component selected or installed; review each effect's dependencies and mobile behavior when a design needs it. |
| [Embla Carousel](https://github.com/davidjerleke/embla-carousel) | Consider if a future portfolio needs swipe interaction. A responsive grid needs no carousel dependency. |

No extra component framework, animation engine, smooth-scroll library, WebGL
runtime, CMS, analytics service, or form delivery provider was added.

## Recommended approach for the website

These are recommendations for the next design stage, not completed features:

1. Start with a clear description of what Technovata does and one project inquiry
   action. Add services, selected work, delivery process, company information,
   FAQs, and contact details when the actual content is available.
2. Use real screenshots and outcomes. Publish client names, testimonials,
   certifications, and statistics only when supplied and verified.
3. Keep content in Server Components; add small Client Components for menus,
   themes, forms, and effects. Passing server content as provider children does
   not turn the entire page into client-side code.
4. Use built-in `next/image`, `next/font`, and the Metadata API. Add sitemap,
   robots rules, canonical URLs, and social previews when routes and the public
   domain are known. These features need no extra SEO dependency.
5. Prefer CSS for simple hover/focus transitions and Motion for more involved
   interactions. Keep core text visible without animation. Consider LazyMotion
   when animation usage warrants it.
6. Check phone, tablet, and desktop widths, keyboard input, light/dark themes,
   reduced motion, and contrast. Enlarge compact Nova controls to at least 44px
   for primary touch interactions.
7. Build contact forms with server validation, real delivery, error handling,
   and success feedback only after delivery is accepted.
8. Measure real pages after content is built. Target LCP at most 2.5 seconds,
   INP at most 200ms, and CLS at most 0.1 at the 75th percentile. These Core Web
   Vitals values are targets, not measurements of this starter.

Sources: [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components),
[Next.js metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images),
[Motion bundle guidance](https://motion.dev/docs/react-reduce-bundle-size), and
[Core Web Vitals](https://web.dev/articles/vitals).

The local UI/UX product search did not return a verified software agency match.
The recommendations use general interface guidance and the primary sources
listed here; no suggested third-party palette was adopted.

## Verification and limits

Lint, TypeScript, and the production build passed during setup. The homepage
prerenders statically. A local production HTTP check verified content, metadata,
theme initialization, and CSS delivery. An assert-based server-rendering check
rendered all 13 components together and checked link composition, readable FAQ
content, preserved form text, deduplicated errors, and unique grid IDs. Browser
interaction, visual layouts, and device performance remain unverified.

The dependency audit reports 13 transitive findings: 2 low and 11 moderate,
with no high or critical findings. Reported roots are shadcn's CLI dependency
chain and the existing ESLint TypeScript tooling. No forced downgrades or
major-version overrides were applied; recheck when upstream packages are updated.
