import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Products",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = sp.q?.trim() || "";
  const page = parseInt(sp.page ?? "1");
  const pageSize = 24;

  let products: any[] = [];
  let total = 0;

  if (query.length >= 2) {
    try {
      const supabase = createAdminClient();

      // Full-text search using Postgres
      const searchTerms = query.split(/\s+/).filter(Boolean).join(" & ");

      const { data, count } = await supabase
        .from("products")
        .select(
          `id, title, slug, primary_image_url, brand:brands(name), variants:product_variants(price, compare_at_price, inventory_status)`,
          { count: "exact" }
        )
        .eq("status", "active")
        .eq("publish_status", "published")
        .or(`title.ilike.%${query}%,slug.ilike.%${query}%`)
        .order("catalog_score", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      products = data ?? [];
      total = count ?? 0;
    } catch {
      // search failed
    }
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Products</h1>

      {/* Search form */}
      <form className="flex gap-2 max-w-2xl mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search by product name, brand, model number, ASIN..."
            className="pl-10"
            autoFocus
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {query && (
        <p className="text-sm text-muted-foreground mb-6">
          {total} results for &quot;{query}&quot;
        </p>
      )}

      {/* Results */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: any) => {
            const variant = product.variants?.[0];
            return (
              <Link key={product.id} href={`/${product.slug}.html`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                    {product.primary_image_url ? (
                      <img
                        src={product.primary_image_url}
                        alt={product.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    {product.brand && (
                      <p className="text-xs text-primary font-medium">{product.brand.name}</p>
                    )}
                    <h3 className="text-sm font-medium line-clamp-2 mt-0.5">{product.title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      {variant && (
                        <span className="font-bold">
                          ₹{Number(variant.price).toLocaleString("en-IN")}
                        </span>
                      )}
                      {variant?.compare_at_price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{Number(variant.compare_at_price).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different search term or browse categories.
          </p>
        </div>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && (
            <Link href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}>
              <Button variant="outline" size="sm">Previous</Button>
            </Link>
          )}
          <span className="text-sm text-muted-foreground self-center">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}>
              <Button variant="outline" size="sm">Next</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
