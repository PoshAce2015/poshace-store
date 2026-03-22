"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCompareList, removeFromCompare, clearCompare } from "@/lib/compare";

export default function ComparePage() {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductIds(getCompareList());
  }, []);

  useEffect(() => {
    if (productIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    // Fetch product details from API
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?ids=${productIds.join(",")}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products ?? []);
        }
      } catch {
        // Silently handle — products will show as empty
      }
      setLoading(false);
    }
    fetchProducts();
  }, [productIds]);

  function handleRemove(productId: string) {
    removeFromCompare(productId);
    setProductIds((prev) => prev.filter((id) => id !== productId));
  }

  function handleClearAll() {
    clearCompare();
    setProductIds([]);
    setProducts([]);
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Loading comparison...</p>
      </div>
    );
  }

  if (productIds.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ArrowLeftRight className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Compare Products</h1>
        <p className="text-muted-foreground mt-2">
          No products selected for comparison. Browse products and click the compare icon to add them.
        </p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Compare Products ({productIds.length})</h1>
        <Button variant="outline" size="sm" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>

      {/* Comparison grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-3 font-semibold text-sm w-32">Feature</th>
              {products.map((product: any) => (
                <th key={product.id} className="p-3 text-center min-w-[200px]">
                  <div className="relative">
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute -top-1 -right-1 p-1 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground"
                      aria-label="Remove from comparison"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <Link href={`/${product.slug}.html`}>
                      <div className="aspect-square w-32 mx-auto bg-muted rounded-lg overflow-hidden mb-2">
                        {product.primary_image_url ? (
                          <img src={product.primary_image_url} alt={product.title} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No image</div>
                        )}
                      </div>
                      <p className="text-sm font-medium line-clamp-2 hover:text-primary">{product.title}</p>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CompareRow label="Price" products={products} render={(p: any) => {
              const v = p.variants?.[0];
              return v ? `₹${Number(v.price).toLocaleString("en-IN")}` : "—";
            }} />
            <CompareRow label="Brand" products={products} render={(p: any) => p.brand?.name ?? "—"} />
            <CompareRow label="Status" products={products} render={(p: any) => {
              const v = p.variants?.[0];
              return v?.inventory_status === "in_stock" ? (
                <Badge>In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              );
            }} />
            <CompareRow label="SKU" products={products} render={(p: any) => p.variants?.[0]?.sku ?? "—"} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareRow({ label, products, render }: { label: string; products: any[]; render: (p: any) => React.ReactNode }) {
  return (
    <tr className="border-t">
      <td className="p-3 text-sm font-medium text-muted-foreground">{label}</td>
      {products.map((product: any) => (
        <td key={product.id} className="p-3 text-center text-sm">
          {render(product)}
        </td>
      ))}
    </tr>
  );
}
