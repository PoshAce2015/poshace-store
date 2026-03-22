import type { Metadata } from "next";
import { BadgeCheck, Mail, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Price Match Guarantee",
  description: "Poshace.com price match guarantee. We match prices from Amazon, Flipkart, Meesho, Paytm Mall, and Tata CLiQ.",
};

export default function PriceMatchPage() {
  const competitors = ["Amazon", "Flipkart", "Meesho", "Paytm Mall", "Tata CLiQ"];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Price Match Guarantee</h1>
      <p className="text-muted-foreground mt-3">
        Found a better price elsewhere? We will match it. Our commitment is to offer you the best global products at the most competitive prices.
      </p>

      <Card className="mt-8">
        <CardContent className="pt-6">
          <BadgeCheck className="h-8 w-8 text-primary mb-3" />
          <h2 className="font-semibold text-lg">We Match Prices From</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {competitors.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-3">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <h3 className="font-semibold text-sm">Find a Lower Price</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Find the same product at a lower price on any of the platforms listed above.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <h3 className="font-semibold text-sm">Send Us the Details</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Email <a href="mailto:sales@poshace.com" className="text-primary hover:underline">sales@poshace.com</a> with the following:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-0.5">
                  <li>Product name and our product page link</li>
                  <li>Competitor product page link</li>
                  <li>Screenshot showing the competitor price</li>
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <h3 className="font-semibold text-sm">Get Confirmation</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Our team will verify and confirm the price match within <strong>1-2 business days</strong>. Once approved, we will update the price or issue a credit for the difference.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Conditions</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>The competing product must be identical (same brand, model, and condition)</li>
            <li>The competitor price must be currently available and in stock</li>
            <li>Price match does not apply to clearance, flash sale, or membership-exclusive pricing</li>
            <li>Shipping costs are factored into the price comparison</li>
          </ul>
        </section>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 text-primary" />
          <span>
            Email <a href="mailto:sales@poshace.com" className="text-primary hover:underline">sales@poshace.com</a> to request a price match
          </span>
        </div>
      </div>
    </div>
  );
}
