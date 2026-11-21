import React from 'react';
import { ShoppingBag, X, Plus, Minus, Lock, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import SafeImage from './SafeImage';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToCheckout,
  storeConfig,
  onOpenWhatsAppDirect
}) {
  if (!isOpen) return null;

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartMrpTotal = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isFreeShipping = cartSubtotal >= storeConfig.freeShippingThreshold;
  const shippingCharge = cart.length === 0 ? 0 : isFreeShipping ? 0 : storeConfig.shippingCharge;
  const grandTotal = cartSubtotal + shippingCharge;
  const totalSavings = Math.max(0, cartMrpTotal - cartSubtotal);
  const amountNeeded = Math.max(0, storeConfig.freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / storeConfig.freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#29251F]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E9DED1] animate-slide-up sm:animate-none">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#E9DED1] flex items-center justify-between bg-[#F5F0E7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C6A46A]" />
              <h3 className="font-editorial text-2xl font-semibold text-[#29251F]">
                Your Shopping Bag
              </h3>
              <span className="text-xs bg-[#FAF7F2] border border-[#E9DED1] text-[#29251F] px-2 py-0.5 rounded-full font-bold">
                {totalItemsCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#958878] hover:text-[#29251F] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DYNAMIC FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#FAF7F2] p-3.5 border-b border-[#E9DED1]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {isFreeShipping ? (
                <span className="text-[#1B4332] font-bold flex items-center gap-1">
                  <span>🎉</span> Congrats! You unlocked FREE Insured Air Shipping!
                </span>
              ) : (
                <span className="text-[#29251F]">
                  Add <strong className="text-[#C6A46A]">₹{amountNeeded}</strong> more for <strong className="text-[#29251F]">FREE Express Shipping!</strong>
                </span>
              )}
              <span className="text-[11px] font-bold text-[#958878]">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E9DED1]">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShipping ? "bg-[#1B4332]" : "gold-gradient-bg"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#E9DED1]">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#C6A46A] mb-4 border border-[#E9DED1]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="font-editorial text-2xl text-[#29251F]">Your bag is empty</p>
                <p className="text-xs text-[#958878] mt-1 max-w-xs font-light">
                  Adorn yourself with our timeless festive heirlooms. Discover our bestsellers.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#C6A46A] text-white font-semibold text-xs uppercase tracking-widest shadow-sm active:scale-95"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const cartKey = item.cartItemId || `${item.id}-${item.selectedSize}`;
                return (
                  <div key={cartKey} className="pt-4 first:pt-0 flex gap-3 sm:gap-4 items-center">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl border border-[#E9DED1] bg-white flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-editorial text-base sm:text-lg font-medium text-[#29251F] leading-snug truncate">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartKey, item.title)}
                          className="text-[#958878] hover:text-red-600 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-semibold text-[#C6A46A] bg-white px-2 py-0.5 rounded border border-[#E9DED1]">
                          Size: {item.selectedSize}
                        </span>
                        <span className="text-[11px] text-[#958878] uppercase tracking-wider truncate">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E9DED1] rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(cartKey, -1)}
                            className="px-2 py-1 text-[#29251F] hover:bg-[#C6A46A] hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold text-[#29251F]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartKey, 1)}
                            className="px-2 py-1 text-[#29251F] hover:bg-[#C6A46A] hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#29251F]">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-[#958878]">
                              ₹{item.price} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with Bill Summary & Checkout CTAs */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#F5F0E7] border-t border-[#E9DED1] shadow-inner space-y-3">
              <div className="space-y-1.5 text-xs text-[#958878]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#29251F]">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className={isFreeShipping ? "font-bold text-[#1B4332]" : "font-semibold text-[#29251F]"}>
                    {isFreeShipping ? "FREE" : `₹${storeConfig.shippingCharge}`}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#1B4332] font-medium">
                    <span>Festive Savings</span>
                    <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="border-t border-[#E9DED1] pt-2 flex justify-between text-base font-bold text-[#29251F]">
                  <span>Grand Total</span>
                  <span className="text-xl text-[#29251F] font-editorial">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Primary: Proceed to Checkout View */}
              <button
                onClick={() => {
                  onClose();
                  onNavigateToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#29251F] hover:bg-[#3D3830] text-[#F5F0E7] font-bold text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C6A46A] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Instant WhatsApp Order CTA */}
              <button
                onClick={onOpenWhatsAppDirect}
                className="w-full py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 fill-white" />
                <span>Instant Order via WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-[#958878] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>100% Encrypted Checkout • Verified Merchant Guarantee</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
