import { stripe } from "../lib/stripe";

type CheckoutItem = {
   productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};

type CreateCheckoutSessionData = {
  items: CheckoutItem[];

  customerId: string;

  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;

  shippingFee: number;
  discount: number;
};

export const createCheckoutSession = async (
  data: CreateCheckoutSessionData
) => {
  const session = await stripe.checkout.sessions.create({
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

    success_url:
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url:
       `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/checkout/cancel`,

    billing_address_collection: "auto",
  });

  return session;
};