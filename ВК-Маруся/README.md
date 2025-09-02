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

  <h3 align="center">VK Marusya — Online Cinema Platform</h3>
  <p align="center">A modern TypeScript React application for watching movies and trailers with genre filtering, search functionality, and user authentication.</p>
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

VK Marusya is a comprehensive online cinema platform built with modern React and TypeScript. It provides users with the ability to browse movies, watch trailers, search for films by title, filter by genres, manage favorites, and authenticate securely. The application features a clean, responsive design with advanced functionality for an optimal movie-watching experience.

## Features

### 🎬 **Cinema Functionality**
- **Movie Catalog**: Browse extensive collection of movies with detailed information
- **Trailer Playback**: Watch movie trailers with integrated YouTube player
- **Genre Filtering**: Filter movies by multiple genres (drama, comedy, thriller, etc.)
- **Advanced Search**: Real-time search with debounced input and autocomplete
- **Favorites System**: Add/remove movies to personal favorites list
- **User Authentication**: Secure login and registration system

### 🛠 **Technical Features**
- **TypeScript**: Full type safety with strict configuration
- **State Management**: Redux Toolkit for complex state handling
- **Routing**: React Router 6 with protected routes
- **API Integration**: Axios-based API with error handling
- **PWA Support**: Progressive Web App capabilities
- **Testing**: Jest unit tests with comprehensive coverage
- **Performance**: Optimized builds with Vite and bundle analysis

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



