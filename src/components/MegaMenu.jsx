import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import SafeImage from './SafeImage';

export default function MegaMenu({
  megaMenuData,
  onSelectCategory,
  onClose
}) {
  return (
    <div
      className="absolute top-full left-0 w-full bg-[#FAF7F2] border-b border-[#E9DED1] shadow-2xl z-40 py-8 px-6 lg:px-12 animate-fade-in"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-start">
        
        {/* Categories Column (4 cols) */}
        <div className="col-span-4 border-r border-[#E9DED1] pr-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A46A]">
              ✦ BY CATEGORY
            </span>
          </div>
          <ul className="space-y-3">
            {megaMenuData.categories.map((cat, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    onSelectCategory(cat.filter);
                    onClose();
                  }}
                  className="w-full text-left flex items-center justify-between text-sm font-medium text-[#29251F] hover:text-[#C6A46A] transition-colors group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {cat.name}
                  </span>
                  {cat.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F5F0E7] border border-[#E9DED1] text-[#C6A46A]">
                      {cat.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Collections Column (4 cols) */}
        <div className="col-span-4 border-r border-[#E9DED1] pr-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A46A]">
              ✦ ROYAL COLLECTIONS
            </span>
          </div>
          <ul className="space-y-4">
            {megaMenuData.collections.map((col, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    onSelectCategory(col.filter);
                    onClose();
                  }}
                  className="w-full text-left group"
                >
                  <h5 className="text-sm font-semibold text-[#29251F] group-hover:text-[#C6A46A] transition-colors flex items-center gap-1.5">
                    <span>{col.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h5>
                  <p className="text-xs text-[#958878] mt-0.5 font-light">
                    {col.desc}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Editorial Visual Card (4 cols) */}
        <div className="col-span-4">
          <div
            onClick={() => {
              onSelectCategory(megaMenuData.featuredImage.categoryTarget);
              onClose();
            }}
            className="rounded-2xl overflow-hidden relative aspect-[16/10] bg-[#29251F] cursor-pointer group shadow-luxury border border-[#E9DED1]"
          >
            <SafeImage
              src={megaMenuData.featuredImage.image}
              alt={megaMenuData.featuredImage.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#29251F] via-[#29251F]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#DFCCA6] flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>CURATED LOOKBOOK</span>
              </span>
              <h4 className="font-editorial text-lg text-white font-normal leading-tight">
                {megaMenuData.featuredImage.title}
              </h4>
              <p className="text-[11px] text-[#E9DED1] mt-0.5 line-clamp-1 font-light">
                {megaMenuData.featuredImage.subtitle}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
