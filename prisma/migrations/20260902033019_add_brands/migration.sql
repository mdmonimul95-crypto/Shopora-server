-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "BrandsId" TEXT;

-- CreateTable
CREATE TABLE "Brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brands_name_key" ON "Brands"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_BrandsId_fkey" FOREIGN KEY ("BrandsId") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
