"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyAddToCartProps {
  price: number;
  title: string;
  inStock: boolean;
  /** Ref to the main add-to-cart button to track visibility */
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export function StickyAddToCart({ price, title, inStock, targetRef }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the main button is NOT visible
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [targetRef]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-lg md:hidden">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground truncate">{title}</p>
          <p className="font-bold">₹{Number(price).toLocaleString("en-IN")}</p>
        </div>
        <Button disabled={!inStock} className="flex-shrink-0">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
