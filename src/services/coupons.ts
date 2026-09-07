import { prisma } from "../lib/prisma";


export const getCoupons = async () => {
  return await prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};


export const createCoupon = async (data: any) => {
  return await prisma.coupon.create({
    data: {
      couponCode: data.couponCode.toUpperCase(),
      description: data.description || null,
      discountType: data.discountType,
      amount: Number(data.amount),
      expiryDate: new Date(data.expiryDate),
    },
  });
};