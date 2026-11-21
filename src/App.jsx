import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

// Central Luxury Store Configuration & Master Database
import { STORE_CONFIG } from './data/storeConfig';

// Core UI Components
import Header from './components/Header';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

// Four Main Customer-Facing Sections
import HomeView from './views/HomeView';
import WishlistView from './views/WishlistView';
import CartView from './views/CartView';
import ContactView from './views/ContactView';

export default function App() {
  // Navigation State strictly across the 4 main sections:
  // 'home' | 'wishlist' | 'cart' | 'contact'
  const [currentView, setCurrentView] = useState('home');
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Drawers & Modals
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Wishlist State (keyed by product ID)
  const [wishlist, setWishlist] = useState({
    "prod-1": true,
    "prod-4": true
  });

  // Cart State (initialized with 1 flagship piece for immediate luxury testing)
  const [cart, setCart] = useState(() => {
    const flagship = STORE_CONFIG.products[0];
    return [
      {
        ...flagship,
        cartItemId: `${flagship.id}-${flagship.sizes[0]}`,
        selectedSize: flagship.sizes[0],
        quantity: 1
      }
    ];
  });

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Scroll to top on view changes
  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Wishlist Toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = { ...prev, [productId]: !prev[productId] };
      const product = STORE_CONFIG.products.find((p) => p.id === productId);
      const title = product ? product.title : "Piece";
      showToast(next[productId] ? `❤️ Saved "${title}" to your private vault` : `Removed from vault`);
      return next;
    });
  };

  const wishlistCount = useMemo(() => {
    return Object.values(wishlist).filter(Boolean).length;
  }, [wishlist]);

  // Cart Operations
  const handleAddToBag = (product, sizeChoice = null) => {
    const size = sizeChoice || product.sizes[0] || "One Size";
    const cartItemId = `${product.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId || (item.id === product.id && item.selectedSize === size));
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId || (item.id === product.id && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartItemId,
          selectedSize: size,
          quantity: 1
        }
      ];
    });

    showToast(`✨ Added "${product.title}" (${size}) to Bag!`);
  };

  const handleUpdateCartQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          const match = item.cartItemId === cartItemId || `${item.id}-${item.selectedSize}` === cartItemId;
          if (match) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (cartItemId, title) => {
    setCart((prev) => prev.filter((item) => (item.cartItemId || `${item.id}-${item.selectedSize}`) !== cartItemId));
    showToast(`Removed "${title}" from bag`);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const isFreeShipping = cartSubtotal >= STORE_CONFIG.freeShippingThreshold;
  const shippingCharge = cart.length === 0 ? 0 : isFreeShipping ? 0 : STORE_CONFIG.shippingCharge;
  const grandTotal = cartSubtotal + shippingCharge;

  // Direct 1-Click WhatsApp Order Builder
  const handleOpenWhatsAppDirect = () => {
    if (cart.length === 0) {
      showToast("⚠️ Your bag is empty. Please select a piece first!");
      return;
    }

    const orderId = `SHR-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}*\n   • Size: ${item.selectedSize}\n   • Qty: ${item.quantity}\n   • Price: ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    const message = `👑 *ORDER REQUEST: ${STORE_CONFIG.brandName}*
Reference: #${orderId}
━━━━━━━━━━━━━━━━━━━━
📦 *PIECES IN BAG:*
${itemsText}

💰 *TOTAL PAYABLE: ₹${grandTotal.toLocaleString("en-IN")}*
• Shipping: ${isFreeShipping ? "FREE Insured Air" : `₹${STORE_CONFIG.shippingCharge}`}

━━━━━━━━━━━━━━━━━━━━
Please confirm my order details and initiate express dispatch! 🙏`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, "_blank");
    showToast("Launching WhatsApp with your order receipt! ✨");
  };

  // Lock body scroll when drawers or modals are active
  useEffect(() => {
    if (isBagOpen || isWishlistOpen || quickViewProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBagOpen, isWishlistOpen, quickViewProduct]);

  return (
    <div className="min-h-screen bg-[#F5F0E7] text-[#29251F] font-sans antialiased selection:bg-[#E9DED1] selection:text-[#29251F] flex flex-col justify-between">
      
      {/* Shared Luxury Header with 4 Sections */}
      <Header
        storeConfig={STORE_CONFIG}
        currentView={currentView}
        onNavigate={handleNavigate}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlistCount={wishlistCount}
        cartCount={totalItemsCount}
        cartSubtotal={cartSubtotal}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Dynamic View Router (Exclusively the 4 Main Sections) */}
      <main className="flex-1 flex flex-col w-full">
        {currentView === 'home' && (
          <HomeView
            storeConfig={STORE_CONFIG}
            onNavigate={handleNavigate}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onAddToBag={handleAddToBag}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onSelectProduct={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === 'wishlist' && (
          <WishlistView
            wishlist={wishlist}
            products={STORE_CONFIG.products}
            onToggleWishlist={toggleWishlist}
            onMoveToBag={(item) => handleAddToBag(item)}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'cart' && (
          <CartView
            cart={cart}
            storeConfig={STORE_CONFIG}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            storeConfig={STORE_CONFIG}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Shared Luxury Footer */}
      <Footer
        storeConfig={STORE_CONFIG}
        onNavigate={handleNavigate}
        onSelectCategory={setActiveCategory}
        onShowToast={showToast}
      />

      {/* Quick View Modal (Handles in-place product inspection on Home) */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToBag={handleAddToBag}
          onToggleWishlist={toggleWishlist}
          isWishlisted={!!wishlist[quickViewProduct.id]}
          onViewFullPDP={(p) => setQuickViewProduct(p)}
        />
      )}

      {/* Cart Drawer (Quick slide-over) */}
      <CartDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onNavigateToCheckout={() => {
          setIsBagOpen(false);
          handleNavigate('cart');
        }}
        storeConfig={STORE_CONFIG}
        onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
      />

      {/* Wishlist Drawer (Quick slide-over) */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        products={STORE_CONFIG.products}
        onToggleWishlist={toggleWishlist}
        onMoveToBag={(item) => handleAddToBag(item)}
        onOpenQuickView={(item) => setQuickViewProduct(item)}
      />

      {/* Mobile Sticky Bottom Floating Bag Bar (md:hidden) */}
      {totalItemsCount > 0 && currentView !== 'cart' && (
        <div className="md:hidden fixed bottom-3 inset-x-3 z-40 animate-slide-up">
          <div className="glass-modal bg-[#FAF7F2]/96 rounded-2xl border border-[#E9DED1] p-3 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#C6A46A] flex items-center justify-center text-white shadow">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 bg-[#29251F] text-[#F5F0E7] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-[#958878] uppercase tracking-wider font-semibold">
                  Bag ({totalItemsCount} pieces)
                </p>
                <p className="text-base font-bold text-[#29251F] leading-tight font-editorial">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('cart')}
              className="px-5 py-2.5 rounded-xl bg-[#29251F] text-[#F5F0E7] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-all shadow-md"
            >
              <span>View Bag</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFCCA6]" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 animate-fade-in">
          <div className="glass-modal border border-[#E9DED1] text-[#29251F] text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-luxury flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C6A46A] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
