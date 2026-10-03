<div align="center">

# ⏱️ Aura Dial

**A luxury watches & eyewear e-commerce platform with Cash-on-Delivery (COD) checkout and an integrated Admin Management Panel.**

[![Next.js](https://img.shields.io/badge/Next.js-16_(App_Router)-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-c5f74f?logo=drizzle)](https://orm.drizzle.team/)
[![Neon](https://img.shields.io/badge/Neon-Serverless_Postgres-00e599?logo=postgresql)](https://neon.tech/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Security](#-security-highlights) • [Scripts](#-npm-scripts)

</div>

---

## 🌟 Overview

**Aura Dial** is an e-commerce platform tailored for luxury timepieces and eyewear. Engineered with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, it couples a customer storefront with an administrative back-office to oversee products, inventories, and order fulfillment.

---

## 💎 Key Features

### 🛍️ Customer Storefront
- **Dynamic Catalog:** Product discovery with gender/category filters and best-seller badges.
- **Cart & Slide-over Drawer:** Instant updates powered by persistent client state (`Zustand`).
- **Streamlined Checkout:** Fast Cash-on-Delivery (COD) flow with instant server-side price & stock verification.
- **Order Tracking:** Track parcel statuses in real time using order ID + phone number.
- **Dynamic Content:** Editable About page, announcements banner, and customizable store policies.

### 🛡️ Back-Office Admin (`/admin`)
- **Executive Dashboard:** Live metrics for revenue, order statuses, and stock levels.
- **Order Management:** Status progression workflow with automatic restock on returns/cancellations.
- **Product Catalog:** Multi-image uploads via Cloudinary, sale pricing, and inventory counters.
- **Store Customization:** Configurable shipping thresholds, banner text, hero banners, and policy pages.

---

## 🏗️ Tech Stack

```text
├── Frontend: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide Icons
├── Typography: Playfair Display (Serif Headings) & Inter (Body UI)
├── State Management: Zustand 5
├── Database: Neon Serverless PostgreSQL
├── ORM: Drizzle ORM + Drizzle Kit
├── Cloud Storage: Cloudinary (Image management)
├── Validation: Zod 4
└── Security: Bcrypt.js, Atomic DB Check Constraints, Rate Limiting



<svg width="1000" height="8175" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { font-family: 'Arial', sans-serif; font-size: 18px; font-weight: bold; fill: #2c3e50; }
      .subtitle { font-family: 'Arial', sans-serif; font-size: 12px; fill: #7f8c8d; }
      .folder-text { font-family: 'Consolas', 'Courier New', monospace; font-size: 14px; fill: #27ae60; font-weight: bold; }
      .file-text { font-family: 'Consolas', 'Courier New', monospace; font-size: 14px; fill: #3498db; }
      .icon { font-family: 'Arial', sans-serif; font-size: 16px; }
      .line { stroke: #bdc3c7; stroke-width: 1.5; }
      .background { fill: #f8f9fa; }
      .header-bg { fill: #ecf0f1; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1000" height="8175" class="background"/>

  <!-- Header -->
  <rect x="0" y="0" width="1000" height="60" class="header-bg"/>
  <text x="20" y="25" class="title">📁 File Tree: aura-dial-store</text>
  <text x="20" y="45" class="subtitle">Generated: 10/3/2026, 10:56:35 PM | FileTree Pro Extension</text>

  <!-- Tree Structure -->
    <line x1="15" y1="80" x2="25" y2="80" class="line"/>
    <text x="30" y="85" class="icon">📁</text>
    <text x="55" y="85" class="folder-text">.brain/</text>
    <line x1="45" y1="100" x2="45" y2="110" class="line"/>
    <line x1="45" y1="110" x2="55" y2="110" class="line"/>
    <text x="60" y="115" class="icon">📝</text>
    <text x="85" y="115" class="file-text">active-task.md</text>
    <line x1="45" y1="135" x2="45" y2="145" class="line"/>
    <line x1="45" y1="145" x2="55" y2="145" class="line"/>
    <text x="60" y="150" class="icon">📝</text>
    <text x="85" y="150" class="file-text">database-schema.md</text>
    <line x1="45" y1="170" x2="45" y2="180" class="line"/>
    <line x1="45" y1="180" x2="55" y2="180" class="line"/>
    <text x="60" y="185" class="icon">📝</text>
    <text x="85" y="185" class="file-text">design-rules.md</text>
    <line x1="45" y1="205" x2="45" y2="215" class="line"/>
    <line x1="45" y1="215" x2="55" y2="215" class="line"/>
    <text x="60" y="220" class="icon">📝</text>
    <text x="85" y="220" class="file-text">project-overview.md</text>
    <line x1="15" y1="285" x2="25" y2="285" class="line"/>
    <text x="30" y="290" class="icon">📁</text>
    <text x="55" y="290" class="folder-text">legal-drafts/</text>
    <line x1="45" y1="305" x2="45" y2="315" class="line"/>
    <line x1="45" y1="315" x2="55" y2="315" class="line"/>
    <text x="60" y="320" class="icon">📝</text>
    <text x="85" y="320" class="file-text">00-READ-FIRST.md</text>
    <line x1="45" y1="340" x2="45" y2="350" class="line"/>
    <line x1="45" y1="350" x2="55" y2="350" class="line"/>
    <text x="60" y="355" class="icon">📝</text>
    <text x="85" y="355" class="file-text">FACTS.md</text>
    <line x1="45" y1="375" x2="45" y2="385" class="line"/>
    <line x1="45" y1="385" x2="55" y2="385" class="line"/>
    <text x="60" y="390" class="icon">📝</text>
    <text x="85" y="390" class="file-text">privacy-policy.md</text>
    <line x1="45" y1="410" x2="45" y2="420" class="line"/>
    <line x1="45" y1="420" x2="55" y2="420" class="line"/>
    <text x="60" y="425" class="icon">📝</text>
    <text x="85" y="425" class="file-text">return-policy.md</text>
    <line x1="45" y1="445" x2="45" y2="455" class="line"/>
    <line x1="45" y1="455" x2="55" y2="455" class="line"/>
    <text x="60" y="460" class="icon">📝</text>
    <text x="85" y="460" class="file-text">shipping-policy.md</text>
    <line x1="45" y1="480" x2="45" y2="490" class="line"/>
    <line x1="45" y1="490" x2="55" y2="490" class="line"/>
    <text x="60" y="495" class="icon">📝</text>
    <text x="85" y="495" class="file-text">terms-of-service.md</text>
    <line x1="15" y1="560" x2="25" y2="560" class="line"/>
    <text x="30" y="565" class="icon">📁</text>
    <text x="55" y="565" class="folder-text">public/</text>
    <line x1="45" y1="580" x2="45" y2="590" class="line"/>
    <line x1="45" y1="590" x2="55" y2="590" class="line"/>
    <text x="60" y="595" class="icon">📁</text>
    <text x="85" y="595" class="folder-text">brand/</text>
    <line x1="75" y1="610" x2="75" y2="620" class="line"/>
    <line x1="75" y1="620" x2="85" y2="620" class="line"/>
    <text x="90" y="625" class="icon">🖼️</text>
    <text x="115" y="625" class="file-text">logo-full.png</text>
    <line x1="75" y1="645" x2="75" y2="655" class="line"/>
    <line x1="75" y1="655" x2="85" y2="655" class="line"/>
    <text x="90" y="660" class="icon">🖼️</text>
    <text x="115" y="660" class="file-text">logo-mark.png</text>
    <line x1="45" y1="715" x2="45" y2="725" class="line"/>
    <line x1="45" y1="725" x2="55" y2="725" class="line"/>
    <text x="60" y="730" class="icon">📁</text>
    <text x="85" y="730" class="folder-text">images/</text>
    <line x1="75" y1="745" x2="75" y2="755" class="line"/>
    <line x1="75" y1="755" x2="85" y2="755" class="line"/>
    <text x="90" y="760" class="icon">🖼️</text>
    <text x="115" y="760" class="file-text">sample-glasses-01.jpg</text>
    <line x1="75" y1="780" x2="75" y2="790" class="line"/>
    <line x1="75" y1="790" x2="85" y2="790" class="line"/>
    <text x="90" y="795" class="icon">🖼️</text>
    <text x="115" y="795" class="file-text">sample-glasses-02.jpg</text>
    <line x1="75" y1="815" x2="75" y2="825" class="line"/>
    <line x1="75" y1="825" x2="85" y2="825" class="line"/>
    <text x="90" y="830" class="icon">🖼️</text>
    <text x="115" y="830" class="file-text">sample-glasses-03.jpg</text>
    <line x1="75" y1="850" x2="75" y2="860" class="line"/>
    <line x1="75" y1="860" x2="85" y2="860" class="line"/>
    <text x="90" y="865" class="icon">🖼️</text>
    <text x="115" y="865" class="file-text">sample-glasses-04.jpg</text>
    <line x1="75" y1="885" x2="75" y2="895" class="line"/>
    <line x1="75" y1="895" x2="85" y2="895" class="line"/>
    <text x="90" y="900" class="icon">🖼️</text>
    <text x="115" y="900" class="file-text">sample-glasses-05.jpg</text>
    <line x1="75" y1="920" x2="75" y2="930" class="line"/>
    <line x1="75" y1="930" x2="85" y2="930" class="line"/>
    <text x="90" y="935" class="icon">🖼️</text>
    <text x="115" y="935" class="file-text">sample-glasses-06.jpg</text>
    <line x1="75" y1="955" x2="75" y2="965" class="line"/>
    <line x1="75" y1="965" x2="85" y2="965" class="line"/>
    <text x="90" y="970" class="icon">🖼️</text>
    <text x="115" y="970" class="file-text">sample-glasses-07.jpg</text>
    <line x1="75" y1="990" x2="75" y2="1000" class="line"/>
    <line x1="75" y1="1000" x2="85" y2="1000" class="line"/>
    <text x="90" y="1005" class="icon">🖼️</text>
    <text x="115" y="1005" class="file-text">sample-glasses-08.jpg</text>
    <line x1="75" y1="1025" x2="75" y2="1035" class="line"/>
    <line x1="75" y1="1035" x2="85" y2="1035" class="line"/>
    <text x="90" y="1040" class="icon">🖼️</text>
    <text x="115" y="1040" class="file-text">sample-glasses-09.jpg</text>
    <line x1="75" y1="1060" x2="75" y2="1070" class="line"/>
    <line x1="75" y1="1070" x2="85" y2="1070" class="line"/>
    <text x="90" y="1075" class="icon">🖼️</text>
    <text x="115" y="1075" class="file-text">sample-glasses-10.jpg</text>
    <line x1="75" y1="1095" x2="75" y2="1105" class="line"/>
    <line x1="75" y1="1105" x2="85" y2="1105" class="line"/>
    <text x="90" y="1110" class="icon">🖼️</text>
    <text x="115" y="1110" class="file-text">sample-glasses-11.jpg</text>
    <line x1="75" y1="1130" x2="75" y2="1140" class="line"/>
    <line x1="75" y1="1140" x2="85" y2="1140" class="line"/>
    <text x="90" y="1145" class="icon">🖼️</text>
    <text x="115" y="1145" class="file-text">sample-glasses-12.jpg</text>
    <line x1="75" y1="1165" x2="75" y2="1175" class="line"/>
    <line x1="75" y1="1175" x2="85" y2="1175" class="line"/>
    <text x="90" y="1180" class="icon">🖼️</text>
    <text x="115" y="1180" class="file-text">sample-glasses-13.jpg</text>
    <line x1="75" y1="1200" x2="75" y2="1210" class="line"/>
    <line x1="75" y1="1210" x2="85" y2="1210" class="line"/>
    <text x="90" y="1215" class="icon">🖼️</text>
    <text x="115" y="1215" class="file-text">sample-glasses-14.jpg</text>
    <line x1="75" y1="1235" x2="75" y2="1245" class="line"/>
    <line x1="75" y1="1245" x2="85" y2="1245" class="line"/>
    <text x="90" y="1250" class="icon">🖼️</text>
    <text x="115" y="1250" class="file-text">sample-glasses-15.jpg</text>
    <line x1="75" y1="1270" x2="75" y2="1280" class="line"/>
    <line x1="75" y1="1280" x2="85" y2="1280" class="line"/>
    <text x="90" y="1285" class="icon">🖼️</text>
    <text x="115" y="1285" class="file-text">sample-watch-01.jpg</text>
    <line x1="75" y1="1305" x2="75" y2="1315" class="line"/>
    <line x1="75" y1="1315" x2="85" y2="1315" class="line"/>
    <text x="90" y="1320" class="icon">🖼️</text>
    <text x="115" y="1320" class="file-text">sample-watch-02.jpg</text>
    <line x1="75" y1="1340" x2="75" y2="1350" class="line"/>
    <line x1="75" y1="1350" x2="85" y2="1350" class="line"/>
    <text x="90" y="1355" class="icon">🖼️</text>
    <text x="115" y="1355" class="file-text">sample-watch-03.jpg</text>
    <line x1="75" y1="1375" x2="75" y2="1385" class="line"/>
    <line x1="75" y1="1385" x2="85" y2="1385" class="line"/>
    <text x="90" y="1390" class="icon">🖼️</text>
    <text x="115" y="1390" class="file-text">sample-watch-04.jpg</text>
    <line x1="75" y1="1410" x2="75" y2="1420" class="line"/>
    <line x1="75" y1="1420" x2="85" y2="1420" class="line"/>
    <text x="90" y="1425" class="icon">🖼️</text>
    <text x="115" y="1425" class="file-text">sample-watch-05.jpg</text>
    <line x1="75" y1="1445" x2="75" y2="1455" class="line"/>
    <line x1="75" y1="1455" x2="85" y2="1455" class="line"/>
    <text x="90" y="1460" class="icon">🖼️</text>
    <text x="115" y="1460" class="file-text">sample-watch-06.jpg</text>
    <line x1="75" y1="1480" x2="75" y2="1490" class="line"/>
    <line x1="75" y1="1490" x2="85" y2="1490" class="line"/>
    <text x="90" y="1495" class="icon">🖼️</text>
    <text x="115" y="1495" class="file-text">sample-watch-07.jpg</text>
    <line x1="75" y1="1515" x2="75" y2="1525" class="line"/>
    <line x1="75" y1="1525" x2="85" y2="1525" class="line"/>
    <text x="90" y="1530" class="icon">🖼️</text>
    <text x="115" y="1530" class="file-text">sample-watch-08.jpg</text>
    <line x1="75" y1="1550" x2="75" y2="1560" class="line"/>
    <line x1="75" y1="1560" x2="85" y2="1560" class="line"/>
    <text x="90" y="1565" class="icon">🖼️</text>
    <text x="115" y="1565" class="file-text">sample-watch-09.jpg</text>
    <line x1="75" y1="1585" x2="75" y2="1595" class="line"/>
    <line x1="75" y1="1595" x2="85" y2="1595" class="line"/>
    <text x="90" y="1600" class="icon">🖼️</text>
    <text x="115" y="1600" class="file-text">sample-watch-10.jpg</text>
    <line x1="75" y1="1620" x2="75" y2="1630" class="line"/>
    <line x1="75" y1="1630" x2="85" y2="1630" class="line"/>
    <text x="90" y="1635" class="icon">🖼️</text>
    <text x="115" y="1635" class="file-text">sample-watch-11.jpg</text>
    <line x1="75" y1="1655" x2="75" y2="1665" class="line"/>
    <line x1="75" y1="1665" x2="85" y2="1665" class="line"/>
    <text x="90" y="1670" class="icon">🖼️</text>
    <text x="115" y="1670" class="file-text">sample-watch-12.jpg</text>
    <line x1="75" y1="1690" x2="75" y2="1700" class="line"/>
    <line x1="75" y1="1700" x2="85" y2="1700" class="line"/>
    <text x="90" y="1705" class="icon">🖼️</text>
    <text x="115" y="1705" class="file-text">sample-watch-13.jpg</text>
    <line x1="75" y1="1725" x2="75" y2="1735" class="line"/>
    <line x1="75" y1="1735" x2="85" y2="1735" class="line"/>
    <text x="90" y="1740" class="icon">🖼️</text>
    <text x="115" y="1740" class="file-text">sample-watch-14.jpg</text>
    <line x1="75" y1="1760" x2="75" y2="1770" class="line"/>
    <line x1="75" y1="1770" x2="85" y2="1770" class="line"/>
    <text x="90" y="1775" class="icon">🖼️</text>
    <text x="115" y="1775" class="file-text">sample-watch-15.jpg</text>
    <line x1="75" y1="1795" x2="75" y2="1805" class="line"/>
    <line x1="75" y1="1805" x2="85" y2="1805" class="line"/>
    <text x="90" y="1810" class="icon">🖼️</text>
    <text x="115" y="1810" class="file-text">sample-watch-16.jpg</text>
    <line x1="75" y1="1830" x2="75" y2="1840" class="line"/>
    <line x1="75" y1="1840" x2="85" y2="1840" class="line"/>
    <text x="90" y="1845" class="icon">🖼️</text>
    <text x="115" y="1845" class="file-text">sample-watch-17.jpg</text>
    <line x1="75" y1="1865" x2="75" y2="1875" class="line"/>
    <line x1="75" y1="1875" x2="85" y2="1875" class="line"/>
    <text x="90" y="1880" class="icon">🖼️</text>
    <text x="115" y="1880" class="file-text">sample-watch-18.jpg</text>
    <line x1="75" y1="1900" x2="75" y2="1910" class="line"/>
    <line x1="75" y1="1910" x2="85" y2="1910" class="line"/>
    <text x="90" y="1915" class="icon">🖼️</text>
    <text x="115" y="1915" class="file-text">sample-watch-19.jpg</text>
    <line x1="75" y1="1935" x2="75" y2="1945" class="line"/>
    <line x1="75" y1="1945" x2="85" y2="1945" class="line"/>
    <text x="90" y="1950" class="icon">🖼️</text>
    <text x="115" y="1950" class="file-text">sample-watch-20.jpg</text>
    <line x1="45" y1="2005" x2="45" y2="2015" class="line"/>
    <line x1="45" y1="2015" x2="55" y2="2015" class="line"/>
    <text x="60" y="2020" class="icon">🖼️</text>
    <text x="85" y="2020" class="file-text">file.svg</text>
    <line x1="45" y1="2040" x2="45" y2="2050" class="line"/>
    <line x1="45" y1="2050" x2="55" y2="2050" class="line"/>
    <text x="60" y="2055" class="icon">🖼️</text>
    <text x="85" y="2055" class="file-text">globe.svg</text>
    <line x1="45" y1="2075" x2="45" y2="2085" class="line"/>
    <line x1="45" y1="2085" x2="55" y2="2085" class="line"/>
    <text x="60" y="2090" class="icon">🖼️</text>
    <text x="85" y="2090" class="file-text">next.svg</text>
    <line x1="45" y1="2110" x2="45" y2="2120" class="line"/>
    <line x1="45" y1="2120" x2="55" y2="2120" class="line"/>
    <text x="60" y="2125" class="icon">🖼️</text>
    <text x="85" y="2125" class="file-text">vercel.svg</text>
    <line x1="45" y1="2145" x2="45" y2="2155" class="line"/>
    <line x1="45" y1="2155" x2="55" y2="2155" class="line"/>
    <text x="60" y="2160" class="icon">🖼️</text>
    <text x="85" y="2160" class="file-text">window.svg</text>
    <line x1="15" y1="2225" x2="25" y2="2225" class="line"/>
    <text x="30" y="2230" class="icon">📁</text>
    <text x="55" y="2230" class="folder-text">sample-images/</text>
    <line x1="45" y1="2245" x2="45" y2="2255" class="line"/>
    <line x1="45" y1="2255" x2="55" y2="2255" class="line"/>
    <text x="60" y="2260" class="icon">🖼️</text>
    <text x="85" y="2260" class="file-text">sample-glasses-01.jpg</text>
    <line x1="45" y1="2280" x2="45" y2="2290" class="line"/>
    <line x1="45" y1="2290" x2="55" y2="2290" class="line"/>
    <text x="60" y="2295" class="icon">🖼️</text>
    <text x="85" y="2295" class="file-text">sample-glasses-02.jpg</text>
    <line x1="45" y1="2315" x2="45" y2="2325" class="line"/>
    <line x1="45" y1="2325" x2="55" y2="2325" class="line"/>
    <text x="60" y="2330" class="icon">🖼️</text>
    <text x="85" y="2330" class="file-text">sample-glasses-03.jpg</text>
    <line x1="45" y1="2350" x2="45" y2="2360" class="line"/>
    <line x1="45" y1="2360" x2="55" y2="2360" class="line"/>
    <text x="60" y="2365" class="icon">🖼️</text>
    <text x="85" y="2365" class="file-text">sample-glasses-04.jpg</text>
    <line x1="45" y1="2385" x2="45" y2="2395" class="line"/>
    <line x1="45" y1="2395" x2="55" y2="2395" class="line"/>
    <text x="60" y="2400" class="icon">🖼️</text>
    <text x="85" y="2400" class="file-text">sample-glasses-05.jpg</text>
    <line x1="45" y1="2420" x2="45" y2="2430" class="line"/>
    <line x1="45" y1="2430" x2="55" y2="2430" class="line"/>
    <text x="60" y="2435" class="icon">🖼️</text>
    <text x="85" y="2435" class="file-text">sample-glasses-06.jpg</text>
    <line x1="45" y1="2455" x2="45" y2="2465" class="line"/>
    <line x1="45" y1="2465" x2="55" y2="2465" class="line"/>
    <text x="60" y="2470" class="icon">🖼️</text>
    <text x="85" y="2470" class="file-text">sample-glasses-07.jpg</text>
    <line x1="45" y1="2490" x2="45" y2="2500" class="line"/>
    <line x1="45" y1="2500" x2="55" y2="2500" class="line"/>
    <text x="60" y="2505" class="icon">🖼️</text>
    <text x="85" y="2505" class="file-text">sample-glasses-08.jpg</text>
    <line x1="45" y1="2525" x2="45" y2="2535" class="line"/>
    <line x1="45" y1="2535" x2="55" y2="2535" class="line"/>
    <text x="60" y="2540" class="icon">🖼️</text>
    <text x="85" y="2540" class="file-text">sample-glasses-09.jpg</text>
    <line x1="45" y1="2560" x2="45" y2="2570" class="line"/>
    <line x1="45" y1="2570" x2="55" y2="2570" class="line"/>
    <text x="60" y="2575" class="icon">🖼️</text>
    <text x="85" y="2575" class="file-text">sample-glasses-10.jpg</text>
    <line x1="45" y1="2595" x2="45" y2="2605" class="line"/>
    <line x1="45" y1="2605" x2="55" y2="2605" class="line"/>
    <text x="60" y="2610" class="icon">🖼️</text>
    <text x="85" y="2610" class="file-text">sample-glasses-11.jpg</text>
    <line x1="45" y1="2630" x2="45" y2="2640" class="line"/>
    <line x1="45" y1="2640" x2="55" y2="2640" class="line"/>
    <text x="60" y="2645" class="icon">🖼️</text>
    <text x="85" y="2645" class="file-text">sample-glasses-12.jpg</text>
    <line x1="45" y1="2665" x2="45" y2="2675" class="line"/>
    <line x1="45" y1="2675" x2="55" y2="2675" class="line"/>
    <text x="60" y="2680" class="icon">🖼️</text>
    <text x="85" y="2680" class="file-text">sample-glasses-13.jpg</text>
    <line x1="45" y1="2700" x2="45" y2="2710" class="line"/>
    <line x1="45" y1="2710" x2="55" y2="2710" class="line"/>
    <text x="60" y="2715" class="icon">🖼️</text>
    <text x="85" y="2715" class="file-text">sample-glasses-14.jpg</text>
    <line x1="45" y1="2735" x2="45" y2="2745" class="line"/>
    <line x1="45" y1="2745" x2="55" y2="2745" class="line"/>
    <text x="60" y="2750" class="icon">🖼️</text>
    <text x="85" y="2750" class="file-text">sample-glasses-15.jpg</text>
    <line x1="45" y1="2770" x2="45" y2="2780" class="line"/>
    <line x1="45" y1="2780" x2="55" y2="2780" class="line"/>
    <text x="60" y="2785" class="icon">🖼️</text>
    <text x="85" y="2785" class="file-text">sample-watch-01.jpg</text>
    <line x1="45" y1="2805" x2="45" y2="2815" class="line"/>
    <line x1="45" y1="2815" x2="55" y2="2815" class="line"/>
    <text x="60" y="2820" class="icon">🖼️</text>
    <text x="85" y="2820" class="file-text">sample-watch-02.jpg</text>
    <line x1="45" y1="2840" x2="45" y2="2850" class="line"/>
    <line x1="45" y1="2850" x2="55" y2="2850" class="line"/>
    <text x="60" y="2855" class="icon">🖼️</text>
    <text x="85" y="2855" class="file-text">sample-watch-03.jpg</text>
    <line x1="45" y1="2875" x2="45" y2="2885" class="line"/>
    <line x1="45" y1="2885" x2="55" y2="2885" class="line"/>
    <text x="60" y="2890" class="icon">🖼️</text>
    <text x="85" y="2890" class="file-text">sample-watch-04.jpg</text>
    <line x1="45" y1="2910" x2="45" y2="2920" class="line"/>
    <line x1="45" y1="2920" x2="55" y2="2920" class="line"/>
    <text x="60" y="2925" class="icon">🖼️</text>
    <text x="85" y="2925" class="file-text">sample-watch-05.jpg</text>
    <line x1="45" y1="2945" x2="45" y2="2955" class="line"/>
    <line x1="45" y1="2955" x2="55" y2="2955" class="line"/>
    <text x="60" y="2960" class="icon">🖼️</text>
    <text x="85" y="2960" class="file-text">sample-watch-06.jpg</text>
    <line x1="45" y1="2980" x2="45" y2="2990" class="line"/>
    <line x1="45" y1="2990" x2="55" y2="2990" class="line"/>
    <text x="60" y="2995" class="icon">🖼️</text>
    <text x="85" y="2995" class="file-text">sample-watch-07.jpg</text>
    <line x1="45" y1="3015" x2="45" y2="3025" class="line"/>
    <line x1="45" y1="3025" x2="55" y2="3025" class="line"/>
    <text x="60" y="3030" class="icon">🖼️</text>
    <text x="85" y="3030" class="file-text">sample-watch-08.jpg</text>
    <line x1="45" y1="3050" x2="45" y2="3060" class="line"/>
    <line x1="45" y1="3060" x2="55" y2="3060" class="line"/>
    <text x="60" y="3065" class="icon">🖼️</text>
    <text x="85" y="3065" class="file-text">sample-watch-09.jpg</text>
    <line x1="45" y1="3085" x2="45" y2="3095" class="line"/>
    <line x1="45" y1="3095" x2="55" y2="3095" class="line"/>
    <text x="60" y="3100" class="icon">🖼️</text>
    <text x="85" y="3100" class="file-text">sample-watch-10.jpg</text>
    <line x1="45" y1="3120" x2="45" y2="3130" class="line"/>
    <line x1="45" y1="3130" x2="55" y2="3130" class="line"/>
    <text x="60" y="3135" class="icon">🖼️</text>
    <text x="85" y="3135" class="file-text">sample-watch-11.jpg</text>
    <line x1="45" y1="3155" x2="45" y2="3165" class="line"/>
    <line x1="45" y1="3165" x2="55" y2="3165" class="line"/>
    <text x="60" y="3170" class="icon">🖼️</text>
    <text x="85" y="3170" class="file-text">sample-watch-12.jpg</text>
    <line x1="45" y1="3190" x2="45" y2="3200" class="line"/>
    <line x1="45" y1="3200" x2="55" y2="3200" class="line"/>
    <text x="60" y="3205" class="icon">🖼️</text>
    <text x="85" y="3205" class="file-text">sample-watch-13.jpg</text>
    <line x1="45" y1="3225" x2="45" y2="3235" class="line"/>
    <line x1="45" y1="3235" x2="55" y2="3235" class="line"/>
    <text x="60" y="3240" class="icon">🖼️</text>
    <text x="85" y="3240" class="file-text">sample-watch-14.jpg</text>
    <line x1="45" y1="3260" x2="45" y2="3270" class="line"/>
    <line x1="45" y1="3270" x2="55" y2="3270" class="line"/>
    <text x="60" y="3275" class="icon">🖼️</text>
    <text x="85" y="3275" class="file-text">sample-watch-15.jpg</text>
    <line x1="45" y1="3295" x2="45" y2="3305" class="line"/>
    <line x1="45" y1="3305" x2="55" y2="3305" class="line"/>
    <text x="60" y="3310" class="icon">🖼️</text>
    <text x="85" y="3310" class="file-text">sample-watch-16.jpg</text>
    <line x1="45" y1="3330" x2="45" y2="3340" class="line"/>
    <line x1="45" y1="3340" x2="55" y2="3340" class="line"/>
    <text x="60" y="3345" class="icon">🖼️</text>
    <text x="85" y="3345" class="file-text">sample-watch-17.jpg</text>
    <line x1="45" y1="3365" x2="45" y2="3375" class="line"/>
    <line x1="45" y1="3375" x2="55" y2="3375" class="line"/>
    <text x="60" y="3380" class="icon">🖼️</text>
    <text x="85" y="3380" class="file-text">sample-watch-18.jpg</text>
    <line x1="45" y1="3400" x2="45" y2="3410" class="line"/>
    <line x1="45" y1="3410" x2="55" y2="3410" class="line"/>
    <text x="60" y="3415" class="icon">🖼️</text>
    <text x="85" y="3415" class="file-text">sample-watch-19.jpg</text>
    <line x1="45" y1="3435" x2="45" y2="3445" class="line"/>
    <line x1="45" y1="3445" x2="55" y2="3445" class="line"/>
    <text x="60" y="3450" class="icon">🖼️</text>
    <text x="85" y="3450" class="file-text">sample-watch-20.jpg</text>
    <line x1="15" y1="3515" x2="25" y2="3515" class="line"/>
    <text x="30" y="3520" class="icon">📁</text>
    <text x="55" y="3520" class="folder-text">scripts/</text>
    <line x1="45" y1="3535" x2="45" y2="3545" class="line"/>
    <line x1="45" y1="3545" x2="55" y2="3545" class="line"/>
    <text x="60" y="3550" class="icon">📄</text>
    <text x="85" y="3550" class="file-text">create-reviews-table.ts</text>
    <line x1="45" y1="3570" x2="45" y2="3580" class="line"/>
    <line x1="45" y1="3580" x2="55" y2="3580" class="line"/>
    <text x="60" y="3585" class="icon">📄</text>
    <text x="85" y="3585" class="file-text">preflight.ts</text>
    <line x1="45" y1="3605" x2="45" y2="3615" class="line"/>
    <line x1="45" y1="3615" x2="55" y2="3615" class="line"/>
    <text x="60" y="3620" class="icon">📄</text>
    <text x="85" y="3620" class="file-text">seed-reviews.ts</text>
    <line x1="15" y1="3685" x2="25" y2="3685" class="line"/>
    <text x="30" y="3690" class="icon">📁</text>
    <text x="55" y="3690" class="folder-text">src/</text>
    <line x1="45" y1="3705" x2="45" y2="3715" class="line"/>
    <line x1="45" y1="3715" x2="55" y2="3715" class="line"/>
    <text x="60" y="3720" class="icon">📁</text>
    <text x="85" y="3720" class="folder-text">app/</text>
    <line x1="75" y1="3735" x2="75" y2="3745" class="line"/>
    <line x1="75" y1="3745" x2="85" y2="3745" class="line"/>
    <text x="90" y="3750" class="icon">📁</text>
    <text x="115" y="3750" class="folder-text">(store)/</text>
    <line x1="105" y1="3765" x2="105" y2="3775" class="line"/>
    <line x1="105" y1="3775" x2="115" y2="3775" class="line"/>
    <text x="120" y="3780" class="icon">📁</text>
    <text x="145" y="3780" class="folder-text">about/</text>
    <line x1="135" y1="3795" x2="135" y2="3805" class="line"/>
    <line x1="135" y1="3805" x2="145" y2="3805" class="line"/>
    <text x="150" y="3810" class="icon">📄</text>
    <text x="175" y="3810" class="file-text">loading.tsx</text>
    <line x1="135" y1="3830" x2="135" y2="3840" class="line"/>
    <line x1="135" y1="3840" x2="145" y2="3840" class="line"/>
    <text x="150" y="3845" class="icon">📄</text>
    <text x="175" y="3845" class="file-text">page.tsx</text>
    <line x1="105" y1="3900" x2="105" y2="3910" class="line"/>
    <line x1="105" y1="3910" x2="115" y2="3910" class="line"/>
    <text x="120" y="3915" class="icon">📁</text>
    <text x="145" y="3915" class="folder-text">checkout/</text>
    <line x1="135" y1="3930" x2="135" y2="3940" class="line"/>
    <line x1="135" y1="3940" x2="145" y2="3940" class="line"/>
    <text x="150" y="3945" class="icon">📄</text>
    <text x="175" y="3945" class="file-text">loading.tsx</text>
    <line x1="135" y1="3965" x2="135" y2="3975" class="line"/>
    <line x1="135" y1="3975" x2="145" y2="3975" class="line"/>
    <text x="150" y="3980" class="icon">📄</text>
    <text x="175" y="3980" class="file-text">page.tsx</text>
    <line x1="105" y1="4035" x2="105" y2="4045" class="line"/>
    <line x1="105" y1="4045" x2="115" y2="4045" class="line"/>
    <text x="120" y="4050" class="icon">📁</text>
    <text x="145" y="4050" class="folder-text">collections/</text>
    <line x1="135" y1="4065" x2="135" y2="4075" class="line"/>
    <line x1="135" y1="4075" x2="145" y2="4075" class="line"/>
    <text x="150" y="4080" class="icon">📁</text>
    <text x="175" y="4080" class="folder-text">[slug]/</text>
    <line x1="165" y1="4095" x2="165" y2="4105" class="line"/>
    <line x1="165" y1="4105" x2="175" y2="4105" class="line"/>
    <text x="180" y="4110" class="icon">📄</text>
    <text x="205" y="4110" class="file-text">loading.tsx</text>
    <line x1="165" y1="4130" x2="165" y2="4140" class="line"/>
    <line x1="165" y1="4140" x2="175" y2="4140" class="line"/>
    <text x="180" y="4145" class="icon">📄</text>
    <text x="205" y="4145" class="file-text">page.tsx</text>
    <line x1="105" y1="4235" x2="105" y2="4245" class="line"/>
    <line x1="105" y1="4245" x2="115" y2="4245" class="line"/>
    <text x="120" y="4250" class="icon">📁</text>
    <text x="145" y="4250" class="folder-text">contact/</text>
    <line x1="135" y1="4265" x2="135" y2="4275" class="line"/>
    <line x1="135" y1="4275" x2="145" y2="4275" class="line"/>
    <text x="150" y="4280" class="icon">📄</text>
    <text x="175" y="4280" class="file-text">loading.tsx</text>
    <line x1="135" y1="4300" x2="135" y2="4310" class="line"/>
    <line x1="135" y1="4310" x2="145" y2="4310" class="line"/>
    <text x="150" y="4315" class="icon">📄</text>
    <text x="175" y="4315" class="file-text">page.tsx</text>
    <line x1="105" y1="4370" x2="105" y2="4380" class="line"/>
    <line x1="105" y1="4380" x2="115" y2="4380" class="line"/>
    <text x="120" y="4385" class="icon">📁</text>
    <text x="145" y="4385" class="folder-text">order-success/</text>
    <line x1="135" y1="4400" x2="135" y2="4410" class="line"/>
    <line x1="135" y1="4410" x2="145" y2="4410" class="line"/>
    <text x="150" y="4415" class="icon">📁</text>
    <text x="175" y="4415" class="folder-text">[orderNumber]/</text>
    <line x1="165" y1="4430" x2="165" y2="4440" class="line"/>
    <line x1="165" y1="4440" x2="175" y2="4440" class="line"/>
    <text x="180" y="4445" class="icon">📄</text>
    <text x="205" y="4445" class="file-text">loading.tsx</text>
    <line x1="165" y1="4465" x2="165" y2="4475" class="line"/>
    <line x1="165" y1="4475" x2="175" y2="4475" class="line"/>
    <text x="180" y="4480" class="icon">📄</text>
    <text x="205" y="4480" class="file-text">page.tsx</text>
    <line x1="105" y1="4570" x2="105" y2="4580" class="line"/>
    <line x1="105" y1="4580" x2="115" y2="4580" class="line"/>
    <text x="120" y="4585" class="icon">📁</text>
    <text x="145" y="4585" class="folder-text">policies/</text>
    <line x1="135" y1="4600" x2="135" y2="4610" class="line"/>
    <line x1="135" y1="4610" x2="145" y2="4610" class="line"/>
    <text x="150" y="4615" class="icon">📁</text>
    <text x="175" y="4615" class="folder-text">[slug]/</text>
    <line x1="165" y1="4630" x2="165" y2="4640" class="line"/>
    <line x1="165" y1="4640" x2="175" y2="4640" class="line"/>
    <text x="180" y="4645" class="icon">📄</text>
    <text x="205" y="4645" class="file-text">loading.tsx</text>
    <line x1="165" y1="4665" x2="165" y2="4675" class="line"/>
    <line x1="165" y1="4675" x2="175" y2="4675" class="line"/>
    <text x="180" y="4680" class="icon">📄</text>
    <text x="205" y="4680" class="file-text">page.tsx</text>
    <line x1="105" y1="4770" x2="105" y2="4780" class="line"/>
    <line x1="105" y1="4780" x2="115" y2="4780" class="line"/>
    <text x="120" y="4785" class="icon">📁</text>
    <text x="145" y="4785" class="folder-text">products/</text>
    <line x1="135" y1="4800" x2="135" y2="4810" class="line"/>
    <line x1="135" y1="4810" x2="145" y2="4810" class="line"/>
    <text x="150" y="4815" class="icon">📁</text>
    <text x="175" y="4815" class="folder-text">[slug]/</text>
    <line x1="165" y1="4830" x2="165" y2="4840" class="line"/>
    <line x1="165" y1="4840" x2="175" y2="4840" class="line"/>
    <text x="180" y="4845" class="icon">📄</text>
    <text x="205" y="4845" class="file-text">loading.tsx</text>
    <line x1="165" y1="4865" x2="165" y2="4875" class="line"/>
    <line x1="165" y1="4875" x2="175" y2="4875" class="line"/>
    <text x="180" y="4880" class="icon">📄</text>
    <text x="205" y="4880" class="file-text">page.tsx</text>
    <line x1="165" y1="4900" x2="165" y2="4910" class="line"/>
    <line x1="165" y1="4910" x2="175" y2="4910" class="line"/>
    <text x="180" y="4915" class="icon">📄</text>
    <text x="205" y="4915" class="file-text">review-actions.ts</text>
    <line x1="105" y1="5005" x2="105" y2="5015" class="line"/>
    <line x1="105" y1="5015" x2="115" y2="5015" class="line"/>
    <text x="120" y="5020" class="icon">📁</text>
    <text x="145" y="5020" class="folder-text">track-order/</text>
    <line x1="135" y1="5035" x2="135" y2="5045" class="line"/>
    <line x1="135" y1="5045" x2="145" y2="5045" class="line"/>
    <text x="150" y="5050" class="icon">📄</text>
    <text x="175" y="5050" class="file-text">loading.tsx</text>
    <line x1="135" y1="5070" x2="135" y2="5080" class="line"/>
    <line x1="135" y1="5080" x2="145" y2="5080" class="line"/>
    <text x="150" y="5085" class="icon">📄</text>
    <text x="175" y="5085" class="file-text">page.tsx</text>
    <line x1="105" y1="5140" x2="105" y2="5150" class="line"/>
    <line x1="105" y1="5150" x2="115" y2="5150" class="line"/>
    <text x="120" y="5155" class="icon">📄</text>
    <text x="145" y="5155" class="file-text">error.tsx</text>
    <line x1="105" y1="5175" x2="105" y2="5185" class="line"/>
    <line x1="105" y1="5185" x2="115" y2="5185" class="line"/>
    <text x="120" y="5190" class="icon">📄</text>
    <text x="145" y="5190" class="file-text">layout.tsx</text>
    <line x1="105" y1="5210" x2="105" y2="5220" class="line"/>
    <line x1="105" y1="5220" x2="115" y2="5220" class="line"/>
    <text x="120" y="5225" class="icon">📄</text>
    <text x="145" y="5225" class="file-text">loading.tsx</text>
    <line x1="105" y1="5245" x2="105" y2="5255" class="line"/>
    <line x1="105" y1="5255" x2="115" y2="5255" class="line"/>
    <text x="120" y="5260" class="icon">📄</text>
    <text x="145" y="5260" class="file-text">not-found.tsx</text>
    <line x1="105" y1="5280" x2="105" y2="5290" class="line"/>
    <line x1="105" y1="5290" x2="115" y2="5290" class="line"/>
    <text x="120" y="5295" class="icon">📄</text>
    <text x="145" y="5295" class="file-text">page.tsx</text>
    <line x1="75" y1="5350" x2="75" y2="5360" class="line"/>
    <line x1="75" y1="5360" x2="85" y2="5360" class="line"/>
    <text x="90" y="5365" class="icon">📁</text>
    <text x="115" y="5365" class="folder-text">admin/</text>
    <line x1="105" y1="5380" x2="105" y2="5390" class="line"/>
    <line x1="105" y1="5390" x2="115" y2="5390" class="line"/>
    <text x="120" y="5395" class="icon">📁</text>
    <text x="145" y="5395" class="folder-text">(dashboard)/</text>
    <line x1="135" y1="5410" x2="135" y2="5420" class="line"/>
    <line x1="135" y1="5420" x2="145" y2="5420" class="line"/>
    <text x="150" y="5425" class="icon">📁</text>
    <text x="175" y="5425" class="folder-text">account/</text>
    <line x1="165" y1="5440" x2="165" y2="5450" class="line"/>
    <line x1="165" y1="5450" x2="175" y2="5450" class="line"/>
    <text x="180" y="5455" class="icon">📄</text>
    <text x="205" y="5455" class="file-text">actions.ts</text>
    <line x1="165" y1="5475" x2="165" y2="5485" class="line"/>
    <line x1="165" y1="5485" x2="175" y2="5485" class="line"/>
    <text x="180" y="5490" class="icon">📄</text>
    <text x="205" y="5490" class="file-text">page.tsx</text>
    <line x1="135" y1="5545" x2="135" y2="5555" class="line"/>
    <line x1="135" y1="5555" x2="145" y2="5555" class="line"/>
    <text x="150" y="5560" class="icon">📁</text>
    <text x="175" y="5560" class="folder-text">categories/</text>
    <line x1="165" y1="5575" x2="165" y2="5585" class="line"/>
    <line x1="165" y1="5585" x2="175" y2="5585" class="line"/>
    <text x="180" y="5590" class="icon">📄</text>
    <text x="205" y="5590" class="file-text">actions.ts</text>
    <line x1="165" y1="5610" x2="165" y2="5620" class="line"/>
    <line x1="165" y1="5620" x2="175" y2="5620" class="line"/>
    <text x="180" y="5625" class="icon">📄</text>
    <text x="205" y="5625" class="file-text">page.tsx</text>
    <line x1="135" y1="5680" x2="135" y2="5690" class="line"/>
    <line x1="135" y1="5690" x2="145" y2="5690" class="line"/>
    <text x="150" y="5695" class="icon">📁</text>
    <text x="175" y="5695" class="folder-text">orders/</text>
    <line x1="165" y1="5710" x2="165" y2="5720" class="line"/>
    <line x1="165" y1="5720" x2="175" y2="5720" class="line"/>
    <text x="180" y="5725" class="icon">📁</text>
    <text x="205" y="5725" class="folder-text">[id]/</text>
    <line x1="195" y1="5740" x2="195" y2="5750" class="line"/>
    <line x1="195" y1="5750" x2="205" y2="5750" class="line"/>
    <text x="210" y="5755" class="icon">📄</text>
    <text x="235" y="5755" class="file-text">page.tsx</text>
    <line x1="165" y1="5810" x2="165" y2="5820" class="line"/>
    <line x1="165" y1="5820" x2="175" y2="5820" class="line"/>
    <text x="180" y="5825" class="icon">📄</text>
    <text x="205" y="5825" class="file-text">actions.ts</text>
    <line x1="165" y1="5845" x2="165" y2="5855" class="line"/>
    <line x1="165" y1="5855" x2="175" y2="5855" class="line"/>
    <text x="180" y="5860" class="icon">📄</text>
    <text x="205" y="5860" class="file-text">loading.tsx</text>
    <line x1="165" y1="5880" x2="165" y2="5890" class="line"/>
    <line x1="165" y1="5890" x2="175" y2="5890" class="line"/>
    <text x="180" y="5895" class="icon">📄</text>
    <text x="205" y="5895" class="file-text">page.tsx</text>
    <line x1="135" y1="5950" x2="135" y2="5960" class="line"/>
    <line x1="135" y1="5960" x2="145" y2="5960" class="line"/>
    <text x="150" y="5965" class="icon">📁</text>
    <text x="175" y="5965" class="folder-text">pages/</text>
    <line x1="165" y1="5980" x2="165" y2="5990" class="line"/>
    <line x1="165" y1="5990" x2="175" y2="5990" class="line"/>
    <text x="180" y="5995" class="icon">📁</text>
    <text x="205" y="5995" class="folder-text">[slug]/</text>
    <line x1="195" y1="6010" x2="195" y2="6020" class="line"/>
    <line x1="195" y1="6020" x2="205" y2="6020" class="line"/>
    <text x="210" y="6025" class="icon">📄</text>
    <text x="235" y="6025" class="file-text">page.tsx</text>
    <line x1="165" y1="6080" x2="165" y2="6090" class="line"/>
    <line x1="165" y1="6090" x2="175" y2="6090" class="line"/>
    <text x="180" y="6095" class="icon">📄</text>
    <text x="205" y="6095" class="file-text">actions.ts</text>
    <line x1="165" y1="6115" x2="165" y2="6125" class="line"/>
    <line x1="165" y1="6125" x2="175" y2="6125" class="line"/>
    <text x="180" y="6130" class="icon">📄</text>
    <text x="205" y="6130" class="file-text">page.tsx</text>
    <line x1="135" y1="6185" x2="135" y2="6195" class="line"/>
    <line x1="135" y1="6195" x2="145" y2="6195" class="line"/>
    <text x="150" y="6200" class="icon">📁</text>
    <text x="175" y="6200" class="folder-text">products/</text>
    <line x1="165" y1="6215" x2="165" y2="6225" class="line"/>
    <line x1="165" y1="6225" x2="175" y2="6225" class="line"/>
    <text x="180" y="6230" class="icon">📁</text>
    <text x="205" y="6230" class="folder-text">[id]/</text>
    <line x1="195" y1="6245" x2="195" y2="6255" class="line"/>
    <line x1="195" y1="6255" x2="205" y2="6255" class="line"/>
    <text x="210" y="6260" class="icon">📄</text>
    <text x="235" y="6260" class="file-text">page.tsx</text>
    <line x1="165" y1="6315" x2="165" y2="6325" class="line"/>
    <line x1="165" y1="6325" x2="175" y2="6325" class="line"/>
    <text x="180" y="6330" class="icon">📁</text>
    <text x="205" y="6330" class="folder-text">new/</text>
    <line x1="195" y1="6345" x2="195" y2="6355" class="line"/>
    <line x1="195" y1="6355" x2="205" y2="6355" class="line"/>
    <text x="210" y="6360" class="icon">📄</text>
    <text x="235" y="6360" class="file-text">page.tsx</text>
    <line x1="165" y1="6415" x2="165" y2="6425" class="line"/>
    <line x1="165" y1="6425" x2="175" y2="6425" class="line"/>
    <text x="180" y="6430" class="icon">📄</text>
    <text x="205" y="6430" class="file-text">actions.ts</text>
    <line x1="165" y1="6450" x2="165" y2="6460" class="line"/>
    <line x1="165" y1="6460" x2="175" y2="6460" class="line"/>
    <text x="180" y="6465" class="icon">📄</text>
    <text x="205" y="6465" class="file-text">loading.tsx</text>
    <line x1="165" y1="6485" x2="165" y2="6495" class="line"/>
    <line x1="165" y1="6495" x2="175" y2="6495" class="line"/>
    <text x="180" y="6500" class="icon">📄</text>
    <text x="205" y="6500" class="file-text">page.tsx</text>
    <line x1="135" y1="6555" x2="135" y2="6565" class="line"/>
    <line x1="135" y1="6565" x2="145" y2="6565" class="line"/>
    <text x="150" y="6570" class="icon">📁</text>
    <text x="175" y="6570" class="folder-text">reviews/</text>
    <line x1="165" y1="6585" x2="165" y2="6595" class="line"/>
    <line x1="165" y1="6595" x2="175" y2="6595" class="line"/>
    <text x="180" y="6600" class="icon">📄</text>
    <text x="205" y="6600" class="file-text">actions.ts</text>
    <line x1="165" y1="6620" x2="165" y2="6630" class="line"/>
    <line x1="165" y1="6630" x2="175" y2="6630" class="line"/>
    <text x="180" y="6635" class="icon">📄</text>
    <text x="205" y="6635" class="file-text">page.tsx</text>
    <line x1="135" y1="6690" x2="135" y2="6700" class="line"/>
    <line x1="135" y1="6700" x2="145" y2="6700" class="line"/>
    <text x="150" y="6705" class="icon">📁</text>
    <text x="175" y="6705" class="folder-text">settings/</text>
    <line x1="165" y1="6720" x2="165" y2="6730" class="line"/>
    <line x1="165" y1="6730" x2="175" y2="6730" class="line"/>
    <text x="180" y="6735" class="icon">📄</text>
    <text x="205" y="6735" class="file-text">actions.ts</text>
    <line x1="165" y1="6755" x2="165" y2="6765" class="line"/>
    <line x1="165" y1="6765" x2="175" y2="6765" class="line"/>
    <text x="180" y="6770" class="icon">📄</text>
    <text x="205" y="6770" class="file-text">page.tsx</text>
    <line x1="135" y1="6825" x2="135" y2="6835" class="line"/>
    <line x1="135" y1="6835" x2="145" y2="6835" class="line"/>
    <text x="150" y="6840" class="icon">📄</text>
    <text x="175" y="6840" class="file-text">layout.tsx</text>
    <line x1="135" y1="6860" x2="135" y2="6870" class="line"/>
    <line x1="135" y1="6870" x2="145" y2="6870" class="line"/>
    <text x="150" y="6875" class="icon">📄</text>
    <text x="175" y="6875" class="file-text">loading.tsx</text>
    <line x1="135" y1="6895" x2="135" y2="6905" class="line"/>
    <line x1="135" y1="6905" x2="145" y2="6905" class="line"/>
    <text x="150" y="6910" class="icon">📄</text>
    <text x="175" y="6910" class="file-text">page.tsx</text>
    <line x1="105" y1="6965" x2="105" y2="6975" class="line"/>
    <line x1="105" y1="6975" x2="115" y2="6975" class="line"/>
    <text x="120" y="6980" class="icon">📁</text>
    <text x="145" y="6980" class="folder-text">forgot-password/</text>
    <line x1="135" y1="6995" x2="135" y2="7005" class="line"/>
    <line x1="135" y1="7005" x2="145" y2="7005" class="line"/>
    <text x="150" y="7010" class="icon">📄</text>
    <text x="175" y="7010" class="file-text">page.tsx</text>
    <line x1="105" y1="7065" x2="105" y2="7075" class="line"/>
    <line x1="105" y1="7075" x2="115" y2="7075" class="line"/>
    <text x="120" y="7080" class="icon">📁</text>
    <text x="145" y="7080" class="folder-text">login/</text>
    <line x1="135" y1="7095" x2="135" y2="7105" class="line"/>
    <line x1="135" y1="7105" x2="145" y2="7105" class="line"/>
    <text x="150" y="7110" class="icon">📄</text>
    <text x="175" y="7110" class="file-text">page.tsx</text>
    <line x1="105" y1="7165" x2="105" y2="7175" class="line"/>
    <line x1="105" y1="7175" x2="115" y2="7175" class="line"/>
    <text x="120" y="7180" class="icon">📁</text>
    <text x="145" y="7180" class="folder-text">reset-password/</text>
    <line x1="135" y1="7195" x2="135" y2="7205" class="line"/>
    <line x1="135" y1="7205" x2="145" y2="7205" class="line"/>
    <text x="150" y="7210" class="icon">📄</text>
    <text x="175" y="7210" class="file-text">page.tsx</text>
    <line x1="105" y1="7265" x2="105" y2="7275" class="line"/>
    <line x1="105" y1="7275" x2="115" y2="7275" class="line"/>
    <text x="120" y="7280" class="icon">📁</text>
    <text x="145" y="7280" class="folder-text">session-expired/</text>
    <line x1="135" y1="7295" x2="135" y2="7305" class="line"/>
    <line x1="135" y1="7305" x2="145" y2="7305" class="line"/>
    <text x="150" y="7310" class="icon">📄</text>
    <text x="175" y="7310" class="file-text">page.tsx</text>
    <line x1="105" y1="7365" x2="105" y2="7375" class="line"/>
    <line x1="105" y1="7375" x2="115" y2="7375" class="line"/>
    <text x="120" y="7380" class="icon">📄</text>
    <text x="145" y="7380" class="file-text">error.tsx</text>
    <line x1="75" y1="7435" x2="75" y2="7445" class="line"/>
    <line x1="75" y1="7445" x2="85" y2="7445" class="line"/>
    <text x="90" y="7450" class="icon">📁</text>
    <text x="115" y="7450" class="folder-text">api/</text>
    <line x1="105" y1="7465" x2="105" y2="7475" class="line"/>
    <line x1="105" y1="7475" x2="115" y2="7475" class="line"/>
    <text x="120" y="7480" class="icon">📁</text>
    <text x="145" y="7480" class="folder-text">admin/</text>
    <line x1="135" y1="7495" x2="135" y2="7505" class="line"/>
    <line x1="135" y1="7505" x2="145" y2="7505" class="line"/>
    <text x="150" y="7510" class="icon">📁</text>
    <text x="175" y="7510" class="folder-text">auth/</text>
    <line x1="165" y1="7525" x2="165" y2="7535" class="line"/>
    <line x1="165" y1="7535" x2="175" y2="7535" class="line"/>
    <text x="180" y="7540" class="icon">📁</text>
    <text x="205" y="7540" class="folder-text">forgot-password/</text>
    <line x1="195" y1="7555" x2="195" y2="7565" class="line"/>
    <line x1="195" y1="7565" x2="205" y2="7565" class="line"/>
    <text x="210" y="7570" class="icon">📄</text>
    <text x="235" y="7570" class="file-text">route.ts</text>
    <line x1="165" y1="7625" x2="165" y2="7635" class="line"/>
    <line x1="165" y1="7635" x2="175" y2="7635" class="line"/>
    <text x="180" y="7640" class="icon">📁</text>
    <text x="205" y="7640" class="folder-text">login/</text>
    <line x1="195" y1="7655" x2="195" y2="7665" class="line"/>
    <line x1="195" y1="7665" x2="205" y2="7665" class="line"/>
    <text x="210" y="7670" class="icon">📄</text>
    <text x="235" y="7670" class="file-text">route.ts</text>
    <line x1="165" y1="7725" x2="165" y2="7735" class="line"/>
    <line x1="165" y1="7735" x2="175" y2="7735" class="line"/>
    <text x="180" y="7740" class="icon">📁</text>
    <text x="205" y="7740" class="folder-text">logout/</text>
    <line x1="195" y1="7755" x2="195" y2="7765" class="line"/>
    <line x1="195" y1="7765" x2="205" y2="7765" class="line"/>
    <text x="210" y="7770" class="icon">📄</text>
    <text x="235" y="7770" class="file-text">route.ts</text>
    <line x1="165" y1="7825" x2="165" y2="7835" class="line"/>
    <line x1="165" y1="7835" x2="175" y2="7835" class="line"/>
    <text x="180" y="7840" class="icon">📁</text>
    <text x="205" y="7840" class="folder-text">reset-password/</text>
    <line x1="195" y1="7855" x2="195" y2="7865" class="line"/>
    <line x1="195" y1="7865" x2="205" y2="7865" class="line"/>
    <text x="210" y="7870" class="icon">📄</text>
    <text x="235" y="7870" class="file-text">route.ts</text>
    <line x1="135" y1="7960" x2="135" y2="7970" class="line"/>
    <line x1="135" y1="7970" x2="145" y2="7970" class="line"/>
    <text x="150" y="7975" class="icon">📁</text>
    <text x="175" y="7975" class="folder-text">uploads/</text>
    <line x1="165" y1="7990" x2="165" y2="8000" class="line"/>
    <line x1="165" y1="8000" x2="175" y2="8000" class="line"/>
    <text x="180" y="8005" class="icon">📁</text>
    <text x="205" y="8005" class="folder-text">sign/</text>
    <line x1="195" y1="8020" x2="195" y2="8030" class="line"/>
    <line x1="195" y1="8030" x2="205" y2="8030" class="line"/>
    <text x="210" y="8035" class="icon">📄</text>
    <text x="235" y="8035" class="file-text">route.ts</text>
    <line x1="105" y1="8160" x2="105" y2="8170" class="line"/>
    <line x1="105" y1="8170" x2="115" y2="8170" class="line"/>
    <text x="120" y="8175" class="icon">📁</text>
    <text x="145" y="8175" class="folder-text">orders/</text>
    <line x1="135" y1="8190" x2="135" y2="8200" class="line"/>
    <line x1="135" y1="8200" x2="145" y2="8200" class="line"/>
    <text x="150" y="8205" class="icon">📁</text>
    <text x="175" y="8205" class="folder-text">track/</text>
    <line x1="165" y1="8220" x2="165" y2="8230" class="line"/>
    <line x1="165" y1="8230" x2="175" y2="8230" class="line"/>
    <text x="180" y="8235" class="icon">📄</text>
    <text x="205" y="8235" class="file-text">route.ts</text>
    <line x1="135" y1="8290" x2="135" y2="8300" class="line"/>
    <line x1="135" y1="8300" x2="145" y2="8300" class="line"/>
    <text x="150" y="8305" class="icon">📄</text>
    <text x="175" y="8305" class="file-text">route.ts</text>
    <line x1="105" y1="8360" x2="105" y2="8370" class="line"/>
    <line x1="105" y1="8370" x2="115" y2="8370" class="line"/>
    <text x="120" y="8375" class="icon">📁</text>
    <text x="145" y="8375" class="folder-text">reviews/</text>
    <line x1="135" y1="8390" x2="135" y2="8400" class="line"/>
    <line x1="135" y1="8400" x2="145" y2="8400" class="line"/>
    <text x="150" y="8405" class="icon">📁</text>
    <text x="175" y="8405" class="folder-text">upload/</text>
    <line x1="165" y1="8420" x2="165" y2="8430" class="line"/>
    <line x1="165" y1="8430" x2="175" y2="8430" class="line"/>
    <text x="180" y="8435" class="icon">📄</text>
    <text x="205" y="8435" class="file-text">route.ts</text>
    <line x1="75" y1="8560" x2="75" y2="8570" class="line"/>
    <line x1="75" y1="8570" x2="85" y2="8570" class="line"/>
    <text x="90" y="8575" class="icon">📁</text>
    <text x="115" y="8575" class="folder-text">forbidden/</text>
    <line x1="105" y1="8590" x2="105" y2="8600" class="line"/>
    <line x1="105" y1="8600" x2="115" y2="8600" class="line"/>
    <text x="120" y="8605" class="icon">📄</text>
    <text x="145" y="8605" class="file-text">page.tsx</text>
    <line x1="75" y1="8660" x2="75" y2="8670" class="line"/>
    <line x1="75" y1="8670" x2="85" y2="8670" class="line"/>
    <text x="90" y="8675" class="icon">🖼️</text>
    <text x="115" y="8675" class="file-text">apple-icon.png</text>
    <line x1="75" y1="8695" x2="75" y2="8705" class="line"/>
    <line x1="75" y1="8705" x2="85" y2="8705" class="line"/>
    <text x="90" y="8710" class="icon">📄</text>
    <text x="115" y="8710" class="file-text">global-error.tsx</text>
    <line x1="75" y1="8730" x2="75" y2="8740" class="line"/>
    <line x1="75" y1="8740" x2="85" y2="8740" class="line"/>
    <text x="90" y="8745" class="icon">🎨</text>
    <text x="115" y="8745" class="file-text">globals.css</text>
    <line x1="75" y1="8765" x2="75" y2="8775" class="line"/>
    <line x1="75" y1="8775" x2="85" y2="8775" class="line"/>
    <text x="90" y="8780" class="icon">🖼️</text>
    <text x="115" y="8780" class="file-text">icon.png</text>
    <line x1="75" y1="8800" x2="75" y2="8810" class="line"/>
    <line x1="75" y1="8810" x2="85" y2="8810" class="line"/>
    <text x="90" y="8815" class="icon">📄</text>
    <text x="115" y="8815" class="file-text">layout.tsx</text>
    <line x1="75" y1="8835" x2="75" y2="8845" class="line"/>
    <line x1="75" y1="8845" x2="85" y2="8845" class="line"/>
    <text x="90" y="8850" class="icon">📄</text>
    <text x="115" y="8850" class="file-text">not-found.tsx</text>
    <line x1="75" y1="8870" x2="75" y2="8880" class="line"/>
    <line x1="75" y1="8880" x2="85" y2="8880" class="line"/>
    <text x="90" y="8885" class="icon">🖼️</text>
    <text x="115" y="8885" class="file-text">opengraph-image.png</text>
    <line x1="75" y1="8905" x2="75" y2="8915" class="line"/>
    <line x1="75" y1="8915" x2="85" y2="8915" class="line"/>
    <text x="90" y="8920" class="icon">📄</text>
    <text x="115" y="8920" class="file-text">robots.ts</text>
    <line x1="75" y1="8940" x2="75" y2="8950" class="line"/>
    <line x1="75" y1="8950" x2="85" y2="8950" class="line"/>
    <text x="90" y="8955" class="icon">📄</text>
    <text x="115" y="8955" class="file-text">sitemap.ts</text>
    <line x1="45" y1="9010" x2="45" y2="9020" class="line"/>
    <line x1="45" y1="9020" x2="55" y2="9020" class="line"/>
    <text x="60" y="9025" class="icon">📁</text>
    <text x="85" y="9025" class="folder-text">components/</text>
    <line x1="75" y1="9040" x2="75" y2="9050" class="line"/>
    <line x1="75" y1="9050" x2="85" y2="9050" class="line"/>
    <text x="90" y="9055" class="icon">📁</text>
    <text x="115" y="9055" class="folder-text">admin/</text>
    <line x1="105" y1="9070" x2="105" y2="9080" class="line"/>
    <line x1="105" y1="9080" x2="115" y2="9080" class="line"/>
    <text x="120" y="9085" class="icon">📄</text>
    <text x="145" y="9085" class="file-text">admin-login-form.tsx</text>
    <line x1="105" y1="9105" x2="105" y2="9115" class="line"/>
    <line x1="105" y1="9115" x2="115" y2="9115" class="line"/>
    <text x="120" y="9120" class="icon">📄</text>
    <text x="145" y="9120" class="file-text">admin-nav.tsx</text>
    <line x1="105" y1="9140" x2="105" y2="9150" class="line"/>
    <line x1="105" y1="9150" x2="115" y2="9150" class="line"/>
    <text x="120" y="9155" class="icon">📄</text>
    <text x="145" y="9155" class="file-text">category-form.tsx</text>
    <line x1="105" y1="9175" x2="105" y2="9185" class="line"/>
    <line x1="105" y1="9185" x2="115" y2="9185" class="line"/>
    <text x="120" y="9190" class="icon">📄</text>
    <text x="145" y="9190" class="file-text">change-email-form.tsx</text>
    <line x1="105" y1="9210" x2="105" y2="9220" class="line"/>
    <line x1="105" y1="9220" x2="115" y2="9220" class="line"/>
    <text x="120" y="9225" class="icon">📄</text>
    <text x="145" y="9225" class="file-text">change-password-form.tsx</text>
    <line x1="105" y1="9245" x2="105" y2="9255" class="line"/>
    <line x1="105" y1="9255" x2="115" y2="9255" class="line"/>
    <text x="120" y="9260" class="icon">📄</text>
    <text x="145" y="9260" class="file-text">clear-stale-session.tsx</text>
    <line x1="105" y1="9280" x2="105" y2="9290" class="line"/>
    <line x1="105" y1="9290" x2="115" y2="9290" class="line"/>
    <text x="120" y="9295" class="icon">📄</text>
    <text x="145" y="9295" class="file-text">forgot-password-form.tsx</text>
    <line x1="105" y1="9315" x2="105" y2="9325" class="line"/>
    <line x1="105" y1="9325" x2="115" y2="9325" class="line"/>
    <text x="120" y="9330" class="icon">📄</text>
    <text x="145" y="9330" class="file-text">image-uploader.tsx</text>
    <line x1="105" y1="9350" x2="105" y2="9360" class="line"/>
    <line x1="105" y1="9360" x2="115" y2="9360" class="line"/>
    <text x="120" y="9365" class="icon">📄</text>
    <text x="145" y="9365" class="file-text">logout-button.tsx</text>
    <line x1="105" y1="9385" x2="105" y2="9395" class="line"/>
    <line x1="105" y1="9395" x2="115" y2="9395" class="line"/>
    <text x="120" y="9400" class="icon">📄</text>
    <text x="145" y="9400" class="file-text">order-status-form.tsx</text>
    <line x1="105" y1="9420" x2="105" y2="9430" class="line"/>
    <line x1="105" y1="9430" x2="115" y2="9430" class="line"/>
    <text x="120" y="9435" class="icon">📄</text>
    <text x="145" y="9435" class="file-text">page-edit-form.tsx</text>
    <line x1="105" y1="9455" x2="105" y2="9465" class="line"/>
    <line x1="105" y1="9465" x2="115" y2="9465" class="line"/>
    <text x="120" y="9470" class="icon">📄</text>
    <text x="145" y="9470" class="file-text">page-header.tsx</text>
    <line x1="105" y1="9490" x2="105" y2="9500" class="line"/>
    <line x1="105" y1="9500" x2="115" y2="9500" class="line"/>
    <text x="120" y="9505" class="icon">📄</text>
    <text x="145" y="9505" class="file-text">product-form.tsx</text>
    <line x1="105" y1="9525" x2="105" y2="9535" class="line"/>
    <line x1="105" y1="9535" x2="115" y2="9535" class="line"/>
    <text x="120" y="9540" class="icon">📄</text>
    <text x="145" y="9540" class="file-text">reset-password-form.tsx</text>
    <line x1="105" y1="9560" x2="105" y2="9570" class="line"/>
    <line x1="105" y1="9570" x2="115" y2="9570" class="line"/>
    <text x="120" y="9575" class="icon">📄</text>
    <text x="145" y="9575" class="file-text">reviews-manager.tsx</text>
    <line x1="105" y1="9595" x2="105" y2="9605" class="line"/>
    <line x1="105" y1="9605" x2="115" y2="9605" class="line"/>
    <text x="120" y="9610" class="icon">📄</text>
    <text x="145" y="9610" class="file-text">settings-form.tsx</text>
    <line x1="105" y1="9630" x2="105" y2="9640" class="line"/>
    <line x1="105" y1="9640" x2="115" y2="9640" class="line"/>
    <text x="120" y="9645" class="icon">📄</text>
    <text x="145" y="9645" class="file-text">table-skeleton.tsx</text>
    <line x1="105" y1="9665" x2="105" y2="9675" class="line"/>
    <line x1="105" y1="9675" x2="115" y2="9675" class="line"/>
    <text x="120" y="9680" class="icon">📄</text>
    <text x="145" y="9680" class="file-text">ui.tsx</text>
    <line x1="75" y1="9735" x2="75" y2="9745" class="line"/>
    <line x1="75" y1="9745" x2="85" y2="9745" class="line"/>
    <text x="90" y="9750" class="icon">📁</text>
    <text x="115" y="9750" class="folder-text">store/</text>
    <line x1="105" y1="9765" x2="105" y2="9775" class="line"/>
    <line x1="105" y1="9775" x2="115" y2="9775" class="line"/>
    <text x="120" y="9780" class="icon">📄</text>
    <text x="145" y="9780" class="file-text">add-to-cart-button.tsx</text>
    <line x1="105" y1="9800" x2="105" y2="9810" class="line"/>
    <line x1="105" y1="9810" x2="115" y2="9810" class="line"/>
    <text x="120" y="9815" class="icon">📄</text>
    <text x="145" y="9815" class="file-text">art.tsx</text>
    <line x1="105" y1="9835" x2="105" y2="9845" class="line"/>
    <line x1="105" y1="9845" x2="115" y2="9845" class="line"/>
    <text x="120" y="9850" class="icon">📄</text>
    <text x="145" y="9850" class="file-text">bottom-nav.tsx</text>
    <line x1="105" y1="9870" x2="105" y2="9880" class="line"/>
    <line x1="105" y1="9880" x2="115" y2="9880" class="line"/>
    <text x="120" y="9885" class="icon">📄</text>
    <text x="145" y="9885" class="file-text">brand-icons.tsx</text>
    <line x1="105" y1="9905" x2="105" y2="9915" class="line"/>
    <line x1="105" y1="9915" x2="115" y2="9915" class="line"/>
    <text x="120" y="9920" class="icon">📄</text>
    <text x="145" y="9920" class="file-text">cart-drawer.tsx</text>
    <line x1="105" y1="9940" x2="105" y2="9950" class="line"/>
    <line x1="105" y1="9950" x2="115" y2="9950" class="line"/>
    <text x="120" y="9955" class="icon">📄</text>
    <text x="145" y="9955" class="file-text">checkout-form.tsx</text>
    <line x1="105" y1="9975" x2="105" y2="9985" class="line"/>
    <line x1="105" y1="9985" x2="115" y2="9985" class="line"/>
    <text x="120" y="9990" class="icon">📄</text>
    <text x="145" y="9990" class="file-text">copy-order-id-button.tsx</text>
    <line x1="105" y1="10010" x2="105" y2="10020" class="line"/>
    <line x1="105" y1="10020" x2="115" y2="10020" class="line"/>
    <text x="120" y="10025" class="icon">📄</text>
    <text x="145" y="10025" class="file-text">header-client.tsx</text>
    <line x1="105" y1="10045" x2="105" y2="10055" class="line"/>
    <line x1="105" y1="10055" x2="115" y2="10055" class="line"/>
    <text x="120" y="10060" class="icon">📄</text>
    <text x="145" y="10060" class="file-text">product-card-image.tsx</text>
    <line x1="105" y1="10080" x2="105" y2="10090" class="line"/>
    <line x1="105" y1="10090" x2="115" y2="10090" class="line"/>
    <text x="120" y="10095" class="icon">📄</text>
    <text x="145" y="10095" class="file-text">product-card.tsx</text>
    <line x1="105" y1="10115" x2="105" y2="10125" class="line"/>
    <line x1="105" y1="10125" x2="115" y2="10125" class="line"/>
    <text x="120" y="10130" class="icon">📄</text>
    <text x="145" y="10130" class="file-text">product-carousel.tsx</text>
    <line x1="105" y1="10150" x2="105" y2="10160" class="line"/>
    <line x1="105" y1="10160" x2="115" y2="10160" class="line"/>
    <text x="120" y="10165" class="icon">📄</text>
    <text x="145" y="10165" class="file-text">product-gallery.tsx</text>
    <line x1="105" y1="10185" x2="105" y2="10195" class="line"/>
    <line x1="105" y1="10195" x2="115" y2="10195" class="line"/>
    <text x="120" y="10200" class="icon">📄</text>
    <text x="145" y="10200" class="file-text">product-purchase.tsx</text>
    <line x1="105" y1="10220" x2="105" y2="10230" class="line"/>
    <line x1="105" y1="10230" x2="115" y2="10230" class="line"/>
    <text x="120" y="10235" class="icon">📄</text>
    <text x="145" y="10235" class="file-text">product-reviews.tsx</text>
    <line x1="105" y1="10255" x2="105" y2="10265" class="line"/>
    <line x1="105" y1="10265" x2="115" y2="10265" class="line"/>
    <text x="120" y="10270" class="icon">📄</text>
    <text x="145" y="10270" class="file-text">site-footer.tsx</text>
    <line x1="105" y1="10290" x2="105" y2="10300" class="line"/>
    <line x1="105" y1="10300" x2="115" y2="10300" class="line"/>
    <text x="120" y="10305" class="icon">📄</text>
    <text x="145" y="10305" class="file-text">site-header.tsx</text>
    <line x1="105" y1="10325" x2="105" y2="10335" class="line"/>
    <line x1="105" y1="10335" x2="115" y2="10335" class="line"/>
    <text x="120" y="10340" class="icon">📄</text>
    <text x="145" y="10340" class="file-text">skeletons.tsx</text>
    <line x1="105" y1="10360" x2="105" y2="10370" class="line"/>
    <line x1="105" y1="10370" x2="115" y2="10370" class="line"/>
    <text x="120" y="10375" class="icon">📄</text>
    <text x="145" y="10375" class="file-text">track-order-form.tsx</text>
    <line x1="75" y1="10430" x2="75" y2="10440" class="line"/>
    <line x1="75" y1="10440" x2="85" y2="10440" class="line"/>
    <text x="90" y="10445" class="icon">📄</text>
    <text x="115" y="10445" class="file-text">connection-banner.tsx</text>
    <line x1="45" y1="10500" x2="45" y2="10510" class="line"/>
    <line x1="45" y1="10510" x2="55" y2="10510" class="line"/>
    <text x="60" y="10515" class="icon">📁</text>
    <text x="85" y="10515" class="folder-text">db/</text>
    <line x1="75" y1="10530" x2="75" y2="10540" class="line"/>
    <line x1="75" y1="10540" x2="85" y2="10540" class="line"/>
    <text x="90" y="10545" class="icon">📁</text>
    <text x="115" y="10545" class="folder-text">migrations/</text>
    <line x1="105" y1="10560" x2="105" y2="10570" class="line"/>
    <line x1="105" y1="10570" x2="115" y2="10570" class="line"/>
    <text x="120" y="10575" class="icon">📁</text>
    <text x="145" y="10575" class="folder-text">meta/</text>
    <line x1="135" y1="10590" x2="135" y2="10600" class="line"/>
    <line x1="135" y1="10600" x2="145" y2="10600" class="line"/>
    <text x="150" y="10605" class="icon">⚙️</text>
    <text x="175" y="10605" class="file-text">0000_snapshot.json</text>
    <line x1="135" y1="10625" x2="135" y2="10635" class="line"/>
    <line x1="135" y1="10635" x2="145" y2="10635" class="line"/>
    <text x="150" y="10640" class="icon">⚙️</text>
    <text x="175" y="10640" class="file-text">0001_snapshot.json</text>
    <line x1="135" y1="10660" x2="135" y2="10670" class="line"/>
    <line x1="135" y1="10670" x2="145" y2="10670" class="line"/>
    <text x="150" y="10675" class="icon">⚙️</text>
    <text x="175" y="10675" class="file-text">_journal.json</text>
    <line x1="105" y1="10730" x2="105" y2="10740" class="line"/>
    <line x1="105" y1="10740" x2="115" y2="10740" class="line"/>
    <text x="120" y="10745" class="icon">📄</text>
    <text x="145" y="10745" class="file-text">0000_public_leo.sql</text>
    <line x1="105" y1="10765" x2="105" y2="10775" class="line"/>
    <line x1="105" y1="10775" x2="115" y2="10775" class="line"/>
    <text x="120" y="10780" class="icon">📄</text>
    <text x="145" y="10780" class="file-text">0001_checkout_constraints_and_hero.sql</text>
    <line x1="75" y1="10835" x2="75" y2="10845" class="line"/>
    <line x1="75" y1="10845" x2="85" y2="10845" class="line"/>
    <text x="90" y="10850" class="icon">📁</text>
    <text x="115" y="10850" class="folder-text">schema/</text>
    <line x1="105" y1="10865" x2="105" y2="10875" class="line"/>
    <line x1="105" y1="10875" x2="115" y2="10875" class="line"/>
    <text x="120" y="10880" class="icon">📄</text>
    <text x="145" y="10880" class="file-text">index.ts</text>
    <line x1="105" y1="10900" x2="105" y2="10910" class="line"/>
    <line x1="105" y1="10910" x2="115" y2="10910" class="line"/>
    <text x="120" y="10915" class="icon">📄</text>
    <text x="145" y="10915" class="file-text">relations.ts</text>
    <line x1="75" y1="10970" x2="75" y2="10980" class="line"/>
    <line x1="75" y1="10980" x2="85" y2="10980" class="line"/>
    <text x="90" y="10985" class="icon">📄</text>
    <text x="115" y="10985" class="file-text">create-first-admin.ts</text>
    <line x1="75" y1="11005" x2="75" y2="11015" class="line"/>
    <line x1="75" y1="11015" x2="85" y2="11015" class="line"/>
    <text x="90" y="11020" class="icon">📄</text>
    <text x="115" y="11020" class="file-text">index.ts</text>
    <line x1="75" y1="11040" x2="75" y2="11050" class="line"/>
    <line x1="75" y1="11050" x2="85" y2="11050" class="line"/>
    <text x="90" y="11055" class="icon">📄</text>
    <text x="115" y="11055" class="file-text">sample-products-core.ts</text>
    <line x1="75" y1="11075" x2="75" y2="11085" class="line"/>
    <line x1="75" y1="11085" x2="85" y2="11085" class="line"/>
    <text x="90" y="11090" class="icon">⚙️</text>
    <text x="115" y="11090" class="file-text">sample-products.json</text>
    <line x1="75" y1="11110" x2="75" y2="11120" class="line"/>
    <line x1="75" y1="11120" x2="85" y2="11120" class="line"/>
    <text x="90" y="11125" class="icon">📄</text>
    <text x="115" y="11125" class="file-text">sample-products.ts</text>
    <line x1="75" y1="11145" x2="75" y2="11155" class="line"/>
    <line x1="75" y1="11155" x2="85" y2="11155" class="line"/>
    <text x="90" y="11160" class="icon">📄</text>
    <text x="115" y="11160" class="file-text">seed.ts</text>
    <line x1="45" y1="11215" x2="45" y2="11225" class="line"/>
    <line x1="45" y1="11225" x2="55" y2="11225" class="line"/>
    <text x="60" y="11230" class="icon">📁</text>
    <text x="85" y="11230" class="folder-text">hooks/</text>
    <line x1="75" y1="11245" x2="75" y2="11255" class="line"/>
    <line x1="75" y1="11255" x2="85" y2="11255" class="line"/>
    <text x="90" y="11260" class="icon">📄</text>
    <text x="115" y="11260" class="file-text">use-online-status.ts</text>
    <line x1="45" y1="11315" x2="45" y2="11325" class="line"/>
    <line x1="45" y1="11325" x2="55" y2="11325" class="line"/>
    <text x="60" y="11330" class="icon">📁</text>
    <text x="85" y="11330" class="folder-text">lib/</text>
    <line x1="75" y1="11345" x2="75" y2="11355" class="line"/>
    <line x1="75" y1="11355" x2="85" y2="11355" class="line"/>
    <text x="90" y="11360" class="icon">📁</text>
    <text x="115" y="11360" class="folder-text">auth/</text>
    <line x1="105" y1="11375" x2="105" y2="11385" class="line"/>
    <line x1="105" y1="11385" x2="115" y2="11385" class="line"/>
    <text x="120" y="11390" class="icon">📄</text>
    <text x="145" y="11390" class="file-text">admin-action.ts</text>
    <line x1="105" y1="11410" x2="105" y2="11420" class="line"/>
    <line x1="105" y1="11420" x2="115" y2="11420" class="line"/>
    <text x="120" y="11425" class="icon">📄</text>
    <text x="145" y="11425" class="file-text">password.ts</text>
    <line x1="105" y1="11445" x2="105" y2="11455" class="line"/>
    <line x1="105" y1="11455" x2="115" y2="11455" class="line"/>
    <text x="120" y="11460" class="icon">📄</text>
    <text x="145" y="11460" class="file-text">require-admin.ts</text>
    <line x1="105" y1="11480" x2="105" y2="11490" class="line"/>
    <line x1="105" y1="11490" x2="115" y2="11490" class="line"/>
    <text x="120" y="11495" class="icon">📄</text>
    <text x="145" y="11495" class="file-text">reset-password.ts</text>
    <line x1="105" y1="11515" x2="105" y2="11525" class="line"/>
    <line x1="105" y1="11525" x2="115" y2="11525" class="line"/>
    <text x="120" y="11530" class="icon">📄</text>
    <text x="145" y="11530" class="file-text">session.ts</text>
    <line x1="75" y1="11585" x2="75" y2="11595" class="line"/>
    <line x1="75" y1="11595" x2="85" y2="11595" class="line"/>
    <text x="90" y="11600" class="icon">📁</text>
    <text x="115" y="11600" class="folder-text">cloudinary/</text>
    <line x1="105" y1="11615" x2="105" y2="11625" class="line"/>
    <line x1="105" y1="11625" x2="115" y2="11625" class="line"/>
    <text x="120" y="11630" class="icon">📄</text>
    <text x="145" y="11630" class="file-text">destroy.ts</text>
    <line x1="105" y1="11650" x2="105" y2="11660" class="line"/>
    <line x1="105" y1="11660" x2="115" y2="11660" class="line"/>
    <text x="120" y="11665" class="icon">📄</text>
    <text x="145" y="11665" class="file-text">server.ts</text>
    <line x1="105" y1="11685" x2="105" y2="11695" class="line"/>
    <line x1="105" y1="11695" x2="115" y2="11695" class="line"/>
    <text x="120" y="11700" class="icon">📄</text>
    <text x="145" y="11700" class="file-text">verify.ts</text>
    <line x1="75" y1="11755" x2="75" y2="11765" class="line"/>
    <line x1="75" y1="11765" x2="85" y2="11765" class="line"/>
    <text x="90" y="11770" class="icon">📁</text>
    <text x="115" y="11770" class="folder-text">orders/</text>
    <line x1="105" y1="11785" x2="105" y2="11795" class="line"/>
    <line x1="105" y1="11795" x2="115" y2="11795" class="line"/>
    <text x="120" y="11800" class="icon">📄</text>
    <text x="145" y="11800" class="file-text">create.ts</text>
    <line x1="75" y1="11855" x2="75" y2="11865" class="line"/>
    <line x1="75" y1="11865" x2="85" y2="11865" class="line"/>
    <text x="90" y="11870" class="icon">📁</text>
    <text x="115" y="11870" class="folder-text">queries/</text>
    <line x1="105" y1="11885" x2="105" y2="11895" class="line"/>
    <line x1="105" y1="11895" x2="115" y2="11895" class="line"/>
    <text x="120" y="11900" class="icon">📄</text>
    <text x="145" y="11900" class="file-text">admin.ts</text>
    <line x1="105" y1="11920" x2="105" y2="11930" class="line"/>
    <line x1="105" y1="11930" x2="115" y2="11930" class="line"/>
    <text x="120" y="11935" class="icon">📄</text>
    <text x="145" y="11935" class="file-text">store.ts</text>
    <line x1="75" y1="11990" x2="75" y2="12000" class="line"/>
    <line x1="75" y1="12000" x2="85" y2="12000" class="line"/>
    <text x="90" y="12005" class="icon">📁</text>
    <text x="115" y="12005" class="folder-text">security/</text>
    <line x1="105" y1="12020" x2="105" y2="12030" class="line"/>
    <line x1="105" y1="12030" x2="115" y2="12030" class="line"/>
    <text x="120" y="12035" class="icon">📄</text>
    <text x="145" y="12035" class="file-text">client-ip.ts</text>
    <line x1="105" y1="12055" x2="105" y2="12065" class="line"/>
    <line x1="105" y1="12065" x2="115" y2="12065" class="line"/>
    <text x="120" y="12070" class="icon">📄</text>
    <text x="145" y="12070" class="file-text">csrf.ts</text>
    <line x1="105" y1="12090" x2="105" y2="12100" class="line"/>
    <line x1="105" y1="12100" x2="115" y2="12100" class="line"/>
    <text x="120" y="12105" class="icon">📄</text>
    <text x="145" y="12105" class="file-text">rate-limit.ts</text>
    <line x1="105" y1="12125" x2="105" y2="12135" class="line"/>
    <line x1="105" y1="12135" x2="115" y2="12135" class="line"/>
    <text x="120" y="12140" class="icon">📄</text>
    <text x="145" y="12140" class="file-text">safe-error.ts</text>
    <line x1="75" y1="12195" x2="75" y2="12205" class="line"/>
    <line x1="75" y1="12205" x2="85" y2="12205" class="line"/>
    <text x="90" y="12210" class="icon">📁</text>
    <text x="115" y="12210" class="folder-text">utils/</text>
    <line x1="105" y1="12225" x2="105" y2="12235" class="line"/>
    <line x1="105" y1="12235" x2="115" y2="12235" class="line"/>
    <text x="120" y="12240" class="icon">📄</text>
    <text x="145" y="12240" class="file-text">crypto.ts</text>
    <line x1="105" y1="12260" x2="105" y2="12270" class="line"/>
    <line x1="105" y1="12270" x2="115" y2="12270" class="line"/>
    <text x="120" y="12275" class="icon">📄</text>
    <text x="145" y="12275" class="file-text">fetch-json.ts</text>
    <line x1="105" y1="12295" x2="105" y2="12305" class="line"/>
    <line x1="105" y1="12305" x2="115" y2="12305" class="line"/>
    <text x="120" y="12310" class="icon">📄</text>
    <text x="145" y="12310" class="file-text">phone.ts</text>
    <line x1="105" y1="12330" x2="105" y2="12340" class="line"/>
    <line x1="105" y1="12340" x2="115" y2="12340" class="line"/>
    <text x="120" y="12345" class="icon">📄</text>
    <text x="145" y="12345" class="file-text">slug.ts</text>
    <line x1="75" y1="12400" x2="75" y2="12410" class="line"/>
    <line x1="75" y1="12410" x2="85" y2="12410" class="line"/>
    <text x="90" y="12415" class="icon">📁</text>
    <text x="115" y="12415" class="folder-text">validations/</text>
    <line x1="105" y1="12430" x2="105" y2="12440" class="line"/>
    <line x1="105" y1="12440" x2="115" y2="12440" class="line"/>
    <text x="120" y="12445" class="icon">📄</text>
    <text x="145" y="12445" class="file-text">admin-auth.ts</text>
    <line x1="105" y1="12465" x2="105" y2="12475" class="line"/>
    <line x1="105" y1="12475" x2="115" y2="12475" class="line"/>
    <text x="120" y="12480" class="icon">📄</text>
    <text x="145" y="12480" class="file-text">admin.ts</text>
    <line x1="105" y1="12500" x2="105" y2="12510" class="line"/>
    <line x1="105" y1="12510" x2="115" y2="12510" class="line"/>
    <text x="120" y="12515" class="icon">📄</text>
    <text x="145" y="12515" class="file-text">order.ts</text>
    <line x1="75" y1="12570" x2="75" y2="12580" class="line"/>
    <line x1="75" y1="12580" x2="85" y2="12580" class="line"/>
    <text x="90" y="12585" class="icon">📄</text>
    <text x="115" y="12585" class="file-text">audit.ts</text>
    <line x1="75" y1="12605" x2="75" y2="12615" class="line"/>
    <line x1="75" y1="12615" x2="85" y2="12615" class="line"/>
    <text x="90" y="12620" class="icon">📄</text>
    <text x="115" y="12620" class="file-text">email.ts</text>
    <line x1="75" y1="12640" x2="75" y2="12650" class="line"/>
    <line x1="75" y1="12650" x2="85" y2="12650" class="line"/>
    <text x="90" y="12655" class="icon">📄</text>
    <text x="115" y="12655" class="file-text">env.ts</text>
    <line x1="75" y1="12675" x2="75" y2="12685" class="line"/>
    <line x1="75" y1="12685" x2="85" y2="12685" class="line"/>
    <text x="90" y="12690" class="icon">📄</text>
    <text x="115" y="12690" class="file-text">format.ts</text>
    <line x1="75" y1="12710" x2="75" y2="12720" class="line"/>
    <line x1="75" y1="12720" x2="85" y2="12720" class="line"/>
    <text x="90" y="12725" class="icon">📄</text>
    <text x="115" y="12725" class="file-text">policies.ts</text>
    <line x1="75" y1="12745" x2="75" y2="12755" class="line"/>
    <line x1="75" y1="12755" x2="85" y2="12755" class="line"/>
    <text x="90" y="12760" class="icon">📄</text>
    <text x="115" y="12760" class="file-text">shipping.ts</text>
    <line x1="45" y1="12815" x2="45" y2="12825" class="line"/>
    <line x1="45" y1="12825" x2="55" y2="12825" class="line"/>
    <text x="60" y="12830" class="icon">📁</text>
    <text x="85" y="12830" class="folder-text">store/</text>
    <line x1="75" y1="12845" x2="75" y2="12855" class="line"/>
    <line x1="75" y1="12855" x2="85" y2="12855" class="line"/>
    <text x="90" y="12860" class="icon">📄</text>
    <text x="115" y="12860" class="file-text">cart.ts</text>
    <line x1="45" y1="12915" x2="45" y2="12925" class="line"/>
    <line x1="45" y1="12925" x2="55" y2="12925" class="line"/>
    <text x="60" y="12930" class="icon">📁</text>
    <text x="85" y="12930" class="folder-text">types/</text>
    <line x1="75" y1="12945" x2="75" y2="12955" class="line"/>
    <line x1="75" y1="12955" x2="85" y2="12955" class="line"/>
    <text x="90" y="12960" class="icon">📄</text>
    <text x="115" y="12960" class="file-text">auth.ts</text>
    <line x1="45" y1="13015" x2="45" y2="13025" class="line"/>
    <line x1="45" y1="13025" x2="55" y2="13025" class="line"/>
    <text x="60" y="13030" class="icon">📄</text>
    <text x="85" y="13030" class="file-text">proxy.ts</text>
    <line x1="15" y1="13095" x2="25" y2="13095" class="line"/>
    <text x="30" y="13100" class="icon">⚙️</text>
    <text x="55" y="13100" class="file-text">.gitignore</text>
    <line x1="15" y1="13130" x2="25" y2="13130" class="line"/>
    <text x="30" y="13135" class="icon">📝</text>
    <text x="55" y="13135" class="file-text">AGENTS.md</text>
    <line x1="15" y1="13165" x2="25" y2="13165" class="line"/>
    <text x="30" y="13170" class="icon">📝</text>
    <text x="55" y="13170" class="file-text">CLAUDE.md</text>
    <line x1="15" y1="13200" x2="25" y2="13200" class="line"/>
    <text x="30" y="13205" class="icon">📝</text>
    <text x="55" y="13205" class="file-text">LAUNCH_CHECKLIST.md</text>
    <line x1="15" y1="13235" x2="25" y2="13235" class="line"/>
    <text x="30" y="13240" class="icon">📝</text>
    <text x="55" y="13240" class="file-text">README.md</text>
    <line x1="15" y1="13270" x2="25" y2="13270" class="line"/>
    <text x="30" y="13275" class="icon">📄</text>
    <text x="55" y="13275" class="file-text">drizzle.config.ts</text>
    <line x1="15" y1="13305" x2="25" y2="13305" class="line"/>
    <text x="30" y="13310" class="icon">📄</text>
    <text x="55" y="13310" class="file-text">eslint.config.mjs</text>
    <line x1="15" y1="13340" x2="25" y2="13340" class="line"/>
    <text x="30" y="13345" class="icon">📄</text>
    <text x="55" y="13345" class="file-text">next.config.ts</text>
    <line x1="15" y1="13375" x2="25" y2="13375" class="line"/>
    <text x="30" y="13380" class="icon">⚙️</text>
    <text x="55" y="13380" class="file-text">package-lock.json</text>
    <line x1="15" y1="13410" x2="25" y2="13410" class="line"/>
    <text x="30" y="13415" class="icon">⚙️</text>
    <text x="55" y="13415" class="file-text">package.json</text>
    <line x1="15" y1="13445" x2="25" y2="13445" class="line"/>
    <text x="30" y="13450" class="icon">📄</text>
    <text x="55" y="13450" class="file-text">postcss.config.mjs</text>
    <line x1="15" y1="13480" x2="25" y2="13480" class="line"/>
    <text x="30" y="13485" class="icon">⚙️</text>
    <text x="55" y="13485" class="file-text">tsconfig.json</text>
</svg>
