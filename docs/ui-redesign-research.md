# Technovata UI revision: design and implementation notes

Reviewed 7 November 2026. The supplied inspiration and design-system PNGs remain the visual authority: midnight navy, electric mint, soft violet, dimensional devices, and the Technovata orbital emblem.

## Guidance applied

Local UI Design Principles, UI/UX Pro Max, Top Design, Refactoring UI, shadcn, and Next.js guidance informed hierarchy, consistent surfaces, readable labels, accessible states, and responsive behavior. Generic palette suggestions were discarded in favor of the supplied brand. The existing Geist typography and Base UI composition remain in use.

## Public component research

- [21st.dev community catalog](https://21st.dev/community/components): explored navigation, dimensional cards, and testimonial composition.
- [Morphing scroll navbar](https://docs.21st.dev/@laziekiki/components/morphing-scroll-navbar): floating capsule, glass surface, compact controls. Technovata uses its own responsive, sticky Base UI navigation rather than copying the external component.
- [Testimonial card](https://docs.21st.dev/@thegridcn/components/testimonial-card): quotation, identity, and context hierarchy. Technovata uses existing Card/Badge components, initials, and explicit fictional sample labels. No fabricated ratings or verification badges.
- [shadcn Base UI Navigation Menu](https://ui.shadcn.com/docs/components/base/navigation-menu): retained the installed `render` composition and accessible trigger/menu behaviors.

These references inform original repository code. No new 21st.dev source component, Radix stack, GSAP, paid scene provider, or extra animation framework was copied or installed.

## Version and rendering decisions

The installed framework documentation in `node_modules/next/dist/docs/` was checked for server/client component boundaries, lazy loading, dynamic routes, and `generateStaticParams`. Four small static service routes share one presentation component and the service list. This keeps unknown service URLs on the normal HTTP 404 path without unsupported `dynamicParams` configuration under Cache Components. The WebGL renderer loads inside a client boundary.

[React Three Fiber installation guidance](https://r3f.docs.pmnd.rs/getting-started/installation) pairs Fiber 9 with React 19. The project uses Fiber 9.8.2, Three.js 0.187.0, and matching types. No Drei or post-processing dependency was added.

[Rendering performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) supports demand rendering and explicit invalidation. The scene uses an extruded T, a beveled glass plate, broad metallic ribbons, and nodes. It renders a finite entry and responds to pointer/scroll input; it does not run an idle animation loop. Phone layouts reduce pixel density and geometry. [Canvas guidance](https://r3f.docs.pmnd.rs/api/canvas) informed error handling; the supplied 3D emblem remains available when WebGL or the graphics context fails.

Separate light- and dark-background films are optimized to 960 × 540, audio-free MP4 files and softly blended into their matching page themes. Desktop playback pauses when out of view or the document is hidden. Phones require playback opt-in; reduced motion avoids the video download and the WebGL renderer.

## Content boundaries

SaaS is a fourth development capability, not a live software workspace or billing implementation. The About introduction is disclosed sample content. All three testimonial identities and quotations are visibly fictional samples, requiring authentic replacements before publication. The inquiry remains a local demo with no transmission or storage of entered values.

Transparent logo derivatives, favicons, and generation prompts are recorded in [brand-assets.md](brand-assets.md).
