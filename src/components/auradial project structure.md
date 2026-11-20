# File Tree: aura-dial-store

**Generated:** 10/17/2026, 12:24:02 PM
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
```

---
*Generated by FileTree Pro Extension*