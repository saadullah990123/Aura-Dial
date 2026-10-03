# Legal page drafts: READ FIRST

These are **fill-in-the-blank starting drafts, not legal advice.** I (the AI that wrote them)
cannot know your business facts or confirm which Pakistani laws apply to you. Have a qualified
Pakistani lawyer review the final text before you publish.

## How to use
1. Fill in `FACTS.md` first. Every `[[PLACEHOLDER]]` in the four drafts comes from it.
2. Copy each draft into Admin > Pages (the matching page), replace every `[[...]]`.
3. The admin refuses to publish a page that still contains `[[...]]`, so a half-filled page
   cannot go live by accident.
4. Delete any sentence that is not true for your business. A policy that promises something
   you do not do is worse than a shorter policy.

## What is already filled in from the code (verified against the source)
- Orders are cash on delivery only. There is no online payment.
- There are no customer accounts, no analytics, no ad or tracking pixels, no reviews.
- Order data stored: name, phone, optional email, delivery address, city, order notes, items,
  status history.
- The shopping cart is saved in the visitor's own browser (local storage) until checkout.
- Visitors' request IPs are used for rate limiting in hashed form, with an expiry.
- Services that touch data: Neon (database), Cloudinary (product images are loaded from it),
  Resend (only admin password-reset emails, and only if enabled), WhatsApp (only if the
  customer taps "Message us"). Fonts are self-hosted.
- Customers cannot cancel on the site. Only the admin can set an order to cancelled.

If you later add card payments, customer accounts, analytics, ad pixels or reviews, these
drafts become wrong and need redoing (and you will need a cookie notice).
