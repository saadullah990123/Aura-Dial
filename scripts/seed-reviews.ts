import { config } from "dotenv";
import { resolve } from "node:path";
import { db } from "../src/db";
import { products, reviews } from "../src/db/schema";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

async function seedReviews() {
  console.log("Checking existing reviews...");
  const existingReviews = await db.select().from(reviews);
  if (existingReviews.length > 0) {
    console.log(`Found ${existingReviews.length} existing reviews. Skipping seed.`);
    return;
  }

  const allProducts = await db.select().from(products).limit(5);
  if (allProducts.length === 0) {
    console.log("No products found to attach reviews.");
    return;
  }

  console.log(`Adding seed reviews to ${allProducts.length} products...`);

  const tissot = allProducts.find((p) => p.name.includes("Tissot")) || allProducts[0];
  const seiko = allProducts.find((p) => p.name.includes("Seiko")) || allProducts[1] || allProducts[0];
  const rado = allProducts.find((p) => p.name.includes("Rado")) || allProducts[2] || allProducts[0];

  const sampleData = [
    // Approved Reviews for Tissot
    {
      productId: tissot.id,
      userName: "Kamran Akram",
      rating: 5,
      comment:
        "The dial has an incredible waffle pattern that catches the sunlight beautifully. The weight feels substantial and the integrated bracelet is pure luxury. Arrived in Karachi in 2 days via COD!",
      imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
      isApproved: true,
      createdAt: new Date(Date.now() - 3 * 86400000),
    },
    {
      productId: tissot.id,
      userName: "Hamza Shafiq",
      rating: 5,
      comment:
        "Top tier quality for this price point. Packaging was intact and verification card was included. Highly recommend Aura Dial!",
      imageUrl: null,
      isApproved: true,
      createdAt: new Date(Date.now() - 7 * 86400000),
    },
    {
      productId: tissot.id,
      userName: "Bilal Farooq",
      rating: 4,
      comment:
        "Great watch, smooth sweep and looks stunning with formal suits. Only taking 1 star off because courier delayed by half a day, but customer support was very helpful.",
      imageUrl: null,
      isApproved: true,
      createdAt: new Date(Date.now() - 10 * 86400000),
    },

    // Approved Reviews for Seiko
    {
      productId: seiko.id,
      userName: "Zubair Hashmi",
      rating: 5,
      comment:
        "Navy sunburst dial is unbelievable in person. The lume glows bright all night. Authentic watch and great COD delivery service in Lahore.",
      imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
      isApproved: true,
      createdAt: new Date(Date.now() - 4 * 86400000),
    },
    {
      productId: seiko.id,
      userName: "Daniyal Qureshi",
      rating: 5,
      comment:
        "Very versatile sports watch. Swapped to a leather strap for office wear. 100% genuine.",
      imageUrl: null,
      isApproved: true,
      createdAt: new Date(Date.now() - 12 * 86400000),
    },

    // Approved Reviews for Rado
    {
      productId: rado.id,
      userName: "Ayesha Malik",
      rating: 5,
      comment:
        "Gifted this to my husband for our anniversary. The ceramic finish and rose gold accents are beyond exquisite. Thank you Aura Dial for the fast dispatch!",
      imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80",
      isApproved: true,
      createdAt: new Date(Date.now() - 2 * 86400000),
    },

    // Pending Reviews for Moderation in Admin!
    {
      productId: tissot.id,
      userName: "Sarmad Raza",
      rating: 5,
      comment:
        "Just received my order today! Absolutely thrilled with the pristine finish. Attaching wrist-shot for other buyers.",
      imageUrl: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&auto=format&fit=crop&q=80",
      isApproved: false,
      createdAt: new Date(Date.now() - 2 * 3600000),
    },
    {
      productId: seiko.id,
      userName: "Fahad Mustafa",
      rating: 4,
      comment:
        "Looks good, bracelet sizing was easy with a pin tool. Solid build.",
      imageUrl: null,
      isApproved: false,
      createdAt: new Date(Date.now() - 5 * 3600000),
    },
  ];

  for (const item of sampleData) {
    await db.insert(reviews).values(item);
  }

  console.log("Successfully seeded sample approved and pending reviews!");
}

seedReviews().catch((err) => {
  console.error("Seeding reviews failed:", err);
  process.exit(1);
});
