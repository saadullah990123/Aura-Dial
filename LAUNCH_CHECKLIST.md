# Launch checklist (needs you, the business owner)

The code is ready. These items need facts only you can supply. Nothing below has been
guessed or filled in for you.

> Update: starting drafts for the four legal pages are in `legal-drafts/` (start with
> `00-READ-FIRST.md` and fill in `FACTS.md`). The admin will not publish a page that still
> contains `[[PLACEHOLDER]]` markers. The marketing claims in section 2 have been reworded to
> things the code guarantees (see "Claims changed" below). `npm run preflight` checks section 3.

## 1. Legal pages (Admin > Pages)
Four empty, hidden drafts exist: Privacy Policy, Terms of Service, Shipping Policy,
Return Policy. A page appears in the footer, and at checkout (Terms/Privacy), only after
you add text and tick "Published". Have a qualified person review the final wording.

Facts these pages will need from you:
- Legal business name, registered address, contact email/phone for legal notices
- Governing law / jurisdiction
- Delivery areas, delivery times, who pays delivery, what happens on failed delivery
- Return/exchange rules: time window, condition, who pays return shipping,
  whether refunds are cash, exchange-only, or store credit
- What personal data you keep (name, phone, address, email, order history), for how long,
  who can see it, and which services process it (this site uses Neon, Cloudinary and,
  if enabled, Resend)
- Order cancellation rules (by customer, and by you)

## 2. Marketing claims. These were reworded; the old text is listed so you can restore it ONLY if true
Claims changed:
- "Secure Payment - 100% secure & safe" is now "Cash on Delivery - Pay when your order arrives"
- "24/7 Support" is now "Need Help? - Contact us any time"
- "Easy Returns" is now "Returns - N-day return window" (hidden/neutral when N is 0)
- About page: removed "Every order is checked before it leaves us" and "easy return window"
- Order confirmation: removed "will call you shortly"; now tells the customer to keep the order number to track it
- Seed data: removed "Free returns within 7 days"
Note: if your live database already has an "about" page saved in Admin > Pages, that saved text
overrides the code fallback, so edit it there.

Original list (for reference):
- Home page: "Secure Payment - 100% secure & safe" (the store is cash on delivery only)
- Home page: "24/7 Support - We're here to help"
- Home page / Settings: "Easy Returns - within N days" (N comes from Settings)
- About page text: "Every order is checked before it leaves us" and "backed by an easy return window"
- Order confirmation: "we will call you shortly to confirm delivery"
- Seed data (dev only): "Free returns within 7 days"

## 3. Setup
- `.env.local`: DATABASE_URL, CLOUDINARY_*, SESSION_SECRET (RESEND_API_KEY optional)
- `npm run preflight` (checks the env values without printing secrets)
- `npm run db:migrate`, `npm run admin:create`
- Do NOT run `npm run db:seed` on the live database. It now refuses to run unless ALLOW_SEED=1
- Test one image upload and one real order on your own setup

## 4. If you add these later, re-run the legal audit
Online card payments, customer accounts, analytics/ads/tracking pixels (these need a
cookie notice), reviews or comments.

## 5. Sample products (20 watches + 15 glasses)
- `npm run db:sample-products` is a dry run. `npm run db:sample-products -- --apply` uploads the
  35 illustrated placeholder images to YOUR Cloudinary and creates the products. Re-running is safe.
- They are placeholders: brand "Sample", description "Sample listing...", prices and stock invented.
  Edit each in Admin > Products (replace photo, price, stock, name) or delete it.
  Search "sample" in the admin product list to find them all.
- Do not launch with unedited samples: customers could order items you do not have.
