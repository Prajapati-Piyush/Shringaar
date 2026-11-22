import React, { useState } from 'react';
import { Lock, ShieldCheck, Send, CheckCircle2, ArrowRight, Printer, Sparkles } from 'lucide-react';
import SafeImage from '../components/SafeImage';

export default function CheckoutView({
  cart,
  storeConfig,
  onNavigate,
  onClearCart,
  onShowToast
}) {
  const [formData, setFormData] = useState({
    name: "Radhika Sharma",
    phone: "9876543210",
    email: "radhika.sharma@example.com",
    address: "402, Lotus Palace, 14th Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    paymentMode: "UPI / GPay / PhonePe (Instant Dispatch)"
  });

  const [formErrors, setFormErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartMrpTotal = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const isFreeShipping = cartSubtotal >= storeConfig.freeShippingThreshold;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : storeConfig.shippingCharge;
  const grandTotal = cartSubtotal + shippingFee;
  const totalSavings = Math.max(0, cartMrpTotal - cartSubtotal);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      onShowToast("Your bag is empty. Please add a piece first!");
      onNavigate('catalog');
      return;
    }

    const errors = {};
    if (!formData.name.trim()) errors.name = "Enter your full name";
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = "Enter valid 10-digit mobile number";
    if (!formData.email.trim() || !formData.email.includes("@")) errors.email = "Enter valid email address";
    if (!formData.address.trim()) errors.address = "Enter complete street address";
    if (!formData.city.trim()) errors.city = "Enter city";
    if (!formData.pincode.trim() || formData.pincode.length < 6) errors.pincode = "Enter 6-digit postal code";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      onShowToast("⚠️ Please fill in all required delivery fields.");
      return;
    }

    const orderId = `SHR-${Math.floor(100000 + Math.random() * 900000)}`;

    const itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}*\n   • Qty: ${item.quantity}\n   • Price: ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    const receiptMessage = `👑 *NEW LUXURY ORDER: ${storeConfig.brandName}*
Order Reference: #${orderId}
━━━━━━━━━━━━━━━━━━━━
📦 *ORDERED PIECES:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 *BILLING STATEMENT:*
• Subtotal: ₹${cartSubtotal.toLocaleString("en-IN")}
• Insured Air Shipping: ${isFreeShipping ? "FREE (Festive Tier Unlocked)" : `₹${storeConfig.shippingCharge}`}
• Festive Savings: ₹${totalSavings.toLocaleString("en-IN")}
*💎 Total Payable: ₹${grandTotal.toLocaleString("en-IN")}*

💳 *PAYMENT MODE:*
${formData.paymentMode} ${formData.paymentMode.includes("UPI") ? `(${storeConfig.upiId})` : ""}

📍 *DISPATCH DESTINATION:*
• Recipient: ${formData.name.trim()}
• Mobile: +91 ${formData.phone.trim()}
• Email: ${formData.email.trim()}
• Address: ${formData.address.trim()}, ${formData.city.trim()}, ${formData.state.trim()} - ${formData.pincode.trim()}

━━━━━━━━━━━━━━━━━━━━
Please confirm my order & provide dispatch tracking details. Thank you! 🙏`;

    const encoded = encodeURIComponent(receiptMessage);
    const waUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, "_blank");

    setPlacedOrder({
      orderId,
      items: [...cart],
      grandTotal,
      formData: { ...formData },
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    });

    onClearCart();
    onShowToast("✨ Order placed successfully! Receipt generated.");
  };

  if (placedOrder) {
    return (
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full animate-fade-in">
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-12 text-center shadow-luxury">
          
          <div className="w-16 h-16 rounded-full bg-[#1B4332] text-white flex items-center justify-center mx-auto mb-4 shadow">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] block mb-1">
            ✦ ORDER CONFIRMED ✦
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#29251F] font-normal mb-2">
            Thank You, {placedOrder.formData.name.split(" ")[0]}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5348] font-light max-w-md mx-auto mb-6">
            Your royal heirloom suite has been reserved. Order Ref: <strong>#{placedOrder.orderId}</strong>. A duplicate invoice has been dispatched to <strong>{placedOrder.formData.email}</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-white border border-[#E9DED1] text-left text-xs mb-8 space-y-2">
            <div className="flex justify-between border-b border-[#E9DED1] pb-2 font-bold text-[#29251F]">
              <span>Order Details</span>
              <span>Ref: #{placedOrder.orderId}</span>
            </div>
            <p><strong>Dispatch Address: </strong>{placedOrder.formData.address}, {placedOrder.formData.city} - {placedOrder.formData.pincode}</p>
            <p><strong>Payment Mode: </strong>{placedOrder.formData.paymentMode}</p>
            <p><strong>Total Amount: </strong>₹{placedOrder.grandTotal.toLocaleString("en-IN")}</p>
            <p><strong>Estimated Delivery: </strong>3–4 business days via BlueDart Insured Air Express</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Return to Boutique
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E9DED1] text-[#29251F] text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice Receipt</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-1">
          <Lock className="w-3.5 h-3.5" />
          <span>256-BIT ENCRYPTED CHECKOUT</span>
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#29251F] font-normal">
          Confirm Your Royal Suite
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Customer & Address Form (col-span-7) */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-10 shadow-sm">
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            
            <h3 className="font-editorial text-xl font-medium text-[#29251F] pb-2 border-b border-[#E9DED1]">
              1. Patron & Dispatch Information
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
              />
              {formErrors.name && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
                {formErrors.phone && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
                {formErrors.email && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                Full Street Address, House/Apartment & Landmark *
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A] resize-none"
              />
              {formErrors.address && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.address}</p>}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
                {formErrors.city && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.city}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">Pincode *</label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
                {formErrors.pincode && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.pincode}</p>}
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div className="pt-4">
              <h3 className="font-editorial text-xl font-medium text-[#29251F] pb-2 border-b border-[#E9DED1] mb-3">
                2. Payment Preference
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-4 rounded-2xl border cursor-pointer text-xs transition-all flex flex-col justify-between ${
                    formData.paymentMode.includes("UPI")
                      ? "bg-emerald-50 border-[#1B4332] text-[#1B4332] font-semibold shadow-sm"
                      : "bg-white border-[#E9DED1] text-[#958878] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="checkoutPayment"
                      value="UPI / GPay / PhonePe (Instant Dispatch)"
                      checked={formData.paymentMode.includes("UPI")}
                      onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                      className="accent-[#1B4332]"
                    />
                    <span className="font-bold text-sm text-[#29251F]">Instant UPI / GPay</span>
                  </div>
                  <span className="text-[11px] text-[#5A5348] mt-2 font-light">
                    Fastest air dispatch to {storeConfig.upiId} with 0% gateway fee.
                  </span>
                </label>

                <label
                  className={`p-4 rounded-2xl border cursor-pointer text-xs transition-all flex flex-col justify-between ${
                    formData.paymentMode.includes("Cash")
                      ? "bg-emerald-50 border-[#1B4332] text-[#1B4332] font-semibold shadow-sm"
                      : "bg-white border-[#E9DED1] text-[#958878] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="checkoutPayment"
                      value="Cash on Delivery (COD)"
                      checked={formData.paymentMode.includes("Cash")}
                      onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                      className="accent-[#1B4332]"
                    />
                    <span className="font-bold text-sm text-[#29251F]">Cash on Delivery</span>
                  </div>
                  <span className="text-[11px] text-[#5A5348] mt-2 font-light">
                    Pay securely in cash at your doorstep upon parcel inspection.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-4 px-6 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Confirm & Place Order on WhatsApp • ₹{grandTotal.toLocaleString("en-IN")}</span>
            </button>

          </form>
        </div>

        {/* Right: Order Summary (col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E9DED1] p-6 sm:p-8 shadow-luxury">
          <h3 className="font-editorial text-2xl font-normal text-[#29251F] pb-3 border-b border-[#E9DED1] mb-4">
            Order Summary ({cart.length} creations)
          </h3>

          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 divide-y divide-[#E9DED1]">
            {cart.map((item) => (
              <div key={item.cartItemId || item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <SafeImage src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl border border-[#E9DED1] bg-[#FAF7F2]" />
                <div className="flex-1 min-w-0">
                  <h5 className="font-editorial text-base font-medium text-[#29251F] truncate">{item.title}</h5>
                  <p className="text-[11px] text-[#958878]">Qty: {item.quantity}</p>
                  <p className="text-xs font-bold text-[#29251F]">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E9DED1] space-y-2 text-xs text-[#5A5348]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#29251F]">₹{cartSubtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Insured Air Shipping</span>
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
            <div className="border-t border-[#E9DED1] pt-3 flex justify-between text-base font-bold text-[#29251F]">
              <span>Grand Total</span>
              <span className="text-2xl text-[#29251F] font-editorial">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9DED1] flex items-center gap-2 text-[11px] text-[#5A5348]">
            <ShieldCheck className="w-4 h-4 text-[#1B4332] flex-shrink-0" />
            <span>Orders are certified 18K gold electro-dipped and backed by our 7-day doorstep exchange guarantee.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
