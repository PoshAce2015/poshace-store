import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Truck, RotateCcw, FileText, ShoppingCart, ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { ShareButtons } from "@/components/storefront/share-buttons";
import { QuantityInput } from "@/components/storefront/quantity-input";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
};

// Parse the slug segments: strip .html, determine if product or category
function parseSlug(segments: string[]): { type: "product" | "category"; key: string } {
  // Join all segments, strip .html from the last one
  const lastSegment = segments[segments.length - 1];
  const cleanLast = lastSegment.endsWith(".html")
    ? lastSegment.slice(0, -5)
    : lastSegment;

  const cleanSegments = [...segments.slice(0, -1), cleanLast];
  const fullPath = cleanSegments.join("/");

  // If single segment → could be product or category (try product first)
  // If multiple segments → likely category path
  if (cleanSegments.length === 1) {
    return { type: "product", key: fullPath }; // will fallback to category
  }
  return { type: "category", key: fullPath };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  const supabase = createAdminClient();

  try {
    // Try product first (for single-segment slugs)
    if (parsed.type === "product") {
      const { data: product } = await supabase
        .from("products")
        .select("title, meta_title, meta_description, short_description, primary_image_url")
        .eq("slug", parsed.key)
        .eq("status", "active")
        .eq("publish_status", "published")
        .single();

      if (product) {
        const title = product.meta_title || `${product.title} | Buy Online at Poshace`;
        const description = product.meta_description || product.short_description ||
          `Buy ${product.title} online at Poshace. Authentic imported product, customs included, 7-day free returns. Free international shipping to India.`;
        return {
          title,
          description,
          alternates: { canonical: `https://poshace.com/${parsed.key}.html` },
          openGraph: { title, description, images: product.primary_image_url ? [{ url: product.primary_image_url }] : [] },
        };
      }
    }

    // Try category
    const { data: category } = await supabase
      .from("categories")
      .select("name, seo_title, seo_description")
      .eq("path", parsed.key)
      .eq("status", "active")
      .single();

    if (category) {
      const title = category.seo_title || `${category.name} - Buy Imported ${category.name} Online | Poshace`;
      const description = category.seo_description ||
        `Shop authentic imported ${category.name.toLowerCase()} at Poshace. All duties included, 7-day returns, GST invoices. Free shipping to India.`;
      return { title, description, alternates: { canonical: `https://poshace.com/${parsed.key}.html` } };
    }
  } catch {
    // fall through
  }

  return {};
}

export const revalidate = 3600; // ISR: 1 hour

export default async function CatchAllPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const parsed = parseSlug(slug);
  const supabase = createAdminClient();

  // ─── Try product (single-segment slugs) ───────────────────
  if (parsed.type === "product") {
    const { data: product } = await supabase
      .from("products")
      .select(`*, brand:brands(*), variants:product_variants(*), media:product_media(*), identifiers:product_identifiers(*), categories:product_categories(*, category:categories(*)), attributes:product_attribute_values(*, attribute:attribute_definitions(*))`)
      .eq("slug", parsed.key)
      .eq("status", "active")
      .eq("publish_status", "published")
      .single();

    if (product) {
      return <ProductPage product={product} />;
    }

    // Not a product — try category with single segment
    const { data: category } = await supabase
      .from("categories")
      .select("*")
      .eq("path", parsed.key)
      .eq("status", "active")
      .single();

    if (category) {
      return <CategoryPage category={category} page={parseInt(sp.page ?? "1")} sort={sp.sort} />;
    }

    notFound();
  }

  // ─── Category (multi-segment paths) ───────────────────────
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("path", parsed.key)
    .eq("status", "active")
    .single();

  if (category) {
    return <CategoryPage category={category} page={parseInt(sp.page ?? "1")} sort={sp.sort} />;
  }

  notFound();
}

// ─── Product Page Component ─────────────────────────────────
function ProductPage({ product }: { product: any }) {
  const variant = product.variants?.[0];
  const price = variant?.price;
  const comparePrice = variant?.compare_at_price;
  const savings = comparePrice && price ? (comparePrice - price).toFixed(2) : null;
  const brand = product.brand;
  const media = product.media ?? [];
  const highlights: string[] = product.highlights ?? [];
  const categories = product.categories ?? [];
  const primaryCategory = categories.find((c: any) => c.is_primary)?.category;

  const asin = product.identifiers?.find((i: any) => i.identifier_type === "asin")?.identifier_value;
  const productUrl = `https://poshace.com/${product.slug}.html`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    ...(primaryCategory ? [{ name: primaryCategory.name, url: `/${primaryCategory.path}.html` }] : []),
    { name: product.title, url: `/${product.slug}.html` },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-muted-foreground mb-4">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.url}>
            {i > 0 && <span className="mx-1">/</span>}
            {i < breadcrumbs.length - 1 ? (
              <a href={crumb.url} className="hover:text-foreground">{crumb.name}</a>
            ) : (
              <span className="text-foreground">{crumb.name}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image gallery */}
        <ProductGallery
          images={[
            ...(product.primary_image_url ? [{ url: product.primary_image_url, alt_text: product.title }] : []),
            ...media.map((m: any) => ({ url: m.url, alt_text: m.alt_text || `${product.title} - Image` })),
          ]}
          productTitle={product.title}
        />

        <div>
          {brand && <a href={`/brand/${brand.slug}.html`} className="text-sm text-primary font-medium hover:underline">{brand.name}</a>}
          <h1 className="text-2xl font-bold mt-1">{product.title}</h1>

          {/* SKU */}
          {variant?.sku && <p className="text-xs text-muted-foreground mt-1">SKU: {variant.sku}</p>}

          {/* Price with savings percentage */}
          <div className="mt-4 flex items-baseline gap-3">
            {price && <span className="text-3xl font-bold">₹{Number(price).toLocaleString("en-IN")}</span>}
            {comparePrice && <span className="text-lg text-muted-foreground line-through">₹{Number(comparePrice).toLocaleString("en-IN")}</span>}
            {savings && (
              <Badge variant="secondary">
                Save ₹{Number(savings).toLocaleString("en-IN")} ({Math.round(((comparePrice - price) / comparePrice) * 100)}%)
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">All taxes and duties included | Tracking provided</p>

          {/* Stock status */}
          <div className="mt-3">
            {variant?.inventory_status === "in_stock" ? <Badge>In Stock</Badge> : <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          {/* Estimated delivery */}
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated delivery: 14-21 business days</span>
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Qty:</span>
              <QuantityInput />
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">Buy Now</Button>
            </div>
          </div>

          {/* Buy on Amazon */}
          {asin && (
            <a
              href={`https://www.amazon.in/dp/${asin}?tag=poshace-21`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-sm text-orange-600 hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Also available on Amazon.in
            </a>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-primary" /><span>Customs & duties included</span></div>
            <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-primary" /><span>100% authentic</span></div>
            <div className="flex items-center gap-2 text-sm"><RotateCcw className="h-4 w-4 text-primary" /><span>7-day free returns</span></div>
            <div className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-primary" /><span>GST invoice available</span></div>
          </div>

          {/* Share buttons */}
          <div className="mt-4">
            <ShareButtons url={productUrl} title={product.title} />
          </div>

          <Separator className="my-6" />

          {highlights.length > 0 && (
            <div>
              <h2 className="font-semibold mb-2">Key Features</h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}

          {product.short_description && (
            <div className="mt-4"><p className="text-sm text-muted-foreground">{product.short_description}</p></div>
          )}
        </div>
      </div>

      {product.description && (
        <Card className="mt-8">
          <CardContent className="pt-6 prose prose-sm max-w-none">
            <h2 className="text-lg font-semibold mb-3">Product Description</h2>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </CardContent>
        </Card>
      )}

      {/* Related products — same brand */}
      {brand && (
        <RelatedProducts brandId={brand.id} currentProductId={product.id} brandName={brand.name} />
      )}

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.short_description || product.meta_description,
          image: product.primary_image_url,
          brand: brand ? { "@type": "Brand", name: brand.name } : undefined,
          sku: variant?.sku,
          gtin: product.identifiers?.find((i: any) => i.identifier_type === "gtin")?.identifier_value,
          mpn: product.identifiers?.find((i: any) => i.identifier_type === "mpn")?.identifier_value,
          offers: variant ? {
            "@type": "Offer",
            url: `https://poshace.com/${product.slug}.html`,
            priceCurrency: variant.currency || "INR",
            price: variant.price,
            availability: variant.inventory_status === "in_stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            seller: { "@type": "Organization", name: "Poshace" },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 7,
              returnMethod: "https://schema.org/ReturnByMail",
            },
          } : undefined,
        }),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, i) => ({
            "@type": "ListItem", position: i + 1, name: crumb.name, item: `https://poshace.com${crumb.url}`,
          })),
        }),
      }} />
    </div>
  );
}

// ─── Category Page Component ────────────────────────────────
async function CategoryPage({ category, page, sort }: { category: any; page: number; sort?: string }) {
  const supabase = createAdminClient();
  const pageSize = 24;
  const sortBy = sort || "popular";

  // Get products in this category
  let query = supabase
    .from("products")
    .select(`id, title, slug, primary_image_url, catalog_score, brand:brands(name, slug), variants:product_variants(id, price, compare_at_price, inventory_status)`, { count: "exact" })
    .eq("status", "active")
    .eq("publish_status", "published")
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (sortBy === "newest") query = query.order("created_at", { ascending: false });
  else if (sortBy === "price_asc") query = query.order("catalog_score", { ascending: true });
  else query = query.order("catalog_score", { ascending: false });

  const { data: products, count } = await query;
  const total = count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  // Build breadcrumbs from path
  const pathParts = category.path.split("/");
  const breadcrumbs = [
    { name: "Home", url: "/" },
    ...pathParts.map((part: string, i: number) => ({
      name: part.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
      url: `/${pathParts.slice(0, i + 1).join("/")}.html`,
    })),
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-muted-foreground mb-4">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.url}>
            {i > 0 && <span className="mx-1">/</span>}
            {i < breadcrumbs.length - 1 ? (
              <a href={crumb.url} className="hover:text-foreground">{crumb.name}</a>
            ) : (
              <span className="text-foreground">{crumb.name}</span>
            )}
          </span>
        ))}
      </nav>

      <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
      {category.intro_content && <p className="text-sm text-muted-foreground mb-6 max-w-3xl">{category.intro_content}</p>}

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{total} products</p>
        <div className="flex gap-2">
          {(["popular", "newest", "price_asc", "price_desc"] as const).map((s) => (
            <Link key={s} href={`/${category.path}.html?sort=${s}`}>
              <Badge variant={sortBy === s ? "default" : "outline"}>
                {s === "popular" ? "Popular" : s === "newest" ? "Newest" : s === "price_asc" ? "Price ↑" : "Price ↓"}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {(products && products.length > 0) ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: any) => {
            const variant = product.variants?.[0];
            return (
              <Link key={product.id} href={`/${product.slug}.html`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                    {product.primary_image_url ? (
                      <img src={product.primary_image_url} alt={product.title} className="w-full h-full object-contain" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    {product.brand && <p className="text-xs text-primary font-medium">{product.brand.name}</p>}
                    <h3 className="text-sm font-medium line-clamp-2 mt-0.5">{product.title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      {variant && <span className="font-bold">₹{Number(variant.price).toLocaleString("en-IN")}</span>}
                      {variant?.compare_at_price && <span className="text-xs text-muted-foreground line-through">₹{Number(variant.compare_at_price).toLocaleString("en-IN")}</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12"><p className="text-muted-foreground">No products found in this category.</p></div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && <Link href={`/${category.path}.html?page=${page - 1}&sort=${sortBy}`}><Button variant="outline" size="sm">Previous</Button></Link>}
          <span className="text-sm text-muted-foreground self-center">Page {page} of {totalPages}</span>
          {page < totalPages && <Link href={`/${category.path}.html?page=${page + 1}&sort=${sortBy}`}><Button variant="outline" size="sm">Next</Button></Link>}
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "CollectionPage",
          name: category.name, description: category.seo_description,
          url: `https://poshace.com/${category.path}.html`,
        }),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, i) => ({
            "@type": "ListItem", position: i + 1, name: crumb.name, item: `https://poshace.com${crumb.url}`,
          })),
        }),
      }} />
    </div>
  );
}

// ─── Related Products Component ─────────────────────────────
async function RelatedProducts({ brandId, currentProductId, brandName }: { brandId: string; currentProductId: string; brandName: string }) {
  const supabase = createAdminClient();

  const { data: related } = await supabase
    .from("products")
    .select("id, title, slug, primary_image_url, variants:product_variants(price, compare_at_price)")
    .eq("brand_id", brandId)
    .eq("status", "active")
    .eq("publish_status", "published")
    .neq("id", currentProductId)
    .order("catalog_score", { ascending: false })
    .limit(8);

  if (!related || related.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">More from {brandName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((product: any) => {
          const variant = product.variants?.[0];
          return (
            <Link key={product.id} href={`/${product.slug}.html`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                  {product.primary_image_url ? (
                    <img src={product.primary_image_url} alt={product.title} className="w-full h-full object-contain" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
                  {variant && (
                    <p className="mt-1 font-bold text-sm">₹{Number(variant.price).toLocaleString("en-IN")}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
