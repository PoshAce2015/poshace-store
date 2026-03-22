import Link from "next/link";
import { ArrowRight, Shield, Truck, RotateCcw, Globe, Package, Store, Sparkles, DollarSign, Plane, ShoppingBag, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProductCarousel } from "@/components/storefront/product-carousel";
import { ProductCard } from "@/components/storefront/product-card";
import { CountdownTimer } from "@/components/storefront/countdown-timer";

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

const shoppingMadeEasy = [
  {
    icon: Plane,
    title: "International Shipping",
    description: "FedEx and DHL ensure quick delivery",
  },
  {
    icon: Store,
    title: "One-Stop Global Store",
    description: "From tech gadgets to rare collectibles",
  },
  {
    icon: Filter,
    title: "No Market Overwhelm",
    description: "Curated, high-quality product selections",
  },
  {
    icon: Users,
    title: "For Global Shoppers",
    description: "Bringing the world to your doorstep",
  },
];

const coreExperience = [
  {
    icon: Globe,
    title: "Your Global Passport",
    description: "Shop from the US & China like a local",
  },
  {
    icon: Package,
    title: "Over 100,000+ Products",
    description: "An ever-expanding collection",
  },
  {
    icon: Sparkles,
    title: "Exclusive Global Deals",
    description: "Access hard-to-find products",
  },
  {
    icon: DollarSign,
    title: "Best Price Guarantee",
    description: "The best global brands, minus the markup",
  },
];

export const revalidate = 1800; // ISR: 30 minutes

async function getHomepageProducts() {
  // Gracefully handle missing env vars during build prerendering
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { newArrivals: [], trending: [], deals: [], bestSellers: [] };
  }

  const supabase = createAdminClient();

  const baseSelect = `id, title, slug, primary_image_url, brand:brands(name, slug), variants:product_variants(price, compare_at_price, inventory_status)`;
  const baseFilters = { status: "active", publish_status: "published" } as const;

  const [newArrivals, trending, deals, bestSellers] = await Promise.all([
    // New Arrivals — latest products
    supabase
      .from("products")
      .select(baseSelect)
      .eq("status", baseFilters.status)
      .eq("publish_status", baseFilters.publish_status)
      .order("created_at", { ascending: false })
      .limit(12),

    // Trending — highest catalog score
    supabase
      .from("products")
      .select(baseSelect)
      .eq("status", baseFilters.status)
      .eq("publish_status", baseFilters.publish_status)
      .order("catalog_score", { ascending: false })
      .limit(12),

    // Top Deals — products with biggest savings (has compare_at_price)
    supabase
      .from("products")
      .select(baseSelect)
      .eq("status", baseFilters.status)
      .eq("publish_status", baseFilters.publish_status)
      .not("variants.compare_at_price", "is", null)
      .order("catalog_score", { ascending: false })
      .limit(12),

    // Best Sellers — high score products (proxy for sales volume)
    supabase
      .from("products")
      .select(baseSelect)
      .eq("status", baseFilters.status)
      .eq("publish_status", baseFilters.publish_status)
      .order("catalog_score", { ascending: false })
      .range(12, 23), // offset to get different products than trending
  ]);

  return {
    newArrivals: newArrivals.data ?? [],
    trending: trending.data ?? [],
    deals: deals.data ?? [],
    bestSellers: bestSellers.data ?? [],
  };
}

export default async function HomePage() {
  const { newArrivals, trending, deals, bestSellers } = await getHomepageProducts();

  // Flash deal deadline: end of today (or a configurable date)
  const dealDeadline = new Date();
  dealDeadline.setHours(23, 59, 59, 999);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
            Your Global Store for Quality Electronics and Accessories
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
            <Link href="/about-us#b2b">
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

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <ProductCarousel title="New Arrivals">
          {newArrivals.map((product: any) => (
            <ProductCard key={product.id} product={product} showActions={false} />
          ))}
        </ProductCarousel>
      )}

      {/* Trending Products */}
      {trending.length > 0 && (
        <ProductCarousel title="Trending Products">
          {trending.map((product: any) => (
            <ProductCard key={product.id} product={product} showActions={false} />
          ))}
        </ProductCarousel>
      )}

      {/* Top Deals with Countdown */}
      {deals.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h2 className="text-xl font-bold">Top Deals</h2>
              <CountdownTimer deadline={dealDeadline} />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {deals.map((product: any) => (
                <ProductCard key={product.id} product={product} showActions={false} />
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <ProductCarousel title="Best Selling Products">
          {bestSellers.map((product: any) => (
            <ProductCard key={product.id} product={product} showActions={false} />
          ))}
        </ProductCarousel>
      )}

      {/* Shopping Made Easy */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Shopping Made Easy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {shoppingMadeEasy.map((item) => (
              <Card key={item.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Core Experience */}
      <section className="py-12 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">The Core Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coreExperience.map((item) => (
              <Card key={item.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Business Buyer?</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Get bulk pricing, GST invoices, and dedicated support for your business purchases.
          </p>
          <Link href="/about-us#b2b" className="mt-4 inline-block">
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
