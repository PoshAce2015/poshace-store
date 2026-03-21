import Link from "next/link";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { getOrCreateCart } from "@/lib/cart";
import { updateCartItemAction, removeCartItemAction, applyCouponAction } from "./actions";

export default async function CartPage() {
  let cart: any = null;
  try {
    cart = await getOrCreateCart();
  } catch {
    // no cart
  }

  const items = cart?.items ?? [];
  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.unit_price * item.quantity,
    0
  );
  const isEmpty = items.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" />
        Shopping Cart
      </h1>

      {isEmpty ? (
        <Card>
          <CardContent className="py-16 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Browse our categories to find products you love.
            </p>
            <Link href="/electronics.html">
              <Button className="mt-4">Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item: any) => {
              const product = item.variant?.product;
              const variant = item.variant;
              return (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded flex-shrink-0 overflow-hidden">
                        {product?.primary_image_url ? (
                          <img src={product.primary_image_url} alt={product.title} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/${product?.slug}.html`} className="font-medium text-sm hover:underline line-clamp-2">
                          {product?.title || "Product"}
                        </Link>
                        {variant?.sku && <p className="text-xs text-muted-foreground mt-0.5">SKU: {variant.sku}</p>}
                        <p className="font-bold mt-1">₹{Number(item.unit_price).toLocaleString("en-IN")}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <form className="flex items-center gap-1">
                          <Button formAction={updateCartItemAction.bind(null, item.id, item.quantity - 1)} variant="outline" size="icon" className="h-8 w-8" disabled={item.quantity <= 1}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button formAction={updateCartItemAction.bind(null, item.id, item.quantity + 1)} variant="outline" size="icon" className="h-8 w-8">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </form>
                        <form action={removeCartItemAction.bind(null, item.id)}>
                          <Button type="submit" variant="ghost" size="sm" className="text-destructive h-7 px-2 text-xs">
                            <Trash2 className="h-3 w-3 mr-1" />Remove
                          </Button>
                        </form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div>
            <Card>
              <CardHeader><CardTitle className="text-base">Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Duties</span>
                  <span className="text-green-600">Included</span>
                </div>
                <Separator />
                <form action={applyCouponAction} className="flex gap-2">
                  <input type="hidden" name="cartId" value={cart.id} />
                  <Input name="code" placeholder="Coupon code" className="text-sm" />
                  <Button type="submit" variant="outline" size="sm">Apply</Button>
                </form>
                {cart.coupon_code && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon: {cart.coupon_code}</span><span>Applied</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-xs text-muted-foreground">All taxes and import duties are included.</p>
                <Link href="/checkout">
                  <Button className="w-full mt-2" size="lg">Proceed to Checkout</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
