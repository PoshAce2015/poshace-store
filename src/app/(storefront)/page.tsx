import Link from "next/link";
import { ArrowRight, Shield, Truck, RotateCcw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const trustPoints = [
  {
    icon: Globe,
    title: "No Customs Hassles",
    description: "All duties and taxes are included in the price. No surprise charges.",
  },
  {
    icon: Shield,
    title: "Guaranteed Authenticity",
    description: "Every product is 100% genuine, sourced directly from verified manufacturers.",
  },
  {
    icon: Truck,
    title: "Direct Sourcing",
    description: "Curated selection from the US and China, delivered to your doorstep.",
  },
  {
    icon: RotateCcw,
    title: "7-Day Free Returns",
    description: "Not satisfied? Return any product within 7 days, no questions asked.",
  },
];

const topCategories = [
  { name: "Electronics", href: "/electronics.html", count: "10,000+" },
  { name: "Computers & Accessories", href: "/computers-and-accessories.html", count: "8,000+" },
  { name: "Watches", href: "/watches.html", count: "5,000+" },
  { name: "Home Improvement", href: "/home-improvement.html", count: "4,000+" },
  { name: "Sports & Fitness", href: "/sports-fitness-and-outdoors.html", count: "6,000+" },
  { name: "Office Products", href: "/office-products.html", count: "3,000+" },
  { name: "Musical Instruments", href: "/musical-instruments.html", count: "2,000+" },
  { name: "Home & Kitchen", href: "/home-and-kitchen.html", count: "7,000+" },
  { name: "Video Games", href: "/video-games.html", count: "3,000+" },
  { name: "Industrial & Scientific", href: "/industrial-and-scientific.html", count: "2,000+" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
            Shop Global Products Like a Local
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            145,000+ authentic imported products from the US and China.
            Customs handled, taxes included, delivered to India.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/electronics.html">
              <Button size="lg">
                Shop Electronics <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about#b2b">
              <Button size="lg" variant="outline">
                B2B / Bulk Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustPoints.map((point) => (
              <div key={point.title} className="text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{point.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topCategories.map((cat) => (
              <Link key={cat.href} href={cat.href}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cat.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="py-12 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Business Buyer?</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Get bulk pricing, GST invoices, and dedicated support for your business purchases.
          </p>
          <Link href="/about#b2b" className="mt-4 inline-block">
            <Button variant="outline">Request Bulk Quote</Button>
          </Link>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Poshace",
            url: "https://poshace.com",
            logo: "https://poshace.com/logo.png",
            description: "India's trusted global product marketplace. Shop 145,000+ authentic imported products.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-33-6902-8439",
              contactType: "customer service",
              email: "info@poshace.com",
              availableLanguage: "English",
            },
            sameAs: [
              "https://www.instagram.com/poshace_official",
              "https://www.facebook.com/poshace",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Poshace",
            url: "https://poshace.com",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://poshace.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  );
}
