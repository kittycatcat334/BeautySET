import React from 'react';
import { MessageCircle, Instagram, Lock, Unlock } from 'lucide-react';
import { BrandConfig } from '../types';

interface FooterProps {
  config: BrandConfig;
  onSelectCategory: (category: string) => void;
  onOpenAdmin: () => void;
  isAdminAuthenticated: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onSelectCategory,
  onOpenAdmin,
  isAdminAuthenticated,
}) => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-[#E8E4DC] pt-14 pb-12 text-[#5A554E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E8E4DC]">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-serif text-2xl font-normal text-[#1C1A17] tracking-[0.15em] block">
              {config.brandName}
            </span>
            <p className="text-xs text-[#736B60] leading-relaxed font-light">
              Artisanal cosmetic and fragrance sets designed for daily self-care rituals. Handcrafted for both men and women.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-[#736B60] hover:text-[#1C1A17] flex items-center gap-1.5 underline transition-colors"
              >
                {isAdminAuthenticated ? (
                  <Unlock className="w-3.5 h-3.5 text-[#256029]" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
                <span>Admin Login · Link WhatsApp & Instagram</span>
              </button>
            </div>
          </div>

          {/* Sets Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1A17] mb-4">
              Curated Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('moisturizer')}
                  className="hover:text-[#1C1A17] transition-colors"
                >
                  Moisturizer Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('perfume')}
                  className="hover:text-[#1C1A17] transition-colors"
                >
                  Extrait Perfume Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('makeup')}
                  className="hover:text-[#1C1A17] transition-colors"
                >
                  Mini Makeup Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('rituals')}
                  className="hover:text-[#1C1A17] transition-colors"
                >
                  Signature Grand Suites
                </button>
              </li>
            </ul>
          </div>

          {/* Gender / Audience */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1A17] mb-4">
              Formulated For
            </h4>
            <ul className="space-y-2.5 text-xs text-[#736B60]">
              <li>Unisex Barrier Care</li>
              <li>Men’s Grooming & Calming Sets</li>
              <li>Women’s Dew Glow Sets</li>
              <li>Gift Ready Keepsake Packaging</li>
            </ul>
          </div>

          {/* Direct Order Channels */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1A17] mb-4">
              Order Channels
            </h4>
            <p className="text-xs text-[#736B60] mb-4 leading-relaxed font-light">
              Connect directly with our concierge team to place orders, request customized gift boxes, or inquire about stock.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#1C1A17] hover:underline"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {config.whatsappNumber}</span>
              </a>

              <a
                href={`https://instagram.com/${config.instagramHandle.replace(/^@/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#1C1A17] hover:underline"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>Instagram: @{config.instagramHandle.replace(/^@/, '')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8477]">
          <div>
            © {new Date().getFullYear()} {config.brandName} Cosmetics. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Clean Formulations</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Shipping</span>
            <span aria-hidden="true">·</span>
            <span>Cruelty-Free Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
