"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityInputProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export function QuantityInput({
  min = 1,
  max = 99,
  defaultValue = 1,
  onChange,
}: QuantityInputProps) {
  const [quantity, setQuantity] = useState(defaultValue);

  const update = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue));
    setQuantity(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => update(quantity - 1)}
        disabled={quantity <= min}
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => update(parseInt(e.target.value) || min)}
        min={min}
        max={max}
        className="w-12 h-9 text-center text-sm border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => update(quantity + 1)}
        disabled={quantity >= max}
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
