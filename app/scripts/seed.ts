
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Mobile App Templates
  const mobileProducts = [
    {
      productId: "SMA-B01",
      name: "Fox Game Studio Unity Bundle: 22 Most Wanted Projects",
      description: "An incredible bundle of 22 popular Unity game source codes from Fox Game Studio. Get a massive 90% discount on projects perfect for reskinning and quick launch.",
      category: "Game Bundle",
      platform: "Unity",
      price: 199.00,
      currency: "USD",
      tags: ["bundle", "game", "unity", "sale"],
      isBundle: true,
      type: "mobile"
    },
    {
      productId: "SMA-G01",
      name: "Billiards Multiplayer – 8 Ball Pool clone Unity",
      description: "A complete, ready-to-publish 8 Ball Pool clone built in Unity. Features robust multiplayer functionality, smooth physics, and monetization options.",
      category: "Game",
      platform: "Unity",
      price: 699.00,
      currency: "USD",
      tags: ["multiplayer", "sports", "billiards", "8 ball pool"],
      isBundle: false,
      type: "mobile"
    },
    {
      productId: "SMA-G02",
      name: "Supermarket Simulator – Full Source Code for Unity",
      description: "A trending supermarket simulation game source code. Fully customizable with complete assets, ready for publishing on mobile stores.",
      category: "Game",
      platform: "Unity",
      price: 69.00,
      currency: "USD",
      tags: ["simulator", "management", "hyper-casual"],
      isBundle: false,
      type: "mobile"
    },
    {
      productId: "SMA-U01",
      name: "Torch FlashLight with Strobe, Compass and Camera Preview",
      description: "A feature-rich flashlight utility app for Android. Includes strobe light, a built-in compass, and a camera preview for enhanced functionality.",
      category: "Utility",
      platform: "Android",
      price: 49.00,
      currency: "USD",
      tags: ["utility", "flashlight", "tools"],
      isBundle: false,
      type: "mobile"
    },
    {
      productId: "SMA-E01",
      name: "On-Demand Food Delivery App (UberEats Clone)",
      description: "A white-label, ready-to-customize food delivery application source code. Includes customer app, driver app, and restaurant admin panel.",
      category: "E-commerce",
      platform: "Cross-platform",
      price: 1299.00,
      currency: "USD",
      tags: ["food delivery", "on-demand", "ecommerce", "clone"],
      isBundle: false,
      type: "mobile"
    },
    {
      productId: "SMA-S01",
      name: "Dating App Template (Tinder Clone)",
      description: "A fully functional dating app source code with features like swipe, match, chat, and user profiles. Ready for customization and deployment.",
      category: "Social",
      platform: "Cross-platform",
      price: 999.00,
      currency: "USD",
      tags: ["dating", "social", "tinder clone"],
      isBundle: false,
      type: "mobile"
    },
    {
      productId: "CST-A01",
      name: "Cam Scanner - Android App Template",
      description: "A powerful document scanner app template for Android. Features include PDF creation, OCR, and cloud sync integration. Admob ready.",
      category: "Utility",
      platform: "Android",
      price: 19.00,
      currency: "USD",
      tags: ["scanner", "productivity", "tools"],
      isBundle: false,
      type: "mobile"
    }
  ];

  // Desktop Software
  const desktopProducts = [
    {
      productId: "DSK-B01",
      name: "iDevr Office Suite 2025",
      description: "A comprehensive office productivity suite including a word processor, spreadsheet application, and presentation software. Fully compatible with Microsoft Office formats.",
      category: "Business & Productivity",
      platform: "Windows, macOS",
      price: 149.99,
      currency: "USD",
      tags: ["office", "productivity", "business"],
      isBundle: false,
      type: "desktop",
      pricingModel: "Hybrid",
      priceDetails: {
        perpetual: { price: 149.99, currency: "USD", description: "One-time purchase for one device." },
        subscription: { price: 69.99, currency: "USD", period: "year", description: "Annual subscription with continuous updates." }
      }
    },
    {
      productId: "DSK-F01",
      name: "ProBooks Accounting Software",
      description: "Robust accounting software for small to medium-sized businesses. Manage invoices, expenses, payroll, and generate financial reports.",
      category: "Financial",
      platform: "Windows",
      price: 29.99,
      currency: "USD",
      tags: ["accounting", "finance", "business"],
      isBundle: false,
      type: "desktop",
      pricingModel: "Subscription",
      priceDetails: {
        monthly: { price: 29.99, currency: "USD", period: "month" },
        annual: { price: 299.99, currency: "USD", period: "year" }
      }
    },
    {
      productId: "DSK-E01",
      name: "EnterpriseConnect CRM",
      description: "A scalable Customer Relationship Management (CRM) system for enterprises. Features lead management, sales tracking, and advanced reporting.",
      category: "Business & Productivity",
      platform: "Cross-platform",
      price: 75.00,
      currency: "USD",
      tags: ["crm", "enterprise", "sales"],
      isBundle: false,
      type: "desktop",
      pricingModel: "Per-User Subscription",
      priceDetails: {
        perUserPerMonth: { price: 75.00, currency: "USD", period: "month", description: "Billed annually. Custom enterprise plans available." }
      }
    }
  ];

  // Create all products
  for (const productData of [...mobileProducts, ...desktopProducts]) {
    await prisma.product.upsert({
      where: { productId: productData.productId },
      update: productData,
      create: productData,
    });
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
