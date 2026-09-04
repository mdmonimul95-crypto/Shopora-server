import { Router } from "express";
import { createOrder } from "../services/orders";

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

export default router;