import React, { useState } from 'react';
import { X, Star, Ruler, MapPin, ShoppingBag, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import SafeImage from './SafeImage';

export default function QuickViewModal({
  product,
  onClose,
  onAddToBag,
  onToggleWishlist,
  isWishlisted,
  onViewFullPDP
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "One Size");
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState("material");

  const images = product.gallery || [product.image, product.secondaryImage || product.image];

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

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#29251F]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E9DED1] z-10 animate-fade-in my-8 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-[#E9DED1] flex items-center justify-center text-[#29251F] hover:text-[#C6A46A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Gallery View (col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="aspect-square rounded-2xl overflow-hidden border border-[#E9DED1] bg-white relative shadow-sm">
              <SafeImage
                src={images[activeImageIdx] || product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#C6A46A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail switcher */}
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx ? "border-[#C6A46A] ring-1 ring-[#C6A46A]" : "border-[#E9DED1] opacity-70"
                  }`}
                >
                  <SafeImage src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Full PDP Link */}
            <button
              onClick={() => {
                onViewFullPDP(product);
                onClose();
              }}
              className="mt-2 text-xs text-[#C6A46A] font-semibold flex items-center justify-center gap-1 hover:underline py-1"
            >
              <span>View Full Editorial Page & Specifications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Details Column (col-span-7) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#C6A46A] font-semibold uppercase tracking-widest mb-1">
                <span>{product.category}</span>
                <div className="flex items-center gap-1 text-[#29251F]">
                  <Star className="w-3.5 h-3.5 fill-[#C6A46A] text-[#C6A46A]" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[10px] text-[#958878]">({product.reviewsCount})</span>
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#29251F] mb-1.5 leading-snug">
                {product.title}
              </h3>

              <p className="text-[11px] text-[#958878] mb-3 font-medium">
                Collection: <span className="text-[#29251F]">{product.collection}</span> • <span className="text-[#C6A46A]">{product.metal}</span>
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mb-4">
                <span className="text-2xl font-bold text-[#29251F]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-[#958878] line-through">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-[#1B4332] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {discountPercent}% OFF (Save ₹{(product.mrp - product.price).toLocaleString("en-IN")})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5A5348] leading-relaxed mb-4 font-light">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider">
                    Select Size: <span className="text-[#C6A46A]">{selectedSize}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide((prev) => !prev)}
                    className="text-[11px] text-[#C6A46A] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>{showSizeGuide ? "Hide Guide" : "Size Guide"}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                          isSelected
                            ? "bg-[#29251F] text-[#F5F0E7] ring-2 ring-[#C6A46A]"
                            : "bg-white hover:bg-[#F2EBE2] text-[#29251F] border border-[#E9DED1]"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>

                {showSizeGuide && (
                  <div className="mt-3 p-3.5 rounded-xl bg-white border border-[#E9DED1] text-[11px] text-[#5A5348] animate-fade-in">
                    <p className="font-bold text-[#29251F] mb-1">Standard Indian Sizing Metric:</p>
                    <p>• <strong>Bangles / Kadas:</strong> 2.4 (57.2mm diameter) | 2.6 (60.3mm) | 2.8 (63.5mm)</p>
                    <p>• <strong>Rings:</strong> Size 6 (16.5mm) | Size 7 (17.3mm) | Size 8 (18.1mm) | Size 9 (18.9mm)</p>
                    <p>• <strong>Necklaces:</strong> 16" (Choker snug) | 18" (Princess chest drape)</p>
                  </div>
                )}
              </div>

              {/* Delivery Pincode Checker */}
              <div className="mb-5 p-3 rounded-xl bg-white border border-[#E9DED1]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#29251F] mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A46A]" />
                  <span>Check Express Air Dispatch Timeline:</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E9DED1] bg-[#FAF7F2] text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-[#29251F] text-[#F5F0E7] text-xs font-semibold hover:bg-[#C6A46A] transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeResult && (
                  <p className={`text-[11px] mt-1.5 font-medium ${pincodeResult.success ? "text-[#1B4332]" : "text-red-600"}`}>
                    {pincodeResult.message}
                  </p>
                )}
              </div>

              {/* Accordion Specs */}
              <div className="border-t border-[#E9DED1] pt-3 space-y-2 text-xs">
                <div>
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "material" ? "" : "material")}
                    className="w-full text-left font-semibold text-[#29251F] flex justify-between py-1"
                  >
                    <span>Material & Plating Specifications</span>
                    <span>{activeAccordion === "material" ? "−" : "+"}</span>
                  </button>
                  {activeAccordion === "material" && (
                    <p className="text-[11px] text-[#5A5348] pb-2 font-light">{product.material}</p>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "care" ? "" : "care")}
                    className="w-full text-left font-semibold text-[#29251F] flex justify-between py-1 border-t border-[#E9DED1]/70 pt-2"
                  >
                    <span>Care Guide & Anti-Tarnish Assurance</span>
                    <span>{activeAccordion === "care" ? "−" : "+"}</span>
                  </button>
                  {activeAccordion === "care" && (
                    <p className="text-[11px] text-[#5A5348] pb-2 font-light">{product.care}</p>
                  )}
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#E9DED1] flex gap-3">
              <button
                onClick={() => {
                  onAddToBag(product, selectedSize);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#C6A46A] hover:bg-[#B08E55] text-white font-bold text-xs uppercase tracking-widest shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • ₹{product.price.toLocaleString("en-IN")}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-3 rounded-xl border border-[#E9DED1] bg-white hover:bg-[#FAF7F2] text-[#29251F] transition-colors"
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
