# Frontend Codebase Analysis: otis-valen

## 🖼 Project Showcase
- **Type**: Static multi-page site (landing + about/work/project/contact).
- **Core user scenarios**:
  - Navigate sections with overlay menu.
  - Scroll through animated content; smooth transitions between sections.
- **How tech/architecture supports scenarios**:
  - Vanilla JS modules per page/feature keep logic isolated.
  - GSAP drives overlay and content animations; Lenis smoothes scrolling.

## 📁 Project Structure
- Root: `index.html`, `about.html`, `work.html`, `project.html`, `contact.html`.
- `js/` — feature modules (`menu.js`, `hero.js`, `work.js`, `project.js`, `about.js`, `transition.js`, `lenis-scroll.js`, `footer.js`, `services.js`, `contact.js`).
- `css/` — stylesheets.
- `public/` — assets.

What folders solve:
- `js/menu.js` — overlay nav with scroll lock/unlock and staggered reveals.
- `js/transition.js` — cross-page transitions.
- `js/lenis-scroll.js` — global smooth scroll setup.

Organization: layer-based; HTML templates + JS modules by feature.

## 🛠 Tech Stack

| Technology | Version | Role in the project |
|---|---:|---|
| Vite | 6.3.x | Dev server/preview/build for static site |
| Vanilla JS | ES Modules | DOM-level feature modules |
| GSAP | 3.13.x | Animations for overlay and content |
| Lenis | 1.3.x | Smooth scrolling |

Notable solutions:
- Menu overlay locks body scroll, restores on close; kills GSAP tweens to avoid conflicts mid-animation.

## 🏗 Architecture
- Pattern: feature modules initialized on `DOMContentLoaded`.
- State: local variables; `isMenuOpen`, `isAnimating`, `scrollY` for scroll locking.
- API: none.

Example: Menu overlay logic (simplified)
```js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle-btn');
  const overlay = document.querySelector('.nav-overlay');
  let isOpen = false, isAnimating = false, scrollY = 0;
  btn.addEventListener('click', () => {
    if (isAnimating) { gsap.killTweensOf([overlay]); isAnimating = false; }
    if (!isOpen) { /* set body fixed, animate in */ } else { /* restore scroll */ }
    isOpen = !isOpen;
  });
});
```
Task solved: predictable overlay behavior with scroll lock across pages.

## 🎨 UI and Styling
- Custom CSS; overlay and section animations.
- Responsive via CSS; ensure focus trapping in overlay for a11y.

## ✅ Code Quality
- Modular JS; no linter configured — recommend ESLint/Prettier.
- Tests: none; consider smoke tests for menu behavior.

## 🔧 Key Modules
- `menu.js` — overlay nav, scroll lock, staggered content.
- `transition.js` — inter-page transitions.
- `lenis-scroll.js` — smooth scroll init.

## 🌟 Best Practices
- Kill ongoing tweens on toggle; restore scroll position on overlay close.

## 🚀 Infrastructure
- Scripts: `dev`, `build`, `preview`, `host`.

## 📋 Conclusions and Recommendations
- Strengths: clear separation by feature; solid motion basics.
- Improvements: add linting/formatting; a11y for overlay; basic tests.
- Level: junior → middle.