# Frontend Codebase Analysis: format-archive

## 🖼 Project Showcase
- **Type**: Storefront/catalog with cart (content-first, editorial sections).
- **Core user scenarios**:
  - Browse catalogue/editorial pages with smooth scroll and transitions.
  - Add/remove items to cart, view totals, toggle cart panel.
- **How tech/architecture supports scenarios**:
  - Zustand store with `persist` keeps cart across sessions.
  - `ClientLayout` wires Lenis (smooth scroll), `Menu`, and `Cart` once at the root.
  - Next App Router splits server/client pieces for performance.

## 📁 Project Structure
- `src/app/` — App Router: `layout.js`, `page.jsx`, `catalogue/`, `editorial/`, `archive/`, `info/`, CSS.
- `src/components/` — `Menu`, `Cart`, `StoreProvider` (wires store for client sections).
- `src/store/` — `useCartStore.js` (Zustand with persist and helpers).
- `public/` — assets.

What folders solve:
- `store/useCartStore.js` — business logic for cart operations (add/remove, counters, totals).
- `components/Cart` — UI shell reacting to store selectors; keeps UI thin.
- `app/*` — content pages with transitions and minimal business logic.

Organization: layer-based; state isolated in `store/`, UI split by responsibility.

## 🛠 Tech Stack

| Technology | Version | Role in the project |
|---|---:|---|
| Next.js | 15.3.1 | App Router, server/client boundaries, performance |
| React | 19.0.0 | UI with concurrent features compatibility |
| Zustand | 5.0.3 | Lightweight state for cart, with `persist` middleware |
| Lenis | 1.3.x | Smooth scroll for consistent transitions |
| next-view-transitions | 0.3.x | Page transitions for perceived performance |
| GSAP | 3.12.x | Scene/element animations (where used) |

Notable solutions:
- Cart logic encapsulated in a single persisted store with derived helpers (`getCartCount`, `getCartTotal`).
- `skipHydration` used for SSR compatibility to avoid hydration mismatches.

## 🏗 Architecture
- Component patterns: presentational components consuming store selectors; business logic in store.
- State: global cart state in Zustand, UI toggles (`isCartOpen`) colocated.
- API: none; product data likely static/CSR.

Example: Cart store (simplified)
```js
export default create(persist((set, get) => ({
  cartItems: [], isCartOpen: false,
  addToCart: (p) => {
    const existing = get().cartItems.find(i => i.id === p.id);
    set({ cartItems: existing
      ? get().cartItems.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...get().cartItems, { ...p, quantity: 1 }] });
  },
  getCartTotal: () => get().cartItems.reduce((t, i) => t + i.price * i.quantity, 0),
}), { name: 'format-archive-cart', skipHydration: true }));
```
Task solved: shopping cart state that survives reloads with minimal boilerplate.

## 🎨 UI and Styling
- Styling: global + module CSS; transitions enhance perceived speed.
- Responsive: grid layouts, cart panel responsive width.
- Strengths: clear separation of state/UI; transitions improve UX.
- Risks: ensure focus trapping and aria for cart drawer.

## ✅ Code Quality
- Linting: Next lint.
- Typing: JavaScript (consider TS types for product/cart items).
- Tests: none; recommend store unit tests for cart operations.

## 🔧 Key Modules
1) `useCartStore`
- Role: single source of truth for cart.
- Dependencies: Zustand, persist.
- Usage:
```jsx
const count = useCartStore(s => s.getCartCount());
```

2) `ClientLayout`
- Role: root wrapper for Lenis + providers and global UI (`Menu`, `Cart`).
- Dependencies: Lenis, React.

## 🌟 Best Practices
- Derived selectors inside store: `getCartTotal`, `getCartCount`.
- Root composition in `ClientLayout` keeps pages simple and focused on content.

## 🚀 Infrastructure
- Scripts: `dev`, `build`, `start`, `lint`.
- Deploy: Next-friendly (Vercel ready).

## 📋 Conclusions and Recommendations
- Strengths: focused store, clean App Router layout, smooth UX.
- Improvements: add a11y to cart drawer; add TS and unit tests.
- Level: middle.