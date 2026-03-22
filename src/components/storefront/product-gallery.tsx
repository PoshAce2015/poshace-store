"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: { url: string; alt_text?: string }[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allImages = images.length > 0 ? images : [{ url: "", alt_text: productTitle }];
  const currentImage = allImages[selectedIndex];

  return (
    <div>
      {/* Main image */}
      <div className="aspect-square bg-muted rounded-lg overflow-hidden relative group cursor-zoom-in">
        {currentImage.url ? (
          <img
            src={currentImage.url}
            alt={currentImage.alt_text || productTitle}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-150"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-16 h-16 rounded border-2 flex-shrink-0 overflow-hidden transition-colors ${
                idx === selectedIndex
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt_text || `${productTitle} - Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
