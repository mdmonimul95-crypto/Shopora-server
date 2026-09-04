import { Router } from "express";
import { getSellerOrders } from "../services/sellerOrders";

const router = Router();

router.get("/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;

    const orders = await getSellerOrders(sellerId);

    res.status(200).json({
      success: true,
      message: "Seller orders fetched successfully",
      data: orders,
    });
  } catch (error: any) {
    console.error("GET SELLER ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error?.message || "Failed to fetch seller orders",
    });
  }
});

export default router;