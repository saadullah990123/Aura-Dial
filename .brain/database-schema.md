# Database Schema Overview

## Key Tables
- products: Stores items, category, brand, gender, price, stock, and active status.
- categories: Store product hierarchy and custom categories.
- orders: Customer orders, shipping details, status, and payment details.
- order_items: Individual line items associated with customer orders.
- reviews: Verified and pending customer product reviews (`id`, `productId`, `userName`, `rating`, `comment`, `imageUrl`, `isApproved`, `createdAt`).
- store_settings: Store configuration, contact phone numbers, social media links, and delivery fee.
- admins: Admin user accounts and authentication.
- audit_logs: Administrative audit trail.
