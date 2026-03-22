"use client";

import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "./quantity-input";

interface AddToCartButtonProps {
  variantId: string;
  inStock: boolean;
}

export function AddToCartButton({ variantId, inStock }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock) return;
    setLoading(true);

    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity }),
      });

      if (res.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Qty:</span>
        <QuantityInput defaultValue={1} onChange={setQuantity} />
      </div>
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!inStock || loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : added ? (
            <Check className="h-4 w-4 mr-2" />
          ) : (
            <ShoppingCart className="h-4 w-4 mr-2" />
          )}
          {added ? "Added!" : inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button size="lg" variant="outline" disabled={!inStock}>
          Buy Now
        </Button>
      </div>
    </div>
  );
}
