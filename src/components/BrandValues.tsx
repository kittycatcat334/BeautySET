import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export const BrandValues: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#F4F1EA] border-t border-b border-[#E4DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#736B60] font-medium block">
            Our Formulation Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] mt-1.5 [text-wrap:balance] glow-3d-champagne">
            Simplicity is the <span className="text-shimmer-gold inline-block">ultimate expression of luxury.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#EAE5DA] flex items-center justify-center text-[#1C1A17]">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1A17]">Formulated for Him & Her</h3>
            <p className="text-xs text-[#5A554E] leading-relaxed font-light">
              Skin biology is universal. We craft weightless, non-pore-clogging hydration textures and unisex fragrance extraits that feel natural and elevate everyone.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#EAE5DA] flex items-center justify-center text-[#1C1A17]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1A17]">Clean Active Botanicals</h3>
            <p className="text-xs text-[#5A554E] leading-relaxed font-light">
              Cold-pressed squalane, plant ceramides, damask rose water, and pure extrait perfume oils. Completely free from parabens, phthalates, and synthetic fillers.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#EAE5DA] flex items-center justify-center text-[#1C1A17]">
              <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1A17]">Direct Concierge Ordering</h3>
            <p className="text-xs text-[#5A554E] leading-relaxed font-light">
              Skip rigid checkouts. Speak directly to our founders via WhatsApp or Instagram to confirm skin suitability, customize gift boxes, and receive tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
