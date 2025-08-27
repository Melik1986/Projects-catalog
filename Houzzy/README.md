<div align="center">
  <br />
  <img src="images/Desktop - 1920 (1).png" alt="Houzzy — Catalog Desktop" />
  <br />
  <br />

  <div>
    <img src="https://img.shields.io/badge/HTML5-–-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/SCSS-–-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS" />
    <img src="https://img.shields.io/badge/BEM-–-000000?style=for-the-badge" alt="BEM" />
    <img src="https://img.shields.io/badge/Responsive-–-0A0A0A?style=for-the-badge" alt="Responsive" />
  </div>

  <h3 align="center">Houzzy — Modern Furniture Storefront</h3>
  <p align="center">Responsive catalog page with filters, product cards, and a “recently viewed” section.</p>
</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Screenshots](#screenshots)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)

## Introduction

Houzzy is a static, responsive e‑commerce layout focused on clarity and usability. It demonstrates product catalog UI patterns: filters, rich product cards, breadcrumbs, custom checkboxes/inputs, and a “recently viewed” carousel.

## Features

- Mobile‑first responsive design (360 / 768 / 1920)
- Product catalog and filter controls
- Detailed product cards and CTA buttons
- Recently viewed items section
- Breadcrumbs for navigation
- Custom form elements and checkboxes
- Optimized images (retina @2x where needed)

## Tech Stack

- HTML5
- CSS/SCSS (BEM methodology)
- Mulish font family (regular, medium, bold)

## Screenshots

<p align="center">
  <img src="images/Tablet - 768.png" alt="Tablet 768 — Catalog" />
  <br />
  <em>Tablet layout (768px)</em>
</p>

## Project Structure
```
Houzzy/
├── css/
│   ├── style.css
│   └── style.css.map
├── scss/
│   ├── blocks/
│   │   ├── _catalog.scss
│   │   ├── _product-card.scss
│   │   └── ...
│   ├── global/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── ...
│   └── style.scss
├── fonts/
│   └── Mulish (woff/woff2)
├── images/
│   ├── catalog/
│   ├── sprite/
│   └── viewed/
└── catalog.html
```
