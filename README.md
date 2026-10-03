# Aura Dial

Watches & glasses storefront with cash-on-delivery checkout and an admin panel.
Next.js 16 (App Router) · React 19 · Tailwind 4 · Drizzle ORM · Neon Postgres · Cloudinary.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - `DATABASE_URL` - your Neon connection string
   - `SESSION_SECRET` - `openssl rand -hex 48`
   - `CLOUDINARY_*` - from your Cloudinary dashboard (needed for image uploads)
   - `RESEND_API_KEY` / `EMAIL_FROM` - optional, for password-reset emails
3. `npm run db:migrate` - creates the tables
4. `npm run db:seed` - sample categories, products, settings and About page (optional, dev only)
5. `npm run admin:create` - create your admin login (password: 10+ characters)
6. `npm run dev` - store at http://localhost:3000, admin at http://localhost:3000/admin

## What's included

**Storefront:** home, collections (filter by gender), product pages, cart drawer,
checkout (COD), order confirmation, order tracking (order number + phone), About
(editable), Contact, sitemap/robots, announcement banner.

**Admin (`/admin`):** dashboard, orders (status workflow, history, automatic restock on
cancel/return), products (multi-image upload, sale price, stock, best-seller flag),
categories, editable pages, store settings (contacts, delivery fee, free-shipping
threshold, hero image, banner), account (change password).

## Legal pages

Privacy Policy, Terms of Service, Shipping Policy and Return & Exchange Policy are created
as **empty drafts** in Admin > Pages. Nothing is shown to customers until you write the real
text (with your own business details, ideally reviewed by a lawyer) and tick Published.
Published policies are linked in the footer, the checkout and the sitemap automatically.
The app never writes legal wording for you.

## Before launch

See `LAUNCH_CHECKLIST.md`: legal pages are empty drafts until you fill them in.

## Security notes

- Prices and stock are always read from the database at checkout, never from the browser.
- A database CHECK constraint makes overselling impossible, even under simultaneous orders.
- Rate limits on login, order creation and order tracking (atomic, race-safe).
- Password reset signs out every existing session. Reset links are emailed (Resend).
- Admin routes are checked in `proxy.ts` and again on every page/action.
- Never commit `.env.local`.

## Scripts

`dev`, `build`, `start`, `lint`, `typecheck`, `db:generate`, `db:migrate`, `db:push`,
`db:studio`, `db:seed`, `admin:create`.
