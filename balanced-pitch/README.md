<div align="center">
  <br />
  <img src="public/balanced-pitch1.png" alt="Balanced Pitch — Hero" />
  <br />
  <br />

  <div>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Lenis-Scroll-111111?style=for-the-badge" alt="Lenis" />
    <img src="https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  </div>

  <h3 align="center">Balanced Pitch — Shaping the Future of Music with AI</h3>
  <p align="center">A bold, motion‑first React + Vite site with editorial design and smooth scroll.</p>
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

Balanced Pitch is a single‑page React site highlighting how AI meets music. It features oversized typography, vibrant neon accent colors, and cinematic sections powered by GSAP and Framer Motion. Navigation is handled client‑side with React Router, and Lenis provides buttery‑smooth scrolling.

## Features

- Hero with large display type and CTA
- Section reveals and parallax‑style motion with GSAP/Framer Motion
- Smooth scrolling via Lenis and `@studio-freight/react-lenis`
- Client‑side routes with React Router 7
- Responsive layout and keyboard accessibility
- Linting and best‑practices via ESLint

## Tech Stack

- React 18 + Vite 5
- React Router 7
- Framer Motion 11, GSAP 3
- Lenis, `@studio-freight/react-lenis`
- ESLint

## Screenshots

<p align="center">
  <img src="public/balanced-pitch1.png" alt="Hero — Balanced Pitch" />
  <br />
  <em>Hero section</em>
</p>

<p align="center">
  <img src="public/balanced-pitch2.png" alt="Innovation Section" />
  <br />
  <em>From Innovation to Iconic — editorial layout</em>
</p>

<p align="center">
  <img src="public/balanced-pitch3.png" alt="Creative AI Section" />
  <br />
  <em>Committed for Creative AI — image‑led storytelling</em>
</p>

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production build

```bash
npm run build
npm run preview
```

## Scripts

- `dev` – start the Vite dev server
- `build` – build production assets
- `preview` – preview the production build locally
- `lint` – run ESLint across the codebase

## Project Structure

```
balanced-pitch/
├─ public/
│  ├─ balanced-pitch1.png
│  ├─ balanced-pitch2.png
│  └─ balanced-pitch3.png
├─ src/
│  ├─ pages/            # routes
│  ├─ components/       # reusable UI parts
│  ├─ assets/           # images/fonts
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
└─ vite.config.js
```

---

If you enjoy this project, ⭐ the repo and adapt it to your own product or studio site. Contributions improving performance, accessibility, or motion are welcome.
