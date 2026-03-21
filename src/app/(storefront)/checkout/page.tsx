import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getOrCreateCart } from "@/lib/cart";
import { placeOrderAction } from "./actions";

export default async function CheckoutPage() {
  let cart: any = null;
  try {
    cart = await getOrCreateCart();
  } catch {
    redirect("/cart");
  }

  const items = cart?.items ?? [];
  if (items.length === 0) redirect("/cart");

  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.unit_price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form action={placeOrderAction}>
        <input type="hidden" name="cartId" value={cart.id} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Shipping Address</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="first_name">First Name</Label><Input id="first_name" name="first_name" required /></div>
                  <div><Label htmlFor="last_name">Last Name</Label><Input id="last_name" name="last_name" required /></div>
                </div>
                <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" required /></div>
                <div><Label htmlFor="address_line1">Address Line 1</Label><Input id="address_line1" name="address_line1" required /></div>
                <div><Label htmlFor="address_line2">Address Line 2</Label><Input id="address_line2" name="address_line2" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="city">City</Label><Input id="city" name="city" required /></div>
                  <div><Label htmlFor="state">State</Label><Input id="state" name="state" required /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="postal_code">Pincode</Label><Input id="postal_code" name="postal_code" required /></div>
                  <div><Label htmlFor="country">Country</Label><Input id="country" name="country" defaultValue="India" readOnly /><input type="hidden" name="country_code" value="IN" /></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">GST Details (Optional)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="company_name">Company Name</Label><Input id="company_name" name="company_name" /></div>
                  <div><Label htmlFor="gst_number">GST Number</Label><Input id="gst_number" name="gst_number" placeholder="22AAAAA0000A1Z5" /></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Payment Method</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-accent">
                  <input type="radio" name="payment_method" value="razorpay" defaultChecked className="accent-primary" />
                  <div><p className="text-sm font-medium">Pay Online</p><p className="text-xs text-muted-foreground">UPI, Credit/Debit Card, Net Banking, Wallets</p></div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-accent">
                  <input type="radio" name="payment_method" value="cod" className="accent-primary" />
                  <div><p className="text-sm font-medium">Cash on Delivery</p><p className="text-xs text-muted-foreground">Pay when your order arrives</p></div>
                </label>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Order Notes (Optional)</CardTitle></CardHeader>
              <CardContent><Input name="customer_notes" placeholder="Any special instructions..." /></CardContent>
            </Card>
          </div>
          <div>
            <Card className="sticky top-24">
              <CardHeader><CardTitle className="text-base">Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">{item.variant?.product?.title || "Product"} x{item.quantity}</span>
                    <span>₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="text-green-600">Free</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Taxes & Duties</span><span className="text-green-600">Included</span></div>
                <Separator />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                <Button type="submit" className="w-full mt-2" size="lg">Place Order</Button>
                <p className="text-xs text-muted-foreground text-center mt-2">By placing your order, you agree to our terms of service and return policy.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
