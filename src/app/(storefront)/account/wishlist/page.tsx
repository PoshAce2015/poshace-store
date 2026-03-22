"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalWishlist, removeFromLocalWishlist } from "@/lib/wishlist";

export default function WishlistPage() {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductIds(getLocalWishlist());
  }, []);

  useEffect(() => {
    if (productIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?ids=${productIds.join(",")}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products ?? []);
        }
      } catch {
        // Silent
      }
      setLoading(false);
    }
    fetchProducts();
  }, [productIds]);

  function handleRemove(productId: string) {
    removeFromLocalWishlist(productId);
    setProductIds((prev) => prev.filter((id) => id !== productId));
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Loading wishlist...</p>
      </div>
    );
  }

  if (productIds.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold">My Wish List</h1>
        <p className="text-muted-foreground mt-2">
          Your wishlist is empty. Browse products and click the heart icon to save items you love.
        </p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wish List ({productIds.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => {
          const variant = product.variants?.[0];
          return (
            <Card key={product.id} className="relative group">
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <Link href={`/${product.slug}.html`}>
                <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                  {product.primary_image_url ? (
                    <img src={product.primary_image_url} alt={product.title} className="w-full h-full object-contain" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                  )}
                </div>
              </Link>
              <CardContent className="p-3">
                {product.brand && <p className="text-xs text-primary font-medium">{product.brand.name}</p>}
                <Link href={`/${product.slug}.html`}>
                  <h3 className="text-sm font-medium line-clamp-2 mt-0.5 hover:text-primary">{product.title}</h3>
                </Link>
                <div className="mt-2 flex items-baseline gap-2">
                  {variant && <span className="font-bold text-sm">₹{Number(variant.price).toLocaleString("en-IN")}</span>}
                  {variant?.compare_at_price && (
                    <span className="text-xs text-muted-foreground line-through">₹{Number(variant.compare_at_price).toLocaleString("en-IN")}</span>
                  )}
                </div>
                <Button size="sm" className="w-full mt-3">
                  <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
