import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default async function MyOrdersPage() {
  // In production, get customer ID from auth session and fetch their orders
  // For now, show placeholder

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      <Card>
        <CardContent className="py-16 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No orders yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            When you place an order, it will appear here.
          </p>
          <Link href="/in/category/electronics">
            <Button className="mt-4">Start Shopping</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
