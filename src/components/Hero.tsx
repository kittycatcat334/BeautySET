import React from 'react';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { BrandConfig } from '../types';

interface HeroProps {
  onScrollToCatalog: () => void;
  config: BrandConfig;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, config }) => {
  const handleQuickWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello ${config.brandName}! ✨ I would like to order one of your cosmetic sets. Can you share today's available stock?`
    );
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative pt-6 pb-16 md:py-20 overflow-hidden border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#736B60] font-medium">
              <span>Pure Ingredients</span>
              <span aria-hidden="true">·</span>
              <span>Sets For Him & Her</span>
              <span aria-hidden="true">·</span>
              <span>Express Dispatch</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#1C1A17] tracking-tight leading-[1.08] [text-wrap:balance]">
              Simplistic luxury sets for skin, scent, & ritual.
            </h1>

            <p className="text-base sm:text-lg text-[#5A554E] leading-relaxed max-w-xl font-light">
              Carefully curated moisturizer sets, niche perfume trios, and mini makeup essentials. Formulated without compromise for both men and women who appreciate quiet elegance.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3.5 bg-[#1C1A17] text-[#FAF9F5] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#33302B] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <span>View The Sets</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleQuickWhatsAppInquiry}
                className="px-6 py-3.5 bg-[#FAF9F5] text-[#1C1A17] border border-[#1C1A17] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#EFECE4] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Proof Points */}
            <div className="pt-6 border-t border-[#E8E4DC] grid grid-cols-3 gap-4 text-xs text-[#736B60]">
              <div>
                <p className="font-semibold text-[#1C1A17]">100% Clean</p>
                <p className="text-[11px] mt-0.5">Cruelty-free botanical formulas</p>
              </div>
              <div>
                <p className="font-semibold text-[#1C1A17]">Dual Formulations</p>
                <p className="text-[11px] mt-0.5">Engineered for men & women</p>
              </div>
              <div>
                <p className="font-semibold text-[#1C1A17]">Direct Ordering</p>
                <p className="text-[11px] mt-0.5">Instant WhatsApp & Instagram DMs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[#EAE6DD] border border-[#E0DACE]">
              <img
                src="/src/assets/images/hero_cosmetics_sets_1791218824109.jpg"
                alt="ÉPURE luxury cosmetic sets, perfume flacons, and moisturizer packaging"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                onError={(e) => {
                  // Fallback container in case image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'p-8', 'text-center');
                    parent.innerHTML = '<div class="space-y-2"><p class="font-serif text-2xl text-[#1C1A17]">ÉPURE Sets Collection</p><p class="text-xs text-[#736B60]">Artisanal Skincare & Fragrance</p></div>';
                  }
                }}
              />
              <div className="absolute bottom-4 left-4 bg-[#FAF9F5]/90 backdrop-blur-sm px-3.5 py-1.5 border border-[#E0DACE] text-[11px] tracking-wider uppercase text-[#1C1A17]">
                Featured · Signature Collection
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
