import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles, ChevronDown, ChevronUp, Phone } from 'lucide-react';

export default function PoliciesView({ storeConfig }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full animate-fade-in">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SOVEREIGN ASSURANCE & POLICIES</span>
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#29251F] font-normal">
          Client Care & Warranty
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5348] mt-2 font-light">
          Everything you need to know about our 18K gold plating, insured air dispatch, and 7-day doorstep replacement guarantee.
        </p>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E9DED1] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E9DED1] flex items-center justify-center text-[#C6A46A] mb-3">
            <Truck className="w-5 h-5" />
          </div>
          <h4 className="font-editorial text-xl text-[#29251F] font-medium mb-1">Insured Air Dispatch</h4>
          <p className="text-xs text-[#5A5348] leading-relaxed font-light">
            Free shipping on orders above ₹999. Dispatched within 24–48 hours via BlueDart Air with live SMS tracking across 19,000+ pincodes.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E9DED1] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E9DED1] flex items-center justify-center text-[#C6A46A] mb-3">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h4 className="font-editorial text-xl text-[#29251F] font-medium mb-1">7-Day Doorstep Exchange</h4>
          <p className="text-xs text-[#5A5348] leading-relaxed font-light">
            If ring or bangle sizing is not 100% perfect, our concierge arranges a free doorstep reverse pickup and immediate replacement.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E9DED1] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E9DED1] flex items-center justify-center text-[#C6A46A] mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-editorial text-xl text-[#29251F] font-medium mb-1">Anti-Tarnish Warranty</h4>
          <p className="text-xs text-[#5A5348] leading-relaxed font-light">
            Triple-micron 18K gold electro-plating protected by optical hydrophobic lacquer. Sweat, water, and perfume resistant.
          </p>
        </div>
      </div>

      {/* Jewellery Care Guide */}
      <div className="bg-white rounded-3xl border border-[#E9DED1] p-6 sm:p-10 mb-16 shadow-sm">
        <h3 className="font-editorial text-2xl sm:text-3xl text-[#29251F] font-normal mb-4">
          Jewellery Care Instructions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5A5348] font-light leading-relaxed">
          <div className="space-y-2">
            <h5 className="font-bold text-sm text-[#29251F]">The Golden Rules:</h5>
            <p>• <strong>Last On, First Off:</strong> Put on your jewellery after applying lotions, makeup, and hairsprays.</p>
            <p>• <strong>Storage:</strong> Always store individual pieces inside the complimentary Shringaar velvet pouch to prevent surface friction.</p>
            <p>• <strong>Cleaning:</strong> Gently wipe with a soft muslin or micro-suede cloth after evening festivities to restore mirror luster.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-sm text-[#29251F]">What to Avoid:</h5>
            <p>• Avoid submerging pieces in boiling water or harsh abrasive chemical detergents.</p>
            <p>• While waterproof against daily sweat and rain, avoid prolonged soaking in high-chlorine swimming pools.</p>
            <p>• Handle delicate gemstone prongs and baroque pearls with gentle care.</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-10 shadow-sm">
        <h3 className="font-editorial text-2xl sm:text-3xl text-[#29251F] font-normal mb-6">
          Frequently Answered Queries
        </h3>

        <div className="space-y-3">
          {storeConfig.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E9DED1] bg-white overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full text-left px-5 py-4 text-xs sm:text-sm font-semibold flex items-center justify-between text-[#29251F] hover:text-[#C6A46A] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#958878] flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-[#5A5348] leading-relaxed border-t border-[#E9DED1]/60 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Support Box */}
        <div className="mt-8 pt-6 border-t border-[#E9DED1] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5A5348]">Have a custom trousseau or bespoke question?</p>
          <a
            href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20Shringaar%20Team!%20I%20have%20a%20question%20about%20policies.`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#1B4332] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp (+{storeConfig.whatsappNumber})</span>
          </a>
        </div>
      </div>

    </div>
  );
}
