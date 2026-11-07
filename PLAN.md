# Technovata website prototype

## Summary

Build a locally reviewable company website for Technovata, presenting websites, custom web applications, mobile applications, and SaaS development. Follow the supplied design references with midnight navy, electric mint, restrained violet, dimensional artwork, and considered light and dark themes.

The November 2026 design revision adds a floating navigation system, dedicated service and process pages, clearly fictional testimonial samples, hero video in both themes, and interactive WebGL geometry. This is a visual prototype; inquiries are simulated.

## Progress tracking

Change `- [ ]` to `- [x]` only after completing the task and its verification. A phase is complete when all its steps are complete. Physical-device checks and production launch work remain separate.

- [x] Phase 1: Preserve the foundation and establish the visual direction.
- [x] Phase 2: Complete the pages, navigation, and marketing content.
- [x] Phase 3: Add adaptive media and interactive 3D.
- [x] Phase 4: Preserve the private, simulated inquiry experience.
- [x] Phase 5: Verify the revised website and deliver it for local review.

## Phase 1: Foundation and visual direction

- [x] Preserve Next.js 16.4.5, React 19.3.0, Tailwind CSS 4, TypeScript, npm, and the existing configuration.
- [x] Read installed Next.js documentation for server/client boundaries, lazy loading, and dynamic route generation.
- [x] Apply UI Design Principles, UI/UX Pro Max, relevant design skills, and public 21st.dev pattern research without replacing the Technovata palette or introducing a second component stack.
- [x] Reuse shadcn/Base UI, Lucide, Motion, next-themes, and Geist.
- [x] Refine both themes with consistent surfaces, legible type, restrained gradients, depth, and responsive spacing.
- [x] Preserve the original files in `design/`; reuse the supplied emblem and locally optimized animations.
- [x] Prepare transparent light/dark logo marks from the supplied Technovata logo and add favicon/touch-icon files.
- [x] Write concrete service descriptions and deliverables for websites, custom web apps, mobile apps, and SaaS development.

## Phase 2: Pages, navigation, and content

| Route | Content |
| --- | --- |
| `/` | Hero, technology foundation, four capabilities, interactive 3D feature section, process, collaboration, fictional sample testimonials, FAQs, project CTA |
| `/services` | All four offerings, deliverables, service navigation, detail links |
| `/services/websites` | Website development offering and approach |
| `/services/web-apps` | Web application offering and approach |
| `/services/mobile-apps` | Mobile application offering and approach |
| `/services/saas` | SaaS development, onboarding, workspaces, subscription-ready scope |
| `/process` | Discover, Plan, Build, Launch, shared outputs, collaboration |
| `/about` | Disclosed sample company introduction, principles, interactive artwork |
| `/contact` | Demo project inquiry with explicit simulated behavior |
| Other routes | Branded 404, including unknown service names |

- [x] Build the revised landing page with every section in the route table.
- [x] Build the Services overview and four dedicated service pages.
- [x] Build dedicated About and Process pages.
- [x] Build a floating header with a Services dropdown, active page states, theme control, project CTA, and mobile navigation.
- [x] Expand the footer with page links, service links, and a project conversation CTA.
- [x] Use a shared service list for navigation, cards, detail pages, and inquiry choices, including SaaS development.
- [x] Add three visibly fictional testimonial samples with a section disclosure and individual sample labels; invent no client endorsements, ratings, or verified claims.
- [x] Keep the sample-company disclosure; invent no team biographies, company location, credentials, client logos, statistics, or completed projects.
- [x] Preserve page titles, descriptions, `noindex` metadata, and inquiry destinations.

## Phase 3: Adaptive media and interactive 3D

- [x] Install React Three Fiber 9.8.2, Three.js 0.187.0, and matching types, preserving React 19 compatibility.
- [x] Play the supplied, muted hero video on desktop in both themes, using theme-matched films that blend into the page and an accessible pause/play control.
- [x] Keep phone hero artwork static until playback is explicitly requested.
- [x] Preserve static artwork during loading, blocked playback, and media failure.
- [x] Pause video offscreen and in hidden tabs; avoid video download under reduced motion.
- [x] Add a procedural real-time scene with an extruded T, glass plate, metallic orbital ribbons, and nodes to the landing page and About page.
- [x] Dynamically load the browser renderer when the scene enters view; keep content outside the canvas.
- [x] Add pointer/scroll depth, reduced mobile geometry/pixel density, finite animation, and demand rendering.
- [x] Fall back to the supplied 3D emblem artwork for reduced motion, WebGL failure, or lost graphics context.
- [x] Add pointer perspective to service, process, feature, and testimonial cards; disable it for coarse pointers and reduced motion.
- [x] Complete dimensional CSS service illustrations, including SaaS, and the dedicated process illustration.

## Phase 4: Simulated inquiry

- [x] Require `name`, `email`, `service`, and `message`, including the shared SaaS option.
- [x] Validate whitespace-only fields and email without changing ordinary typing.
- [x] Preserve visible labels, inline errors, first-invalid-field focus, and explicit reset behavior.
- [x] Announce **“Demo complete. Nothing was sent.”** after a valid preview.
- [x] Prevent pre-hydration/native submission and keep the form disabled without JavaScript.
- [x] Keep inquiry values out of URLs, network requests, logs, and persistent storage.
- [x] Add no backend, API, accounts, database, CMS, billing integration, or email delivery.

## Phase 5: Verification and local delivery

- [x] Run lint, TypeScript checking, production build, and whitespace checks after final refinements.
- [x] Run the expanded Playwright suite in Chromium, Firefox, and WebKit against the isolated production build.
- [x] Verify page navigation, Services keyboard controls, mobile menu focus, browser history, and theme persistence.
- [x] Verify all service routes, SaaS inquiry selection, disclosed sample testimonials, FAQs, and 404 handling.
- [x] Verify desktop video in both themes, phone playback opt-in, reduced motion, failure fallback, and actual WebGL rendering.
- [x] Inspect responsive layouts at phone, tablet, and desktop widths in both themes, including narrow 320px layouts and reflow.
- [x] Scan representative pages for accessibility issues and inspect focus, contrast, and touch targets.
- [x] Check Next.js development diagnostics and production browser errors.
- [x] Update README, research notes, and the validation report with actual results and limitations.
- [x] Deliver the local prototype without publishing or deploying.

## Boundaries and remaining launch work

- Local review only; developer-maintained demo content.
- Testimonials and company introduction are sample content requiring real replacements before publication.
- SaaS is a service offering; this website has no live SaaS workspace, authentication, subscriptions, or billing.
- Physical phones, GPU/battery behavior, constrained networks, and production field performance require separate validation.
- Domain, inbox, hosting, verified company facts, legal content, real inquiries, and public SEO remain launch work.

See [the validation report](docs/ui-preview-validation.md) and [design research](docs/ui-redesign-research.md) for evidence and practical limits.
