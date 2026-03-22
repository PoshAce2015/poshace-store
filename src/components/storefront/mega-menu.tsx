"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";

export interface CategoryNode {
  id: string;
  name: string;
  path: string;
  product_count: number;
  children: CategoryNode[];
}

interface MegaMenuProps {
  categories: CategoryNode[];
}

// ─── Desktop Mega Menu ────────────────────────────────────
export function MegaMenuDesktop({ categories }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="hidden md:block border-t relative">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={`/${cat.path}.html`}
                className="px-3 py-1.5 rounded-md hover:bg-accent whitespace-nowrap transition-colors inline-flex items-center gap-1"
              >
                {cat.name}
                {cat.children.length > 0 && <ChevronDown className="h-3 w-3" />}
              </Link>

              {/* Flyout panel */}
              {activeCategory === cat.id && cat.children.length > 0 && (
                <div className="absolute left-0 top-full z-50 bg-background border rounded-lg shadow-lg p-4 min-w-[320px] max-w-[480px]">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    {cat.children.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/${sub.path}.html`}
                        className="flex items-center justify-between py-1.5 text-sm hover:text-primary transition-colors"
                      >
                        <span className="truncate">{sub.name}</span>
                        {sub.product_count > 0 && (
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                            ({sub.product_count.toLocaleString()})
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3">
                    <Link
                      href={`/${cat.path}.html`}
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View all {cat.name} <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ─── Mobile Mega Menu (Accordion) ─────────────────────────
export function MegaMenuMobile({ categories }: MegaMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <nav className="flex flex-col gap-1 mt-4">
      {categories.map((cat) => (
        <div key={cat.id}>
          <div className="flex items-center">
            <Link
              href={`/${cat.path}.html`}
              className="flex-1 px-3 py-2 text-sm hover:bg-accent rounded-md"
            >
              {cat.name}
            </Link>
            {cat.children.length > 0 && (
              <button
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                className="p-2 hover:bg-accent rounded-md"
                aria-label={`Expand ${cat.name}`}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expanded === cat.id ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>
          {expanded === cat.id && cat.children.length > 0 && (
            <div className="ml-4 border-l pl-3 mb-2">
              {cat.children.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/${sub.path}.html`}
                  className="flex items-center justify-between px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <span>{sub.name}</span>
                  {sub.product_count > 0 && (
                    <span className="text-xs">({sub.product_count.toLocaleString()})</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
