import React, { useState, useEffect } from 'react';

// Category-specific high-resolution Indian jewellery fallbacks.
// Strictly matched: Bangles fall back to bangles, necklaces to necklaces, jhumkas to jhumkas.
export const CATEGORY_FALLBACKS = {
  bangles: "https://images.unsplash.com/photo-1758995116383-f51775896add?auto=format&fit=crop&q=80&w=800",
  necklace: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
  bridal: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
  jhumka: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
  earrings: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
  ring: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  pendant: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
  mangalsutra: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
  gold: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
  diamond: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  default: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800"
};

export const FALLBACK_JEWEL_IMG = CATEGORY_FALLBACKS.gold;

export const getSmartFallback = (altText = "", category = "") => {
  const text = `${altText} ${category}`.toLowerCase();
  if (text.includes("bangle") || text.includes("kada") || text.includes("bracelet")) return CATEGORY_FALLBACKS.bangles;
  if (text.includes("bridal") || text.includes("kundan set")) return CATEGORY_FALLBACKS.bridal;
  if (text.includes("necklace") || text.includes("choker") || text.includes("haar")) return CATEGORY_FALLBACKS.necklace;
  if (text.includes("jhumka") || text.includes("earring") || text.includes("stud") || text.includes("hoop") || text.includes("chandbali")) return CATEGORY_FALLBACKS.earrings;
  if (text.includes("ring")) return CATEGORY_FALLBACKS.ring;
  if (text.includes("pendant") || text.includes("mangalsutra")) return CATEGORY_FALLBACKS.pendant;
  if (text.includes("diamond")) return CATEGORY_FALLBACKS.diamond;
  return CATEGORY_FALLBACKS.gold;
};

export default function SafeImage({ src, alt, category, className = "", onError, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasErrored(false);
  }, [src]);

  const handleError = (e) => {
    if (onError) onError(e);
    if (!hasErrored) {
      setHasErrored(true);
      const fallback = getSmartFallback(alt, category);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc || getSmartFallback(alt, category)}
      alt={alt || "SHRINGAR Fine Jewellery"}
      className={className}
      loading="lazy"
      onError={handleError}
      {...props}
    />
  );
}
