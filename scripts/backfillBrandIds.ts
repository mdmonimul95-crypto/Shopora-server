// Shopora-server/scripts/backfillBrandIds.ts
//
// One-time script: links existing products to the Brands table by
// matching the legacy free-text `brand` field to `Brands.name`.
//
// Run once, from the Shopora-server root:
//   npx ts-node scripts/backfillBrandIds.ts

import { prisma } from "../src/lib/prisma";

async function backfillBrandIds() {
  const products = await prisma.product.findMany({
    where: {
      BrandsId: null,
      brand: { not: null },
    },
    select: { id: true, brand: true },
  });

  console.log(`Found ${products.length} products with no BrandsId set.`);

  const brands = await prisma.brands.findMany({
    select: { id: true, name: true },
  });

  const brandMap = new Map(
    brands.map((b) => [b.name.trim().toLowerCase(), b.id])
  );

  let linked = 0;
  let skipped = 0;

  for (const product of products) {
    const key = product.brand?.trim().toLowerCase();
    const brandId = key ? brandMap.get(key) : undefined;

    if (!brandId) {
      console.warn(
        `  ⚠️  No matching Brand found for product ${product.id} (brand="${product.brand}") — skipped.`
      );
      skipped++;
      continue;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { BrandsId: brandId },
    });

    linked++;
  }

  console.log(`Done. Linked: ${linked}, Skipped (no match): ${skipped}`);
}

backfillBrandIds()
  .catch((err) => {
    console.error("Backfill failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });