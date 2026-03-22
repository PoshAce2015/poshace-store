import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createAdminClient } from "@/lib/supabase/admin";
import { MegaMenuDesktop, MegaMenuMobile, type CategoryNode } from "./mega-menu";

async function getCategories(): Promise<CategoryNode[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, path, parent_id, product_count")
      .eq("status", "active")
      .order("sort_order", { ascending: true });

    if (!data) return [];

    // Build tree from flat list
    const map = new Map<string | null, CategoryNode[]>();
    for (const row of data) {
      const node: CategoryNode = {
        id: row.id,
        name: row.name,
        path: row.path,
        product_count: row.product_count ?? 0,
        children: [],
      };
      const parentId = row.parent_id ?? null;
      if (!map.has(parentId)) map.set(parentId, []);
      map.get(parentId)!.push(node);
    }

    // Attach children to parents
    function buildTree(parentId: string | null): CategoryNode[] {
      const nodes = map.get(parentId) ?? [];
      for (const node of nodes) {
        node.children = buildTree(node.id);
      }
      return nodes;
    }

    return buildTree(null);
  } catch {
    // Fallback to hardcoded categories if DB unavailable
    return fallbackCategories;
  }
}

const fallbackCategories: CategoryNode[] = [
  { id: "1", name: "Electronics", path: "electronics", product_count: 10000, children: [] },
  { id: "2", name: "Computers", path: "computers-and-accessories", product_count: 1025, children: [] },
  { id: "3", name: "Watches", path: "watches", product_count: 237, children: [] },
  { id: "4", name: "Home Improvement", path: "home-improvement", product_count: 41, children: [] },
  { id: "5", name: "Sports & Fitness", path: "sports-fitness-and-outdoors", product_count: 23, children: [] },
  { id: "6", name: "Office Products", path: "office-products", product_count: 727, children: [] },
  { id: "7", name: "Musical Instruments", path: "musical-instruments", product_count: 1048, children: [] },
  { id: "8", name: "Home & Kitchen", path: "home-and-kitchen", product_count: 0, children: [] },
  { id: "9", name: "Video Games", path: "video-games", product_count: 901, children: [] },
  { id: "10", name: "Car & Motorbike", path: "car-and-motorbike", product_count: 0, children: [] },
  { id: "11", name: "Industrial & Scientific", path: "industrial-and-scientific", product_count: 0, children: [] },
  { id: "12", name: "Toys & Games", path: "toys-and-games", product_count: 0, children: [] },
];

export async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-1">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p>No Customs Hassles &bull; Guaranteed Authenticity &bull; 7-Day Free Returns</p>
          <div className="hidden md:flex items-center gap-4">
            <span>Call: (033) 6902 8439</span>
            <span>info@poshace.com</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <div className="mt-6">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Categories
                </p>
                <MegaMenuMobile categories={categories} />
              </div>
              <div className="border-t mt-6 pt-4">
                <Link href="/about-us" className="block px-3 py-2 text-sm hover:bg-accent rounded-md">About Us</Link>
                <Link href="/contact-us" className="block px-3 py-2 text-sm hover:bg-accent rounded-md">Contact Us</Link>
                <Link href="/affiliates" className="block px-3 py-2 text-sm hover:bg-accent rounded-md">Affiliates</Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold tracking-tight">
              Posh<span className="text-primary">ace</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:flex">
            <form action="/search" className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                placeholder="Search products, brands, model numbers..."
                className="pl-10 w-full"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <Link href="/account/orders">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Category nav — desktop mega menu */}
      <MegaMenuDesktop categories={categories} />
    </header>
  );
}
