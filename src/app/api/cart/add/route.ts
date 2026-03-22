import { NextRequest, NextResponse } from "next/server";
import { addToCart } from "@/lib/cart";

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity } = await request.json();

    if (!variantId) {
      return NextResponse.json({ error: "variantId required" }, { status: 400 });
    }

    await addToCart(variantId, quantity || 1);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to add to cart" },
      { status: 500 }
    );
  }
}
