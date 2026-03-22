import type { Metadata } from "next";
import { Shield, Globe, Truck, Users, Phone, Mail, Package, Sparkles, Zap, Lock, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Poshace - Your Gateway to Global Products",
  description: "Poshace is India's trusted global product marketplace with 145,000+ authentic imported products. Co-founded by Ujjwal and Abhishek Kumar.",
};

const stats = [
  { value: "145,000+", label: "Products" },
  { value: "75%", label: "Customer Retention" },
  { value: "2,500+", label: "Product Categories" },
  { value: "24/7", label: "Customer Support" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Catering to Your Needs, Delivering Exclusivity with Care
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Your gateway to a world of exclusive, curated products. We bring premium-quality items from across the globe, combined with a seamless shopping experience.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust promises */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <Globe className="h-8 w-8 text-primary mb-3" />
            <h2 className="font-semibold text-lg">No Customs Hassles</h2>
            <p className="text-sm text-muted-foreground mt-2">
              We handle all duties and taxes upfront. The price you see is the price you pay — no surprise charges at delivery, ever.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 text-primary mb-3" />
            <h2 className="font-semibold text-lg">Guaranteed Authenticity</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Every product is 100% genuine. We source directly from verified wholesalers and manufacturers — no fakes, no counterfeits, just the real deal.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Truck className="h-8 w-8 text-primary mb-3" />
            <h2 className="font-semibold text-lg">Direct Sourcing</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Skip the middlemen and save money. We source products directly from the US and China, cutting out unnecessary markups and delivering value to you.
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

      {/* The Core Experience */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">The Core Experience</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Your Global Passport</h3>
              <p className="text-xs text-muted-foreground mt-1">Shop from the US &amp; China like a local</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Package className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Over 100,000+ Products</h3>
              <p className="text-xs text-muted-foreground mt-1">An ever-expanding collection</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Exclusive Global Deals</h3>
              <p className="text-xs text-muted-foreground mt-1">Access hard-to-find products</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Best Price Guarantee</h3>
              <p className="text-xs text-muted-foreground mt-1">The best global brands, minus the markup</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold">Our Story</h2>
        <p className="text-muted-foreground mt-3">
          Poshace was co-founded by Ujjwal and Abhishek Kumar with a simple mission: make global products accessible to Indian buyers without the hassle of customs, authenticity concerns, or hidden charges.
        </p>
        <p className="text-muted-foreground mt-3">
          With a 75% repeat customer rate and 24/7 customer support, we have built a community of smart shoppers who trust Poshace for their imported product needs. Our platform serves over 2,500 product categories, from cutting-edge electronics to niche collectibles.
        </p>
      </div>

      {/* Community */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <Zap className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold">Exclusive Early Access</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Members get first access to new arrivals, flash deals, and limited-edition products before anyone else.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Lock className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold">Innovative Supply Chain</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our direct-from-source model eliminates middlemen, ensuring authenticity and competitive pricing on every product.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* B2B */}
      <div className="mb-12" id="b2b">
        <h2 className="text-2xl font-bold">Business Buyers</h2>
        <p className="text-muted-foreground mt-3">
          Looking for bulk orders? We offer competitive bulk pricing, GST invoices, and dedicated account support for business purchases. Whether you need 10 units or 10,000, we scale with your business.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/contact-us">
            <Button>
              Request Bulk Quote <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Contact */}
      <div id="contact">
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
