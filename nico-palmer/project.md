# Frontend Codebase Analysis: nico-palmer

## 🖼 Project Showcase
- **Type**: Portfolio/creative studio site with heavy motion design.
- **Core user scenarios**:
  - Navigate sections (Home, Work, Project, About, FAQ, Contact) with cinematic transitions.
  - Consume animated headings, copy, parallax imagery, and reviews.
- **How tech/architecture supports scenarios**:
  - Framer Motion orchestrates route/page transitions.
  - GSAP + SplitType power typographic and element animations.
  - Delayed scroll reset aligns with transition duration for polish.

## 📁 Project Structure
- `src/pages/` — `Home/`, `Work/`, `Project/`, `About/`, `FAQ/`, `Contact/`.
- `src/components/` — `Menu/`, `Transition/`, `ParallaxImage/`, `FAQContainer/`, `AnimatedH1/`, `AnimatedCopy/`, `Reviews/`, `Footer/`.

What folders solve:
- `components/Transition` — page transition layer.
- `components/AnimatedH1`/`AnimatedCopy` — reusable typography animation units.
- `components/ParallaxImage` — scroll-bound media effects.

Organization: layer-based; complex visual behaviors split into focused components.

## 🛠 Tech Stack

| Technology | Version | Role in the project |
|---|---:|---|
| React | 19.0.0 | UI rendering (concurrent-ready) |
| Vite | 6.2.x | Build/dev |
| React Router | 7.4.x | Client routing |
| Framer Motion | 11.11.x | Transitions/animations |
| GSAP | 3.12.x | Motion timelines |
| SplitType | 0.3.x | Text splitting for letter/word animations |
| Lenis | 1.2.x | Smooth scroll |
| lucide-react | 0.483.x | Icons |

Notable solutions:
- `ScrollToTop` defers scroll reset to match transition timing (1.4s).

## 🏗 Architecture
- Pattern: composition; animation components encapsulate motion; routes stay declarative.
- State: local UI state only.
- API: none.

Example: Transition + timed scroll reset
```jsx
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { setTimeout(() => window.scrollTo(0, 0), 1400); }, [pathname]);
  return null;
}
<AnimatePresence mode="wait" initial={false}>
  <Routes location={location} key={location.pathname}>...</Routes>
</AnimatePresence>
```
Task solved: seamless navigation with synchronized scroll behavior.

## 🎨 UI and Styling
- Custom CSS; typographic motion with SplitType.
- Responsive via CSS; verify prefers-reduced-motion.

## ✅ Code Quality
- ESLint present; modern toolchain.
- Tests: none; add snapshot tests for animated typography wrappers.

## 🔧 Key Modules
- `Transition` — route-level animation orchestrator.
- `AnimatedH1`/`AnimatedCopy` — text splitting and GSAP timelines.
- `ParallaxImage` — scroll visuals.

## 🌟 Best Practices
- Time scroll management to transitions; isolate GSAP effects within components.

## 🚀 Infrastructure
- Scripts: `dev`, `build`, `preview`, `lint`.

## 📋 Conclusions and Recommendations
- Strengths: high-fidelity motion; modular animation units.
- Improvements: reduced-motion, testing; consider TS for animation configs.
- Level: middle → upper-middle.