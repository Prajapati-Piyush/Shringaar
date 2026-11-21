import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
  CreditCard,
  MapPin,
  QrCode,
  Lock
} from 'lucide-react';
import SafeImage from '../components/SafeImage';

export default function CartView({
  cart,
  storeConfig,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onShowToast
}) {
  const [address, setAddress] = useState({
    name: "Aadya Sharma",
    phone: "9876543210",
    pincode: "400001",
    street: "Flat 402, Sea View Apartments, Colaba",
    city: "Mumbai"
  });

  const [paymentMethod, setPaymentMethod] = useState("upi"); // "upi" | "cod"

  // Cart Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= storeConfig.freeShippingThreshold;
  const shippingCharge = cart.length === 0 ? 0 : isFreeShipping ? 0 : storeConfig.shippingCharge;
  const grandTotal = subtotal + shippingCharge;
  const freeShippingRemainder = Math.max(0, storeConfig.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / storeConfig.freeShippingThreshold) * 100));

  // 1-Click WhatsApp Order Builder
  const handlePlaceOrderWhatsApp = () => {
    if (cart.length === 0) {
      onShowToast("Your bag is empty!");
      return;
    }
    if (!address.name || !address.phone || !address.pincode || !address.street) {
      onShowToast("Please enter complete delivery details");
      return;
    }

    const orderRef = `SHR-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}*\n   • Size: ${item.selectedSize}\n   • Qty: ${item.quantity}\n   • Price: ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    const message = `👑 *ORDER CONFIRMATION: ${storeConfig.brandName}*
Reference: #${orderRef}
━━━━━━━━━━━━━━━━━━━━
📦 *PIECES ORDERED:*
${itemsList}

💰 *PAYMENT BREAKDOWN:*
• Subtotal: ₹${subtotal.toLocaleString("en-IN")}
• Insured Express Shipping: ${isFreeShipping ? "FREE" : `₹${storeConfig.shippingCharge}`}
• *Grand Total: ₹${grandTotal.toLocaleString("en-IN")}*
• Payment Mode: ${paymentMethod === "upi" ? `Instant UPI (${storeConfig.upiId})` : "Cash on Delivery (COD)"}

📍 *DELIVERY ADDRESS:*
• Name: ${address.name}
• Phone: +91 ${address.phone}
• Pincode: ${address.pincode} (${address.city})
• Street: ${address.street}

━━━━━━━━━━━━━━━━━━━━
Please confirm my order and initiate express dispatch! 🙏`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, "_blank");
    onShowToast("✨ Order receipt sent to WhatsApp Concierge!");
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#F5F0E7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Cart Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPRESS CHECKOUT</span>
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] tracking-tight">
            Your Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-[#958878] mt-2 font-light">
            Review your heirlooms and initiate insured express dispatch.
          </p>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Items List & Address Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Free Shipping Dynamic Progress Meter */}
              <div className="bg-[#FAF7F2] rounded-2xl border border-[#E9DED1] p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#29251F] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#C6A46A]" />
                    {isFreeShipping ? (
                      <span className="text-[#1B4332] font-bold">✨ You've unlocked FREE Insured Air Shipping!</span>
                    ) : (
                      <span>Add <strong className="text-[#29251F]">₹{freeShippingRemainder.toLocaleString("en-IN")}</strong> more for <strong>FREE Shipping</strong></span>
                    )}
                  </span>
                  <span className="text-[11px] font-bold text-[#C6A46A]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-[#E9DED1] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#C6A46A] h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 shadow-luxury divide-y divide-[#E9DED1]">
                <div className="flex items-center justify-between pb-4">
                  <h2 className="font-editorial text-xl font-bold text-[#29251F]">
                    Bag Items ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </h2>
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-xs text-[#C6A46A] font-semibold hover:underline"
                  >
                    + Add More Heirlooms
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={item.cartItemId || item.id} className="py-4 flex gap-4 items-center">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#EFE9DF] overflow-hidden flex-shrink-0 border border-[#E9DED1]">
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] text-[#958878] uppercase tracking-wider font-semibold">{item.category}</p>
                          <h4 className="font-editorial text-base sm:text-lg font-semibold text-[#29251F] truncate">
                            {item.title}
                          </h4>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#E9DED1]/60 text-[#29251F] text-[10px] font-bold">
                            Size: {item.selectedSize}
                          </span>
                        </div>

                        {/* Line Item Total */}
                        <div className="text-right">
                          <p className="text-base font-bold text-[#29251F]">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                          <p className="text-[10px] text-[#958878]">₹{item.price.toLocaleString("en-IN")} each</p>
                        </div>
                      </div>

                      {/* Stepper & Remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E9DED1] rounded-full bg-white px-2 py-1 shadow-sm">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId || item.id, -1)}
                            className="p-1 hover:text-[#C6A46A] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5 text-[#29251F]" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-[#29251F]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId || item.id, 1)}
                            className="p-1 hover:text-[#C6A46A] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#29251F]" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartItemId || item.id, item.title)}
                          className="text-xs text-rose-700 hover:text-rose-900 font-medium flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address Card */}
              <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 shadow-luxury">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#C6A46A]" />
                  <h3 className="font-editorial text-xl font-bold text-[#29251F]">
                    Insured Delivery Address
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                      placeholder="Receiver's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      WhatsApp / Mobile (+91)
                    </label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                      placeholder="6-digit pincode"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                      placeholder="City / Region"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      Street Address / House No. / Landmark
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                      placeholder="Complete doorstep delivery address"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Mode Selection */}
              <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 shadow-luxury">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-4 h-4 text-[#C6A46A]" />
                  <h3 className="font-editorial text-xl font-bold text-[#29251F]">
                    Payment Mode
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* UPI Option */}
                  <label
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === "upi"
                        ? "border-[#C6A46A] bg-[#FAF7F2] ring-1 ring-[#C6A46A]"
                        : "border-[#E9DED1] bg-white hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="mt-1 text-[#C6A46A]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#29251F]">Instant UPI Payment</p>
                      <p className="text-[11px] text-[#958878] mt-0.5">GPay, PhonePe, Paytm ({storeConfig.upiId})</p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-[#1B4332] bg-[#1B4332]/10 px-2 py-0.5 rounded-md">
                        Fastest Dispatch
                      </span>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === "cod"
                        ? "border-[#C6A46A] bg-[#FAF7F2] ring-1 ring-[#C6A46A]"
                        : "border-[#E9DED1] bg-white hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 text-[#C6A46A]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#29251F]">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-[#958878] mt-0.5">Pay in cash or UPI at your doorstep</p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-[#958878] bg-[#E9DED1] px-2 py-0.5 rounded-md">
                        19,000+ Pincodes
                      </span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Order Summary Card */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              
              <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-8 shadow-luxury">
                <h3 className="font-editorial text-2xl font-bold text-[#29251F] mb-6 pb-4 border-b border-[#E9DED1]">
                  Order Summary
                </h3>

                <div className="space-y-3.5 text-xs text-[#5A5348] mb-6">
                  <div className="flex justify-between">
                    <span>Bag Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} pieces)</span>
                    <span className="font-semibold text-[#29251F]">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Insured Air Shipping</span>
                    {isFreeShipping ? (
                      <span className="font-bold text-[#1B4332]">FREE</span>
                    ) : (
                      <span className="font-semibold text-[#29251F]">₹{storeConfig.shippingCharge}</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span>Luxury Velvet Presentation Case</span>
                    <span className="font-bold text-[#1B4332]">COMPLIMENTARY</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Anti-Tarnish Lifetime Certificate</span>
                    <span className="font-bold text-[#1B4332]">INCLUDED</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9DED1] flex items-baseline justify-between mb-8">
                  <div>
                    <p className="text-xs font-bold text-[#958878] uppercase tracking-wider">Total Payable</p>
                    <p className="text-[10px] text-[#958878]">Inclusive of all taxes</p>
                  </div>
                  <p className="font-editorial text-3xl font-bold text-[#29251F]">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Primary WhatsApp Order CTA */}
                <button
                  onClick={handlePlaceOrderWhatsApp}
                  className="w-full py-4 rounded-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-luxury active:scale-95 flex items-center justify-center gap-3 group"
                >
                  <span>Confirm Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[11px] text-[#958878] mt-3">
                  ⚡ Generates instant official order receipt & connects with our concierge.
                </p>

                {/* Trust Pillar Badges */}
                <div className="mt-6 pt-6 border-t border-[#E9DED1] space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-[#29251F]">
                    <ShieldCheck className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                    <span>18K Hallmarked Gold Micron Plating</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#29251F]">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                    <span>7-Day Doorstep Replacement Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#29251F]">
                    <Lock className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                    <span>Tamper-Proof Insured Transit Packaging</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* Empty Bag State */
          <div className="max-w-md mx-auto bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-10 sm:p-12 text-center shadow-luxury">
            <div className="w-16 h-16 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 flex items-center justify-center mx-auto mb-5 text-[#C6A46A]">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#29251F] mb-3">
              Your Bag is Currently Empty
            </h2>

            <p className="text-xs sm:text-sm text-[#958878] leading-relaxed mb-8 font-light">
              Discover our handcrafted 18K gold-plated heirloom collections and elevate your everyday style.
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
