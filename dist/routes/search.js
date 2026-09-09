"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("../services/search");
const searchRouter = (0, express_1.Router)();
searchRouter.get("/", async (req, res) => {
    try {
        const query = String(req.query.q || "").trim();
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }
        const products = await (0, search_1.searchProducts)(query);
        return res.status(200).json({
            success: true,
            query,
            count: products.length,
            data: products,
        });
    }
    catch (error) {
        console.error("Search products error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to search products",
        });
    }
});
exports.default = searchRouter;
