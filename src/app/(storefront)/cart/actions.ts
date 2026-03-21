"use server";

import { revalidatePath } from "next/cache";
import { updateCartItem, removeCartItem, applyCoupon } from "@/lib/cart";

export async function updateCartItemAction(itemId: string, quantity: number) {
  await updateCartItem(itemId, quantity);
  revalidatePath("/cart");
}

export async function removeCartItemAction(itemId: string) {
  await removeCartItem(itemId);
  revalidatePath("/cart");
}

export async function applyCouponAction(formData: FormData) {
  const cartId = formData.get("cartId") as string;
  const code = formData.get("code") as string;
  if (!code) return;
  await applyCoupon(cartId, code);
  revalidatePath("/cart");
}
