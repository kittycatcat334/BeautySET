import React, { useState } from 'react';
import { X, MessageCircle, Instagram, Check, Plus, ShoppingBag } from 'lucide-react';
import { BrandConfig, Product } from '../types';
import { generateSingleProductWhatsAppUrl, generateInstagramUrl, generateOrderText } from '../utils/orderLinks';

interface QuickOrderModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  config: BrandConfig;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  product,
  onClose,
  onAddToCart,
  config,
}) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const whatsappUrl = generateSingleProductWhatsAppUrl(
    product,
    config.whatsappNumber,
    config.brandName,
    config.currencySymbol,
    config.whatsappMessagePrefix
  );

  const instagramUrl = generateInstagramUrl(config.instagramHandle);

  const handleInstagramClick = async () => {
    const orderText = generateOrderText(
      [{ product, quantity: 1 }],
      config.brandName,
      config.currencySymbol,
      config.instagramCustomMessage
    );
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      // ignore clipboard error
    }
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF9F5] border border-[#DDD7CC] shadow-2xl p-6 sm:p-8 rounded-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#736B60] hover:text-[#1C1A17] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center pb-4 border-b border-[#E8E4DC]">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#736B60]">Instant Direct Order</span>
          <h2 className="font-serif text-2xl text-[#1C1A17] mt-0.5">Order Your Set</h2>
          <p className="text-xs text-[#5A554E] mt-1">
            Choose your preferred channel below to connect directly with our team.
          </p>
        </div>

        {/* Selected Product Summary */}
        <div className="my-5 p-3.5 bg-[#F2EFE9] border border-[#E4DFD5] rounded-xs flex items-center gap-3.5">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-xs border border-[#DDD7CC]"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] tracking-wider uppercase text-[#736B60] block">
              {product.categoryLabel} · {product.audienceLabel}
            </span>
            <h4 className="font-serif text-base text-[#1C1A17] truncate">{product.name}</h4>
            <p className="text-xs text-[#5A554E] mt-0.5 tabular-nums font-semibold">
              {config.currencySymbol}{product.price}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white font-medium text-xs tracking-wider uppercase rounded-xs transition-colors flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-5 h-5" />
              <span>Order via WhatsApp</span>
            </div>
            <span className="text-[11px] opacity-90 font-normal">Pre-filled Chat →</span>
          </a>

          {/* Instagram Direct */}
          <button
            onClick={handleInstagramClick}
            className="w-full py-3.5 px-4 bg-[#1C1A17] hover:bg-[#33302B] text-white font-medium text-xs tracking-wider uppercase rounded-xs transition-colors flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <Instagram className="w-5 h-5 text-[#E1306C]" />
              <span>Order on Instagram DM</span>
            </div>
            <span className="text-[11px] opacity-90 font-normal">@{config.instagramHandle} →</span>
          </button>

          {/* Copy confirmation feedback */}
          {copied && (
            <div className="p-2.5 bg-[#E8F5E9] text-[#1B5E20] text-xs flex items-center gap-2 rounded-xs border border-[#C8E6C9] animate-in fade-in">
              <Check className="w-4 h-4 shrink-0" />
              <span>Order details copied! Paste them directly into Instagram DM.</span>
            </div>
          )}

          {/* Secondary Action: Add to Bag */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#736B60]">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="text-[#1C1A17] hover:underline font-medium flex items-center gap-1.5 py-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Bag & multi-order</span>
            </button>

            <span className="text-[11px]">Free delivery on orders $75+</span>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-5 pt-3 border-t border-[#E8E4DC] text-center text-[11px] text-[#736B60]">
          Orders confirmed 7 days a week · Dispatched within 24 hours
        </div>
      </div>
    </div>
  );
};
