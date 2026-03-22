"use client";

import { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isInCompare, addToCompare, removeFromCompare } from "@/lib/compare";
import { toast } from "sonner";

interface CompareButtonProps {
  productId: string;
  size?: "sm" | "default" | "icon";
  variant?: "ghost" | "outline" | "secondary";
  className?: string;
}

export function CompareButton({
  productId,
  size = "icon",
  variant = "ghost",
  className,
}: CompareButtonProps) {
  const [inCompare, setInCompare] = useState(false);

  useEffect(() => {
    setInCompare(isInCompare(productId));
  }, [productId]);

  function toggle() {
    if (inCompare) {
      removeFromCompare(productId);
      setInCompare(false);
    } else {
      const added = addToCompare(productId);
      if (added) {
        setInCompare(true);
      } else {
        toast.error("You can compare up to 4 products at a time");
      }
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggle}
      className={className}
      aria-label={inCompare ? "Remove from compare" : "Add to compare"}
    >
      <ArrowLeftRight
        className={`h-4 w-4 ${inCompare ? "text-primary" : ""}`}
      />
    </Button>
  );
}
