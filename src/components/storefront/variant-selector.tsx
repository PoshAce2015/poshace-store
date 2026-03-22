"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Variant {
  id: string;
  title?: string;
  option_values?: Record<string, string>;
  price: number;
  compare_at_price?: number;
  inventory_status: string;
  sku: string;
}

interface VariantSelectorProps {
  variants: Variant[];
  onSelect: (variant: Variant) => void;
}

export function VariantSelector({ variants, onSelect }: VariantSelectorProps) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id);

  if (variants.length <= 1) return null;

  // Extract unique option types (e.g., "color", "size")
  const optionTypes = new Set<string>();
  variants.forEach((v) => {
    if (v.option_values) {
      Object.keys(v.option_values).forEach((key) => optionTypes.add(key));
    }
  });

  const handleSelect = (variant: Variant) => {
    setSelectedId(variant.id);
    onSelect(variant);
  };

  // If variants have option_values, show grouped selectors
  if (optionTypes.size > 0) {
    return (
      <div className="space-y-4">
        {Array.from(optionTypes).map((optionType) => {
          const uniqueValues = new Set<string>();
          variants.forEach((v) => {
            const val = v.option_values?.[optionType];
            if (val) uniqueValues.add(val);
          });

          return (
            <div key={optionType}>
              <p className="text-sm font-medium capitalize mb-2">{optionType}</p>
              <div className="flex flex-wrap gap-2">
                {Array.from(uniqueValues).map((value) => {
                  const matchingVariant = variants.find(
                    (v) => v.option_values?.[optionType] === value
                  );
                  const isSelected =
                    matchingVariant && matchingVariant.id === selectedId;
                  const isAvailable =
                    matchingVariant?.inventory_status === "in_stock";

                  return (
                    <button
                      key={value}
                      onClick={() => matchingVariant && handleSelect(matchingVariant)}
                      disabled={!isAvailable}
                      className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : isAvailable
                          ? "border-border hover:border-primary/50"
                          : "border-border opacity-40 cursor-not-allowed line-through"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Fallback: show variant titles as selectable badges
  return (
    <div>
      <p className="text-sm font-medium mb-2">Options</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => handleSelect(variant)}
          >
            <Badge
              variant={variant.id === selectedId ? "default" : "outline"}
              className="cursor-pointer"
            >
              {variant.title || variant.sku}
              {variant.inventory_status !== "in_stock" && " (Out of stock)"}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
