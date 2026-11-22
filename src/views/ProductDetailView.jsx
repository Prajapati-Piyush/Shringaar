import React, { useState } from 'react';
import {
  Star,
  MapPin,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Send,
  Award,
  Truck,
  CheckCircle2,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import SafeImage from '../components/SafeImage';
import ProductCard from '../components/ProductCard';

export default function ProductDetailView({
  product,
  allProducts,
  onAddToBag,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  storeConfig,
  onOpenWhatsAppDirect
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [activeTab, setActiveTab] = useState("specs");
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product.gallery || [product.image, product.secondaryImage || product.image];
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // Related products from same category or collection
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!clean || clean.length !== 6 || isNaN(clean)) {
      setPincodeResult({ success: false, message: "Please enter a valid 6-digit postal code" });
      return;
    }
    setPincodeResult({
      success: true,
      message: `✅ Express BlueDart Air delivery to ${clean} in 3–4 business days!`
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      
      {/* Breadcrumbs */}
      <nav className="text-xs text-[#958878] mb-6 flex items-center gap-1.5 flex-wrap">
        <button onClick={() => onNavigate('home')} className="hover:text-[#29251F]">
          Home
        </button>
        <span>›</span>
        <button
          onClick={() => {
            onSelectCategory(product.category);
            onNavigate('catalog');
          }}
          className="hover:text-[#29251F]"
        >
          {product.category}
        </button>
        <span>›</span>
        <span className="font-semibold text-[#29251F] truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        
        {/* Left: Gallery View with Zoom and Thumbnails (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                  activeImageIdx === idx
                    ? "border-[#C6A46A] ring-2 ring-[#C6A46A]/40 shadow-sm"
                    : "border-[#E9DED1] opacity-70 hover:opacity-100"
                }`}
              >
                <SafeImage src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="flex-1 aspect-square rounded-3xl overflow-hidden border border-[#E9DED1] bg-white relative shadow-luxury group">
            <SafeImage
              src={images[activeImageIdx]}
              alt={product.title}
              className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                isZoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed((prev) => !prev)}
            />

            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#C6A46A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                {product.badge}
              </span>
            )}

            <button
              onClick={() => setIsZoomed((prev) => !prev)}
              className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DED1] text-[#29251F] hover:text-[#C6A46A] shadow"
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right: Product Spec & Purchase Suite (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            
            {/* Category & Collection */}
            <div className="flex items-center justify-between text-xs text-[#C6A46A] font-semibold uppercase tracking-widest mb-1.5">
              <span>{product.category}</span>
              <div className="flex items-center gap-1 text-[#29251F]">
                <Star className="w-3.5 h-3.5 fill-[#C6A46A] text-[#C6A46A]" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[10px] text-[#958878]">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] mb-2 leading-tight">
              {product.title}
            </h1>

            <p className="text-xs text-[#958878] mb-4 font-light">
              Collection: <strong className="text-[#29251F]">{product.collection}</strong> • Metal: <strong className="text-[#C6A46A]">{product.metal}</strong>
            </p>

            {/* Price Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DED1] mb-6">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#29251F]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm sm:text-base text-[#958878] line-through">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#1B4332] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save ₹{(product.mrp - product.price).toLocaleString("en-IN")} ({discountPercent}% OFF)
                </span>
              </div>
              <p className="text-[10px] text-[#958878] mt-1">
                Inclusive of all taxes • Complimentary insured BlueDart Air shipping
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5A5348] leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Pincode Delivery Check */}
            <div className="mb-6 p-4 rounded-2xl bg-white border border-[#E9DED1] shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#29251F] mb-2">
                <MapPin className="w-4 h-4 text-[#C6A46A]" />
                <span>Check Delivery Timeline & COD Availability:</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Indian Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#E9DED1] bg-[#FAF7F2] text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#29251F] text-[#F5F0E7] text-xs font-semibold uppercase tracking-wider hover:bg-[#C6A46A] transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeResult && (
                <p className={`text-xs mt-2 font-medium ${pincodeResult.success ? "text-[#1B4332]" : "text-red-600"}`}>
                  {pincodeResult.message}
                </p>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-3">
                <button
                  onClick={() => onAddToBag(product)}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ₹{product.price.toLocaleString("en-IN")}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-3.5 rounded-full border border-[#E9DED1] bg-white hover:bg-[#FAF7F2] text-[#29251F] transition-colors"
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Instant WhatsApp Order */}
              <button
                onClick={onOpenWhatsAppDirect}
                className="w-full py-3 px-6 rounded-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Buy Now via Instant WhatsApp Concierge</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E9DED1] text-[11px] text-[#5A5348]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                <span>18K Micron Anti-Tarnish Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                <span>100% Skin-Safe & Hypoallergenic</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                <span>48-Hour BlueDart Air Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                <span>7-Day Doorstep Exchange Policy</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tabs / Accordion for Detailed Specifications */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-10 mb-16 shadow-sm">
        <div className="flex gap-4 border-b border-[#E9DED1] pb-4 mb-6 overflow-x-auto">
          {[
            { id: "specs", label: "Craftsmanship & Materials" },
            { id: "care", label: "Jewellery Care Guide" },
            { id: "shipping", label: "Shipping & Returns" },
            { id: "reviews", label: `Reviews (${product.reviewsCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? "border-[#C6A46A] text-[#29251F]"
                  : "border-transparent text-[#958878] hover:text-[#29251F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "specs" && (
          <div className="space-y-4 text-xs sm:text-sm text-[#5A5348] font-light animate-fade-in leading-relaxed">
            <p><strong>Base Metal & Plating: </strong>{product.material}</p>
            <p><strong>Dimensions & Metrics: </strong>{product.specs}</p>
            <p><strong>Purity Standards: </strong>Electro-plated with 18K yellow/antique temple gold sealed with an invisible hydrophobic anti-tarnish protective lacquer. Tested against chlorine, seawater, and daily cosmetic sprays.</p>
          </div>
        )}

        {activeTab === "care" && (
          <div className="space-y-3 text-xs sm:text-sm text-[#5A5348] font-light animate-fade-in leading-relaxed">
            <p>• {product.care}</p>
            <p>• When not adorning, store flat inside your complimentary Shringaar velvet pouch to prevent surface micro-scratches.</p>
            <p>• Gently wipe with a dry micro-suede cloth after evening wear to restore original mirror luster.</p>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-3 text-xs sm:text-sm text-[#5A5348] font-light animate-fade-in leading-relaxed">
            <p>• <strong>Free Air Shipping:</strong> Unlocked automatically on all orders above ₹999 across 19,000+ Indian postal codes.</p>
            <p>• <strong>Dispatch Timeline:</strong> Orders are hand-inspected, packed in tamper-proof luxury cases, and dispatched within 24–48 hours.</p>
            <p>• <strong>7-Day Doorstep Replacement:</strong> We arrange a complimentary doorstep reverse pickup if fit or sizing requires adjustment.</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-white border border-[#E9DED1] text-xs">
              <div className="flex items-center gap-1 text-[#C6A46A] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C6A46A]" />
                ))}
              </div>
              <p className="font-semibold text-[#29251F]">"Surpassed my highest expectations!"</p>
              <p className="text-[#5A5348] mt-1 font-light">
                The finish and weight match fine 22K ancestral gold. Wore it all evening with zero irritation.
              </p>
              <p className="text-[10px] text-[#958878] mt-2">Verified Patron • Mumbai</p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E9DED1] pt-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A46A] font-bold">
                ✦ COMPLETE THE ENSEMBLE ✦
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#29251F] font-normal mt-1">
                You May Also Covet
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenQuickView={() => onSelectProduct(p)}
                onAddToBag={onAddToBag}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={!!wishlist[p.id]}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
