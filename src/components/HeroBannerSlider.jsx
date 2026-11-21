import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroBannerSlider({ banners = [], onCtaClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners?.length]);

  if (!banners || banners.length === 0) return null;

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[72vh] sm:h-[76vh] lg:h-[82vh] overflow-hidden bg-[#29251F] group select-none">
      
      {/* Slides Container */}
      {banners.map((banner, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Responsive Campaign Photography */}
            {/* Dedicated mobile portrait (3:4) on <768px, cinematic landscape (16:9) on desktop */}
            <div className="absolute inset-0 w-full h-full">
              <picture className="w-full h-full block">
                {banner.mobileImage && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={banner.mobileImage}
                  />
                )}
                <img
                  src={banner.image}
                  alt={banner.headline}
                  className={`w-full h-full object-cover ${banner.mobilePosition || 'object-[center_15%]'} md:${banner.desktopPosition || 'object-[center_28%]'} transform transition-transform duration-10000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </picture>
              
              {/* Intelligent Contrast Overlays */}
              {/* Mobile: Bottom-up gradient gives 100% legibility to text while keeping model's face & jewellery crystal clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/95 via-[#29251F]/45 to-transparent md:hidden pointer-events-none" />
              {/* Desktop: Horizontal gradient leaves model on center/right unobstructed */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#29251F]/85 via-[#29251F]/30 to-transparent pointer-events-none" />
            </div>

            {/* Banner Text Content with Safe-Zone Positioning */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-24">
              <div className="max-w-xl text-left">
                
                {/* Collection Micro-Tag */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#DFCCA6] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-3 sm:mb-4 animate-fade-in shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#C6A46A]" />
                  <span>{banner.collectionTag}</span>
                </div>

                {/* Editorial Headline */}
                <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#F5F0E7] tracking-tight mb-2.5 sm:mb-4 drop-shadow-md">
                  {banner.headline}
                </h2>

                {/* Subheadline */}
                <p className="text-xs sm:text-sm lg:text-base text-[#E9DED1]/90 font-light leading-relaxed mb-6 sm:mb-8 max-w-md line-clamp-2 sm:line-clamp-none">
                  {banner.subheadline}
                </p>

                {/* Luxury CTA Button */}
                <div>
                  <button
                    onClick={() => onCtaClick(banner.filterCategory)}
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-all shadow-luxury hover:shadow-gold-glow active:scale-95 flex items-center gap-2.5 sm:gap-3 group/btn"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        );
      })}

      {/* Prev / Next Subtle Arrows (Desktop only, touch swipe & dots for mobile) */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#29251F]/40 hover:bg-[#29251F]/80 backdrop-blur-md border border-white/20 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90"
        aria-label="Previous Campaign Banner"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#29251F]/40 hover:bg-[#29251F]/80 backdrop-blur-md border border-white/20 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90"
        aria-label="Next Campaign Banner"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-500 rounded-full h-1.5 ${
              i === currentSlide ? "w-7 sm:w-8 bg-[#C6A46A]" : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
