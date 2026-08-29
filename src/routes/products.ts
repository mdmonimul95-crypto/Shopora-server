import { Router } from "express";
import { createProduct } from "../services/products";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
});

export default router;