"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSellerOrderStatus = exports.getSellerOrderById = exports.getSellerOrders = void 0;
const prisma_1 = require("../lib/prisma");
const getSellerOrders = async (sellerId) => {
    if (!sellerId) {
        throw new Error("Seller ID is required.");
    }
    const orderItems = await prisma_1.prisma.orderItems.findMany({
        where: {
            sellerId,
        },
        include: {
            order: {
                include: {
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                    sku: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const groupedOrders = new Map();
    for (const item of orderItems) {
        const orderId = item.order.id;
        if (!groupedOrders.has(orderId)) {
            groupedOrders.set(orderId, {
                id: item.order.id,
                orderNumber: item.order.orderNumber,
                status: item.order.orderStatus,
                total: 0,
                createdAt: item.order.createdAt,
                customer: item.order.customer,
                items: [],
            });
        }
        const currentOrder = groupedOrders.get(orderId);
        currentOrder.items.push({
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            productImage: item.product?.images?.[0] || null,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
        });
        currentOrder.total += item.total;
    }
    return Array.from(groupedOrders.values());
};
exports.getSellerOrders = getSellerOrders;
const getSellerOrderById = async (orderId) => {
    // console.log("STEP 1 - Order ID:", orderId);
    const order = await prisma_1.prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: {
                include: {
                    product: {
                        select: {
                            sku: true,
                            images: true,
                        },
                    },
                },
            },
        },
    });
    // console.log("STEP 1 - Order from database:", order);
    return order;
};
exports.getSellerOrderById = getSellerOrderById;
const updateSellerOrderStatus = async (orderId, status) => {
    // console.log("Step status 1 - Order ID: " , orderId)
    //  console.log("STEP STATUS 1 - New Status:", status);
    const updateOrder = await prisma_1.prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            orderStatus: status,
        }
    });
    //  console.log("Step Status 1 - Updated Order: " , updateOrder);
    return updateOrder;
};
exports.updateSellerOrderStatus = updateSellerOrderStatus;
