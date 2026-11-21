import React from 'react';
import { Heart, X, ShoppingBag } from 'lucide-react';
import SafeImage from './SafeImage';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  products,
  onToggleWishlist,
  onMoveToBag,
  onOpenQuickView
}) {
  if (!isOpen) return null;

  const wishlistedItems = products.filter((p) => wishlist[p.id]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#29251F]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E9DED1] animate-slide-up sm:animate-none">
          
          <div className="p-4 sm:p-5 border-b border-[#E9DED1] flex items-center justify-between bg-[#F5F0E7]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h3 className="font-editorial text-2xl font-semibold text-[#29251F]">
                Your Saved Pieces
              </h3>
              <span className="text-xs bg-[#FAF7F2] border border-[#E9DED1] text-[#29251F] px-2 py-0.5 rounded-full font-bold">
                {wishlistedItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#958878] hover:text-[#29251F] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlistedItems.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center">
                <Heart className="w-12 h-12 text-[#C6A46A]/40 mb-3" />
                <p className="font-editorial text-2xl text-[#29251F]">Your wishlist is empty</p>
                <p className="text-xs text-[#958878] mt-1 font-light max-w-xs">
                  Tap the heart icon on any royal piece to curate your private collection.
                </p>
              </div>
            ) : (
              wishlistedItems.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-white border border-[#E9DED1] flex gap-3.5 items-center shadow-sm">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-18 h-18 object-cover rounded-xl border border-[#E9DED1] bg-[#FAF7F2] flex-shrink-0 cursor-pointer"
                    onClick={() => onOpenQuickView(item)}
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => onOpenQuickView(item)}
                      className="font-editorial text-base font-medium text-[#29251F] truncate cursor-pointer hover:text-[#C6A46A] transition-colors"
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#958878] truncate">{item.category}</p>
                    <p className="text-xs font-bold text-[#29251F] mt-1">
                      ₹{item.price.toLocaleString("en-IN")}{" "}
                      <span className="text-[10px] text-[#958878] line-through font-normal">
                        ₹{item.mrp.toLocaleString("en-IN")}
                      </span>
                    </p>
                    <div className="flex gap-2 mt-2.5">
                      <button
                        onClick={() => {
                          onMoveToBag(item);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#C6A46A] hover:bg-[#B08E55] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        onClick={() => onToggleWishlist(item.id)}
                        className="px-2.5 py-1.5 text-[11px] text-[#958878] hover:text-red-500 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
