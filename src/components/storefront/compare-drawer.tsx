"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCompareList, removeFromCompare } from "@/lib/compare";

export function CompareDrawer() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Poll localStorage for changes (since compare is cross-component)
    function update() {
      setItems(getCompareList());
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArrowLeftRight className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            {items.length} product{items.length !== 1 ? "s" : ""} selected for comparison
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              items.forEach(removeFromCompare);
              setItems([]);
            }}
          >
            Clear All
          </Button>
          <Link href="/compare">
            <Button size="sm">
              Compare Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
