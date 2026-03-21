import type { Metadata } from "next";
import { Shield, Globe, Truck, Users, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Poshace - Your Gateway to Global Products",
  description: "Poshace is India's trusted global product marketplace with 145,000+ authentic imported products. Co-founded by Ujjwal and Abhishek Kumar.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold">About Poshace</h1>
      <p className="text-lg text-muted-foreground mt-4">
        Your gateway to a world of exclusive, curated products. We bring premium-quality items from across the globe, combined with a seamless shopping experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Card>
          <CardContent className="pt-6">
            <Globe className="h-8 w-8 text-primary mb-3" />
            <h2 className="font-semibold text-lg">Global Marketplace</h2>
            <p className="text-sm text-muted-foreground mt-2">
              145,000+ products across 2,500 categories sourced from verified manufacturers worldwide. From the US and China, delivered to your doorstep in India.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 text-primary mb-3" />
            <h2 className="font-semibold text-lg">Guaranteed Authenticity</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Every product is 100% genuine. We source directly from verified wholesalers and manufacturers — no fakes, no counterfeits, ever.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Truck className="h-8 w-8 text-primary mb-3" />
            <h2 className="font-semibold text-lg">Hassle-Free Delivery</h2>
            <p className="text-sm text-muted-foreground mt-2">
              All customs duties and taxes are included in the price. We handle everything — sourcing, customs clearance, and tracked delivery via FedEx and DHL.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Users className="h-8 w-8 text-primary mb-3" />
            <h2 className="font-semibold text-lg">B2B &amp; B2C</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Whether you are an individual buyer or a business, we serve both. GST invoices, bulk pricing, and dedicated support for business purchases.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold">Our Story</h2>
        <p className="text-muted-foreground mt-3">
          Poshace was co-founded by Ujjwal and Abhishek Kumar with a simple mission: make global products accessible to Indian buyers without the hassle of customs, authenticity concerns, or hidden charges.
        </p>
        <p className="text-muted-foreground mt-3">
          With a 75% repeat customer rate and 24/7 customer support, we have built a community of smart shoppers who trust Poshace for their imported product needs.
        </p>
      </div>

      <div className="mt-12" id="b2b">
        <h2 className="text-2xl font-bold">Business Buyers</h2>
        <p className="text-muted-foreground mt-3">
          Looking for bulk orders? We offer competitive bulk pricing, GST invoices, and dedicated account support for business purchases.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/contact-us">
            <Button>Request Bulk Quote</Button>
          </Link>
        </div>
      </div>

      <div className="mt-12" id="contact">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <span>(033) 6902 8439</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <span>support@poshace.com</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Figureout Enterprises — Available 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
