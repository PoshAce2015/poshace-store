import Link from "next/link";
import { Heart, Eye, ShoppingCart, ArrowLeftRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    primary_image_url: string | null;
    brand?: { name: string; slug: string } | null;
    variants?: { price: number; compare_at_price: number | null; inventory_status: string }[];
  };
  onQuickShop?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onAddToCompare?: (productId: string) => void;
  showActions?: boolean;
}

export function ProductCard({
  product,
  onQuickShop,
  onAddToWishlist,
  onAddToCompare,
  showActions = true,
}: ProductCardProps) {
  const variant = product.variants?.[0];
  const price = variant?.price;
  const comparePrice = variant?.compare_at_price;
  const savings = comparePrice && price ? Math.round(((comparePrice - price) / comparePrice) * 100) : null;

  return (
    <div className="group relative min-w-[180px] w-[220px] flex-shrink-0">
      <Link href={`/${product.slug}.html`}>
        <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
          <div className="aspect-square bg-muted overflow-hidden relative">
            {product.primary_image_url ? (
              <img
                src={product.primary_image_url}
                alt={product.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                No image
              </div>
            )}
            {savings && savings > 0 && (
              <Badge className="absolute top-2 left-2 text-[10px]" variant="destructive">
                -{savings}%
              </Badge>
            )}
          </div>
          <CardContent className="p-3">
            {product.brand && (
              <p className="text-xs text-primary font-medium truncate">{product.brand.name}</p>
            )}
            <h3 className="text-sm font-medium line-clamp-2 mt-0.5 min-h-[2.5rem]">{product.title}</h3>
            <div className="mt-2">
              {price != null && (
                <span className="font-bold text-sm">
                  ₹{Number(price).toLocaleString("en-IN")}
                </span>
              )}
              {comparePrice != null && (
                <span className="text-xs text-muted-foreground line-through ml-2">
                  ₹{Number(comparePrice).toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Hover action buttons */}
      {showActions && (
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {onQuickShop && (
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full shadow-sm"
              onClick={(e) => { e.preventDefault(); onQuickShop(product.id); }}
              aria-label="Quick shop"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          )}
          {onAddToWishlist && (
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full shadow-sm"
              onClick={(e) => { e.preventDefault(); onAddToWishlist(product.id); }}
              aria-label="Add to wishlist"
            >
              <Heart className="h-3.5 w-3.5" />
            </Button>
          )}
          {onAddToCompare && (
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full shadow-sm"
              onClick={(e) => { e.preventDefault(); onAddToCompare(product.id); }}
              aria-label="Add to compare"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
