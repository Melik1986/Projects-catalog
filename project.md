# Анализ фронтенд кодовой базы: Монорепозиторий проектов

## 📁 Структура проекта

- **Корень репозитория**: содержит несколько самостоятельных фронтенд-проектов. Каждый проект — независимое приложение со своим `package.json`, сборкой и исходным кодом.

Дерево директорий (до 3 уровней):

- `algora/`
  - `src/`
    - `app/` — Next.js App Router (страницы, макеты, глобальные стили)
    - `components/` — UI-компоненты (Navbar, Footer, и др.)
  - `public/` — статические ресурсы
- `format-archive/`
  - `src/`
    - `app/` — Next.js App Router: `layout.js`, `page.jsx`, модули страниц и CSS
    - `components/` — `Menu`, `Cart`, `StoreProvider`; UI и обвязка
    - `store/` — Zustand `useCartStore.js`
    - `utils.js` — утилиты
  - `public/` — изображения и иконки
- `social_media_app-main/`
  - `src/`
    - `_root/` — корневой лэйаут, страницы
    - `_auth/` — авторизация, формы входа/регистрации
    - `components/` — UI (forms/shared/ui)
    - `hooks/`, `lib/`, `types/`, `context/` — инфраструктура
  - `public/`
- `origin/`
  - `src/`
    - `components/` — Transition, UI, эффекты
    - `pages/` — страницы `Home`, `Work`
- `balanced-pitch/`
  - `src/`
    - `components/` — Menu, Footer и др.
    - `pages/` — `home`, `about`, `updates`, `solutions`, `contact`
- `aiden-brooks/`
  - `src/`
    - `components/` — navbar, footer, preview, transition
    - `pages/` — `home`, `projects`, `archive`, `information`, `sampleproject`
- `nico-palmer/`
  - `src/`
    - `components/` — Menu, Transition, ParallaxImage, и др.
    - `pages/` — `Home`, `Work`, `Project`, `About`, `FAQ`, `Contact`
- `otis-valen/`
  - `js/` — ванильный JS-модули (menu, hero, work, и т.п.)
  - `css/` — стили
  - `*.html` — статические страницы

Принципы организации:
- Проекты разделены по репозиториям директорий (multi-project). Внутри приложений React — преимущественно layer-based с папками `components`, `pages`, иногда feature-based (`_auth`, `_root`, `store`). В Next.js — App Router структура (`app/`).

## 🛠 Технологический стек

- **Фреймворки**:
  - React (Vite) — `aiden-brooks`, `balanced-pitch`, `origin`, `nico-palmer`, `social_media_app-main`
  - Next.js — `algora` (Next 15.1.5), `format-archive` (Next 15.3.1)
  - Статический сайт + Vite tooling — `otis-valen`
- **Сборка**:
  - Vite (v4–v6) во всех SPA проектах
  - Next.js build в Next-проектах
- **Языки**:
  - JavaScript (большинство), TypeScript в `social_media_app-main`
- **CSS**:
  - Глобальные CSS, CSS Modules в Next проектах
  - Tailwind в `social_media_app-main` (postcss, tailwind, plugins)
- **State Management**:
  - React Query (`@tanstack/react-query`) в `social_media_app-main`
  - Zustand в `format-archive`
  - Локальный state/hooks в остальных
- **Ключевые зависимости**:
  - Анимации: GSAP, Framer Motion, Lenis/ReactLenis
  - Роутинг: `react-router-dom` (SPA), App Router (Next)
  - Формы/валидация: `react-hook-form`, `zod` (social app)
  - UI: `lucide-react`, Radix UI, собственные компоненты

Версии (основные):
- React 18.x/19.x; Vite 4.x–6.x; Next 15.x
- Tailwind 3.3.x; TypeScript ^5

## 🏗 Архитектура

Подходы к компонентной архитектуре:
- Atomic-ish разбиение: контейнерные страницы в `pages/` и презентационные компоненты в `components/`.
- В Next — `app/` c разделением на секции, модульные стили и общие layout.

Разделение логики:
- Hooks и композиция (пример — эффекты скролла, управление заголовками страниц)
- В `social_media_app-main` используются хуки, контекст, и React Query для серверного состояния; формы на `react-hook-form` + `zod`.

Роутинг:
- Vite SPA проекты: `react-router-dom` + `AnimatePresence` для анимированных переходов.
- Next: App Router (`app/layout.js`, `app/page.js[x]`).

Работа с данными и API:
- `social_media_app-main`: React Query, `lib/` для запросов, `appwrite` SDK.
- `format-archive`: Zustand стор `useCartStore.js` (корзина) + клиентский layout для Lenis/Menu/Cart.
- Остальные проекты в основном статические/контентные без сложного API слоя.

Обработка ошибок и загрузки:
- React Query предоставляет `isLoading`, `isError`; в проектах SPA — ручные состояния/скелетоны при необходимости.

Пример кода — маршрутизация и анимации (SPA):
```jsx
// nico-palmer/src/App.jsx
<AnimatePresence mode="wait" initial={false}>
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<Home />} />
    <Route path="/work" element={<Work />} />
  </Routes>
</AnimatePresence>
```

Пример — клиентский layout и Zustand/Lenis (Next):
```jsx
// format-archive/src/client-layout.js
export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth <= 900); }, []);
  return (
    <ReactLenis root options={{ smooth: true }}>
      <StoreProvider>
        <Menu />
        <Cart />
        {children}
      </StoreProvider>
    </ReactLenis>
  );
}
```

## 🎨 UI/UX и стилизация

- Подходы: глобальные CSS файлы, модульные CSS (Next), Tailwind в social app.
- UI-kit: Radix UI и shadcn-подобные утилиты в `social_media_app-main`; в остальных — кастомный UI + иконки (`lucide-react`).
- Адаптивность: медиазапросы в CSS, проверка ширины экрана (см. `ClientLayout`), мобильные меню.
- Темизация: явной системы темизации нет, но структуры позволяют внедрить.
- Доступность: базовые практики (семантика, фокус-стили), у Radix UI — встроенные a11y; стоит усилить ARIA/контрасты в кастомных компонентах.

## ✅ Качество кода

- Линтинг: Vite/ESLint конфиги во многих проектах; в `social_media_app-main` — ESLint + Prettier + TS-ESLint + tailwindcss plugin; Next — `next lint`.
- Именование: согласованное — `camelCase` для файлов TS/JS, PascalCase для компонентов; директории — `kebab-case`/нижний регистр.
- Типы: TypeScript используется только в `social_media_app-main` (качественно: tsconfig, типы, strict tooling). Остальные — JS.
- Тесты: не обнаружены Jest/RTL/Cypress конфиги — вероятно, тестов нет.
- Документация: README присутствуют; JSDoc/комментарии ограничены.

## 🔧 Ключевые компоненты

1) `social_media_app-main`: Root маршрутизация
```tsx
// src/App.tsx
<Route element={<RootLayout />}>
  <Route index element={<Home />} />
  <Route path="/explore" element={<Explore />} />
  <Route path="/create-post" element={<CreatePost />} />
</Route>
```
- Пропсы/API: роуты по страницам; Toaster для уведомлений; AuthLayout для public routes.
- Интеграции: React Router, React Query, Appwrite, Tailwind UI.

2) `format-archive`: Zustand store
```js
// src/store/useCartStore.js
import { create } from 'zustand';
export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
}));
```
- Роль: управление корзиной; используется в `ClientLayout` и `Cart`.
- Интеграции: Menu/Cart компоненты, Lenis скролл.

3) `algora`: Домашняя страница с GSAP + ScrollTrigger
```jsx
// src/app/page.js (фрагмент)
useGSAP(() => {
  ScrollTrigger.create({
    trigger: '.carousel', pin: true, scrub: 1,
    end: `+=$${window.innerHeight * (projects.length - 1)}`,
  });
});
```
- Роль: сложные скролл-анимации, карусель и пиннинг
- Интеграции: GSAP, ReactLenis, кастомные компоненты (Marquee, ShuffleText)

4) `balanced-pitch`: Меню и SEO заголовки
```jsx
// src/App.jsx
useEffect(() => {
  document.title = pageTitles[location.pathname] || 'Balanced Pitch';
  setTimeout(() => window.scrollTo(0,0), 750);
}, [location.pathname]);
```
- Роль: управление заголовком и скроллом при смене маршрута
- Интеграции: React Router, Framer Motion

5) `otis-valen`: Меню на ванильном JS с GSAP
```js
// js/menu.js
menuToggleBtn.addEventListener('click', () => {
  if (!isMenuOpen) {
    gsap.to(navOverlay, { opacity: 1, duration: 0.3 });
  } else {
    gsap.to(navOverlay, { opacity: 0, duration: 0.3 });
  }
  isMenuOpen = !isMenuOpen;
});
```
- Роль: анимация оверлея меню, блокировка скролла
- Интеграции: чистый HTML/CSS + GSAP

## 📋 Выводы и рекомендации

Сильные стороны:
- Современная сборка (Vite/Next), продуманные анимации (GSAP, Framer Motion), плавный скролл (Lenis)
- Чистая структура с разделением на `components`/`pages`; в `social_media_app-main` — зрелая архитектура (hooks, React Query, валидация форм)
- Next.js проекты используют App Router и изоляцию клиентского кода

Зоны улучшения:
- Добавить тестирование (Jest + RTL, E2E Playwright/Cypress)
- Стандартизировать TypeScript и включить строгий режим хотя бы в SPA, где уместно
- Ввести общую дизайн-систему/токены, доступность (ARIA, фокус-менеджмент)
- Унифицировать обработку ошибок/загрузок, добавить централизованный логгер
- Рассмотреть lint-staged + pre-commit hooks (husky) и CI для линтинга/билда

Уровень сложности:
- В целом — middle-friendly; `algora` и `format-archive` с GSAP/ScrollTrigger — ближе к upper-middle за счёт сложных анимаций и скролл-логики; `social_media_app-main` — middle, благодаря TS/React Query/формам.

Инфраструктура разработки:
- Скрипты: `dev`, `build`, `preview`, `lint`/`next lint`; Tailwind/PostCSS — там где нужно
- CI/CD: явной конфигурации не обнаружено; Next-проекты содержат `vercel.json` в нескольких проектах — предполагаемый деплой на Vercel
- Docker: не обнаружен

Рекомендации по следующему шагу:
- Включить единый стандарт кода: ESLint+Prettier конфигурация, общие правила импортов
- Внедрить pre-commit (husky + lint-staged), базовые тесты на ключевые компоненты
- Поэтапная миграция на TypeScript для крупных SPA
- Ввести Design Tokens и базовые a11y-проверки (eslint-plugin-jsx-a11y / axe)