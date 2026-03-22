import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Clock } from "lucide-react";
import { getUser, getCustomer } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const statusColor: Record<string, string> = {
  pending: "secondary",
  confirmed: "default",
  processing: "outline",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
  return_requested: "outline",
  refunded: "destructive",
};

const statusIcon: Record<string, typeof Clock> = {
  pending: Clock,
  confirmed: Package,
  processing: Package,
  shipped: Truck,
  delivered: Package,
};

export default async function MyOrdersPage() {
  const user = await getUser();
  const customer = await getCustomer();

  let orders: any[] = [];

  if (customer) {
    try {
      const supabase = createAdminClient();
      const { data } = await supabase
        .from("orders")
        .select("*, items:order_items(id, product_title, quantity, unit_price, total_price)")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false })
        .limit(50);

      orders = data ?? [];
    } catch {
      // failed to load
    }
  }

  if (!user) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">My Orders</h2>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Please log in to view your orders.</p>
            <Link href="/login?redirect=/account/orders">
              <Button className="mt-4">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              When you place an order, it will appear here.
            </p>
            <Link href="/electronics.html">
              <Button className="mt-4">Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusIcon[order.status] || Package;
            return (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono font-medium text-sm">
                          {order.order_number}
                        </span>
                        <Badge variant={(statusColor[order.status] as any) ?? "secondary"}>
                          {order.status.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Placed {new Date(order.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{Number(order.total).toLocaleString("en-IN")}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="mt-3 space-y-1">
                    {order.items?.slice(0, 3).map((item: any) => (
                      <p key={item.id} className="text-sm text-muted-foreground truncate">
                        {item.quantity}x {item.product_title}
                      </p>
                    ))}
                    {(order.items?.length ?? 0) > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{order.items.length - 3} more items
                      </p>
                    )}
                  </div>

                  {/* Tracking */}
                  {order.tracking_number && (
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <Truck className="h-3.5 w-3.5 text-primary" />
                      {order.tracking_url ? (
                        <a href={order.tracking_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Track: {order.tracking_number}
                        </a>
                      ) : (
                        <span>Tracking: {order.tracking_number}</span>
                      )}
                    </div>
                  )}

                  {/* Payment info */}
                  <div className="mt-2 text-xs text-muted-foreground">
                    {order.payment_method === "cod" ? "Cash on Delivery" : "Paid online"} &bull;{" "}
                    {order.is_b2b && "B2B order &bull; "}
                    {order.coupon_code && `Coupon: ${order.coupon_code}`}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
