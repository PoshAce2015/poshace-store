import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateStatusAction, addTrackingAction } from "./actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();

  let order: any;
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, items:order_items(*, variant:product_variants(*, product:products(title, slug, primary_image_url))), customer:customers(*), returns(*)")
      .eq("id", id)
      .single();

    if (error || !data) notFound();
    order = data;
  } catch {
    notFound();
  }

  const shipping = order.shipping_address;
  const billing = order.billing_address;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{order.order_number}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge>{order.status}</Badge>
          <Badge variant="outline">{order.payment_status}</Badge>
          {order.is_b2b && <Badge variant="secondary">B2B</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" />
                Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
                      {item.variant?.product?.primary_image_url && (
                        <img
                          src={item.variant.product.primary_image_url}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product_title}</p>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                    <div className="text-sm text-right">
                      <p>{item.quantity} x ₹{Number(item.unit_price).toLocaleString("en-IN")}</p>
                      <p className="font-medium">₹{Number(item.total_price).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{Number(order.subtotal).toLocaleString("en-IN")}</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount {order.coupon_code && `(${order.coupon_code})`}</span>
                    <span>-₹{Number(order.discount_amount).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shipping_amount > 0 ? `₹${Number(order.shipping_amount).toLocaleString("en-IN")}` : "Free"}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{Number(order.total).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="font-medium">{shipping?.first_name} {shipping?.last_name}</p>
              {shipping?.company && <p>{shipping.company}</p>}
              <p>{shipping?.address_line1}</p>
              {shipping?.address_line2 && <p>{shipping.address_line2}</p>}
              <p>{shipping?.city}, {shipping?.state} {shipping?.postal_code}</p>
              <p>{shipping?.country_code}</p>
              {shipping?.phone && <p className="mt-1">Phone: {shipping.phone}</p>}
              {shipping?.gst_number && (
                <p className="mt-1 text-primary">GST: {shipping.gst_number}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar actions */}
        <div className="space-y-6">
          {/* Update status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateStatusAction} className="space-y-3">
                <input type="hidden" name="orderId" value={order.id} />
                <Select name="status" defaultValue={order.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" size="sm" className="w-full">
                  Update Status
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addTrackingAction} className="space-y-3">
                <input type="hidden" name="orderId" value={order.id} />
                <div>
                  <Label htmlFor="tracking_number">Tracking Number</Label>
                  <Input
                    id="tracking_number"
                    name="tracking_number"
                    defaultValue={order.tracking_number ?? ""}
                  />
                </div>
                <div>
                  <Label htmlFor="tracking_url">Tracking URL</Label>
                  <Input
                    id="tracking_url"
                    name="tracking_url"
                    defaultValue={order.tracking_url ?? ""}
                  />
                </div>
                <Button type="submit" size="sm" variant="outline" className="w-full">
                  Save Tracking
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Payment info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span>{order.payment_method || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={(paymentColor[order.payment_status] as any) ?? "secondary"}>
                  {order.payment_status}
                </Badge>
              </div>
              {order.payment_reference && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs">{order.payment_reference}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {order.customer_notes && (
                <div className="mb-2">
                  <p className="text-xs font-medium text-muted-foreground">Customer:</p>
                  <p>{order.customer_notes}</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {order.admin_notes || "No admin notes"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const paymentColor: Record<string, string> = {
  pending: "secondary",
  authorized: "outline",
  captured: "default",
  failed: "destructive",
  refunded: "destructive",
};
