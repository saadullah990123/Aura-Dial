<div align="center">

# ⏱️ Aura Dial — E-Commerce Platform

**A luxury watches & eyewear e-commerce platform with Cash-on-Delivery (COD) checkout and an integrated Admin Management Panel.**

Public storefront with product catalogs, shopping cart, instant checkout, order tracking, and a secure admin dashboard for managing inventory, orders, and store settings.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-black?style=for-the-badge&logo=vercel)](https://aura-dial-delta.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=postgresql&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

🔗 **[aura-dial-delta.vercel.app](https://aura-dial-delta.vercel.app)**

</div>

---

## 📖 Overview

**Aura Dial** is a high-performance e-commerce web platform built with **Next.js** and **TypeScript**. It combines a sleek, mobile-friendly storefront tailored for luxury timepieces and eyewear — featuring dynamic collections, a slide-over cart drawer, seamless checkout, and live order tracking — with a secure, database-backed **admin dashboard** for complete business management.

---

## ✨ Features

### 🛍️ Storefront
- **Product Catalog & Collections** — Curated categories for luxury watches and eyewear with advanced filtering, sorting, and best-seller badges
- **Interactive Product Details** — High-resolution image galleries, product variants, and customer reviews
- **Cart & Wishlist Drawers** — Persistent side-drawers for quick cart inspection and wishlist saving
- **Streamlined Checkout** — Fast Cash-on-Delivery (COD) ordering flow with secure client validation and server-side verification
- **Order Tracking** — Real-time package status lookups using order ID and phone numbers
- **WhatsApp Support Widget** — Floating interactive WhatsApp support button for fast customer inquiries
- **Responsive Design** — Fully optimized user experience across mobile, tablet, and desktop devices

### 🔐 Admin Dashboard
- **Executive Dashboard** — At-a-glance performance overview and live sales metrics
- **Order Management** — Comprehensive order processing workflow with automated updates and status changes
- **Product Management** — Full CRUD control for items, inventory tiers, pricing, and category alignments
- **Media Management** — Cloud-backed image management via Cloudinary integration
- **Store Customization** — Global configurations, banner options, policy text managers, and account security controls

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **UI Library** | [React](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | PostgreSQL (managed via [Neon Serverless](https://neon.tech/) & [Drizzle ORM](https://orm.drizzle.team/)) |
| **Media Storage** | [Cloudinary](https://cloudinary.com/) (Product asset management) |
| **Styling & Icons** | [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Validation** | [Zod](https://zod.dev/) |
| **Authentication** | Secure Cookie Sessions & Password Hashing (`bcryptjs`) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

# File Tree: aura-dial-store

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
│   ├── 📁 images
│   │   ├── 🖼️ ChatGPT Image Oct 3, 2026, 10_45_43 PM.png
│   │   ├── 🖼️ black-dial-gold-accent.jpg
│   │   ├── 🖼️ copywatch1.jpg
│   │   ├── 🖼️ feiwo-blue-dial-twotone.jpg
│   │   ├── 🖼️ girls2.jpg
│   │   ├── 🖼️ girlswatch1.jpg
│   │   ├── 🖼️ led-gold-digital-collage.jpg
│   │   ├── 🖼️ led-gold-digital-watch.jpg
│   │   ├── 🖼️ matturi-silver-led-watch.jpg
│   │   ├── 🖼️ univers-point-slim-collage.jpg
│   │   ├── 🖼️ univers-point-slim-stand.jpg
│   │   ├── 🖼️ watch1.jpg
│   │   ├── 🖼️ watch2.jpg
│   │   ├── 🖼️ watch3.jpg
│   │   ├── 🖼️ watch3copy.jpg
│   │   ├── 🖼️ watch4.jpg
│   │   ├── 🖼️ watch5.jpg
│   │   └── 🖼️ watch6.jpg
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
│   ├── 📄 seed-local-watches.ts
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
│   │   │   ├── 📄 mobile-bottom-nav.tsx
│   │   │   ├── 📄 product-card-image.tsx
│   │   │   ├── 📄 product-card.tsx
│   │   │   ├── 📄 product-carousel.tsx
│   │   │   ├── 📄 product-gallery.tsx
│   │   │   ├── 📄 product-purchase.tsx
│   │   │   ├── 📄 product-reviews.tsx
│   │   │   ├── 📄 site-footer.tsx
│   │   │   ├── 📄 site-header.tsx
│   │   │   ├── 📄 skeletons.tsx
│   │   │   ├── 📄 track-order-form.tsx
│   │   │   └── 📄 wishlist-drawer.tsx
│   │   ├── 📄 WhatsAppWidget.tsx
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
│   │   ├── 📁 constants
│   │   │   └── 📄 legacy-products.ts
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
│   │   ├── 📄 cart.ts
│   │   └── 📄 wishlist.ts
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

---

## 🗄️ Database Schema

| Table | Purpose |
|---|---|
| `products` | Core catalog data — title, slug, pricing, stock levels, imagery, and status flags |
| `categories` | Categorization structure for watches, eyewear, and collections |
| `orders` | Customer fulfillment records, delivery information, and tracking details |
| `order_items` | Line items tied to individual customer transactions |
| `admins` | Administrative user credentials and session permissions |
| `store_settings` | Global application configuration flags and metadata |
| `reviews` | Customer product reviews and rating metrics |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/aura-dial-store.git](https://github.com/your-username/aura-dial-store.git)
cd aura-dial-store


### 2. Install dependencies
npm install

### 3 . 3. Set up environment variables
Create a .env file in the root directory

DATABASE_URL=your_neon_postgresql_connection_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_SESSION_SECRET=your_random_secure_session_secret_key

### 4. Run database migrations and seed data

npm run db:push
npm run db:seed

### 5 . 5. Run the development server

npm run dev

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server instance |
| `npm run lint` | Run code quality checks via ESLint |
| `npm run db:push` | Push schema changes using Drizzle Kit |
| `npm run db:seed` | Seed database with initial sample data |

📸 Preview

<img width="1917" height="942" alt="image" src="https://github.com/user-attachments/assets/2f35b2d7-bf7c-4a9a-9aa6-b9e219e4af79" />

🏠 Homepage

<img width="1917" height="955" alt="image" src="https://github.com/user-attachments/assets/71c71176-3a92-4a0e-b71c-3be16c07470d" />

⏱️ Product & Catalog

<img width="1917" height="973" alt="image" src="https://github.com/user-attachments/assets/a8d21c49-3c12-487d-b961-5dbc83f5c994" />

📦 Order & Checkout

<img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/d9e759c6-eb42-4313-a55e-e2f41bee6bf7" />

🔐 Admin Dashboard

<img width="1916" height="972" alt="image" src="https://github.com/user-attachments/assets/4e14791b-4d71-4a14-baf3-7031bb31480a" />


<img width="1917" height="986" alt="image" src="https://github.com/user-attachments/assets/7c288f4c-dc4b-4a8d-8fff-b9f7c1d0b906" />


<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/95121e8a-f7f1-4085-be58-1541baa16ed4" />
