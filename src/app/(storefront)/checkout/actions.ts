"use server";

import { redirect } from "next/navigation";
import { createOrder } from "@/lib/orders";

export async function placeOrderAction(formData: FormData) {
  const cartId = formData.get("cartId") as string;
  const paymentMethod = formData.get("payment_method") as string;

  const shippingAddress = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone: formData.get("phone"),
    address_line1: formData.get("address_line1"),
    address_line2: formData.get("address_line2"),
    city: formData.get("city"),
    state: formData.get("state"),
    postal_code: formData.get("postal_code"),
    country_code: formData.get("country_code"),
    company: formData.get("company_name"),
    gst_number: formData.get("gst_number"),
  };

  const isB2b = !!formData.get("gst_number");
  const customerNotes = formData.get("customer_notes") as string;

  const order = await createOrder({
    cartId,
    shippingAddress,
    billingAddress: shippingAddress,
    paymentMethod,
    isB2b,
    customerNotes,
  });

  redirect(`/order-confirmation?order=${order.order_number}`);
}
