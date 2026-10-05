import React from 'react';
import { Eye, ShoppingBag, Send } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  currencySymbol: string;
  onQuickView: (product: Product) => void;
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencySymbol,
  onQuickView,
  onOrderNow,
  onAddToCart,
}) => {
  return (
    <div className="group flex flex-col bg-[#FAF9F5] border border-[#E8E4DC] hover:border-[#CFC8BB] transition-all duration-300 rounded-sm overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-[#EBE7DF] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add('flex', 'items-center', 'justify-center', 'p-4', 'text-center');
              parent.innerHTML = `<span class="font-serif text-sm text-[#736B60]">${product.name}</span>`;
            }
          }}
        />

        {/* Subtle Text Tag (at most 1) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#FAF9F5]/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-[#1C1A17] border border-[#E0DACE]">
            {product.badge}
          </div>
        )}

        {/* Quick Overlay Action on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 bg-[#FAF9F5]/95 backdrop-blur-sm text-[#1C1A17] text-[11px] tracking-wider uppercase font-medium hover:bg-white border border-[#DDD7CC] transition-colors rounded-xs flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2 bg-[#1C1A17] text-[#FAF9F5] hover:bg-[#33302B] transition-colors rounded-xs"
            title="Add to Bag"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase text-[#736B60] mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.audienceLabel}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-lg text-[#1C1A17] hover:text-[#5A554E] cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-xs text-[#5A554E] line-clamp-2 leading-relaxed font-light">
            {product.tagline}
          </p>

          {/* Included Set Items Count */}
          <div className="mt-2.5 text-[11px] text-[#8C8477]">
            Includes {product.itemsIncluded.length} curated pieces · {product.itemsIncluded.map(i => i.name.split(' ')[0]).join(', ')}
          </div>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-5 pt-3.5 border-t border-[#EFECE4] flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-[#736B60] block -mb-0.5">Set Price</span>
            <span className="font-serif text-xl text-[#1C1A17] tabular-nums font-medium">
              {currencySymbol}{product.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOrderNow(product)}
              className="px-3.5 py-2 bg-[#1C1A17] text-[#FAF9F5] text-xs font-medium tracking-wider uppercase hover:bg-[#38342D] transition-colors rounded-xs flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3 h-3 text-[#25D366]" />
              <span>Order Now</span>
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="sm:hidden p-2 border border-[#DDD7CC] text-[#1C1A17] rounded-xs"
              aria-label="Add to bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
