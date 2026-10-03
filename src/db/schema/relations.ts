import { relations } from "drizzle-orm";

import {
  admins,
  adminSessions,
  auditLogs,
  categories,
  contentPages,
  orderItems,
  orders,
  orderStatusHistory,
  productImages,
  products,
  reviews,
  storeSettings,
} from "./index";

export const adminsRelations = relations(admins, ({ many }) => ({
  sessions: many(adminSessions),
  auditLogs: many(auditLogs),
  statusChanges: many(orderStatusHistory),
  contentPages: many(contentPages),
}));

export const adminSessionsRelations = relations(adminSessions, ({ one }) => ({
  admin: one(admins, {
    fields: [adminSessions.adminId],
    references: [admins.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "categoryParent",
  }),
  children: many(categories, {
    relationName: "categoryParent",
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  orderItems: many(orderItems),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
  statusHistory: many(orderStatusHistory),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const orderStatusHistoryRelations = relations(
  orderStatusHistory,
  ({ one }) => ({
    order: one(orders, {
      fields: [orderStatusHistory.orderId],
      references: [orders.id],
    }),
    changedByAdmin: one(admins, {
      fields: [orderStatusHistory.changedByAdminId],
      references: [admins.id],
    }),
  }),
);

export const contentPagesRelations = relations(contentPages, ({ one }) => ({
  updatedByAdmin: one(admins, {
    fields: [contentPages.updatedByAdminId],
    references: [admins.id],
  }),
}));

export const storeSettingsRelations = relations(storeSettings, ({ one }) => ({
  updatedByAdmin: one(admins, {
    fields: [storeSettings.updatedByAdminId],
    references: [admins.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  admin: one(admins, {
    fields: [auditLogs.adminId],
    references: [admins.id],
  }),
}));