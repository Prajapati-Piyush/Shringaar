import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck, Eye } from 'lucide-react';
import SafeImage from '../components/SafeImage';

export default function WishlistView({
  wishlist,
  products,
  onToggleWishlist,
  onMoveToBag,
  onOpenQuickView,
  onNavigate
}) {
  // Find all wishlisted products
  const wishlistedProducts = products.filter((p) => wishlist[p.id]);

  return (
    <div className="flex-1 flex flex-col w-full bg-[#F5F0E7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Wishlist Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRIVATE SELECTION</span>
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] tracking-tight">
            Your Private Vault
          </h1>
          <p className="text-xs sm:text-sm text-[#958878] mt-2 font-light">
            Curated heirlooms saved for your upcoming celebrations and everyday luxury.
          </p>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E9DED1] text-xs text-[#958878]">
              <span>
                You have <strong className="text-[#29251F] font-bold">{wishlistedProducts.length}</strong> saved {wishlistedProducts.length === 1 ? 'creation' : 'creations'}
              </span>
              <button
                onClick={() => onNavigate('home')}
                className="text-[#C6A46A] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Continue Browsing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid of Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistedProducts.map((product) => {
                const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
                return (
                  <div
                    key={product.id}
                    className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-luxury transition-all group"
                  >
                    {/* Image & Badges */}
                    <div className="relative aspect-square w-full bg-[#EFE9DF] overflow-hidden">
                      <SafeImage
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Remove Button */}
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-600 flex items-center justify-center shadow-md transition-transform active:scale-90"
                        title="Remove from vault"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-[#29251F]/90 text-[#F5F0E7] shadow-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#958878] mb-1">
                          <span className="uppercase tracking-wider font-medium">{product.category}</span>
                          <span>{product.metal}</span>
                        </div>

                        <h3 className="font-editorial text-lg text-[#29251F] font-semibold line-clamp-1 mb-2">
                          {product.title}
                        </h3>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-base font-bold text-[#29251F]">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-[#958878] line-through">
                            ₹{product.mrp.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[11px] font-bold text-[#1B4332]">
                            {discount}% OFF
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2 border-t border-[#E9DED1]">
                        <button
                          onClick={() => onMoveToBag(product)}
                          className="w-full py-3 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => onOpenQuickView(product)}
                          className="w-full py-2.5 rounded-full bg-white hover:bg-[#F2EBE2] border border-[#E9DED1] text-[#29251F] text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#958878]" />
                          <span>Quick View</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty Vault State */
          <div className="max-w-md mx-auto bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-10 sm:p-12 text-center shadow-luxury">
            <div className="w-16 h-16 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 flex items-center justify-center mx-auto mb-5 text-[#C6A46A]">
              <Heart className="w-8 h-8 stroke-1 fill-none" />
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#29251F] mb-3">
              Your Vault is Empty
            </h2>

            <p className="text-xs sm:text-sm text-[#958878] leading-relaxed mb-8 font-light">
              You haven't saved any creations yet. Tap the heart icon on any piece to curate your private collection.
            </p>

            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-3.5 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-luxury active:scale-95 flex items-center justify-center gap-2 mx-auto"
            >
              <span>Explore Royal Heirlooms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
