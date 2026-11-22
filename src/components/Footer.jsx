import React, { useState } from 'react';
import { Sparkles, Phone, ArrowRight, ShieldCheck, Mail, MapPin } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer({ storeConfig, onNavigate, onSelectCategory, onShowToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      onShowToast("Please enter a valid email address");
      return;
    }
    onShowToast("✨ Welcome to the SHRINGAR Royal Circle! Lookbook dispatched to your inbox.");
    setNewsletterEmail("");
  };

  const handleCategoryClick = (categoryName) => {
    onSelectCategory(categoryName);
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById("curated-catalog");
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#29251F] text-[#F5F0E7] pt-16 sm:pt-20 pb-24 sm:pb-14 border-t border-[#3D3830] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip */}
        <div className="pb-12 mb-12 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ROYAL PRIVÉ CIRCLE</span>
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
              Receive Invitations to Private Archival Edits
            </h3>
            <p className="text-xs text-[#FAF7F2]/70 mt-1 font-light">
              Subscribers receive early access to festive suites, private vault previews, and heritage craftsmanship stories.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md ml-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#958878] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-full text-xs bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#C6A46A] focus:bg-white/15"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 4-Column Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Story & Concierge (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="font-editorial text-3xl font-semibold tracking-widest text-[#F5F0E7]">
                {storeConfig.brandName}
              </span>
              <span className="text-[#C6A46A] text-lg">✦</span>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-light mb-6 max-w-sm">
              {storeConfig.footer?.story || "Handcrafting 18K gold-plated, anti-tarnish fine heritage jewellery inspired by the grand royal dynasties of India."}
            </p>

            {/* WhatsApp Concierge Box */}
            <div className="inline-flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#1B4332] flex items-center justify-center text-white flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h6 className="text-xs font-bold text-white">Private Jewellery Concierge</h6>
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20SHRINGAR%20Team!%20I%20would%20like%20assistance%20with%20an%20order.`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-emerald-400 hover:underline font-semibold"
                >
                  Chat on WhatsApp (+{storeConfig.whatsappNumber})
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation & Sections (2 cols) */}
          <div className="lg:col-span-2">
            <h5 className="text-xs uppercase tracking-widest text-[#DFCCA6] font-bold mb-4">
              ✦ Navigation
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/70 font-light">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#DFCCA6] transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById("curated-catalog");
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-[#DFCCA6] transition-colors text-left"
                >
                  Curated Heirlooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('wishlist');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#DFCCA6] transition-colors text-left"
                >
                  Wishlist (Private Vault)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('cart');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#DFCCA6] transition-colors text-left"
                >
                  Shopping Bag & Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#DFCCA6] transition-colors text-left"
                >
                  Contact Us & Salons
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories (2 cols) */}
          <div className="lg:col-span-2">
            <h5 className="text-xs uppercase tracking-widest text-[#DFCCA6] font-bold mb-4">
              ✦ Curated Categories
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/70 font-light">
              {storeConfig.categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-[#DFCCA6] transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Flagship Salons (3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="text-xs uppercase tracking-widest text-[#DFCCA6] font-bold mb-4">
              ✦ Flagship Boutiques
            </h5>
            <div className="space-y-3 text-xs text-[#FAF7F2]/80 font-light">
              {storeConfig.boutiques.map((b, i) => (
                <div key={i} className="border-l border-[#C6A46A]/40 pl-2.5">
                  <p className="font-semibold text-white">{b.city} — {b.salon}</p>
                  <p className="text-[11px] text-[#FAF7F2]/60 mt-0.5 truncate">{b.address}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 flex items-center gap-2 text-xs text-[#FAF7F2]/80">
              <InstagramIcon className="w-4 h-4 text-[#C6A46A]" />
              <span>Follow: <strong className="text-white">{storeConfig.footer?.instagramHandle || "@shringar.jewels"}</strong></span>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Clean Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} {storeConfig.brandName} Fine Heritage & Contemporary Jewellery. All rights reserved.</p>
          
          <a
            href={storeConfig.footer?.agencyUrl || "https://buildwithus-agency.vercel.app/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C6A46A]/50 text-white/80 hover:text-white text-[11px] transition-all group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A46A] group-hover:rotate-12 transition-transform" />
            <span>Developed by <strong className="text-[#DFCCA6] group-hover:underline font-bold">{storeConfig.footer?.craftedBy || "buildwithuss agency"}</strong></span>
          </a>
        </div>

      </div>
    </footer>
  );
}
