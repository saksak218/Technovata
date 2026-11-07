# Technovata UI preview validation

Review date: 7 November 2026. This report covers the local website prototype, not a public deployment.

## Implemented

- Home, Services, About, Contact, and a branded 404 page.
- The supplied inspiration and design-system direction: midnight navy, electric mint, restrained violet highlights, dimensional service previews, and the orbital emblem.
- Light and dark themes, responsive navigation, FAQs, and shared project inquiry links.
- Supplied emblem artwork and a locally served, muted 960 × 540 MP4, reduced to 710,207 bytes. Original design files remain unchanged; public PNG copies match their sources byte for byte.
- Static hero artwork in light mode, under reduced motion, and initially on phone-sized layouts. Dark desktop animation has pause/resume controls and pauses offscreen or in a hidden tab.
- A demo inquiry with required name, email, service, and message fields. It validates locally, preserves typed content, announces that nothing was sent, and resets only on request. The form is disabled without JavaScript.
- Sample company content and `noindex` metadata. No real inquiry delivery, data storage, accounts, CMS, or external business integrations.

## Checks and results

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript | Passed |
| Production build | Passed; all four pages and the 404 prerender statically |
| Chromium behavior tests | 10 passed |
| Firefox behavior tests | 10 passed |
| WebKit behavior tests | 10 passed |
| Final targeted layout and inquiry checks after visual refinements | Six passed across the three engines |
| Responsive page/theme combinations | All four pages checked at 375, 768, 1024, and 1440 CSS pixels in both themes; no horizontal page overflow |
| Visual review | 32 full-page captures, with manual review of representative phone, tablet, and desktop layouts |
| 200% reflow simulation | All four pages fit in both themes at 720 CSS pixels and 2× density, representing a 1440-pixel display at 200% |
| Keyboard behavior | Mobile menu Escape, focus return, route changes, FAQ activation, and first-invalid-field focus passed |
| Demo data handling | No inquiry network requests or values in URL, local storage, or session storage; ordinary spaces, punctuation, and newlines preserved |
| Media behavior | Reduced motion, static phone/light-mode views, and failed-playback fallback passed; desktop play, pause/resume, and offscreen pause also exercised |
| Accessibility scan | Home and Contact reported zero WCAG A/AA violations after fixes; complex-background contrast checks on Home still require manual interpretation |
| Form border contrast | 3.16:1 against the light card surface and 4.15:1 against the dark card surface |
| Local layout stability | CLS 0 in the unthrottled, warm-cache desktop capture runs; this is a local diagnostic, not field performance evidence |
| Next.js development diagnostics | No compilation issues, configuration errors, or browser-session errors at final review |
| Whitespace check | `git diff --check` passed |

The behavior suite covers navigation and browser history, theme persistence, valid and invalid inquiries, no-JavaScript submission prevention, reduced motion, media failure, FAQs, and missing pages. Playwright runs against a separate local production build on port 3100, leaving the development server on port 3000 intact.

The host initially lacked WebKit's AVIF libraries. Copies of `libavif16`, `libgav1-1`, and `libyuv0` were extracted into the downloaded WebKit browser cache for verification. No system packages were installed. Other Linux machines may need Playwright's documented browser dependencies.

## Limits and deferred work

- The hero uses rendered 3D artwork and video. Service previews and process illustrations use CSS depth. React Three Fiber, procedural geometry, and WebGL interactions are explicitly deferred in `PLAN.md`.
- Browser widths, reflow, and engine checks are emulated. Physical Android/iOS devices, actual browser zoom controls, constrained mobile networks, and device battery/thermal behavior were not tested.
- Company facts, domain, inbox, hosting, production legal copy, live inquiry delivery, and public SEO remain future launch work.
- Dependency installation reported 13 audit findings: two low and 11 moderate. No forced dependency upgrades were applied as part of the UI work.
- No commit, push, or deployment was performed.
