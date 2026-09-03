import { Router } from "express";
import { searchProducts } from "../services/search";


const router = Router();

router.get("/", async (req, res) => {
  try {
    const search =
      typeof req.query.q === "string"
        ? req.query.q.trim()
        : "";

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const products = await searchProducts(search);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Search products error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search products",
    });
  }
});

export default router;