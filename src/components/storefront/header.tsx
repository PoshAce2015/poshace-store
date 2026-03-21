import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const mainCategories = [
  { name: "Electronics", href: "/electronics.html" },
  { name: "Computers", href: "/computers-and-accessories.html" },
  { name: "Watches", href: "/watches.html" },
  { name: "Home Improvement", href: "/home-improvement.html" },
  { name: "Sports & Fitness", href: "/sports-fitness-and-outdoors.html" },
  { name: "Office Products", href: "/office-products.html" },
  { name: "Musical Instruments", href: "/musical-instruments.html" },
  { name: "Home & Kitchen", href: "/home-and-kitchen.html" },
  { name: "Video Games", href: "/video-games.html" },
];

export function Header() {
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
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-2 mt-8">
                {mainCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="px-3 py-2 text-sm hover:bg-accent rounded-md"
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight">
              Posh<span className="text-primary">ace</span>
            </h1>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, brands, model numbers..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
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

      {/* Category nav — desktop */}
      <nav className="hidden md:block border-t">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm">
            {mainCategories.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="px-3 py-1.5 rounded-md hover:bg-accent whitespace-nowrap transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
