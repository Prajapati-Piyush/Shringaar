import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, X, Sparkles, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function CatalogView({
  storeConfig,
  activeCategory,
  onSelectCategory,
  onOpenQuickView,
  onAddToBag,
  onToggleWishlist,
  wishlist,
  searchQuery,
  onClearSearch,
  onSelectProduct
}) {
  // Filter States
  const [priceFilter, setPriceFilter] = useState("all");
  const [metalFilter, setMetalFilter] = useState("all");
  const [occasionFilter, setOccasionFilter] = useState("all");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available Metals & Occasions from products
  const metals = useMemo(() => {
    return Array.from(new Set(storeConfig.products.map((p) => p.metal))).filter(Boolean);
  }, [storeConfig.products]);

  const occasions = useMemo(() => {
    return Array.from(new Set(storeConfig.products.map((p) => p.occasion))).filter(Boolean);
  }, [storeConfig.products]);

  const collections = useMemo(() => {
    return Array.from(new Set(storeConfig.products.map((p) => p.collection))).filter(Boolean);
  }, [storeConfig.products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let list = [...storeConfig.products];

    // Category Filter
    if (activeCategory === "Under ₹999") {
      list = list.filter((p) => p.price <= 999);
    } else if (activeCategory !== "All Jewellery") {
      list = list.filter((p) =>
        p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        activeCategory.toLowerCase().includes(p.category.toLowerCase())
      );
    }

    // Price Filter
    if (priceFilter === "under-999") {
      list = list.filter((p) => p.price < 999);
    } else if (priceFilter === "1000-1999") {
      list = list.filter((p) => p.price >= 1000 && p.price <= 1999);
    } else if (priceFilter === "above-2000") {
      list = list.filter((p) => p.price >= 2000);
    }

    // Metal Filter
    if (metalFilter !== "all") {
      list = list.filter((p) => p.metal === metalFilter);
    }

    // Occasion Filter
    if (occasionFilter !== "all") {
      list = list.filter((p) => p.occasion === occasionFilter);
    }

    // Collection Filter
    if (collectionFilter !== "all") {
      list = list.filter((p) => p.collection === collectionFilter);
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "top-rated") {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [storeConfig.products, activeCategory, priceFilter, metalFilter, occasionFilter, collectionFilter, searchQuery, sortBy]);

  const activeFiltersCount = (priceFilter !== "all" ? 1 : 0) +
    (metalFilter !== "all" ? 1 : 0) +
    (occasionFilter !== "all" ? 1 : 0) +
    (collectionFilter !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetAllFilters = () => {
    setPriceFilter("all");
    setMetalFilter("all");
    setOccasionFilter("all");
    setCollectionFilter("all");
    onClearSearch();
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#958878] mb-4 flex items-center gap-1.5">
        <button onClick={() => onSelectCategory("All Jewellery")} className="hover:text-[#29251F]">
          Home
        </button>
        <span>›</span>
        <span>Catalog</span>
        <span>›</span>
        <span className="font-semibold text-[#29251F]">{activeCategory}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-10 mb-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] block mb-1">
            ✦ HAUTE JOAILLERIE ARCHIVE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F]">
            {activeCategory}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5348] mt-2 font-light leading-relaxed">
            Every piece is electro-dipped in 18K antique temple gold, sealed with our signature anti-tarnish protective lacquer, and hallmarked for lifetime grace.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#C6A46A]/10 to-transparent pointer-events-none" />
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[#E9DED1] gap-4">
        
        {/* Left: Active piece count + Mobile Filter Button */}
        <div className="flex items-center justify-between lg:justify-start gap-4">
          <p className="text-xs text-[#958878] font-medium">
            Showing <strong className="text-[#29251F]">{filteredProducts.length}</strong> creations
          </p>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 rounded-full bg-[#FAF7F2] border border-[#E9DED1] text-xs font-semibold text-[#29251F] flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5 text-[#C6A46A]" />
            <span>Filters ({activeFiltersCount})</span>
          </button>
        </div>

        {/* Center: Desktop Quick Filter Dropdowns */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Price Filter */}
          <div className="relative">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="appearance-none bg-[#FAF7F2] border border-[#E9DED1] rounded-full pl-3.5 pr-8 py-1.5 text-xs font-medium text-[#29251F] focus:outline-none focus:border-[#C6A46A] cursor-pointer"
            >
              <option value="all">Price: All</option>
              <option value="under-999">Under ₹999</option>
              <option value="1000-1999">₹1,000 – ₹1,999</option>
              <option value="above-2000">₹2,000 & Above</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#958878] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Metal Filter */}
          <div className="relative">
            <select
              value={metalFilter}
              onChange={(e) => setMetalFilter(e.target.value)}
              className="appearance-none bg-[#FAF7F2] border border-[#E9DED1] rounded-full pl-3.5 pr-8 py-1.5 text-xs font-medium text-[#29251F] focus:outline-none focus:border-[#C6A46A] cursor-pointer"
            >
              <option value="all">Metal: All</option>
              {metals.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-[#958878] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Occasion Filter */}
          <div className="relative">
            <select
              value={occasionFilter}
              onChange={(e) => setOccasionFilter(e.target.value)}
              className="appearance-none bg-[#FAF7F2] border border-[#E9DED1] rounded-full pl-3.5 pr-8 py-1.5 text-xs font-medium text-[#29251F] focus:outline-none focus:border-[#C6A46A] cursor-pointer"
            >
              <option value="all">Occasion: All</option>
              {occasions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-[#958878] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Collection Filter */}
          <div className="relative">
            <select
              value={collectionFilter}
              onChange={(e) => setCollectionFilter(e.target.value)}
              className="appearance-none bg-[#FAF7F2] border border-[#E9DED1] rounded-full pl-3.5 pr-8 py-1.5 text-xs font-medium text-[#29251F] focus:outline-none focus:border-[#C6A46A] cursor-pointer"
            >
              <option value="all">Collection: All</option>
              {collections.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-[#958878] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-[#C6A46A] hover:underline px-2"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Right: Sort Selector */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-[#958878] font-medium hidden sm:inline">Sort:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#FAF7F2] border border-[#E9DED1] rounded-full pl-4 pr-9 py-2 text-xs font-semibold text-[#29251F] focus:outline-none focus:border-[#C6A46A] cursor-pointer"
            >
              <option value="featured">Featured Pieces</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="top-rated">Top Rated & Loved</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#958878] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-[#958878]">Active Filters:</span>
          {priceFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white border border-[#E9DED1] text-[#29251F]">
              <span>Price: {priceFilter}</span>
              <button onClick={() => setPriceFilter("all")}><X className="w-3 h-3 text-[#958878]" /></button>
            </span>
          )}
          {metalFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white border border-[#E9DED1] text-[#29251F]">
              <span>Metal: {metalFilter}</span>
              <button onClick={() => setMetalFilter("all")}><X className="w-3 h-3 text-[#958878]" /></button>
            </span>
          )}
          {occasionFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white border border-[#E9DED1] text-[#29251F]">
              <span>Occasion: {occasionFilter}</span>
              <button onClick={() => setOccasionFilter("all")}><X className="w-3 h-3 text-[#958878]" /></button>
            </span>
          )}
          {collectionFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white border border-[#E9DED1] text-[#29251F]">
              <span>Collection: {collectionFilter}</span>
              <button onClick={() => setCollectionFilter("all")}><X className="w-3 h-3 text-[#958878]" /></button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white border border-[#E9DED1] text-[#29251F]">
              <span>Search: "{searchQuery}"</span>
              <button onClick={onClearSearch}><X className="w-3 h-3 text-[#958878]" /></button>
            </span>
          )}
          <button
            onClick={resetAllFilters}
            className="text-xs text-[#C6A46A] underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-8">
          <p className="font-editorial text-3xl text-[#29251F] mb-2">No matching pieces discovered</p>
          <p className="text-xs sm:text-sm text-[#5A5348] max-w-sm mx-auto mb-6">
            Try adjusting your price or metal filter to explore our royal archive.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-6 py-2.5 rounded-full bg-[#C6A46A] text-white text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onAddToBag={onAddToBag}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={!!wishlist[product.id]}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-[#29251F]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl z-10 flex flex-col justify-between border-l border-[#E9DED1] p-6 animate-slide-up">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DED1] mb-6">
                <h4 className="font-editorial text-xl text-[#29251F]">Refine Collection</h4>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-[#958878]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter Options */}
              <div className="mb-6">
                <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                  Price Tier
                </label>
                <div className="space-y-1.5 text-xs text-[#29251F]">
                  {[
                    { label: "All Prices", value: "all" },
                    { label: "Under ₹999", value: "under-999" },
                    { label: "₹1,000 – ₹1,999", value: "1000-1999" },
                    { label: "₹2,000 & Above", value: "above-2000" }
                  ].map((p) => (
                    <label key={p.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobilePrice"
                        checked={priceFilter === p.value}
                        onChange={() => setPriceFilter(p.value)}
                        className="accent-[#C6A46A]"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Metal Filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                  Metal Plating
                </label>
                <select
                  value={metalFilter}
                  onChange={(e) => setMetalFilter(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#E9DED1] bg-white text-xs text-[#29251F]"
                >
                  <option value="all">All Metals</option>
                  {metals.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Occasion Filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                  Occasion
                </label>
                <select
                  value={occasionFilter}
                  onChange={(e) => setOccasionFilter(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#E9DED1] bg-white text-xs text-[#29251F]"
                >
                  <option value="all">All Occasions</option>
                  {occasions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9DED1] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#29251F] text-white text-xs font-semibold uppercase tracking-widest shadow"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={resetAllFilters}
                className="w-full py-2 text-xs text-[#C6A46A] font-semibold"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
