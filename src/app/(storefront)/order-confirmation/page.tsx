import Link from "next/link";
import { CheckCircle, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  searchParams: Promise<{ order?: string; payment?: string }>;
};

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const sp = await searchParams;
  const orderNumber = sp.order;
  const paymentPending = sp.payment === "pending";

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />

      <h1 className="text-3xl font-bold">Order Confirmed!</h1>

      {orderNumber && (
        <p className="text-lg text-muted-foreground mt-2">
          Order Number: <span className="font-mono font-bold text-foreground">{orderNumber}</span>
        </p>
      )}

      {paymentPending && (
        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800">
              Payment processing... You will receive a confirmation email once payment is verified.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6 text-left">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Processing Time</p>
              <p className="text-sm text-muted-foreground">4-10 business days for order processing and sourcing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">14-21 business days after processing via FedEx/DHL</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground mt-6">
        A confirmation email has been sent. All taxes and import duties are included in your order total.
      </p>

      <div className="flex gap-3 justify-center mt-8">
        <Link href="/account/orders">
          <Button variant="outline">View My Orders</Button>
        </Link>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
