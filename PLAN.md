# Technovata website prototype

## Summary

Build a polished, locally reviewable corporate website for Technovata, presenting websites, custom web applications, and mobile development to international clients. Use futuristic abstract 3D, navy-and-teal branding, and matching light and dark themes.

The deliverable is a functioning visual prototype with clearly marked sample content and simulated inquiries. Use this checklist to track implementation and verification.

## Progress tracking

Change `- [ ]` to `- [x]` only after completing the step and its required verification. Mark a phase complete only when every step in that phase is complete. Leave blocked or unverified steps unchecked and record the reason beside the step.

- [x] Phase 1: Establish the shared website foundation.
- [x] Phase 2: Build the pages and sample content.
- [x] Phase 3: Add adaptive 3D media and fallbacks.
- [x] Phase 4: Build the simulated project inquiry.
- [x] Phase 5: Verify and deliver the local prototype.

## Phase 1: Establish the shared website foundation

- [x] Preserve Next.js 16.4.5, React 19.3.0, Tailwind CSS 4, npm, the existing configuration, and the existing uncommitted UI work.
- [x] Reuse shadcn/Base UI, Lucide, Motion, and next-themes. Keep pages server-rendered, with client components for navigation controls, theme selection, the form, and 3D.
- [x] Preserve the supplied logo and its colors; use a light backing where the original image needs it.
- [x] Extend existing semantic tokens with navy surfaces and teal accents, retaining Geist typography.
- [x] Apply spacious layouts, technical grid details, precise geometry, and restrained luminous accents. Keep text and calls to action visually dominant.
- [x] Build the shared header and footer with navigation to Home, Services, About, and Contact.
- [x] Add mobile navigation and a theme control, retaining system-aware light and dark themes.
- [x] Make every **Start a project** link lead to Contact.

## Phase 2: Build the pages and sample content

Build the following routes:

| Route | Content |
| --- | --- |
| `/` | Hero, three service summaries, delivery process, company introduction, FAQs, project inquiry call to action |
| `/services` | Website, web application, and mobile development offerings, with example deliverables and inquiry links |
| `/about` | Clearly identified sample company introduction, working principles, and collaboration approach |
| `/contact` | Short inquiry form and an explicit explanation of its demo behavior |

- [x] Build the Home page with every section listed in the route table.
- [x] Build the Services page with the three offerings, example deliverables, and inquiry links.
- [x] Build the About page with clearly identified sample company information.
- [x] Build the Contact page layout with a clear explanation that inquiries are simulated.
- [x] Use one shared service list for page content and form choices: Websites, Web applications, Mobile applications.
- [x] Review sample capability and process copy to exclude invented clients, testimonials, team biographies, statistics, addresses, or credentials.
- [x] Add a branded 404 page.
- [x] Add page titles, descriptions, and `noindex` metadata. Defer production SEO and legal content until real company details are available.

## Phase 3: Add adaptive 3D media and fallbacks

Design update: use the supplied inspiration, design-system image, orbital emblem artwork, and optional emblem animation for the website UI. The hero uses rendered 3D media; service previews and process tiles use CSS depth. Real-time WebGL geometry is deferred, not implemented by the video.

- [x] Serve the supplied emblem artwork and an optimized, muted copy of its animation locally, preserving the original design files.
- [x] Build the hero around the supplied orbital emblem, reserving layout space and showing the original static artwork during loading or playback failure.
- [x] Create dimensional previews for the three services and use the same visual language for the process section.
- [x] Play the emblem animation in dark mode on desktop with an accessible pause/play control; use the transparent static artwork in light mode.
- [x] Keep phone artwork static by default and load the animation only when the visitor requests playback.
- [x] Pause the animation outside the viewport or while the tab is hidden.
- [x] Honor reduced motion with static artwork and no animation download.
- [x] Keep headings, service descriptions, and navigation outside decorative artwork.

## Phase 4: Build the simulated project inquiry

- [x] Add the required fields `name`, `email`, `service`, and `message`, using the shared service list for the service choices.
- [x] Validate whitespace-only text and email format without changing text during typing.
- [x] Reuse existing form components with visible labels, associated inline errors, and focus on the first invalid field.
- [x] After valid submission, announce **“Demo complete. Nothing was sent.”**
- [x] Preserve entered values until the visitor explicitly resets the form.
- [x] Prevent submission before hydration and prevent native form navigation.
- [x] Verify that inquiry values never enter URLs, logs, persistent storage, or network requests.
- [x] Keep the inquiry entirely within the prototype: no API endpoints, database schema, server actions, accounts, or external service credentials. Retain next-themes for theme preference.

## Phase 5: Verify and deliver the local prototype

- [x] Add a compact Playwright suite using `@playwright/test@1.65.0`.
- [x] Test route navigation, direct route loads, browser history, and mobile menu behavior.
- [x] Test theme switching and persistence.
- [x] Test invalid and valid inquiries, demo confirmation, explicit reset, and the absence of inquiry network requests.
- [x] Test reduced motion, static phone/light-theme artwork, media loading, and playback-failure fallback behavior.
- [x] Inspect every page at 375, 768, 1024, and 1440 pixels in both themes.
- [x] Check keyboard navigation, focus visibility, contrast, an emulated 200% reflow layout, and primary touch targets of at least 44 pixels.
- [x] Check Chromium, Firefox, and WebKit.
- [x] Run lint and type checking.
- [x] Run the production build and browser smoke tests against it.
- [x] Run `git diff --check`.
- [x] Inspect production loading and rendering performance, distinguishing emulated checks from physical-device results. Record any physical-device verification that remains outstanding.
- [x] Update the README with local review instructions and prototype limitations.
- [x] Deliver a concise validation report for local review without publishing or deploying.

## Defaults and boundaries

- Local review only.
- Developer-maintained content.
- Supplied brand artwork and animation, with original CSS device previews and process illustrations.
- No paid scene services or additional animation framework.
- Production SEO, legal content, and real inquiry delivery remain outside this prototype.

## Verification status and risk

The supplied-media UI prototype is implemented and locally verified. Completed phase and step checkboxes reflect the source changes and checks recorded in [the UI validation report](docs/ui-preview-validation.md). Physical-device animation performance remains unverified. Real-time WebGL scenes are deferred; the supplied animation is rendered video.

## Deferred real-time 3D scope

These steps from the initial plan are outside the supplied-media UI implementation. Keep them unchecked unless real-time 3D is requested and implemented.

- [ ] Add React Three Fiber 9.8.2, Three.js 0.187.0, and matching Three.js types; see the [React 19 compatibility guidance](https://r3f.docs.pmnd.rs/getting-started/installation).
- [ ] Create a procedural geometry hero with a faceted central form, orbital rings, and connecting nodes.
- [ ] Create grouped real-time services and process scenes.
- [ ] Dynamically load browser-only scenes through a client component; see the [Next.js lazy-loading guidance](https://nextjs.org/docs/app/guides/lazy-loading).
- [ ] Add pointer/scroll interactions, mobile geometry and pixel-density controls, demand rendering, and WebGL/context-loss fallbacks; see the [rendering guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).
