# ⌚ AURA DIAL
### Premium E-Commerce Platform for Watches & Eyewear

<p align="center">
  A modern, full-stack e-commerce platform engineered to deliver a premium shopping experience, streamlined order management, and secure store administration.
</p>

<p align="center">
  <a href="https://aura-dial-delta.vercel.app/"><strong>🌐 Live Website</strong></a>
  &nbsp; • &nbsp;
  <strong>Next.js</strong>
  &nbsp; • &nbsp;
  <strong>TypeScript</strong>
  &nbsp; • &nbsp;
  <strong>PostgreSQL</strong>
</p>

---

## Overview

**Aura Dial** is a full-stack e-commerce platform specializing in watches and eyewear. Built with modern web technologies, it combines an elegant customer-facing storefront with a powerful, database-driven administrative management system.

The platform is designed around three core principles:

- **Premium Experience:** A clean, responsive, and intuitive shopping interface.
- **Operational Efficiency:** Centralized product, inventory, and order management.
- **Security & Reliability:** Server-side validation, protected administrative sessions, and structured database operations.

From product discovery to order fulfillment, Aura Dial provides an integrated solution for managing an online retail business.

## Live Deployment

<p align="center">
  <a href="https://aura-dial-delta.vercel.app/">
    <img src="https://img.shields.io/badge/EXPLORE%20LIVE%20STORE-Aura%20Dial-111111?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Store">
  </a>
</p>

**Production URL:** https://aura-dial-delta.vercel.app/

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Frontend | React |
| Language | TypeScript |
| Database | PostgreSQL |
| Database ORM | Drizzle ORM |
| Database Hosting | Neon |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Validation | Zod |
| Authentication | Secure Cookie Sessions & bcryptjs |
| Image Management | Cloudinary |
| Icons | Lucide |
| Deployment | Vercel |

---

## Core Features

### 01. Customer Storefront

- Dynamic product catalog and category collections.
- Dedicated product detail pages.
- Product image galleries and variants.
- Product filtering and sorting.
- Shopping cart with persistent state.
- Wishlist functionality.
- Customer reviews and ratings.
- Responsive layouts for mobile, tablet, and desktop.

### 02. Checkout & Order Processing

- Cash-on-Delivery (COD) checkout.
- Client-side and server-side input validation.
- Order creation and database persistence.
- Order confirmation pages.
- Order tracking using order ID and phone number.
- Customer support through WhatsApp integration.

### 03. Administrative Management System

A dedicated administrative interface provides centralized control over store operations.

| Module | Capabilities |
|---|---|
| Dashboard | Sales overview and business metrics |
| Products | Create, update, and manage products |
| Categories | Organize product collections |
| Orders | View and manage customer orders |
| Reviews | Manage customer feedback |
| Media | Upload and manage product images |
| Pages | Edit storefront content |
| Settings | Configure store preferences |
| Account | Manage administrative credentials |

### 04. Security & Reliability

- Protected administrative routes.
- Secure cookie-based authentication sessions.
- Password hashing using bcryptjs.
- Server-side authorization checks.
- Input validation using Zod.
- CSRF protection utilities.
- Rate-limiting utilities.
- Secure image upload workflows.

---

## Application Architecture

Aura Dial follows a modular architecture that separates storefront functionality, administrative operations, database access, and shared business logic.

```text
AURA DIAL
│
├── Storefront
│   ├── Home
│   ├── Collections
│   ├── Products
│   ├── Shopping Cart
│   ├── Wishlist
│   ├── Checkout
│   └── Order Tracking
│
├── Administration
│   ├── Dashboard
│   ├── Product Management
│   ├── Category Management
│   ├── Order Management
│   ├── Review Management
│   ├── Content Management
│   └── Store Settings
│
├── Backend Services
│   ├── API Routes
│   ├── Authentication
│   ├── Validation
│   ├── Order Processing
│   └── Security Utilities
│
└── Data & Infrastructure
    ├── PostgreSQL
    ├── Drizzle ORM
    ├── Neon
    ├── Cloudinary
    └── Vercel
```

---

## Database Design

The application uses PostgreSQL with Drizzle ORM for structured data management.

| Table | Responsibility |
|---|---|
| `products` | Product information, pricing, inventory, and images |
| `categories` | Product categorization |
| `orders` | Customer orders and delivery information |
| `order_items` | Products associated with individual orders |
| `admins` | Administrative accounts and authentication |
| `store_settings` | Global store configuration |
| `reviews` | Customer feedback and product ratings |

---

## Project Structure

```text
aura-dial-store/
│
├── public/
│   ├── brand/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── (store)/
│   │   ├── admin/
│   │   ├── api/
│   │   └── forbidden/
│   │
│   ├── components/
│   │   ├── admin/
│   │   └── store/
│   │
│   ├── db/
│   │   ├── migrations/
│   │   └── schema/
│   │
│   ├── lib/
│   │   ├── auth/
│   │   ├── cloudinary/
│   │   ├── orders/
│   │   ├── queries/
│   │   ├── security/
│   │   └── validations/
│   │
│   ├── hooks/
│   ├── store/
│   └── types/
│
├── scripts/
├── sample-images/
├── package.json
├── drizzle.config.ts
├── next.config.ts
└── README.md
```

---

## Getting Started

Follow these instructions to run Aura Dial locally.

### Prerequisites

- Node.js
- npm
- PostgreSQL database (or Neon account)
- Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/aura-dial-store.git
cd aura-dial-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=your_neon_postgresql_connection_string

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ADMIN_SESSION_SECRET=your_secure_random_session_secret
```

**Important:** Never commit `.env` files, database credentials, or private API keys to GitHub.

### 4. Initialize the Database

```bash
npm run db:push
npm run db:seed
```

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

---

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run db:push` | Apply database schema |
| `npm run db:seed` | Populate initial sample data |

---

## Application Preview

### Storefront

<p align="center">
  <img src="https://github.com/user-attachments/assets/71c71176-3a92-4a0e-b71c-3be16c07470d" width="100%" alt="Aura Dial Homepage">
  <br>
  <em>Premium customer-facing storefront</em>
</p>

### Product Catalog

<p align="center">
  <img src="https://github.com/user-attachments/assets/a8d21c49-3c12-487d-b961-5dbc83f5c994" width="100%" alt="Product Catalog">
  <br>
  <em>Product discovery and shopping experience</em>
</p>

### Checkout & Orders

<p align="center">
  <img src="https://github.com/user-attachments/assets/d9e759c6-eb42-4313-a55e-e2f41bee6bf7" width="100%" alt="Checkout and Orders">
  <br>
  <em>Customer checkout and order experience</em>
</p>

### Administrative Dashboard

<p align="center">
  <img src="https://github.com/user-attachments/assets/4e14791b-4d71-4a14-baf3-7031bb31480a" width="100%" alt="Admin Dashboard">
  <br>
  <em>Administrative overview</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7c288f4c-dc4b-4a8d-8fff-b9f7c1d0b906" width="100%" alt="Admin Product Management">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/95121e8a-f7f1-4085-be58-1541baa16ed4" width="100%" alt="Admin Store Management">
</p>

---

## Deployment

Aura Dial is deployed using **Vercel**.

The production deployment integrates the application with its configured database and media services.

To deploy your own instance:

1. Push your project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Connect the production database.
5. Deploy the application.

---

## Ownership & License

Aura Dial is a privately owned project.

All rights reserved © 2026 Aura Dial.

Unauthorized reproduction, redistribution, or commercial use is prohibited without permission from the owner.

---

<p align="center">
  <strong>Designed & Developed by Saad Ullah</strong>
  <br>
  Full-Stack E-Commerce Development
  <br><br>
  <a href="https://aura-dial-delta.vercel.app/">Visit Aura Dial</a>
</p>

<p align="center">
  <sub>Crafted with attention to detail, performance, and user experience.</sub>
</p>
