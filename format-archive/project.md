# Анализ фронтенд кодовой базы: format-archive

## 📁 Структура проекта
- `src/app/` — Next.js App Router: `layout.js`, `page.jsx`, CSS, разделы `catalogue/`, `editorial/`, `archive/`, `info/`.
- `src/components/` — `Menu`, `Cart`, `StoreProvider` и др.
- `src/store/` — Zustand `useCartStore.js` (корзина).
- `public/` — статика.

Дерево директорий (до 3 уровней):
- `src/`
  - `app/`
    - `layout.js`, `page.jsx`, `globals.css`, `index.css`
    - `catalogue/`, `editorial/`, `archive/`, `info/`
  - `components/`
    - `Menu/`, `Cart/`, `StoreProvider/`
  - `store/`
    - `useCartStore.js`

Организация: layer-based + App Router; состояние корзины в `store/`.

## 🛠 Технологический стек
- **Фреймворк**: Next.js 15.3.1, React 19.0.0
- **Сборка**: `next build/start`, `next lint`
- **Язык**: JavaScript
- **CSS**: глобальные и модульные CSS
- **Состояние**: Zustand 5.0.3 (персистентная корзина)
- **Анимации/UX**: GSAP, Lenis, View Transitions

Зависимости:
- `zustand` (+ `persist`) — локальное состояние корзины
- `lenis` — плавный скролл, UX
- `next-view-transitions` — визуальные переходы страниц

## 🏗 Архитектура
- Компоненты страниц — в App Router; бизнес-логика корзины — в Zustand store.
- `ClientLayout` оборачивает приложение: Lenis + `StoreProvider` + `Menu`/`Cart`.

Пример Zustand store:
```js
// src/store/useCartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const useCartStore = create(persist((set, get) => ({
  cartItems: [], isCartOpen: false,
  addToCart: (p) => { /* merge/increment quantity */ },
  removeFromCart: (id) => set({ cartItems: get().cartItems.filter(i => i.id !== id) }),
  getCartTotal: () => get().cartItems.reduce((t, i) => t + i.price * i.quantity, 0),
}),{ name: 'format-archive-cart' }));
export default useCartStore;
```

Пример клиентского layout:
```jsx
// src/client-layout.js
<ReactLenis root options={{ smooth: true }}>
  <StoreProvider>
    <Menu />
    <Cart />
    {children}
  </StoreProvider>
</ReactLenis>
```

## 🎨 UI/UX и стилизация
- Кастомные компоненты, модульные стили, плавный скролл.
- Доступность: желательно усилить ARIA для Cart/Menu и фокус-ловушки при открытии корзины.

## ✅ Качество кода
- Линтинг: `next lint`.
- Типизация: JavaScript; рекомендуется TS для store и компонентов.
- Тесты: не обнаружены.

## 🔧 Ключевые компоненты
- `Menu` — глобальная навигация; `Cart` — корзина; `StoreProvider` — провайдер состояния.

## 📋 Выводы и рекомендации
- Сильные стороны: App Router, изолированное состояние магазина, UX-переходы.
- Улучшения: ввести TS и тесты, доработать a11y (диалоги/aria), логирование ошибок.
- Уровень: middle.