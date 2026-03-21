import type { Metadata } from "next";
import { RotateCcw, Shield, Clock, CheckCircle, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Return & Exchange Promise",
  description: "Poshace offers 7-day free returns on all products. Hassle-free return process with full refund.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Return &amp; Exchange Promise</h1>
      <p className="text-muted-foreground mt-3">
        Your satisfaction is our priority. We offer a hassle-free return policy on all products.
      </p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <RotateCcw className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">7-Day Free Returns</h2>
                <p className="text-muted-foreground mt-1">
                  You can return any product within <strong>7 days</strong> of delivery. No questions asked, no hidden charges.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Conditions for Returns</h2>
                <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-inside text-sm">
                  <li>Product must be in original, unused condition</li>
                  <li>Original packaging and tags must be intact</li>
                  <li>Return request must be initiated within 7 days of delivery</li>
                  <li>Proof of purchase (order number) required</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Return Process</h2>
                <ol className="text-muted-foreground mt-2 space-y-2 text-sm list-decimal list-inside">
                  <li>Contact us at support@poshace.com with your order number</li>
                  <li>We will provide return shipping instructions</li>
                  <li>Ship the product back in its original packaging</li>
                  <li>Refund will be processed within 5-7 business days after we receive the return</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Refund Method</h2>
                <p className="text-muted-foreground mt-1">
                  Refunds are processed to the original payment method. For COD orders, refunds are processed via bank transfer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>Need help? Email support@poshace.com or call (033) 6902 8439</span>
        </div>
      </div>
    </div>
  );
}
