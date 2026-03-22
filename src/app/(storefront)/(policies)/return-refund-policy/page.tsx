import type { Metadata } from "next";
import { RotateCcw, XCircle, Clock, MapPin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "Poshace.com return and refund policy. 7-day return window, reimbursement within 14 days.",
};

export default function ReturnRefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Return &amp; Refund Policy</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Figureout Enterprises &bull; Last Updated: March 2025
      </p>

      <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Right of Cancellation</h2>
          <p>
            You have the right to cancel your order within <strong>7 days</strong> from the date you receive the goods, without providing any reason. To exercise this right, contact us at support@poshace.com with your order number and cancellation request.
          </p>
        </section>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-lg text-foreground">Reimbursement Timeline</h2>
                <p className="mt-1">
                  We will reimburse all payments received from you within <strong>14 days</strong> of receiving the returned goods back. Refunds will be issued using the same payment method used for the original transaction. For COD orders, refunds are processed via bank transfer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Return Conditions</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Items must be returned in their original, unused condition</li>
            <li>Original packaging, tags, and accessories must be intact</li>
            <li>Return request must be initiated within 7 days of delivery</li>
            <li>One free exchange per order (size, color, or variant)</li>
            <li>Shipping charges are non-refundable unless the item is defective or incorrect</li>
          </ul>
        </section>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <XCircle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-lg text-foreground">Non-Returnable Items</h2>
                <p className="mt-1 mb-2">The following items cannot be returned:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Custom-made or personalized goods</li>
                  <li>Perishable goods</li>
                  <li>Sealed hygiene products that have been opened after delivery</li>
                  <li>Items that have been inseparably mixed with other goods after delivery</li>
                  <li>Items purchased on sale or clearance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-lg text-foreground">Return Shipping Address</h2>
                <p className="mt-1">
                  Ground Floor, Plot No. 231<br />
                  Satyam Enclave, GT Road<br />
                  Sahibabad, Ghaziabad<br />
                  Uttar Pradesh 201005, India
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">How to Initiate a Return</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Email <a href="mailto:support@poshace.com" className="text-primary hover:underline">support@poshace.com</a> with your order number and reason for return</li>
            <li>We will confirm eligibility and provide return shipping instructions within 1-2 business days</li>
            <li>Pack the item securely in its original packaging and ship it to the address above</li>
            <li>Once received and inspected, your refund will be processed within 7-10 business days</li>
          </ol>
        </section>

        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary" />
          <span>Questions? Contact support@poshace.com or call (033) 6902 8439</span>
        </div>
      </div>
    </div>
  );
}
