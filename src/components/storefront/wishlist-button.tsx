"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isInLocalWishlist, addToLocalWishlist, removeFromLocalWishlist } from "@/lib/wishlist";

interface WishlistButtonProps {
  productId: string;
  size?: "sm" | "default" | "icon";
  variant?: "ghost" | "outline" | "secondary";
  className?: string;
}

export function WishlistButton({
  productId,
  size = "icon",
  variant = "ghost",
  className,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInLocalWishlist(productId));
  }, [productId]);

  function toggle() {
    if (isWishlisted) {
      removeFromLocalWishlist(productId);
      setIsWishlisted(false);
    } else {
      addToLocalWishlist(productId);
      setIsWishlisted(true);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggle}
      className={className}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
      />
    </Button>
  );
}
