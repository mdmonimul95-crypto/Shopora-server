import { prisma } from "../lib/prisma";

const getWeekRange = (weekOffset = 0) => {
  const now = new Date();

  const start = new Date(now);

  start.setDate(
    now.getDate() - now.getDay() - 7 * weekOffset
  );

  start.setHours(0, 0, 0, 0);

  const end = new Date(start);

  end.setDate(start.getDate() + 7);
  end.setHours(23, 59, 59, 999);

  return {
    start,
    end,
  };
};

export const getSellerDashboardStats = async (
  sellerId: string
) => {
  if (!sellerId) {
    throw new Error("Seller ID is required");
  }

  // ============================================
  // WEEK RANGE
  // ============================================

  const currentWeek = getWeekRange(0);
  const previousWeek = getWeekRange(1);

  // ============================================
  // TOTAL PRODUCTS
  // ============================================

  const totalProducts = await prisma.product.count({
    where: {
      sellerId,
    },
  });

  // ============================================
  // CURRENT WEEK SALES
  // ============================================

  const currentSales = await prisma.orderItems.aggregate({
    where: {
      sellerId,

      createdAt: {
        gte: currentWeek.start,
        lte: currentWeek.end,
      },

      order: {
        is: {
          orderStatus: {
            notIn: ["CANCELLED", "REFUNDED"],
          },
        },
      },
    },

    _sum: {
      total: true,
      quantity: true,
    },
  });

  // ============================================
  // PREVIOUS WEEK SALES
  // ============================================

  const previousSales = await prisma.orderItems.aggregate({
    where: {
      sellerId,

      createdAt: {
        gte: previousWeek.start,
        lte: previousWeek.end,
      },

      order: {
        is: {
          orderStatus: {
            notIn: ["CANCELLED", "REFUNDED"],
          },
        },
      },
    },

    _sum: {
      total: true,
      quantity: true,
    },
  });

  // ============================================
  // ALL SELLER ORDERS
  // ============================================

  const sellerOrders = await prisma.orderItems.findMany({
    where: {
      sellerId,

      order: {
        is: {
          orderStatus: {
            notIn: ["CANCELLED", "REFUNDED"],
          },
        },
      },
    },

    select: {
      orderId: true,
    },

    distinct: ["orderId"],
  });

  // ============================================
  // CURRENT WEEK ORDERS
  // ============================================

  const currentWeekOrders =
    await prisma.orderItems.findMany({
      where: {
        sellerId,

        createdAt: {
          gte: currentWeek.start,
          lte: currentWeek.end,
        },

        order: {
          is: {
            orderStatus: {
              notIn: ["CANCELLED", "REFUNDED"],
            },
          },
        },
      },

      select: {
        orderId: true,
      },

      distinct: ["orderId"],
    });

  // ============================================
  // PREVIOUS WEEK ORDERS
  // ============================================

  const previousWeekOrders =
    await prisma.orderItems.findMany({
      where: {
        sellerId,

        createdAt: {
          gte: previousWeek.start,
          lte: previousWeek.end,
        },

        order: {
          is: {
            orderStatus: {
              notIn: ["CANCELLED", "REFUNDED"],
            },
          },
        },
      },

      select: {
        orderId: true,
      },

      distinct: ["orderId"],
    });

  // ============================================
  // CURRENT WEEK VALUES
  // ============================================

  const totalSales =
    currentSales._sum?.total ?? 0;

  const productsSold =
    currentSales._sum?.quantity ?? 0;

  // ============================================
  // ORDERS
  // ============================================

  const totalOrders = sellerOrders.length;

  const currentOrders =
    currentWeekOrders.length;

  const previousOrders =
    previousWeekOrders.length;

  // ============================================
  // PREVIOUS WEEK VALUES
  // ============================================

  const previousTotalSales =
    previousSales._sum?.total ?? 0;

  const previousProductsSold =
    previousSales._sum?.quantity ?? 0;

  // ============================================
  // GROWTH CALCULATION
  // ============================================

  const calculateGrowth = (
    current: number,
    previous: number
  ) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }

    return Number(
      (
        ((current - previous) / previous) *
        100
      ).toFixed(1)
    );
  };

  // ============================================
  // FINAL RESPONSE
  // ============================================

  return {
    totalSales,

    totalOrders,

    productsSold,

    totalEarnings: totalSales,

    totalProducts,

    storeViews: 0,

    storeViewsGrowth: 0,

    growth: {
      sales: calculateGrowth(
        totalSales,
        previousTotalSales
      ),

      orders: calculateGrowth(
        currentOrders,
        previousOrders
      ),

      productsSold: calculateGrowth(
        productsSold,
        previousProductsSold
      ),

      earnings: calculateGrowth(
        totalSales,
        previousTotalSales
      ),
    },
  };
};