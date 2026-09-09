"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("../services/search");
const router = (0, express_1.Router)();
router.get("/search", async (req, res) => {
    try {
        const query = typeof req.query.query === "string"
            ? req.query.query.trim()
            : "";
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required.",
            });
        }
        const products = await (0, search_1.searchProducts)(query);
        return res.status(200).json({
            success: true,
            message: "Products searched successfully.",
            data: products,
        });
    }
    catch (error) {
        console.error("AI PRODUCT SEARCH ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error?.message || "Failed to search products.",
        });
    }
});
exports.default = router;
