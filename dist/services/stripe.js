"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const stripe_1 = require("../lib/stripe");
const createCheckoutSession = async (data) => {
    const session = await stripe_1.stripe.checkout.sessions.create({
        mode: "payment",
        line_items: data.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    ...(item.image
                        ? {
                            images: [item.image],
                        }
                        : {}),
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        })),
        customer_creation: "always",
        metadata: {
            customerId: data.customerId,
            shippingName: data.shippingName,
            shippingPhone: data.shippingPhone,
            shippingAddress: data.shippingAddress,
            shippingCity: data.shippingCity || "",
            shippingPostalCode: data.shippingPostalCode || "",
            shippingCountry: data.shippingCountry || "",
            shippingFee: String(data.shippingFee),
            discount: String(data.discount),
            productId: data.items[0]?.productId || "",
            quantity: String(data.items[0]?.quantity || 1),
        },
        success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/checkout/cancel`,
        billing_address_collection: "auto",
    });
    return session;
};
exports.createCheckoutSession = createCheckoutSession;
