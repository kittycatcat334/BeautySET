import React from 'react';
import { ShoppingBag, MessageCircle, Lock, Unlock } from 'lucide-react';
import { BrandConfig, CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  onOpenAdmin: () => void;
  isAdminAuthenticated: boolean;
  config: BrandConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onSelectCategory,
  onOpenAdmin,
  isAdminAuthenticated,
  config,
}) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ${config.brandName}! ✨ I'm visiting your online boutique and would like to inquire about ordering your curated sets.`
    );
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E8E4DC] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-serif tracking-[0.22em] font-medium text-[#1C1A17] hover:opacity-90 transition-all glow-3d-champagne"
        >
          {config.brandName}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-[#5A554E]">
          <button
            onClick={() => onSelectCategory('all')}
            className="hover:text-[#1C1A17] transition-colors"
          >
            All Sets
          </button>
          <button
            onClick={() => onSelectCategory('moisturizer')}
            className="hover:text-[#1C1A17] transition-colors"
          >
            Moisturizers
          </button>
          <button
            onClick={() => onSelectCategory('perfume')}
            className="hover:text-[#1C1A17] transition-colors"
          >
            Perfumes
          </button>
          <button
            onClick={() => onSelectCategory('makeup')}
            className="hover:text-[#1C1A17] transition-colors"
          >
            Mini Makeup
          </button>
          <button
            onClick={onOpenAdmin}
            className={`transition-colors flex items-center gap-1.5 ${
              isAdminAuthenticated ? 'text-[#1C1A17] font-semibold' : 'hover:text-[#1C1A17]'
            }`}
          >
            {isAdminAuthenticated ? (
              <Unlock className="w-3.5 h-3.5 text-[#256029]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#736B60]" />
            )}
            <span>Admin</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleWhatsAppDirect}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium tracking-wide uppercase text-[#1C1A17] bg-[#EFECE4] hover:bg-[#E5E0D5] border border-[#DDD7CC] transition-colors rounded-sm"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Order on WhatsApp</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-[#1C1A17] hover:text-[#5A554E] transition-colors rounded-sm"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1C1A17] text-[#FAF9F5] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAdmin}
            className={`p-2 transition-colors rounded-sm flex items-center gap-1 text-xs uppercase tracking-wider font-medium md:hidden ${
              isAdminAuthenticated ? 'text-[#1C1A17] bg-[#EFECE4]' : 'text-[#7C756B] hover:text-[#1C1A17]'
            }`}
            title="Admin Login & Link WhatsApp/Instagram"
            aria-label="Admin Portal"
          >
            {isAdminAuthenticated ? (
              <Unlock className="w-4 h-4 text-[#256029]" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            <span className="text-[11px]">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
