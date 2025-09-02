
<div align="center">
   <br />
   <img src="assets/sushi-hero.png" alt="Sushi — Hero" />
   <br />
   <br />

   <div>
      <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
      <img src="https://img.shields.io/badge/AOS-2.3-FF6B6B?style=for-the-badge" alt="AOS" />
      <img src="https://img.shields.io/badge/Vanilla_JS-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
   </div>

   <h3 align="center">Sushi — Japanese Restaurant & Delivery</h3>
   <p align="center">A modern Japanese restaurant website with sushi delivery service, interactive menu, and online ordering system built with Vite and AOS animations.</p>
</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Screenshots](#screenshots)
5. [Getting Started](#getting-started)
6. [Scripts](#scripts)
7. [Project Structure](#project-structure)

## Introduction

Sushi is a comprehensive Japanese restaurant website featuring a complete delivery service platform. The site includes an interactive menu system, online ordering capabilities, delivery information, and modern UI with smooth animations. Built with Vite for fast development and AOS for engaging scroll animations, it provides customers with an intuitive way to browse sushi options and place delivery orders.

## Features

### 🍣 **Restaurant & Delivery Features**
- **Interactive Menu**: Browse sushi and Japanese dishes with detailed descriptions and pricing
- **Delivery Service**: Complete delivery information with ordering capabilities
- **Popular Items**: Featured sushi rolls and trending dishes with filter options
- **Online Ordering**: Streamlined ordering system for delivery and pickup

### 🎨 **User Experience**
- **Hero Section**: Eye-catching presentation with call-to-action for ordering
- **Food Categories**: Organized menu sections with filter pills for easy navigation
- **Trending Section**: Highlighted popular and seasonal items
- **Subscribe Block**: Newsletter signup for promotions and updates

### 🛠 **Technical Features**
- **Smooth Animations**: AOS scroll animations for engaging user experience
- **Responsive Design**: Mobile-first approach for optimal viewing on all devices
- **Fast Loading**: Vite-powered development with optimized performance
- **Modular CSS**: Organized styling per section for easy maintenance

## Tech Stack

- Vite — dev server and build tool (fast HMR)
- AOS — scroll animations
- Vanilla JavaScript (ES6) — small interactivity layer
- Plain CSS (organized per section)

## Screenshots
<p align="center">
   <img src="assets/sushi2.png" alt="Popular — Sushi" style="max-width:900px; width:100%;" />
   <br />
   <em>Popular / Trending sections</em>
</p>

## Getting Started

Install dependencies and run dev server:

```powershell
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Scripts

- `dev` – start the Vite dev server
- `build` – production build
- `preview` – preview the production build locally

These scripts are defined in `package.json` and use Vite.

## Project Structure

```
sushi/
├─ index.html                # Main landing page
├─ package.json              # Scripts and deps (vite, aos)
├─ assets/                   # Images and icons used by pages
├─ css/
│  ├─ style.css              # Global styles
│  ├─ trending.css
│  └─ sections/              # Styles split by section (hero, popular, etc.)
├─ js/
│  └─ script.js              # UI behaviors and AOS init
└─ public/                   # Public assets used in README and hosting
```

### Notes on folders

- `assets/` contains illustrations and icons. Consider converting large PNGs to WebP for better perf.
- `css/sections/` keeps styles co-located with UI sections for easy maintenance.

## Quality

- Typing: none (vanilla JS). If the project grows, migrate to TypeScript for safer refactors.
- Linting: no ESLint config in this folder. Recommend adding ESLint + Prettier for style consistency.
- Tests: none. For production projects add basic visual or integration tests (Playwright, Playwright Test, or Cypress).

## Key Modules

1) `index.html` — page structure and content; connects CSS and JS.
2) `css/sections/*` — styling for each section, enables targeted changes.
3) `js/script.js` — initializes interactive features (menu toggles, filter pills, AOS).
4) `assets/` — illustration and icon sources; optimize images here.

## Best Practices & Recommendations

- Keep CSS per section to reduce cognitive load when editing styles.
- Use modern image formats (WebP/AVIF) and add `loading="lazy"` to non-critical images.
- Add a lightweight ESLint setup and a `lint` script to the `package.json`.

## Infrastructure

Scripts (from `package.json`):

```powershell
npm install
npm run dev
npm run build
npm run preview
```

CI/CD: none included. Suggest adding a simple GitHub Actions workflow that runs `npm ci && npm run build` on push to main/master.

## Conclusions

Sushi is a concise, well-structured static landing ideal for demos. It boots quickly with Vite and is easy to extend. Primary improvements: add linting, optimize images, and introduce lightweight CI to validate builds.

---

This README was adapted to match the style and structure of `origin/README.md` while using the `sushi` project's assets and scripts.
