# Technovata UI preview validation

Review date: 7 November 2026. This report covers the local prototype and its November design revision, not a public deployment.

## Implemented

- Nine public pages: Home, Services, four dedicated service pages, Process, About, and Contact, plus the branded 404. All pages prerender statically. Unknown service URLs return an HTTP 404.
- Floating glass navigation with an accessible Services dropdown, active page states, mobile sheet, theme switch, and expanded footer.
- Concrete service descriptions and deliverables for websites, custom web applications, mobile applications, and SaaS development. A shared service list supplies cards, navigation, and inquiry choices.
- Revised light/dark surfaces, dimensional service previews, pointer-responsive cards, a fuller landing page, collaboration guidance, six FAQs, and three explicitly fictional testimonial samples.
- Theme-matched hero films: original dark video and the new white-background video, optimized to audio-free 960×540 H.264 MP4s. The light copy is 708,557 bytes; the dark copy is 710,207 bytes. Original design files are unchanged.
- Real WebGL geometry: an extruded T, beveled glass plate, broad metallic orbital ribbons, circuit traces, and nodes. The renderer loads on view, uses demand rendering and finite entry motion, and simplifies geometry/pixel density on phones.
- Supplied 3D emblem artwork as the loading, reduced-motion, and graphics-failure fallback. Reduced motion avoids video and canvas loading; phones start with static hero artwork and offer playback opt-in.
- Transparent logo variants derived from the supplied Technovata logo, plus ICO, PNG favicons, and an Apple touch icon. Assets and exact generation prompts are in [brand-assets.md](brand-assets.md).
- Demo inquiry validation, first-error focus, ordinary typing preservation, explicit reset, and **“Demo complete. Nothing was sent.”** No transmission or storage of inquiry values; no-JavaScript fields stay disabled.

## Verification

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript | Passed |
| Production build | Passed; nine public pages and branded 404 prerender statically |
| Final cross-browser behavior suite | 43 passed, two intentional GPU-case skips: 14 shared scenarios in each of Chromium, Firefox, and WebKit, plus the Chromium software WebGL lifecycle regression |
| Full responsive review | 108 combinations: nine pages in both themes at 320, 375, 768, 1024, and 1440px, plus a 720px reflow layout; no horizontal page overflow or browser runtime errors |
| Visual captures | 36 full-page captures at 375 and 1440px; representative landing, service, About, Process, Contact, menu, and 3D views manually inspected |
| Accessibility | Home and Contact in both themes: zero automated WCAG A/AA violations. Home gradient backgrounds still require manual contrast interpretation; checked against brand surfaces |
| Navigation | Desktop Services keyboard opening, Escape/focus restoration, mobile sheet, route changes, history, theme persistence, and 44px header controls verified |
| Inquiry safety | Local validation, ordinary spaces/punctuation/newlines, no inquiry requests or values in URLs/storage, demo confirmation/reset, no-JavaScript prevention verified |
| Media | Correct film in each theme, phone opt-in, pause/resume, offscreen pause/resume, reduced-motion no-download, and failed-playback artwork verified |
| Real 3D | Actual Chromium software WebGL canvas and visible sculptural geometry verified in both themes; pointer response, finite rendering, and card perspective exercised |
| Graphics lifecycle | Live reduced-motion changes remove the canvas and reset tilt; re-enabling restores 3D. Forced context loss returns to artwork in both themes with no page errors |
| Next.js development diagnostics | No compilation issues, configuration errors, or browser-session errors at final review |
| Whitespace | `git diff --check` passed |

The shared Playwright scenarios cover Chromium, Firefox, and WebKit. A focused additional regression uses Chromium's software WebGL renderer; that GPU-specific case is intentionally skipped under the Firefox/WebKit projects. Reduced-motion and unavailable-WebGL fallback behavior remains tested across all three engines.

The layout matrix lets static-page prefetches settle before the next full document navigation. Immediate repeated document replacements caused WebKit to report canceled RSC prefetches as access-control errors; the settled navigation matrix passes without suppressing browser errors. Dropdown tests target the portalled popup rather than assuming it is a DOM descendant of the navigation root.

Playwright starts/stops an isolated production server on port 3100, with build output in `.next-production`. The existing development server on port 3000 was preserved. Use `http://localhost:3000` for development; this server's development-origin policy blocks HMR at the alternate `127.0.0.1` origin.

This Linux host's downloaded WebKit browser cache contains the AVIF-related libraries prepared during the earlier preview verification; no new system package installation was needed. Other machines may need Playwright's browser dependencies.

## Limits

- Browser engines, widths, reflow, and software WebGL are local emulation. Physical iOS/Android devices, battery/thermal behavior, real GPU performance, actual browser zoom controls, constrained networks, and production field metrics were not tested.
- This is a local, `noindex` prototype. Domain, inbox, hosting, verified company details, legal content, real inquiries, and production SEO remain launch work.
- Testimonial people and quotes are fictional samples. Replace them with approved genuine feedback before publication.
- The new service copy describes proposed capabilities, not evidence of completed client projects. SaaS is a service offering; the website itself has no SaaS workspace, auth, subscriptions, or billing.
- Installation reported 13 dependency audit findings: two low and 11 moderate. No forced dependency upgrades were applied.
- No commit, push, or deployment was performed.
