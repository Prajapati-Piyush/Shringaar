import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';
import SafeImage from './SafeImage';

export default function ProductCard({
  product,
  onOpenQuickView,
  onAddToBag,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct
}) {
  const [hoverImgFailed, setHoverImgFailed] = useState(false);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // STRICT HOVER RULE:
  // Alternate hover image is ONLY displayed if it is an explicitly verified alternate photo of this exact SKU.
  // If no verified alternate angle exists, hover performs an elegant subtle zoom on its own primary image.
  // Never displays another product or unrelated stock photo.
  const hasVerifiedHover = Boolean(
    product.hoverImage &&
    product.hoverImage !== product.image &&
    !hoverImgFailed
  );

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E9DED1] shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between relative">
      
      {/* 1:1 Studio Photo Container */}
      <div
        className="relative aspect-square overflow-hidden bg-[#FAF7F2] cursor-pointer"
        onClick={() => onSelectProduct ? onSelectProduct(product) : onOpenQuickView(product)}
      >
        {/* Primary Image - always the true product photograph */}
        <SafeImage
          src={product.image}
          alt={product.title}
          category={product.category}
          className={`w-full h-full object-cover object-center ${
            hasVerifiedHover
              ? "transition-opacity duration-500 group-hover:opacity-0"
              : "transition-transform duration-700 ease-out group-hover:scale-105"
          }`}
        />

        {/* Verified Alternate Image ON HOVER ONLY (if available for this exact product) */}
        {hasVerifiedHover && (
          <SafeImage
            src={product.hoverImage}
            alt={`${product.title} alternate view`}
            category={product.category}
            onError={() => setHoverImgFailed(true)}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
          />
        )}

        {/* Luxury Badge */}
        {product.badge && (
          <span
            className={`absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm ${
              product.badge === "Bestseller"
                ? "bg-[#C6A46A] text-white"
                : product.badge === "Bridal Edit"
                ? "bg-[#29251F] text-[#DFCCA6] border border-[#C6A46A]/40"
                : "bg-[#1B4332] text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DED1] flex items-center justify-center text-[#29251F] hover:text-red-600 transition-colors shadow-sm"
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Quick View Hover Pill (Desktop only) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-md border border-[#E9DED1] text-[#29251F] text-[11px] font-semibold py-1.5 px-4 rounded-full shadow-md items-center gap-1.5 whitespace-nowrap active:scale-95 hover:bg-[#F5F0E7]"
        >
          <Eye className="w-3.5 h-3.5 text-[#C6A46A]" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Info - Sleeker, Compact Luxury Layout */}
      <div className="p-2 sm:p-3 md:p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#958878] mb-0.5">
            <span className="uppercase tracking-wider font-semibold text-[#C6A46A] truncate max-w-[65%]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#29251F]">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#C6A46A] text-[#C6A46A]" />
              <span className="font-bold text-[10px] sm:text-[11px]">{product.rating}</span>
              <span className="text-[8px] sm:text-[9px] text-[#958878]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct ? onSelectProduct(product) : onOpenQuickView(product)}
            className="font-editorial text-xs sm:text-sm md:text-[15px] font-medium text-[#29251F] group-hover:text-[#C6A46A] transition-colors line-clamp-1 cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          {/* Metal Specs / Purity Snippet */}
          <p className="text-[9px] sm:text-[10px] text-[#958878] mt-0.5 truncate font-light">
            {product.metal}
          </p>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1.5 flex-wrap">
            <span className="text-xs sm:text-sm md:text-base font-bold text-[#29251F]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-[9px] sm:text-[11px] text-[#958878] line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-[#1B4332] bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
              {discountPercent}% OFF
            </span>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="mt-2 pt-2 border-t border-[#E9DED1]/70 flex items-center gap-1.5">
          <button
            onClick={() => onOpenQuickView(product)}
            className="p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-[#E9DED1] hover:bg-[#FAF7F2] text-[#29251F] transition-colors"
            title="Inspect Details"
            aria-label="Quick view"
          >
            <Eye className="w-3.5 h-3.5 text-[#C6A46A]" />
          </button>

          <button
            onClick={() => onAddToBag(product)}
            className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-md sm:rounded-lg bg-[#FAF7F2] hover:bg-[#C6A46A] hover:text-white border border-[#E9DED1] font-semibold text-[9px] sm:text-[11px] tracking-wider uppercase text-[#29251F] transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="truncate">Add to Bag</span>
          </button>
        </div>
      </div>

    </div>
  );
}
