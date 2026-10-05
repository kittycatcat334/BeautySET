import React, { useState } from 'react';
import { X, MessageCircle, Instagram, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { BrandConfig, Product } from '../types';
import { generateSingleProductWhatsAppUrl, generateInstagramUrl, generateOrderText } from '../utils/orderLinks';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  config: BrandConfig;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  config,
}) => {
  const [copied, setCopied] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const whatsappUrl = generateSingleProductWhatsAppUrl(
    product,
    config.whatsappNumber,
    config.brandName,
    config.currencySymbol,
    config.whatsappMessagePrefix
  );

  const instagramUrl = generateInstagramUrl(config.instagramHandle);

  const handleInstagramOrder = async () => {
    const text = generateOrderText(
      [{ product, quantity: 1 }],
      config.brandName,
      config.currencySymbol,
      config.instagramCustomMessage
    );
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      // ignore
    }
    window.open(instagramUrl, '_blank');
  };

  const handleAdd = () => {
    onAddToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#DDD7CC] shadow-2xl rounded-sm my-8 overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#FAF9F5]/90 hover:bg-white text-[#1C1A17] transition-colors rounded-full border border-[#DDD7CC]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & What's Inside */}
        <div className="md:w-1/2 bg-[#EFECE6] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E0DACE] overflow-y-auto">
          <div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-[#E2DDCF] border border-[#DDD7CC]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Set Components Breakdown */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#1C1A17] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#736B60]" />
                <span>What's Inside This Set</span>
              </h4>
              <div className="space-y-2.5">
                {product.itemsIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF9F5] border border-[#E4DFD5] rounded-xs text-xs"
                  >
                    <div className="flex justify-between font-medium text-[#1C1A17]">
                      <span>{item.name}</span>
                      <span className="text-[#736B60] font-normal tabular-nums">{item.size}</span>
                    </div>
                    <p className="text-[11px] text-[#5A554E] mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-[#736B60] border-t border-[#DDD7CC] pt-3">
            Handcrafted with cruelty-free active botanicals. Packed in recyclable luxury paper packaging.
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#736B60]">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1C1A17] font-medium">{product.audienceLabel}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1A17] leading-tight">
              {product.name}
            </h2>

            <div className="text-2xl font-serif text-[#1C1A17] tabular-nums font-medium">
              {config.currencySymbol}{product.price}
            </div>

            <p className="text-sm text-[#5A554E] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Scent or Finish Profile */}
            {product.scentOrFinish && (
              <div className="p-3 bg-[#F4F1EB] border-l-2 border-[#1C1A17] text-xs">
                <span className="font-semibold text-[#1C1A17] uppercase tracking-wide block text-[10px] text-[#736B60]">
                  Scent Profile & Finish
                </span>
                <span className="text-[#3A3630] mt-0.5 block">{product.scentOrFinish}</span>
              </div>
            )}

            {/* Key Benefits */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1A17] block">
                Set Highlights
              </span>
              <ul className="space-y-1 text-xs text-[#5A554E]">
                {product.keyBenefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1C1A17] mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to use */}
            <div className="pt-2 text-xs text-[#5A554E]">
              <span className="uppercase tracking-wider font-semibold text-[#1C1A17] block mb-1">
                Suggested Application
              </span>
              <p className="leading-relaxed text-[12px]">{product.howToUse}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#E8E4DC] space-y-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white font-medium text-xs tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>

            <button
              onClick={handleInstagramOrder}
              className="w-full py-3 px-4 bg-[#1C1A17] hover:bg-[#33302B] text-white font-medium text-xs tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Order via Instagram DM (@{config.instagramHandle})</span>
            </button>

            {copied && (
              <div className="p-2 bg-[#E8F5E9] text-[#1B5E20] text-xs flex items-center justify-center gap-1.5 rounded-xs border border-[#C8E6C9]">
                <Check className="w-3.5 h-3.5" />
                <span>Order text copied to clipboard! Paste in Instagram DM.</span>
              </div>
            )}

            <button
              onClick={handleAdd}
              className="w-full py-2.5 px-4 border border-[#1C1A17] text-[#1C1A17] hover:bg-[#EFECE4] text-xs tracking-wider uppercase font-medium transition-colors rounded-xs flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{addedNotice ? 'Added to Bag ✓' : 'Add to Bag'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
