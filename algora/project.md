# Frontend Codebase Analysis: algora

## 🌐 Live Preview
- **Live Demo**: [https://my-projectalgora.vercel.app/](https://my-projectalgora.vercel.app/)
- **Deployment**: Vercel (Next.js optimized)

## 🖼 Project Showcase
- **Type**: Creative portfolio/landing with immersive scroll-driven storytelling.
- **Core user scenarios**:
  - Browse the homepage with animated hero, marquee, and geometric background.
  - Scroll through case-studies with pinned carousel transitions.
  - Navigate to archive for more works.
- **How tech/architecture supports scenarios**:
  - GSAP + ScrollTrigger drive timeline-based scroll animations and pinning.
  - ReactLenis provides smooth scroll for consistent animation timing.
  - Next.js App Router structures layouts and client-only sections cleanly.

## 📁 Project Structure
- `src/app/`
  - `layout.js` — Root layout and global providers.
  - `page.js` — Home page with all animated sections.
  - `archive/` — Additional listing pages.
  - `globals.css`, `home.css` — global and scene-specific styles.
- `src/components/`
  - `Navbar/`, `Footer/` — navigation and footer.
  - `Marquee/`, `ShuffleText/` — text effects.
  - `GeometricBackground/` — animated background connected to scroll.

Organization principle: layer-based (App Router for pages/layouts, components for reusable UI/effects). This makes complex animations isolated and pages composable.

What folders solve:
- `app/page.js` — orchestrates scroll scenes (hero, carousel, case-studies pinning) with ScrollTrigger.
- `components/GeometricBackground` — encapsulates background transformation logic, preventing leaks into page code.
- `components/Marquee`/`ShuffleText` — reusable motion text primitives for consistency.

## 🛠 Tech Stack

| Technology | Version | Role in the project |
|---|---:|---|
| Next.js | 15.1.5 | App Router, routing, SSR/CSR boundaries for performance |
| React | 18.2.0 | UI rendering with hooks and effects for animation orchestration |
| GSAP + ScrollTrigger | 3.x | Timeline and scroll-driven animations, scene pinning |
| @gsap/react | 2.x | Integrates GSAP lifecycle with React components |
| @studio-freight/react-lenis | 0.0.47 | Smooth scrolling for consistent animation timing |
| react-icons | 5.x | Icons for UI affordances |

Notable solutions:
- Scroll scenes are isolated via `useGSAP` scopes to avoid global side effects.
- ReactLenis root wraps the app to guarantee smooth scroll across pages.

## 🏗 Architecture
- Component patterns: composition of small presentational components; animation logic colocated and scoped using `useGSAP`.
- State: minimal local state only; scroll-based state implicit in GSAP timelines.
- API layer: none (content is static/asset-based).

Example: Carousel pinning and transitions with ScrollTrigger
```jsx
// src/app/page.js (excerpt)
useGSAP(() => {
  const projects = gsap.utils.toArray('.project');
  ScrollTrigger.create({
    trigger: '.carousel', start: 'top top',
    end: `+=${window.innerHeight * (projects.length - 1)}`,
    pin: true, pinSpacing: true, scrub: 1,
    onUpdate: (self) => {
      const p = self.progress * (projects.length - 1);
      const current = Math.floor(p);
      const slideProgress = p - current;
      // update clip-path to reveal next slide progressively
    }
  });
});
```
Task solved: scene pinning synchronizes content transitions to scroll progress without jank.

## 🎨 UI and Styling
- Styling: global CSS for base + scene-specific `home.css` for complex layouts.
- Responsive: flex/grid sections; ScrollTrigger viewport-aware triggers; images sized for mobile/desktop.
- Strengths: consistent animation primitives, lean markup.
- Risks: heavy animations need careful a11y/contrast checks; consider reduced-motion.

## ✅ Code Quality
- Linting: Next lint.
- Typing: JavaScript (consider TS for complex animation props).
- Tests: none; recommend smoke E2E to validate scenes and pinning.

## 🔧 Key Modules
1) `GeometricBackground`
- Role: background transforms bound to scroll via ScrollTrigger.
- Dependencies: GSAP, ScrollTrigger.
- Usage:
```jsx
<GeometricBackground className="geo-bg" />
```

2) `Marquee`
- Role: performant infinite text scrolling for headings.
- Dependencies: CSS transform, requestAnimationFrame.

3) `Navbar`
- Role: top navigation, scroll entry points.

## 🌟 Best Practices
- Use `useGSAP` scopes to register and clean ScrollTriggers.
- Wrap in `ReactLenis` root for coherent smooth scroll across sections.
- Defer heavy animations off-critical path; register on first view.

## 🚀 Infrastructure
- Scripts: `dev`, `build`, `start`, `lint` — run/validate app.
- Deploy: likely Vercel (Next-friendly); no Docker.
- Team impact: reproducible local dev and lint gating.

## 📋 Conclusions and Recommendations
- Strengths: clean separation of scenes, robust GSAP integration, smooth scroll.
- Improvements: add reduced-motion fallbacks; basic E2E tests; consider TypeScript for complex animated props.
- Level: middle → upper-middle (animation expertise required).