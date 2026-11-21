import React from 'react';
import { Sparkles, ShieldCheck, Award, HeartHandshake, ArrowRight } from 'lucide-react';
import SafeImage from '../components/SafeImage';

export default function StoryView({ onNavigate }) {
  return (
    <div className="flex-1 w-full animate-fade-in">
      
      {/* Editorial Hero */}
      <section className="relative min-h-[460px] sm:min-h-[540px] flex items-center justify-center bg-[#29251F] text-white px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1600"
            alt="Royal Karigars of Shringaar"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#29251F] via-[#29251F]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center py-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DFCCA6] flex items-center justify-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A46A]" />
            <span>THE HERITAGE ATELIER</span>
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal leading-tight mb-4">
            Where Ancestral Majesty Meets Everyday Grace
          </h1>
          <p className="text-sm sm:text-base text-[#E9DED1] font-light leading-relaxed max-w-xl mx-auto">
            Born out of a deep reverence for classical Indian temple architecture, Rajputana court adornments, and modern wearable luxury.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Narrative */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] block mb-2">
              CHAPTER I • THE GENESIS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#29251F] font-normal leading-snug mb-4">
              Reviving the Lost Secrets of Temple Goldsmiths
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#5A5348] font-light leading-relaxed">
              <p>
                For centuries, royal Indian jewellery was preserved exclusively in palace vaults, worn once for a coronation or wedding and sealed away. Modern fine jewellery, on the other hand, was often fragile or overpriced.
              </p>
              <p>
                SHRINGAAR was established to bridge this divide. We partnered with generational karigars in Jaipur and Thanjavur to craft heirloom-grade pieces electro-dipped in 18K antique gold that can be worn fearlessly from 9 AM boardroom presentations to midnight festive Sangeets.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-luxury border border-[#E9DED1] aspect-[4/3] bg-[#FAF7F2]">
            <SafeImage
              src="https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&q=80&w=800"
              alt="Crafting Temple Jewellery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Chapter 2: The Science of Anti-Tarnish */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-y border-[#E9DED1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] block mb-1">
              CHAPTER II • THE SCIENCE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#29251F] font-normal">
              18K Triple-Micron & Hydrophobic Shield
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5348] mt-2 font-light">
              How our jewellery stays radiant for years without ever causing green skin or allergic itching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E9DED1] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#C6A46A] mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-editorial text-xl text-[#29251F] font-medium mb-1">18K Micro-Plating</h4>
              <p className="text-xs text-[#5A5348] leading-relaxed font-light">
                Triple-layer electro-chemical deposition of authentic 18K yellow gold ensuring deep, non-fading antique matte brilliance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E9DED1] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#C6A46A] mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-editorial text-xl text-[#29251F] font-medium mb-1">Hydrophobic Lacquer</h4>
              <p className="text-xs text-[#5A5348] leading-relaxed font-light">
                An invisible optical polymer seals the gold layer, completely blocking cosmetic perfumes, sweat, and humidity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E9DED1] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#C6A46A] mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-editorial text-xl text-[#29251F] font-medium mb-1">Hypoallergenic Core</h4>
              <p className="text-xs text-[#5A5348] leading-relaxed font-light">
                Formulated strictly without nickel, lead, or toxic alloys. Lab-certified 100% gentle on the most sensitive earlobes.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-8 py-3.5 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
            >
              <span>Explore The 14 Creations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
