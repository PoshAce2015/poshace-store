"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface FilterProps {
  categoryPath: string;
  subcategories: { name: string; path: string; product_count: number }[];
  brands: { name: string; slug: string; count: number }[];
  priceRange: { min: number; max: number };
}

export function ProductFilters({
  categoryPath,
  subcategories,
  brands,
  priceRange,
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showBrands, setShowBrands] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showSubcats, setShowSubcats] = useState(true);
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");
  const [brandSearch, setBrandSearch] = useState("");

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("min_price", minPrice);
    else params.delete("min_price");
    if (maxPrice) params.set("max_price", maxPrice);
    else params.delete("max_price");
    params.delete("page");
    router.push(`/${categoryPath}.html?${params.toString()}`);
  };

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </h3>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div>
            <button
              onClick={() => setShowSubcats(!showSubcats)}
              className="flex items-center justify-between w-full text-sm font-medium py-1"
            >
              Categories
              {showSubcats ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {showSubcats && (
              <ul className="mt-1 space-y-1">
                {subcategories.slice(0, 15).map((sub) => (
                  <li key={sub.path}>
                    <a
                      href={`/${sub.path}.html`}
                      className="text-sm text-muted-foreground hover:text-foreground flex justify-between"
                    >
                      <span>{sub.name}</span>
                      <span className="text-xs">({sub.product_count})</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Separator />

        {/* Price range */}
        <div>
          <button
            onClick={() => setShowPrice(!showPrice)}
            className="flex items-center justify-between w-full text-sm font-medium py-1"
          >
            Price Range
            {showPrice ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {showPrice && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={`₹${priceRange.min}`}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="text-sm h-8"
                />
                <span className="text-muted-foreground self-center text-xs">to</span>
                <Input
                  type="number"
                  placeholder={`₹${priceRange.max}`}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="text-sm h-8"
                />
              </div>
              <Button size="sm" variant="outline" className="w-full h-7 text-xs" onClick={applyPriceFilter}>
                Apply
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Brands */}
        {brands.length > 0 && (
          <div>
            <button
              onClick={() => setShowBrands(!showBrands)}
              className="flex items-center justify-between w-full text-sm font-medium py-1"
            >
              Brand
              {showBrands ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {showBrands && (
              <div className="mt-1">
                {brands.length > 8 && (
                  <Input
                    placeholder="Search brands..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="text-sm h-7 mb-2"
                  />
                )}
                <ul className="space-y-1 max-h-48 overflow-y-auto">
                  {filteredBrands.slice(0, 20).map((brand) => (
                    <li key={brand.slug}>
                      <a
                        href={`/${categoryPath}.html?brand=${brand.slug}`}
                        className="text-sm text-muted-foreground hover:text-foreground flex justify-between"
                      >
                        <span>{brand.name}</span>
                        <span className="text-xs">({brand.count})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
