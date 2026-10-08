import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, ArrowDown, Sparkles, SunMedium, Flame, MoonStar } from 'lucide-react';
import { BrandConfig } from '../types';
import heroSetsImg from '../assets/images/hero_cosmetics_sets_1791218824109.jpg';

interface HeroProps {
  onScrollToCatalog: () => void;
  config: BrandConfig;
}

type GlowMood = 'champagne' | 'amber' | 'pearl';

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, config }) => {
  const [mood, setMood] = useState<GlowMood>('champagne');
  const [interactive3D, setInteractive3D] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, relX: 0, relY: 0 });
  const headingRef = useRef<HTMLDivElement>(null);

  const handleQuickWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello ${config.brandName}! ✨ I would like to order one of your cosmetic sets. Can you share today's available stock?`
    );
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, '_blank');
  };

  // Mouse move handler for dynamic 3D light & tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!headingRef.current || !interactive3D) return;
    const rect = headingRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // Normalized relative offset (-1 to 1)
    const relX = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
    const relY = Math.max(-1, Math.min(1, dy / (rect.height / 2)));

    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      relX,
      relY,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, relX: 0, relY: 0 });
  };

  // Dynamic 3D shadow and glow styles based on mood & mouse interaction
  const getDynamicStyles = () => {
    const tiltX = -mousePos.relY * 7; // deg
    const tiltY = mousePos.relX * 7; // deg
    const shadowOffsetX = -mousePos.relX * 6;
    const shadowOffsetY = -mousePos.relY * 6 + 2;

    const moodGlowColors = {
      champagne: {
        chisel: '#cfbda2',
        deep: 'rgba(60, 45, 30, 0.3)',
        halo: 'rgba(230, 195, 130, 0.55)',
        wide: 'rgba(245, 215, 160, 0.4)',
        auraBg: 'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 195, 130, 0.35), transparent 70%)',
      },
      amber: {
        chisel: '#c28854',
        deep: 'rgba(50, 25, 10, 0.35)',
        halo: 'rgba(235, 140, 60, 0.55)',
        wide: 'rgba(250, 180, 100, 0.4)',
        auraBg: 'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(240, 150, 80, 0.38), transparent 70%)',
      },
      pearl: {
        chisel: '#ded7cd',
        deep: 'rgba(70, 70, 70, 0.25)',
        halo: 'rgba(230, 230, 245, 0.7)',
        wide: 'rgba(215, 215, 235, 0.45)',
        auraBg: 'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(220, 220, 240, 0.38), transparent 70%)',
      },
    };

    const currentGlow = moodGlowColors[mood];

    const dynamicTextShadow = interactive3D && (mousePos.relX !== 0 || mousePos.relY !== 0)
      ? `
          0 -1px 1px rgba(255, 255, 255, 0.95),
          ${shadowOffsetX * 0.4}px ${shadowOffsetY * 0.4}px 0 ${currentGlow.chisel},
          ${shadowOffsetX * 0.8}px ${shadowOffsetY * 0.8}px 1px ${currentGlow.chisel},
          ${shadowOffsetX}px ${shadowOffsetY}px 3px ${currentGlow.deep},
          ${shadowOffsetX * 1.5}px ${shadowOffsetY * 1.5}px 15px ${currentGlow.halo},
          0 0 35px ${currentGlow.halo},
          0 0 70px ${currentGlow.wide}
        `
      : undefined;

    return {
      transform: interactive3D
        ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
        : undefined,
      textShadow: dynamicTextShadow,
      transition: mousePos.relX === 0 && mousePos.relY === 0 ? 'transform 0.5s ease-out, text-shadow 0.5s ease-out' : 'none',
      currentGlow,
    };
  };

  const dynamicStyles = getDynamicStyles();

  return (
    <section className="relative pt-6 pb-16 md:py-20 overflow-hidden border-b border-[#E8E4DC] bg-gradient-to-b from-[#FAF9F5] via-[#F8F6F0] to-[#FAF9F5]">
      {/* Subtle Ambient Backlight Glow */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-40 transition-all duration-700 -z-0"
        style={{
          background:
            mood === 'champagne'
              ? 'radial-gradient(circle, rgba(235, 205, 140, 0.45) 0%, transparent 70%)'
              : mood === 'amber'
              ? 'radial-gradient(circle, rgba(245, 160, 90, 0.45) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(225, 225, 245, 0.55) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & 3D Glow Experience */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Kicker & Mood Lighting Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#736B60] font-medium">
                <span>Pure Ingredients</span>
                <span aria-hidden="true">·</span>
                <span>Sets For Him & Her</span>
                <span aria-hidden="true">·</span>
                <span>Express Dispatch</span>
              </div>

              {/* 3D Glow Atmosphere Selector */}
              <div className="inline-flex items-center gap-1 p-1 bg-[#EFECE4] border border-[#DDD7CC] rounded-full text-[11px]">
                <button
                  onClick={() => setMood('champagne')}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
                    mood === 'champagne'
                      ? 'bg-white text-[#1C1A17] font-semibold shadow-xs'
                      : 'text-[#736B60] hover:text-[#1C1A17]'
                  }`}
                  title="Champagne Golden 3D Glow"
                >
                  <SunMedium className="w-3 h-3 text-[#D4AF37]" />
                  <span>Champagne</span>
                </button>
                <button
                  onClick={() => setMood('amber')}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
                    mood === 'amber'
                      ? 'bg-white text-[#1C1A17] font-semibold shadow-xs'
                      : 'text-[#736B60] hover:text-[#1C1A17]'
                  }`}
                  title="Warm Amber 3D Glow"
                >
                  <Flame className="w-3 h-3 text-[#E65100]" />
                  <span>Amber</span>
                </button>
                <button
                  onClick={() => setMood('pearl')}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
                    mood === 'pearl'
                      ? 'bg-white text-[#1C1A17] font-semibold shadow-xs'
                      : 'text-[#736B60] hover:text-[#1C1A17]'
                  }`}
                  title="Luminous Pearl 3D Glow"
                >
                  <MoonStar className="w-3 h-3 text-[#5C6BC0]" />
                  <span>Pearl</span>
                </button>
              </div>
            </div>

            {/* 3D Glowing Hero Headline Container */}
            <div
              ref={headingRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative py-2 select-none perspective-1000 cursor-default"
            >
              {/* Dynamic Aura Spotlight following cursor behind text */}
              {interactive3D && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 blur-2xl -z-10"
                  style={{
                    opacity: mousePos.relX !== 0 || mousePos.relY !== 0 ? 0.9 : 0.45,
                    background: `radial-gradient(circle 240px at ${mousePos.x || '50%'} ${mousePos.y || '50%'}, ${
                      mood === 'champagne'
                        ? 'rgba(235, 195, 130, 0.45)'
                        : mood === 'amber'
                        ? 'rgba(240, 150, 70, 0.45)'
                        : 'rgba(220, 220, 245, 0.5)'
                    }, transparent 70%)`,
                  }}
                />
              )}

              <h1
                style={{
                  transform: dynamicStyles.transform,
                  textShadow: dynamicStyles.textShadow,
                  transition: dynamicStyles.transition,
                }}
                className={`text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#1C1A17] tracking-tight leading-[1.08] [text-wrap:balance] transition-all duration-300 ${
                  !dynamicStyles.textShadow
                    ? mood === 'champagne'
                      ? 'glow-3d-champagne'
                      : mood === 'amber'
                      ? 'glow-3d-amber'
                      : 'glow-3d-pearl'
                    : ''
                }`}
              >
                Simplistic luxury sets for{' '}
                <span className="text-shimmer-gold inline-block font-medium drop-shadow-sm">
                  skin, scent, & ritual.
                </span>
              </h1>

              {/* Interactive micro prompt */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#8C8477]">
                <span className="flex items-center gap-1.5 font-light">
                  <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
                  <span>Move cursor over heading for dynamic 3D lighting</span>
                </span>
                <button
                  type="button"
                  onClick={() => setInteractive3D(!interactive3D)}
                  className="hover:text-[#1C1A17] transition-colors underline text-[10px] uppercase tracking-wider"
                >
                  {interactive3D ? 'Lock Light' : 'Enable 3D Motion'}
                </button>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#5A554E] leading-relaxed max-w-xl font-light">
              Carefully curated moisturizer sets, niche perfume trios, and mini makeup essentials. Formulated without compromise for both men and women who appreciate quiet elegance.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3.5 bg-[#1C1A17] text-[#FAF9F5] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#33302B] hover:shadow-lg transition-all rounded-sm flex items-center justify-center gap-2 group"
              >
                <span>View The Sets</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={handleQuickWhatsAppInquiry}
                className="px-6 py-3.5 bg-[#FAF9F5] text-[#1C1A17] border border-[#1C1A17] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#EFECE4] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-xs"
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
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[#EAE6DD] border border-[#E0DACE] shadow-sm">
              <img
                src={heroSetsImg}
                alt="ÉPURE luxury cosmetic sets, perfume flacons, and moisturizer packaging"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'p-8', 'text-center');
                    parent.innerHTML = '<div class="space-y-2"><p class="font-serif text-2xl text-[#1C1A17]">ÉPURE Sets Collection</p><p class="text-xs text-[#736B60]">Artisanal Skincare & Fragrance</p></div>';
                  }
                }}
              />
              <div className="absolute bottom-4 left-4 bg-[#FAF9F5]/90 backdrop-blur-sm px-3.5 py-1.5 border border-[#E0DACE] text-[11px] tracking-wider uppercase text-[#1C1A17] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Featured · Signature Collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
