-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('FIXED_CART', 'PERCENTAGE', 'FIXED_PRODUCT');

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "couponCode" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "DiscountType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_couponCode_key" ON "Coupon"("couponCode");
