"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coupons_1 = require("../services/coupons");
const router = (0, express_1.Router)();
// routes/coupons.ts
router.get("/", async (req, res) => {
    try {
        const coupons = await (0, coupons_1.getCoupons)();
        res.status(200).json({
            success: true,
            message: "Coupons fetched successfully",
            data: coupons,
        });
    }
    catch (error) {
        console.error("GET COUPONS ERROR:", error);
        res.status(500).json({
            success: false,
            message: error?.message || "Failed to fetch coupons",
        });
    }
});
// POST /api/v1/coupons
router.post("/", async (req, res) => {
    console.log("========== CREATE COUPON START ==========");
    try {
        // 1. Frontend/Postman থেকে কী data আসছে
        // console.log("STEP 1 - Request Body:", req.body);
        // 2. Service call করার আগে
        // console.log("STEP 2 - Calling createCoupon service...");
        const coupon = await (0, coupons_1.createCoupon)(req.body);
        // 3. Database থেকে কী response আসছে
        // console.log("STEP 3 - Created Coupon:", coupon);
        // console.log("========== CREATE COUPON SUCCESS ==========");
        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon,
        });
    }
    catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({
            success: false,
            message: error?.message || "Failed to create coupon",
        });
    }
});
exports.default = router;
