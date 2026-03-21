import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/lib/orders";

const statusColor: Record<string, string> = {
  pending: "secondary",
  confirmed: "default",
  processing: "outline",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
  on_hold: "secondary",
  return_requested: "outline",
  refunded: "destructive",
};

const paymentColor: Record<string, string> = {
  pending: "secondary",
  authorized: "outline",
  captured: "default",
  failed: "destructive",
  refunded: "destructive",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");

  let orders: any[] = [];
  let total = 0;

  try {
    const result = await getOrders({ page, status: params.status });
    orders = result.orders;
    total = result.total;
  } catch {
    // empty
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground">{total} orders total</p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map(
          (s) => (
            <Link
              key={s}
              href={`/admin/orders${s === "all" ? "" : `?status=${s}`}`}
            >
              <Badge variant={params.status === s || (!params.status && s === "all") ? "default" : "outline"}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Badge>
            </Link>
          )
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {order.order_number}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.customer
                        ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim() || order.customer.email
                        : "Guest"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={(statusColor[order.status] as any) ?? "secondary"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={(paymentColor[order.payment_status] as any) ?? "secondary"}>
                        {order.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.items?.length ?? 0} items
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <p className="text-muted-foreground">No orders yet</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {total > 25 && (
        <div className="flex justify-center gap-2 mt-4">
          {page > 1 && (
            <Link href={`/admin/orders?page=${page - 1}`}>
              <Button variant="outline" size="sm">Previous</Button>
            </Link>
          )}
          <span className="text-sm text-muted-foreground self-center">
            Page {page} of {Math.ceil(total / 25)}
          </span>
          {page < Math.ceil(total / 25) && (
            <Link href={`/admin/orders?page=${page + 1}`}>
              <Button variant="outline" size="sm">Next</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
