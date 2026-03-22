"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { QuantityInput } from "./quantity-input";

interface QuickShopProduct {
  id: string;
  title: string;
  slug: string;
  primary_image_url: string | null;
  brand?: { name: string } | null;
  variants?: { price: number; compare_at_price: number | null; inventory_status: string }[];
}

interface QuickShopProps {
  product: QuickShopProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickShop({ product, open, onOpenChange }: QuickShopProps) {
  if (!product) return null;

  const variant = product.variants?.[0];
  const price = variant?.price;
  const comparePrice = variant?.compare_at_price;
  const savings = comparePrice && price ? Math.round(((comparePrice - price) / comparePrice) * 100) : null;
  const inStock = variant?.inventory_status === "in_stock";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-muted flex items-center justify-center">
            {product.primary_image_url ? (
              <img
                src={product.primary_image_url}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            ) : (
              <span className="text-sm text-muted-foreground">No image</span>
            )}
          </div>

          {/* Details */}
          <div className="p-5 flex flex-col">
            {product.brand && (
              <p className="text-xs text-primary font-medium">{product.brand.name}</p>
            )}
            <h3 className="text-base font-semibold mt-1 line-clamp-3">{product.title}</h3>

            <div className="mt-3 flex items-baseline gap-2">
              {price != null && (
                <span className="text-2xl font-bold">₹{Number(price).toLocaleString("en-IN")}</span>
              )}
              {comparePrice != null && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{Number(comparePrice).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {savings && savings > 0 && (
              <Badge variant="secondary" className="mt-1 w-fit text-xs">Save {savings}%</Badge>
            )}

            <p className="text-xs text-muted-foreground mt-2">
              {inStock ? "In Stock" : "Out of Stock"} &bull; All taxes included
            </p>

            <div className="mt-auto pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm">Qty:</span>
                <QuantityInput />
              </div>
              <Button className="w-full" disabled={!inStock}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Link
                href={`/${product.slug}.html`}
                className="text-sm text-primary hover:underline text-center block"
                onClick={() => onOpenChange(false)}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
