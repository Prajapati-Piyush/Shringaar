# Shringaar • Ultra-Premium Indian Jewellery Storefront

> **Subtitle:** Timeless Indian Craft, Everyday Luxury  
> **Aesthetic:** Editorial Indian Luxury, Antique Temple Gold, Warm Alabaster Silk, Deep Charcoal Ink  
> **Engine:** React 18, Tailwind CSS, Lucide Icons, Vite

---

## ⚡ Quick Start (Run Locally)

```bash
cd shringaar
npm install
npm run dev
```

Visit the local preview URL provided by Vite (e.g., `http://localhost:5173`).

To build for production:
```bash
npm run build
```

---

## 🛠️ 2-Minute Client-Swap Configuration

All brand details, catalog products, prices, images, and WhatsApp/UPI details are consolidated into a single, clean configuration object at the **very top of `src/App.jsx`**:

```javascript
export const STORE_CONFIG = {
  brandName: "Shringaar",
  tagline: "Timeless Indian Craft, Everyday Luxury",
  whatsappNumber: "919999999999", // International format without '+'
  upiId: "shringaar@upi",
  freeShippingThreshold: 999,
  flatShippingFee: 79,
  currency: "₹",
  // ...
  products: [ ... ]
};
```

### What You Can Swap in Under 2 Minutes:
1. **WhatsApp Order Phone Number**: Update `whatsappNumber` to receive instant pre-formatted order receipts.
2. **UPI ID**: Change `upiId` to display your own VPA for GPay/PhonePe payments.
3. **Free Shipping Threshold**: Adjust `freeShippingThreshold` (e.g. ₹999, ₹1499). The live progress bar updates dynamically.
4. **Products Catalog**: Add, remove, or swap image URLs, MRPs, selling prices, badges, and material specifications in the `products` array.
5. **Brand Copy & Reviews**: Update hero titles, trust badges, customer reviews from Indian cities, and Instagram gallery handles.

---

## ✨ Features & Architecture

1. **Top Marquee / Announcement Strip**: Espresso `#1A1715` bar with cream typography highlighting the festive shipping offer.
2. **Sticky Glassmorphic Header**: Serif logo, quick category pills (All, Jhumkas, Neckpieces, Bangles, Rings), search toggle, and animated gold shopping bag badge.
3. **Editorial Hero Banner**: Full-bleed luxury photography, warm lighting gradient overlay, and dual CTAs ("Explore Collection" + "Best Sellers").
4. **Trust & Craftsmanship Strip**: 18K Gold Plated, Anti-Tarnish Guarantee, Skin-Safe & Nickel Free, 48-Hour Dispatch.
5. **Curated Collection Grid**: 8 realistic Indian jewellery cards, original MRP strikethrough, discount badges, "Quick View" modal, and instant "Add to Bag".
6. **Smart Slide-Over Shopping Bag**:
   - Dynamic Free Shipping Bar (gold animated progress tracking threshold).
   - Cart Stepper (- / +) and itemized bill summary.
   - Zero-Friction Checkout Form (Name, Phone, Address, Pincode, UPI vs COD).
   - 1-Click WhatsApp Order Button with automated receipt formatting.
7. **Customer Love & Instagram Grid**: Reviews from Mumbai, Delhi, and Bengaluru + 4-square `@shringaar.official` styled gallery.
8. **Native Mobile Sticky Bottom Bar**: Persistent bottom checkout bar on mobile when items are in cart.
9. **Elegant Footer**: Brand story, policy accordions, WhatsApp concierge link, and `"Storefront crafted by @buildwithusss"` credit badge.
