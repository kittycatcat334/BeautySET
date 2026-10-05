import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Instagram, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { BrandConfig, CartItem } from '../types';
import { generateCartWhatsAppUrl, generateInstagramUrl, generateOrderText } from '../utils/orderLinks';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  config: BrandConfig;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  config,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = config.freeShippingThreshold || 75;
  const freeShippingMet = total >= freeShippingThreshold;
  const amountToFreeShipping = freeShippingThreshold - total;

  const whatsappUrl = generateCartWhatsAppUrl(
    cart,
    config.whatsappNumber,
    config.brandName,
    config.currencySymbol,
    config.whatsappMessagePrefix
  );

  const instagramUrl = generateInstagramUrl(config.instagramHandle);

  const handleInstagramCheckout = async () => {
    const text = generateOrderText(
      cart,
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

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF9F5] border-l border-[#DDD7CC] h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1C1A17]" />
            <h2 className="font-serif text-xl text-[#1C1A17]">Your Bag</h2>
            <span className="text-xs text-[#736B60] tabular-nums">
              ({cart.reduce((sum, i) => sum + i.quantity, 0)} {cart.length === 1 ? 'item' : 'items'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#736B60] hover:text-[#1C1A17] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {cart.length > 0 && (
          <div className="px-6 py-2.5 bg-[#F2EFE9] border-b border-[#E4DFD5] text-xs text-[#5A554E] flex items-center justify-between">
            {freeShippingMet ? (
              <span className="text-[#256029] font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Complimentary Delivery Unlocked</span>
              </span>
            ) : (
              <span>
                Add {config.currencySymbol}{amountToFreeShipping} more for complimentary delivery
              </span>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-full bg-[#EFECE4] flex items-center justify-center text-[#736B60] mb-3">
                <ShoppingBag className="w-6 h-6 stroke-[1.2]" />
              </div>
              <p className="font-serif text-lg text-[#1C1A17]">Your bag is empty</p>
              <p className="text-xs text-[#736B60] mt-1 max-w-xs">
                Explore our curated moisturizer, perfume, and mini makeup sets.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-[#1C1A17] text-white text-xs uppercase tracking-wider rounded-xs hover:bg-[#33302B] transition-colors"
              >
                Browse The Sets
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 bg-[#FAF9F5] border border-[#E8E4DC] rounded-xs flex gap-3.5 items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xs border border-[#DDD7CC]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] tracking-wider uppercase text-[#736B60] block truncate">
                    {item.product.categoryLabel}
                  </span>
                  <h4 className="font-serif text-sm text-[#1C1A17] truncate leading-tight">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-semibold text-[#1C1A17] mt-1 tabular-nums">
                    {config.currencySymbol}{item.product.price}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[#DDD7CC] rounded-xs bg-[#FAF9F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#EFECE4] text-[#1C1A17] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs tabular-nums font-medium text-[#1C1A17]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#EFECE4] text-[#1C1A17] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-[#8C8477] hover:text-[#B71C1C] transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E8E4DC] bg-[#FAF9F5] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5A554E]">
                <span>Items Subtotal</span>
                <span className="tabular-nums font-medium text-[#1C1A17]">
                  {config.currencySymbol}{total}
                </span>
              </div>
              <div className="flex justify-between text-[#5A554E]">
                <span>Delivery</span>
                <span className="tabular-nums">
                  {freeShippingMet ? 'Complimentary' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8E4DC] flex justify-between font-serif text-lg text-[#1C1A17]">
                <span>Total</span>
                <span className="tabular-nums font-semibold">
                  {config.currencySymbol}{total}
                </span>
              </div>
            </div>

            {/* Direct Order Actions */}
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white font-medium text-xs tracking-wider uppercase rounded-xs transition-colors flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleInstagramCheckout}
                className="w-full py-3 px-4 bg-[#1C1A17] hover:bg-[#33302B] text-white font-medium text-xs tracking-wider uppercase rounded-xs transition-colors flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Order via Instagram DM</span>
                </div>
                <span className="text-[11px] opacity-80">@{config.instagramHandle}</span>
              </button>

              {copied && (
                <div className="p-2 bg-[#E8F5E9] text-[#1B5E20] text-xs flex items-center justify-center gap-1.5 rounded-xs border border-[#C8E6C9] animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Cart summary copied! Ready to paste into Instagram DM.</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-center text-[#736B60]">
              No account required. Instant confirmation via direct message.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
