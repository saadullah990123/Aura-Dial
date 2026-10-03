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





# File Tree: aura-dial-store

**Generated:** 10/3/2026, 10:06:17 PM
**Root Path:** `c:\Users\hp\Downloads\aura-dial-store`

```
├── 📁 .brain
│   ├── 📝 active-task.md
│   ├── 📝 database-schema.md
│   ├── 📝 design-rules.md
│   └── 📝 project-overview.md
├── 📁 legal-drafts
│   ├── 📝 00-READ-FIRST.md
│   ├── 📝 FACTS.md
│   ├── 📝 privacy-policy.md
│   ├── 📝 return-policy.md
│   ├── 📝 shipping-policy.md
│   └── 📝 terms-of-service.md
├── 📁 public
│   ├── 📁 brand
│   │   ├── 🖼️ logo-full.png
│   │   └── 🖼️ logo-mark.png
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ next.svg
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── 📁 sample-images
│   ├── 🖼️ sample-glasses-01.jpg
│   ├── 🖼️ sample-glasses-02.jpg
│   ├── 🖼️ sample-glasses-03.jpg
│   ├── 🖼️ sample-glasses-04.jpg
│   ├── 🖼️ sample-glasses-05.jpg
│   ├── 🖼️ sample-glasses-06.jpg
│   ├── 🖼️ sample-glasses-07.jpg
│   ├── 🖼️ sample-glasses-08.jpg
│   ├── 🖼️ sample-glasses-09.jpg
│   ├── 🖼️ sample-glasses-10.jpg
│   ├── 🖼️ sample-glasses-11.jpg
│   ├── 🖼️ sample-glasses-12.jpg
│   ├── 🖼️ sample-glasses-13.jpg
│   ├── 🖼️ sample-glasses-14.jpg
│   ├── 🖼️ sample-glasses-15.jpg
│   ├── 🖼️ sample-watch-01.jpg
│   ├── 🖼️ sample-watch-02.jpg
│   ├── 🖼️ sample-watch-03.jpg
│   ├── 🖼️ sample-watch-04.jpg
│   ├── 🖼️ sample-watch-05.jpg
│   ├── 🖼️ sample-watch-06.jpg
│   ├── 🖼️ sample-watch-07.jpg
│   ├── 🖼️ sample-watch-08.jpg
│   ├── 🖼️ sample-watch-09.jpg
│   ├── 🖼️ sample-watch-10.jpg
│   ├── 🖼️ sample-watch-11.jpg
│   ├── 🖼️ sample-watch-12.jpg
│   ├── 🖼️ sample-watch-13.jpg
│   ├── 🖼️ sample-watch-14.jpg
│   ├── 🖼️ sample-watch-15.jpg
│   ├── 🖼️ sample-watch-16.jpg
│   ├── 🖼️ sample-watch-17.jpg
│   ├── 🖼️ sample-watch-18.jpg
│   ├── 🖼️ sample-watch-19.jpg
│   └── 🖼️ sample-watch-20.jpg
├── 📁 scripts
│   ├── 📄 create-reviews-table.ts
│   ├── 📄 preflight.ts
│   └── 📄 seed-reviews.ts
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 (store)
│   │   │   ├── 📁 about
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 checkout
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 collections
│   │   │   │   └── 📁 [slug]
│   │   │   │       ├── 📄 loading.tsx
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 contact
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 order-success
│   │   │   │   └── 📁 [orderNumber]
│   │   │   │       ├── 📄 loading.tsx
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 policies
│   │   │   │   └── 📁 [slug]
│   │   │   │       ├── 📄 loading.tsx
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 products
│   │   │   │   └── 📁 [slug]
│   │   │   │       ├── 📄 loading.tsx
│   │   │   │       ├── 📄 page.tsx
│   │   │   │       └── 📄 review-actions.ts
│   │   │   ├── 📁 track-order
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 error.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   ├── 📄 loading.tsx
│   │   │   ├── 📄 not-found.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 admin
│   │   │   ├── 📁 (dashboard)
│   │   │   │   ├── 📁 account
│   │   │   │   │   ├── 📄 actions.ts
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 categories
│   │   │   │   │   ├── 📄 actions.ts
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 orders
│   │   │   │   │   ├── 📁 [id]
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   ├── 📄 actions.ts
│   │   │   │   │   ├── 📄 loading.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 pages
│   │   │   │   │   ├── 📁 [slug]
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   ├── 📄 actions.ts
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 products
│   │   │   │   │   ├── 📁 [id]
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   ├── 📁 new
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   ├── 📄 actions.ts
│   │   │   │   │   ├── 📄 loading.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 reviews
│   │   │   │   │   ├── 📄 actions.ts
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 settings
│   │   │   │   │   ├── 📄 actions.ts
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📄 layout.tsx
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 forgot-password
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 login
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 reset-password
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 session-expired
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 error.tsx
│   │   ├── 📁 api
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 auth
│   │   │   │   │   ├── 📁 forgot-password
│   │   │   │   │   │   └── 📄 route.ts
│   │   │   │   │   ├── 📁 login
│   │   │   │   │   │   └── 📄 route.ts
│   │   │   │   │   ├── 📁 logout
│   │   │   │   │   │   └── 📄 route.ts
│   │   │   │   │   └── 📁 reset-password
│   │   │   │   │       └── 📄 route.ts
│   │   │   │   └── 📁 uploads
│   │   │   │       └── 📁 sign
│   │   │   │           └── 📄 route.ts
│   │   │   ├── 📁 orders
│   │   │   │   ├── 📁 track
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   └── 📄 route.ts
│   │   │   └── 📁 reviews
│   │   │       └── 📁 upload
│   │   │           └── 📄 route.ts
│   │   ├── 📁 forbidden
│   │   │   └── 📄 page.tsx
│   │   ├── 🖼️ apple-icon.png
│   │   ├── 📄 global-error.tsx
│   │   ├── 🎨 globals.css
│   │   ├── 🖼️ icon.png
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 not-found.tsx
│   │   ├── 🖼️ opengraph-image.png
│   │   ├── 📄 robots.ts
│   │   └── 📄 sitemap.ts
│   ├── 📁 components
│   │   ├── 📁 admin
│   │   │   ├── 📄 admin-login-form.tsx
│   │   │   ├── 📄 admin-nav.tsx
│   │   │   ├── 📄 category-form.tsx
│   │   │   ├── 📄 change-email-form.tsx
│   │   │   ├── 📄 change-password-form.tsx
│   │   │   ├── 📄 clear-stale-session.tsx
│   │   │   ├── 📄 forgot-password-form.tsx
│   │   │   ├── 📄 image-uploader.tsx
│   │   │   ├── 📄 logout-button.tsx
│   │   │   ├── 📄 order-status-form.tsx
│   │   │   ├── 📄 page-edit-form.tsx
│   │   │   ├── 📄 page-header.tsx
│   │   │   ├── 📄 product-form.tsx
│   │   │   ├── 📄 reset-password-form.tsx
│   │   │   ├── 📄 reviews-manager.tsx
│   │   │   ├── 📄 settings-form.tsx
│   │   │   ├── 📄 table-skeleton.tsx
│   │   │   └── 📄 ui.tsx
│   │   ├── 📁 store
│   │   │   ├── 📄 add-to-cart-button.tsx
│   │   │   ├── 📄 art.tsx
│   │   │   ├── 📄 brand-icons.tsx
│   │   │   ├── 📄 cart-drawer.tsx
│   │   │   ├── 📄 checkout-form.tsx
│   │   │   ├── 📄 copy-order-id-button.tsx
│   │   │   ├── 📄 header-client.tsx
│   │   │   ├── 📄 product-card-image.tsx
│   │   │   ├── 📄 product-card.tsx
│   │   │   ├── 📄 product-carousel.tsx
│   │   │   ├── 📄 product-gallery.tsx
│   │   │   ├── 📄 product-purchase.tsx
│   │   │   ├── 📄 product-reviews.tsx
│   │   │   ├── 📄 site-footer.tsx
│   │   │   ├── 📄 site-header.tsx
│   │   │   ├── 📄 skeletons.tsx
│   │   │   └── 📄 track-order-form.tsx
│   │   └── 📄 connection-banner.tsx
│   ├── 📁 db
│   │   ├── 📁 migrations
│   │   │   ├── 📁 meta
│   │   │   │   ├── ⚙️ 0000_snapshot.json
│   │   │   │   ├── ⚙️ 0001_snapshot.json
│   │   │   │   └── ⚙️ _journal.json
│   │   │   ├── 📄 0000_public_leo.sql
│   │   │   └── 📄 0001_checkout_constraints_and_hero.sql
│   │   ├── 📁 schema
│   │   │   ├── 📄 index.ts
│   │   │   └── 📄 relations.ts
│   │   ├── 📄 create-first-admin.ts
│   │   ├── 📄 index.ts
│   │   ├── 📄 sample-products-core.ts
│   │   ├── ⚙️ sample-products.json
│   │   ├── 📄 sample-products.ts
│   │   └── 📄 seed.ts
│   ├── 📁 hooks
│   │   └── 📄 use-online-status.ts
│   ├── 📁 lib
│   │   ├── 📁 auth
│   │   │   ├── 📄 admin-action.ts
│   │   │   ├── 📄 password.ts
│   │   │   ├── 📄 require-admin.ts
│   │   │   ├── 📄 reset-password.ts
│   │   │   └── 📄 session.ts
│   │   ├── 📁 cloudinary
│   │   │   ├── 📄 destroy.ts
│   │   │   ├── 📄 server.ts
│   │   │   └── 📄 verify.ts
│   │   ├── 📁 orders
│   │   │   └── 📄 create.ts
│   │   ├── 📁 queries
│   │   │   ├── 📄 admin.ts
│   │   │   └── 📄 store.ts
│   │   ├── 📁 security
│   │   │   ├── 📄 client-ip.ts
│   │   │   ├── 📄 csrf.ts
│   │   │   ├── 📄 rate-limit.ts
│   │   │   └── 📄 safe-error.ts
│   │   ├── 📁 utils
│   │   │   ├── 📄 crypto.ts
│   │   │   ├── 📄 fetch-json.ts
│   │   │   ├── 📄 phone.ts
│   │   │   └── 📄 slug.ts
│   │   ├── 📁 validations
│   │   │   ├── 📄 admin-auth.ts
│   │   │   ├── 📄 admin.ts
│   │   │   └── 📄 order.ts
│   │   ├── 📄 audit.ts
│   │   ├── 📄 email.ts
│   │   ├── 📄 env.ts
│   │   ├── 📄 format.ts
│   │   ├── 📄 policies.ts
│   │   └── 📄 shipping.ts
│   ├── 📁 store
│   │   └── 📄 cart.ts
│   ├── 📁 types
│   │   └── 📄 auth.ts
│   └── 📄 proxy.ts
├── ⚙️ .gitignore
├── 📝 AGENTS.md
├── 📝 CLAUDE.md
├── 📝 LAUNCH_CHECKLIST.md
├── 📝 README.md
├── 📄 drizzle.config.ts
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.mjs
└── ⚙️ tsconfig.json
```

---
*Generated by FileTree Pro Extension*