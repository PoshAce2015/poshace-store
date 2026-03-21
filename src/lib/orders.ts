"use server";

import { createAdminClient } from "@/lib/supabase/admin";

function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = `${date.getFullYear().toString().slice(2)}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `POSH-${dateStr}-${random}`;
}

export async function createOrder({
  cartId,
  customerId,
  shippingAddress,
  billingAddress,
  paymentMethod,
  paymentReference,
  couponCode,
  isB2b,
  customerNotes,
}: {
  cartId: string;
  customerId?: string;
  shippingAddress: Record<string, any>;
  billingAddress: Record<string, any>;
  paymentMethod: string;
  paymentReference?: string;
  couponCode?: string;
  isB2b?: boolean;
  customerNotes?: string;
}) {
  const supabase = createAdminClient();

  // Get cart with items
  const { data: cart } = await supabase
    .from("carts")
    .select("*, items:cart_items(*, variant:product_variants(*))")
    .eq("id", cartId)
    .single();

  if (!cart || !cart.items?.length) throw new Error("Cart is empty");

  // Calculate totals
  const subtotal = cart.items.reduce(
    (sum: number, item: any) => sum + item.unit_price * item.quantity,
    0
  );

  // Calculate discount
  let discountAmount = 0;
  if (couponCode) {
    const { data: coupon } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", couponCode)
      .single();

    if (coupon) {
      if (coupon.type === "percentage") {
        discountAmount = subtotal * (coupon.value / 100);
        if (coupon.max_discount) discountAmount = Math.min(discountAmount, coupon.max_discount);
      } else if (coupon.type === "fixed_amount") {
        discountAmount = coupon.value;
      }

      // Increment usage
      await supabase
        .from("coupons")
        .update({ used_count: (coupon.used_count || 0) + 1 })
        .eq("id", coupon.id);
    }
  }

  const shippingAmount = 0; // Free shipping for now
  const taxAmount = 0; // Tax included in price
  const total = subtotal - discountAmount + shippingAmount + taxAmount;

  const orderNumber = generateOrderNumber();

  // Create order
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_id: customerId || null,
      status: paymentMethod === "cod" ? "confirmed" : "pending",
      payment_status: paymentMethod === "cod" ? "pending" : "authorized",
      payment_method: paymentMethod,
      payment_reference: paymentReference || null,
      subtotal,
      tax_amount: taxAmount,
      shipping_amount: shippingAmount,
      discount_amount: discountAmount,
      total,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      coupon_code: couponCode || null,
      is_b2b: isB2b || false,
      customer_notes: customerNotes || null,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create order: ${error.message}`);

  // Create order items
  const orderItems = cart.items.map((item: any) => ({
    order_id: order.id,
    variant_id: item.variant_id,
    product_title: item.variant?.title || "Product",
    sku: item.variant?.sku || "",
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.unit_price * item.quantity,
  }));

  await supabase.from("order_items").insert(orderItems);

  // Mark cart as converted
  await supabase
    .from("carts")
    .update({ status: "converted" })
    .eq("id", cartId);

  // Update inventory (best-effort — decrement stock)
  for (const item of cart.items) {
    try {
      await supabase
        .from("product_variants")
        .update({
          inventory_quantity: Math.max(
            0,
            (item.variant?.inventory_quantity ?? 0) - item.quantity
          ),
        })
        .eq("id", item.variant_id);
    } catch {
      // Non-blocking — inventory update failure shouldn't block order
    }
  }

  return order;
}

export async function getOrderByNumber(orderNumber: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, items:order_items(*, variant:product_variants(*, product:products(title, slug, primary_image_url))), customer:customers(*)")
    .eq("order_number", orderNumber)
    .single();

  if (error) throw error;
  return data;
}

export async function getOrders({
  page = 1,
  pageSize = 25,
  status,
  customerId,
}: {
  page?: number;
  pageSize?: number;
  status?: string;
  customerId?: string;
} = {}) {
  const supabase = createAdminClient();
  let query = supabase
    .from("orders")
    .select("*, customer:customers(first_name, last_name, email), items:order_items(id)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (status) query = query.eq("status", status);
  if (customerId) query = query.eq("customer_id", customerId);

  const { data, error, count } = await query;
  if (error) throw error;
  return { orders: data ?? [], total: count ?? 0 };
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = createAdminClient();
  await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);
}

export async function createReturn({
  orderId,
  items,
  reasonCode,
  reasonDetails,
}: {
  orderId: string;
  items: { orderItemId: string; quantity: number }[];
  reasonCode: string;
  reasonDetails?: string;
}) {
  const supabase = createAdminClient();

  const { data: returnRecord, error } = await supabase
    .from("returns")
    .insert({
      order_id: orderId,
      reason_code: reasonCode,
      reason_details: reasonDetails || null,
      status: "requested",
    })
    .select()
    .single();

  if (error) throw error;

  await supabase.from("return_items").insert(
    items.map((item) => ({
      return_id: returnRecord.id,
      order_item_id: item.orderItemId,
      quantity: item.quantity,
    }))
  );

  // Update order status
  await supabase
    .from("orders")
    .update({ status: "return_requested" })
    .eq("id", orderId);

  return returnRecord;
}
