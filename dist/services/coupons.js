"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoupon = exports.getCoupons = void 0;
const prisma_1 = require("../lib/prisma");
const getCoupons = async () => {
    return await prisma_1.prisma.coupon.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getCoupons = getCoupons;
const createCoupon = async (data) => {
    return await prisma_1.prisma.coupon.create({
        data: {
            couponCode: data.couponCode.toUpperCase(),
            description: data.description || null,
            discountType: data.discountType,
            amount: Number(data.amount),
            expiryDate: new Date(data.expiryDate),
        },
    });
};
exports.createCoupon = createCoupon;
