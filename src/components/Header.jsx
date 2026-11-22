import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Menu,
  Sparkles,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function Header({
  storeConfig,
  currentView,
  onNavigate,
  activeCategory,
  onSelectCategory,
  wishlistCount,
  cartCount,
  cartSubtotal,
  onOpenBag,
  onOpenWishlist
}) {
  const [activeAnnouncementIdx, setActiveAnnouncementIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-cycle announcement bar every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnouncementIdx((prev) => (prev + 1) % storeConfig.announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [storeConfig.announcements.length]);

  const handleCategoryClick = (categoryName) => {
    onSelectCategory(categoryName);
    onNavigate('home');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById("curated-catalog");
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCatalogJump = () => {
    onNavigate('home');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById("curated-catalog");
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden transition-all duration-300 shadow-sm bg-[#FAF7F2]">
      
      {/* =====================================================================
          TIER 1: SLIM LUXURY ANNOUNCEMENT STRIP (#29251F)
          ===================================================================== */}
      <div className="bg-[#29251F] text-[#F5F0E7] text-[11px] sm:text-xs py-2 px-3 sm:px-6 relative overflow-hidden border-b border-[#3D3830]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() =>
              setActiveAnnouncementIdx((prev) =>
                prev === 0 ? storeConfig.announcements.length - 1 : prev - 1
              )
            }
            className="p-1 hover:text-[#C6A46A] transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex-1 text-center font-medium tracking-wide truncate px-2">
            <span className="inline-block transition-opacity duration-300 animate-fade-in">
              {storeConfig.announcements[activeAnnouncementIdx]}
            </span>
          </div>

          <button
            onClick={() =>
              setActiveAnnouncementIdx((prev) => (prev + 1) % storeConfig.announcements.length)
            }
            className="p-1 hover:text-[#C6A46A] transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          TIER 2: GLASSMORPHIC MAIN NAVIGATION BAR
          ===================================================================== */}
      <div className="glass-header relative border-b border-[#E9DED1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Mobile Menu Toggle */}
            <div className="flex items-center gap-3 flex-1 max-w-xs">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#29251F] hover:text-[#C6A46A] transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Brand Editorial Wordmark Logo */}
            <div
              className="text-center flex-shrink-0 cursor-pointer group select-none"
              onClick={() => onNavigate('home')}
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[#C6A46A] text-sm group-hover:rotate-45 transition-transform duration-300">✦</span>
                <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[0.2em] text-[#29251F] group-hover:text-[#C6A46A] transition-colors">
                  {storeConfig.brandName}
                </h1>
                <span className="text-[#C6A46A] text-sm group-hover:rotate-45 transition-transform duration-300">✦</span>
              </div>
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#958878] font-medium -mt-0.5 max-w-[170px] sm:max-w-none truncate">
                {storeConfig.subTitle}
              </p>
            </div>

            {/* Right: Wishlist, Shopping Bag */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 flex-1 max-w-xs">
              
              {/* Wishlist Trigger */}
              <button
                onClick={() => onNavigate('wishlist')}
                className={`p-2 rounded-full hover:bg-[#FAF7F2] transition-colors relative ${
                  currentView === 'wishlist' ? "text-[#C6A46A]" : "text-[#29251F] hover:text-[#C6A46A]"
                }`}
                aria-label="Wishlist"
                title="Your Private Vault"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#29251F] text-[#F5F0E7] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => onNavigate('cart')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all transform active:scale-95 shadow-sm group ${
                  currentView === 'cart'
                    ? "bg-[#29251F] text-[#F5F0E7] border-[#29251F]"
                    : "bg-[#FAF7F2] hover:bg-[#EDE5D8] border-[#E9DED1] text-[#29251F]"
                }`}
                aria-label="Open shopping bag"
              >
                <div className="relative">
                  <ShoppingBag className={`w-5 h-5 transition-colors ${
                    currentView === 'cart' ? "text-[#DFCCA6]" : "text-[#29251F] group-hover:text-[#C6A46A]"
                  }`} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#C6A46A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Bag</span>
                {cartCount > 0 && (
                  <span className="hidden sm:inline text-[#C6A46A] font-bold">
                    • ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================================
          MOBILE NAVIGATION DRAWER
          ===================================================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-[#29251F]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl z-10 flex flex-col justify-between border-r border-[#E9DED1] animate-slide-up">
            <div>
              {/* Drawer Top */}
              <div className="p-4 border-b border-[#E9DED1] flex items-center justify-between bg-[#F5F0E7]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#C6A46A]">✦</span>
                  <span className="font-editorial text-xl font-bold tracking-widest text-[#29251F]">
                    {storeConfig.brandName}
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#958878] hover:text-[#29251F]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4 Main Customer-Facing Sections */}
              <div className="p-4 space-y-1 border-b border-[#E9DED1]">
                <p className="text-[10px] font-bold text-[#958878] uppercase tracking-widest px-3 mb-2">
                  Navigation
                </p>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-between ${
                    currentView === 'home' ? "bg-[#29251F] text-[#F5F0E7]" : "text-[#29251F] hover:bg-[#E9DED1]/40"
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={handleCatalogJump}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#29251F] hover:bg-[#E9DED1]/40 tracking-wide flex items-center justify-between"
                >
                  <span>Curated Heirlooms</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => {
                    onNavigate('wishlist');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-between ${
                    currentView === 'wishlist' ? "bg-[#29251F] text-[#F5F0E7]" : "text-[#29251F] hover:bg-[#E9DED1]/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#C6A46A]" />
                    <span>Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#C6A46A] text-white font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    onNavigate('cart');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-between ${
                    currentView === 'cart' ? "bg-[#29251F] text-[#F5F0E7]" : "text-[#29251F] hover:bg-[#E9DED1]/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C6A46A]" />
                    <span>Shopping Bag</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#C6A46A] text-white font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    onNavigate('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-between ${
                    currentView === 'contact' ? "bg-[#29251F] text-[#F5F0E7]" : "text-[#29251F] hover:bg-[#E9DED1]/40"
                  }`}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              </div>

              {/* Category Links */}
              <div className="p-4 space-y-1">
                <p className="text-[10px] font-bold text-[#958878] uppercase tracking-widest px-3 mb-2">
                  Browse by Category
                </p>
                {storeConfig.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#5A5348] hover:bg-[#E9DED1]/40 hover:text-[#29251F]"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

            </div>

            {/* Drawer Bottom Concierge */}
            <div className="p-4 border-t border-[#E9DED1] bg-[#F5F0E7]">
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20SHRINGAR!%20I%20would%20like%20assistance.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-[#1B4332] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
