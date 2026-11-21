import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  Award,
  Truck,
  Heart,
  Search,
  Filter,
  ChevronDown,
  HelpCircle,
  Gem,
  Clock,
  Sparkle
} from 'lucide-react';
import SafeImage from '../components/SafeImage';
import ProductCard from '../components/ProductCard';
import HeroBannerSlider from '../components/HeroBannerSlider';

export default function HomeView({
  storeConfig,
  onNavigate,
  onOpenQuickView,
  onAddToBag,
  onToggleWishlist,
  wishlist,
  onSelectProduct
}) {
  // Catalog Filter & Sort State (Handled in-place on Home)
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [localSearch, setLocalSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Scroll to catalog section helper
  const scrollToCatalog = () => {
    const el = document.getElementById("curated-catalog");
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Banner CTA Click
  const handleBannerCta = (filterCategory) => {
    if (filterCategory) {
      setSelectedCategory(filterCategory);
      setSelectedCollection("all");
    }
    scrollToCatalog();
  };

  // Handle Category Rail Click
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedCollection("all");
    scrollToCatalog();
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return storeConfig.products
      .filter((product) => {
        // Collection filter
        if (selectedCollection !== "all" && product.collection !== selectedCollection) {
          return false;
        }
        // Category filter
        if (selectedCategory !== "All") {
          const matchName = product.category.toLowerCase() === selectedCategory.toLowerCase();
          const matchGroup = product.categoryGroup && product.categoryGroup.toLowerCase() === selectedCategory.toLowerCase();
          if (!matchName && !matchGroup) return false;
        }
        // Local Search filter
        if (localSearch.trim()) {
          const q = localSearch.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchCol = product.collection.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          if (!matchTitle && !matchCat && !matchCol && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // "featured"
      });
  }, [storeConfig.products, selectedCollection, selectedCategory, localSearch, sortBy]);

  // Featured Bestsellers for the spotlight row
  const bestsellers = useMemo(() => {
    return storeConfig.products.filter((p) => p.badge === "Bestseller").slice(0, 4);
  }, [storeConfig.products]);

  return (
    <div className="flex-1 flex flex-col w-full bg-[#F5F0E7]">
      
      {/* =====================================================================
          1. FULL-WIDTH CINEMATIC HERO BANNER SLIDER (75–90vh Desktop, 65–75vh Mobile)
          3 Model Campaign Banners: Royal Gold, Diamond Dreams, Bridal Suite
          ===================================================================== */}
      <section className="w-full">
        <HeroBannerSlider
          banners={storeConfig.heroBanners}
          onCtaClick={handleBannerCta}
        />
      </section>

      {/* =====================================================================
          2. MINIMALIST LUXURY TRUST PILLARS STRIP
          ===================================================================== */}
      <section className="w-full bg-[#FAF7F2] border-y border-[#E9DED1] py-5 sm:py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 flex items-center justify-center flex-shrink-0 text-[#C6A46A]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#29251F] uppercase tracking-wider">18K Temple Gold</p>
              <p className="text-[11px] text-[#958878]">Authentic Micron Plating</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 flex items-center justify-center flex-shrink-0 text-[#C6A46A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#29251F] uppercase tracking-wider">Anti-Tarnish Luster</p>
              <p className="text-[11px] text-[#958878]">Water & Sweat Resistant</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 flex items-center justify-center flex-shrink-0 text-[#C6A46A]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#29251F] uppercase tracking-wider">100% Skin-Safe</p>
              <p className="text-[11px] text-[#958878]">Nickel-Free & Hypoallergenic</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 flex items-center justify-center flex-shrink-0 text-[#C6A46A]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#29251F] uppercase tracking-wider">Insured Express Delivery</p>
              <p className="text-[11px] text-[#958878]">Free Shipping Above ₹999</p>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          3. SHOP BY SILHOUETTE / CATEGORY (8 Curated Categories with Unique Photos)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXQUISITE SILHOUETTES</span>
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#958878] mt-2 font-light">
            Every piece is forged with ancestral reverence and polished for modern Indian everyday luxury.
          </p>
        </div>

        {/* 8-Category Grid with Circular Luxury Frames */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {storeConfig.categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.name)}
                className="group flex flex-col items-center text-center focus:outline-none transition-all transform hover:-translate-y-1"
              >
                {/* Image Container with Gold Ring Hover */}
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-[#C6A46A] ring-offset-2 ring-offset-[#F5F0E7] shadow-luxury"
                    : "ring-1 ring-[#E9DED1] group-hover:ring-2 group-hover:ring-[#C6A46A]"
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF7F2]">
                    <SafeImage
                      src={cat.image}
                      alt={cat.name}
                      category={cat.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Category Name */}
                <span className={`mt-3 text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                  isSelected ? "text-[#C6A46A]" : "text-[#29251F] group-hover:text-[#C6A46A]"
                }`}>
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#958878] hidden sm:block font-light">
                  Explore →
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. CURATED BESTSELLERS SPOTLIGHT (Top 4 Flagship Heirlooms)
          ===================================================================== */}
      <section className="bg-[#FAF7F2] border-y border-[#E9DED1] py-14 sm:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CROWN JEWELS</span>
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] tracking-tight">
                Most Coveted Bestsellers
              </h2>
              <p className="text-xs sm:text-sm text-[#958878] mt-1 font-light">
                Pieces that our patrons wear, cherish, and gift the most.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCollection("all");
                setSelectedCategory("All");
                scrollToCatalog();
              }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#29251F] hover:text-[#C6A46A] transition-colors group"
            >
              <span>View All {storeConfig.products.length} Heirlooms</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Bestsellers Grid: 2 columns on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={!!wishlist[product.id]}
                onToggleWishlist={onToggleWishlist}
                onOpenQuickView={onOpenQuickView}
                onAddToBag={onAddToBag}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          5. ASYMMETRIC EDITORIAL MODEL CAMPAIGN (Tanishq & Cartier Inspiration)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Campaign Model Portrait (Aspect 3:4) */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden relative shadow-luxury border border-[#E9DED1] group min-h-[460px] bg-[#29251F]">
            <SafeImage
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200"
              alt="Indian Fine Jewellery Campaign"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-95"
            />
            {/* Cinematic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/90 via-[#29251F]/30 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs uppercase tracking-widest text-[#DFCCA6] font-semibold mb-3">
                EDITORIAL MASTERPIECE
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
                "Adornment is the silent language of sovereign beauty."
              </h3>
              <p className="text-xs sm:text-sm text-[#E9DED1]/80 mt-2 font-light">
                Handcrafted Kundan chandbalis and layered necklaces forged for the contemporary empress.
              </p>
            </div>
          </div>

          {/* Right Champagne Editorial Card */}
          <div className="lg:col-span-6 bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-8 sm:p-12 flex flex-col justify-between shadow-luxury">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E9DED1] text-[#C6A46A] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6">
                <Sparkles className="w-3 h-3 text-[#C6A46A]" />
                <span>THE ATELIER PHILOSOPHY</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] leading-[1.15] mb-6">
                Heritage Artistry Crafted for Everyday Wonder
              </h2>

              <p className="text-xs sm:text-sm text-[#5A5348] leading-relaxed mb-6 font-light">
                At SHRINGAR, we believe royal jewellery should never be locked away in safety lockers. 
                Using generational Jaipur Kundan karigari, hand-set Polki glass, and an advanced 
                18K gold micron plating with anti-tarnish molecular bonding, our heirlooms transition effortlessly 
                from morning boardroom meetings to evening celebrations.
              </p>

              {/* 3 Pillars List */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#C6A46A]/20 text-[#C6A46A] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✦</span>
                  <p className="text-xs text-[#29251F]">
                    <strong>18K Temple Gold Dip:</strong> Deep, regal luster that mirrors solid 22K ancestral heirloom gold.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#C6A46A]/20 text-[#C6A46A] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✦</span>
                  <p className="text-xs text-[#29251F]">
                    <strong>Sweat & Water Resistant:</strong> Formulated for tropical climates, resistant to daily perfume and moisture.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#C6A46A]/20 text-[#C6A46A] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✦</span>
                  <p className="text-xs text-[#29251F]">
                    <strong>100% Skin Safe:</strong> Certified hypoallergenic, free of toxic nickel and cadmium.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#E9DED1]">
              <button
                onClick={() => {
                  setSelectedCategory("Bridal Jewellery");
                  scrollToCatalog();
                }}
                className="px-8 py-4 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Explore Bridal Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 rounded-full bg-white hover:bg-[#F2EBE2] border border-[#C6A46A] text-[#29251F] font-semibold text-xs tracking-widest uppercase transition-all active:scale-95 text-center"
              >
                Book Styling Consultation
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          6. THE MASTER CURATED CATALOG GRID (id="curated-catalog")
          Filters, Collections, Search, Sort & Responsive 1:1 Product Grid
          ===================================================================== */}
      <section id="curated-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full scroll-mt-24">
        
        {/* Catalog Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE CURATED VAULT</span>
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] tracking-tight">
            Explore All Creations
          </h2>
          <p className="text-xs sm:text-sm text-[#958878] mt-2 font-light">
            Filter by collection or silhouette to discover your next statement treasure.
          </p>
        </div>

        {/* Collection Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {storeConfig.featuredCollections.map((col) => {
            const isActive = selectedCollection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? "bg-[#29251F] text-[#F5F0E7] shadow-luxury"
                    : "bg-[#FAF7F2] text-[#958878] hover:text-[#29251F] border border-[#E9DED1]"
                }`}
              >
                {col.name}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Category Dropdown, Search Input, Sort Dropdown */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E9DED1] p-3 sm:p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
          
          {/* Left: Category Filter Pills / Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-[#958878] uppercase tracking-wider hidden sm:inline">Silhouette:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-medium bg-white border border-[#E9DED1] rounded-xl px-3 py-2 text-[#29251F] focus:outline-none focus:border-[#C6A46A] w-full sm:w-auto"
            >
              <option value="All">All Silhouettes ({storeConfig.products.length})</option>
              {storeConfig.categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Center: Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#958878] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search jhumka, choker, ring..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#958878] hover:text-[#29251F]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right: Sort By */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-[#958878] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-medium bg-white border border-[#E9DED1] rounded-xl px-3 py-2 text-[#29251F] focus:outline-none focus:border-[#C6A46A] w-full sm:w-auto"
            >
              <option value="featured">Featured Creations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        {/* Dynamic Products Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#958878]">
          <span>
            Showing <strong className="text-[#29251F] font-bold">{filteredProducts.length}</strong> creations
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedCollection !== "all" && ` (${selectedCollection})`}
          </span>

          {(selectedCategory !== "All" || selectedCollection !== "all" || localSearch) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedCollection("all");
                setLocalSearch("");
              }}
              className="text-[#C6A46A] font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid: 2 columns on mobile (grid-cols-2), 3 on tablet, 4 on desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={!!wishlist[product.id]}
                onToggleWishlist={onToggleWishlist}
                onOpenQuickView={onOpenQuickView}
                onAddToBag={onAddToBag}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty Catalog Search / Filter State */
          <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-12 text-center max-w-md mx-auto my-12">
            <Gem className="w-12 h-12 text-[#C6A46A] mx-auto mb-4 stroke-1" />
            <h3 className="font-editorial text-2xl font-normal text-[#29251F] mb-2">No Matching Creations Found</h3>
            <p className="text-xs text-[#958878] mb-6">
              Try refining your search keyword or clearing the filters to view our full collection of royal heirlooms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedCollection("all");
                setLocalSearch("");
              }}
              className="px-6 py-3 rounded-full bg-[#29251F] text-[#F5F0E7] text-xs font-semibold uppercase tracking-wider hover:bg-[#C6A46A] transition-colors"
            >
              View All Creations
            </button>
          </div>
        )}

      </section>

      {/* =====================================================================
          7. THE BRIDAL SUITE SHOWCASE (Regal Wedding Trousseau)
          ===================================================================== */}
      <section className="w-full bg-[#29251F] text-[#F5F0E7] py-16 sm:py-24 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A46A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B08E55]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Bridal Text Content */}
            <div className="lg:col-span-6">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#DFCCA6] flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A46A]" />
                <span>THE BRIDAL SUITE</span>
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight mb-6">
                Made for Your Forever Moments
              </h2>
              <p className="text-xs sm:text-base text-[#FAF7F2]/80 leading-relaxed font-light mb-8 max-w-lg">
                Cascading Polki rani haars, handcrafted matha pattis, bridal naths, and matching chandelier jhumkas. 
                Our bridal specialists work directly with you to curate jewelry that harmonizes with your wedding lehenga.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory("Bridal Jewellery");
                    scrollToCatalog();
                  }}
                  className="px-8 py-4 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-luxury active:scale-95 text-center"
                >
                  Shop Bridal Pieces
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs tracking-widest uppercase transition-all active:scale-95 text-center"
                >
                  Consult Bridal Stylist
                </button>
              </div>
            </div>

            {/* Right Bridal Model Image */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] sm:aspect-[16/10] bg-[#1A1715]">
              <SafeImage
                src="https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&q=85&w=1200"
                alt="Indian Bridal Jewellery Collection"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          8. VERIFIED PATRON TESTIMONIALS (Luxury Customer Trust)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VOICES OF DEVOTION</span>
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] tracking-tight">
            Cherished by Our Patrons
          </h2>
          <p className="text-xs sm:text-sm text-[#958878] mt-2 font-light">
            Real stories from patrons across India who celebrate life's moments in SHRINGAR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {(storeConfig.reviews || []).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-luxury transition-shadow"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#C6A46A]">
                  {[...Array(Number(rev.rating || rev.stars || 5))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#5A5348] leading-relaxed font-light italic mb-6">
                  "{rev.text || rev.comment}"
                </p>
              </div>

              {/* Patron Info */}
              <div className="pt-4 border-t border-[#E9DED1] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#29251F]">{rev.name}</h4>
                  <p className="text-[10px] text-[#958878]">{rev.location || rev.city} • Verified Buyer</p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] font-semibold">
                  Verified Order
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          9. FREQUENTLY ASKED QUESTIONS (FAQ Accordion)
          ===================================================================== */}
      <section className="bg-[#FAF7F2] border-t border-[#E9DED1] py-16 sm:py-20 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENCY & ASSURANCE</span>
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#29251F] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#958878] mt-2 font-light">
              Everything you need to know about our gold micron plating, anti-tarnish warranty, and doorstep dispatch.
            </p>
          </div>

          <div className="space-y-3">
            {(storeConfig.faqs || []).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E9DED1] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#29251F]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#958878] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#C6A46A]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#5A5348] font-light leading-relaxed border-t border-[#F5F0E7] pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-[#958878]">
              Have a distinct question about sizing or custom bridal suites?
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-2 text-xs font-bold text-[#C6A46A] hover:underline uppercase tracking-wider"
            >
              Contact Our Jewellery Concierge →
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
