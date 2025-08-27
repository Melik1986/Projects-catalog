# Frontend Codebase Analysis: origin

## 🖼 Project Showcase
- **Type**: Creative portfolio/landing with animated transitions.
- **Core user scenarios**:
  - Navigate between Home and Work with seamless transitions.
  - Experience interactive hero, cursor effects, and embedded video sections.
- **How tech/architecture supports scenarios**:
  - Framer Motion + AnimatePresence enable route transitions without jank.
  - ReactLenis smoothes scroll and stabilizes animation timing.

## 📁 Project Structure
- `src/pages/` — `Home/`, `Work/` containers.
- `src/components/` — `Transition/`, `NavBar/`, `HeroGradient/`, `Cursor/`, `VideoPlayer/`, `BackButton/`.
- `public/` — assets.

What folders solve:
- `components/Transition` — encapsulates page transition animations.
- `components/HeroGradient` — decorative gradient effects for hero blocks.
- `components/Cursor` — custom cursor behavior for brand feel.

Organization: layer-based; pages as route containers, components as reusable visual/effect modules.

## 🛠 Tech Stack

| Technology | Version | Role in the project |
|---|---:|---|
| React | 18.3.1 | UI rendering |
| Vite | 6.0.1 | Dev/build tooling |
| Framer Motion | 11.x | Component/route animations |
| React Router | 7.1.x | Client-side routing |
| @studio-freight/react-lenis | 0.0.47 | Smooth scrolling |
| GSAP | 3.12.x | Additional motion where needed |

Notable solutions:
- Route-level `AnimatePresence` with location key to animate between pages.

## 🏗 Architecture
- Pattern: composition with effect components; transitions abstracted away from page logic.
- State: local UI state only; no global store.
- API: none.

Example: Route transitions
```jsx
<ReactLenis root>
  <AnimatePresence mode="wait" initial={false}>
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route path="/work" element={<Work />} />
    </Routes>
  </AnimatePresence>
</ReactLenis>
```
Task solved: keep navigation expressive without reimplementing transition glue on each page.

## 🎨 UI and Styling
- Custom CSS; motion-first components.
- Responsive via flexible layouts; verify prefers-reduced-motion fallback.

## ✅ Code Quality
- ESLint present.
- Tests: none; add smoke tests for transitions.

## 🔧 Key Modules
- `Transition` — shared route transition animations.
- `NavBar` — navigation and page affordances.
- `VideoPlayer` — controlled video embedding.

## 🌟 Best Practices
- Centralize transitions in a component.
- Guard animations with route location keys.

## 🚀 Infrastructure
- Scripts: `dev`, `build`, `preview`, `lint`.

## 📋 Conclusions and Recommendations
- Strengths: clean separation of visual effects; simple routing.
- Improvements: reduced-motion fallback; minimal E2E tests.
- Level: middle.