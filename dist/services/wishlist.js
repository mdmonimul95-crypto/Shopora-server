"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlistByUser = exports.isProductWishlisted = exports.removeFromWishlist = exports.addToWishlist = void 0;
const prisma_1 = require("../lib/prisma");
const addToWishlist = async (userId, productId) => {
    // upsert = adding an already-wishlisted product is a harmless no-op
    // instead of a duplicate-key error.
    return await prisma_1.prisma.wishlist.upsert({
        where: {
            userId_productId: { userId, productId },
        },
        update: {},
        create: { userId, productId },
    });
};
exports.addToWishlist = addToWishlist;
const removeFromWishlist = async (userId, productId) => {
    return await prisma_1.prisma.wishlist.deleteMany({
        where: { userId, productId },
    });
};
exports.removeFromWishlist = removeFromWishlist;
const isProductWishlisted = async (userId, productId) => {
    const item = await prisma_1.prisma.wishlist.findUnique({
        where: {
            userId_productId: { userId, productId },
        },
    });
    return Boolean(item);
};
exports.isProductWishlisted = isProductWishlisted;
// GET /api/v1/wishlist?userId=...
const getWishlistByUser = async (userId) => {
    const items = await prisma_1.prisma.wishlist.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: "desc" },
    });
    // Flatten into the exact shape the client's WishlistItem UI expects,
    // so the frontend doesn't need to know about the Wishlist join table.
    return items.map((item) => {
        const { product } = item;
        const hasDiscount = product.salePrice != null &&
            product.salePrice > 0 &&
            product.salePrice < product.regularPrice;
        return {
            wishlistId: item.id,
            id: product.id,
            name: product.name,
            image: product.images?.[0] || null,
            category: product.category,
            price: hasDiscount
                ? product.salePrice
                : product.regularPrice,
            originalPrice: hasDiscount
                ? product.regularPrice
                : undefined,
            inStock: product.stockQuantity > 0,
        };
    });
};
exports.getWishlistByUser = getWishlistByUser;
