import { Router } from "express";
import { createOrder, getCustomerOrders } from "../services/orders";

const router = Router();

// ================= CREATE ORDER =================

router.post("/", async (req, res) => {
  try {
    const order = await createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        error?.message || "Failed to create order",
    });
  }
});




// GET CUSTOMER ORDERS

router.get("/", async (req, res) => {
  try {
    const { customerId } = req.query;

    if (!customerId || typeof customerId !== "string") {
      return res.status(400).json({
        success: false,
        message: "customerId is required",
      });
    }

    const orders = await getCustomerOrders(customerId);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error: any) {
    console.error("GET CUSTOMER ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error?.message || "Failed to fetch orders",
    });
  }
});

export default router;