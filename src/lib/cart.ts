"use server";

import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

// Get or create a cart for the current session/user
export async function getOrCreateCart(customerId?: string) {
  const supabase = createAdminClient();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  // Try to find existing cart
  if (customerId) {
    const { data } = await supabase
      .from("carts")
      .select("*, items:cart_items(*, variant:product_variants(*, product:products(title, slug, primary_image_url)))")
      .eq("customer_id", customerId)
      .eq("status", "active")
      .single();

    if (data) return data;
  } else if (sessionId) {
    const { data } = await supabase
      .from("carts")
      .select("*, items:cart_items(*, variant:product_variants(*, product:products(title, slug, primary_image_url)))")
      .eq("session_id", sessionId)
      .eq("status", "active")
      .single();

    if (data) return data;
  }

  // Create new cart
  const newSessionId = sessionId || crypto.randomUUID();
  const { data: cart, error } = await supabase
    .from("carts")
    .insert({
      customer_id: customerId || null,
      session_id: customerId ? null : newSessionId,
      status: "active",
    })
    .select("*, items:cart_items(*, variant:product_variants(*, product:products(title, slug, primary_image_url)))")
    .single();

  if (error) throw new Error(`Failed to create cart: ${error.message}`);

  // Set session cookie if guest
  if (!customerId) {
    cookieStore.set("cart_session", newSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  }

  return cart;
}

export async function addToCart(variantId: string, quantity: number = 1, customerId?: string) {
  const supabase = createAdminClient();
  const cart = await getOrCreateCart(customerId);

  // Get variant price
  const { data: variant } = await supabase
    .from("product_variants")
    .select("price")
    .eq("id", variantId)
    .single();

  if (!variant) throw new Error("Variant not found");

  // Check if item already in cart
  const existingItem = cart.items?.find((i: any) => i.variant_id === variantId);

  if (existingItem) {
    await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);
  } else {
    await supabase.from("cart_items").insert({
      cart_id: cart.id,
      variant_id: variantId,
      quantity,
      unit_price: variant.price,
    });
  }

  // Update cart timestamp
  await supabase
    .from("carts")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", cart.id);
}

export async function updateCartItem(itemId: string, quantity: number) {
  const supabase = createAdminClient();

  if (quantity <= 0) {
    await supabase.from("cart_items").delete().eq("id", itemId);
  } else {
    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", itemId);
  }
}

export async function removeCartItem(itemId: string) {
  const supabase = createAdminClient();
  await supabase.from("cart_items").delete().eq("id", itemId);
}

export async function getCartItemCount(customerId?: string): Promise<number> {
  const supabase = createAdminClient();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  let query = supabase
    .from("cart_items")
    .select("quantity, cart:carts!inner(id)", { count: "exact" });

  if (customerId) {
    query = query.eq("cart.customer_id", customerId).eq("cart.status", "active");
  } else if (sessionId) {
    query = query.eq("cart.session_id", sessionId).eq("cart.status", "active");
  } else {
    return 0;
  }

  const { data } = await query;
  return data?.reduce((sum: number, item: any) => sum + item.quantity, 0) ?? 0;
}

export async function applyCoupon(cartId: string, code: string) {
  const supabase = createAdminClient();

  const { data: coupon } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("status", "active")
    .single();

  if (!coupon) return { error: "Invalid coupon code" };

  const now = new Date();
  if (coupon.starts_at && new Date(coupon.starts_at) > now) return { error: "Coupon not yet active" };
  if (coupon.expires_at && new Date(coupon.expires_at) < now) return { error: "Coupon expired" };
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) return { error: "Coupon usage limit reached" };

  await supabase
    .from("carts")
    .update({ coupon_code: code.toUpperCase() })
    .eq("id", cartId);

  return { coupon };
}
