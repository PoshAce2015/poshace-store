// Razorpay server-side utilities
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

interface CreateOrderParams {
  amount: number; // in INR (will convert to paise)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export async function createRazorpayOrder({
  amount,
  currency = "INR",
  receipt,
  notes,
}: CreateOrderParams) {
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")}`,
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt,
      notes,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Razorpay order creation failed: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function verifyRazorpayPayment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const crypto = await import("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return expectedSignature === razorpaySignature;
}

export async function fetchPayment(paymentId: string) {
  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch payment");
  return response.json();
}

export async function createRefund(paymentId: string, amount?: number) {
  const body: any = {};
  if (amount) body.amount = Math.round(amount * 100);

  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) throw new Error("Failed to create refund");
  return response.json();
}
