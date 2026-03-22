"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Subcategory {
  id: string;
  name: string;
  path: string;
  product_count: number;
}

interface CategoryFiltersProps {
  subcategories: Subcategory[];
  categoryPath: string;
  currentSort: string;
}

const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹25,000", min: 10000, max: 25000 },
  { label: "Over ₹25,000", min: 25000, max: 999999 },
];

export function CategoryFilters({ subcategories, categoryPath, currentSort }: CategoryFiltersProps) {
  const [showAllSubs, setShowAllSubs] = useState(false);
  const visibleSubs = showAllSubs ? subcategories : subcategories.slice(0, 8);

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3">Subcategories</h3>
          <ul className="space-y-1.5">
            {visibleSubs.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/${sub.path}.html`}
                  className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground py-0.5"
                >
                  <span className="truncate">{sub.name}</span>
                  <span className="text-xs flex-shrink-0 ml-2">({sub.product_count})</span>
                </Link>
              </li>
            ))}
          </ul>
          {subcategories.length > 8 && (
            <button
              onClick={() => setShowAllSubs(!showAllSubs)}
              className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
            >
              {showAllSubs ? "Show less" : `Show all (${subcategories.length})`}
              <ChevronDown className={`h-3 w-3 transition-transform ${showAllSubs ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      )}

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <Link
              key={range.label}
              href={`/${categoryPath}.html?sort=${currentSort}&min=${range.min}&max=${range.max}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <span>{range.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── View Toggle ──────────────────────────────────────────
interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onViewChange("grid")}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onViewChange("list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
