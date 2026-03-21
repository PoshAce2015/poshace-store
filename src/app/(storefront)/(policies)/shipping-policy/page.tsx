import type { Metadata } from "next";
import { Truck, Clock, Globe, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Poshace shipping policy. Processing time 4-10 business days, delivery 14-21 business days. International shipping via FedEx and DHL.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Shipping Policy</h1>
      <p className="text-muted-foreground mt-3">
        At Poshace, we are committed to delivering your orders seamlessly, no matter where you are.
      </p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Processing Time</h2>
                <p className="text-muted-foreground mt-1">
                  Orders are processed within <strong>4-10 business days</strong>. During this time, we source and prepare your products for shipment from our global network of suppliers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Truck className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Delivery Timeline</h2>
                <p className="text-muted-foreground mt-1">
                  After processing, delivery typically takes <strong>14-21 business days</strong>. We ship via trusted international carriers including FedEx and DHL for tracked delivery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Globe className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">International Sourcing</h2>
                <p className="text-muted-foreground mt-1">
                  Products ship from various countries globally, primarily the US and China. All customs duties and import taxes are included in the product price — no surprise charges at delivery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="font-semibold text-lg">Potential Delays</h2>
          <p className="text-muted-foreground mt-2">
            While we strive to meet the above timelines, occasional delays may occur due to customs clearance, peak season demand, or global logistics disruptions. We will notify you via email if there are any significant delays to your order.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>Questions? Contact us at support@poshace.com or call (033) 6902 8439</span>
        </div>
      </div>
    </div>
  );
}
