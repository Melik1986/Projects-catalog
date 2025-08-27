<div align="center">
  <br />
  <img src="public/vk1.png" alt="VK Project — Hero" />
  <br />
  <br />

  <div>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
    <img src="https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Vite_PWA-0.21-5A0FC8?style=for-the-badge" alt="Vite PWA" />
    <img src="https://img.shields.io/badge/Jest-30-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  </div>

  <h3 align="center">VK React Project — Modern TS App</h3>
  <p align="center">A TypeScript React app with Redux Toolkit, Router, Jest tests, PWA support, and Vite build.</p>
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

This project is a modern React + TypeScript application prepared for production: strict linting and formatting, unit tests with Jest, PWA configuration, and optimized builds via Vite. It’s suitable for complex feature work and clean architecture.

## Features

- TypeScript-first setup with aliases (vite-tsconfig-paths)
- State management with Redux Toolkit + React Redux
- Routing with React Router 6
- API calls with Axios and `qs`
- Form validation with Zod + `@hookform/resolvers` (ready)
- PWA support using `vite-plugin-pwa`
- Bundle compression and analysis scripts
- Jest unit tests with jsdom environment
- Prettier + ESLint config for consistent code style

## Tech Stack

- React 18, TypeScript 5
- Vite 6, `@vitejs/plugin-react`
- Redux Toolkit 2, React Redux, Redux (core)
- React Router DOM 6
- Axios, qs
- Jest 30, ts-jest
- Prettier, ESLint
- Vite plugins: PWA, compression, tsconfig paths, visualizer

## Screenshots

<p align="center">
  <img src="public/vk2.png" alt="Hero — VK Project" />
  <br />
  <em>App shell and navigation</em>
</p>

<p align="center">
  <img src="public/vk3.png" alt="Feature — VK Project" />
  <br />
  <em>Feature screen</em>
</p>

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Scripts

- `dev` – start Vite dev server
- `build` – production build
- `build:prod` – production build (explicit mode)
- `build:analyze` – build and print analysis path
- `preview` – preview built app
- `lint` – run ESLint
- `format` – format sources with Prettier
- `test` / `test:watch` / `test:coverage` – run Jest tests

## Project Structure

```
react_project-VK/react_project-1/ВК-Маруся/
├─ public/
│  ├─ 
│  └─ 
├─ src/
│  ├─ app/ core modules
│  ├─ components/
│  ├─ features/
│  ├─ pages/
│  └─ shared/
├─ index.html
├─ vite.config.ts
└─ tsconfig.json
```



