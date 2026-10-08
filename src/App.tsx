import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { QuickOrderModal } from './components/QuickOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminModal } from './components/AdminModal';
import { FilterBar } from './components/FilterBar';
import { BrandValues } from './components/BrandValues';
import { Footer } from './components/Footer';
import { PRODUCTS, INITIAL_BRAND_CONFIG } from './data/products';
import { Audience, Category, Product, CartItem, BrandConfig } from './types';
import { MessageCircle, Instagram, Sparkles, Check, ArrowRight, Lock, Unlock, Settings } from 'lucide-react';

const STORAGE_KEY_CONFIG = 'epure_brand_config_v1';
const STORAGE_KEY_CART = 'epure_cart_v1';
const STORAGE_KEY_ADMIN_AUTH = 'epure_admin_auth_v1';

export default function App() {
  // Brand Configuration
  const [config, setConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_BRAND_CONFIG,
          ...parsed,
        };
      }
    } catch {
      // ignore
    }
    return INITIAL_BRAND_CONFIG;
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Shopping Bag
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Filters
  const [selectedAudience, setSelectedAudience] = useState<Audience>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_ADMIN_AUTH, String(isAdminAuthenticated));
    } catch {
      // ignore
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    showToast('Signed in to Admin Dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    showToast('Logged out of Admin Dashboard');
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSaveConfig = (newConfig: BrandConfig) => {
    setConfig(newConfig);
    showToast('Store & social settings saved');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Audience filter
      if (selectedAudience !== 'all') {
        if (selectedAudience === 'unisex' && product.audience !== 'unisex') {
          return false;
        }
        if (selectedAudience === 'her' && product.audience !== 'her' && product.audience !== 'unisex') {
          return false;
        }
        if (selectedAudience === 'him' && product.audience !== 'him' && product.audience !== 'unisex') {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesFinish = product.scentOrFinish?.toLowerCase().includes(q);
        const matchesItems = product.itemsIncluded.some(
          (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
        );
        return matchesName || matchesDesc || matchesTagline || matchesFinish || matchesItems;
      }

      return true;
    });
  }, [selectedAudience, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1C1A17] font-sans">
      {/* Admin Owner Top Banner when Authenticated */}
      {isAdminAuthenticated && (
        <div className="bg-[#1C1A17] text-[#FAF9F5] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#33302B]">
          <div className="flex items-center gap-2">
            <Unlock className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="font-medium tracking-wide">Admin Mode Active:</span>
            <span className="text-[#B3AAA0] hidden sm:inline">
              WhatsApp: <code className="text-white font-mono">{config.whatsappNumber}</code> · Instagram: <code className="text-white font-mono">@{config.instagramHandle}</code>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[11px] underline hover:text-[#EAE5DA] flex items-center gap-1 uppercase tracking-wider"
            >
              <Settings className="w-3 h-3" />
              <span>Manage Links</span>
            </button>
            <span className="text-[#555]" aria-hidden="true">|</span>
            <button
              onClick={handleAdminLogout}
              className="text-[11px] text-[#FF8A80] hover:underline uppercase tracking-wider font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as Category);
          scrollToCatalog();
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
        config={config}
      />

      {/* Hero Section */}
      <Hero
        onScrollToCatalog={scrollToCatalog}
        config={config}
      />

      {/* Main Catalog Section */}
      <main id="catalog" className="flex-1 py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-[#736B60] font-medium mb-1.5">
              <span>The Sets Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Curated Routines</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] leading-tight [text-wrap:balance] glow-3d-champagne">
              Artisanal Sets for <span className="text-shimmer-gold inline-block">Him, Her, & Shared Rituals</span>
            </h2>
          </div>

          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-[#736B60] max-w-xs font-light">
            Every set comes housed in our embossed presentation packaging, ready for gifting or daily enjoyment.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8">
          <FilterBar
            selectedAudience={selectedAudience}
            onSelectAudience={setSelectedAudience}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#F4F1EA] border border-[#E4DFD5] rounded-xs p-8">
            <p className="font-serif text-2xl text-[#1C1A17]">No sets match your criteria</p>
            <p className="text-xs text-[#736B60] mt-1.5 max-w-md mx-auto font-light">
              Try adjusting your search terms, switching to "All Curations", or clearing category filters.
            </p>
            <button
              onClick={() => {
                setSelectedAudience('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 bg-[#1C1A17] text-[#FAF9F5] text-xs uppercase tracking-wider rounded-xs hover:bg-[#33302B] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={config.currencySymbol}
                onQuickView={setDetailProduct}
                onOrderNow={setQuickOrderProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Direct Order Concierge Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 bg-[#EFECE4] border border-[#DDD7CC] rounded-xs">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#736B60]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Concierge Ordering</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] [text-wrap:balance] glow-3d-champagne">
              Prefer to order via a conversation?
            </h3>
            <p className="text-xs sm:text-sm text-[#5A554E] leading-relaxed max-w-xl mx-auto font-light">
              Whether you need personal fragrance recommendations, customized gift sets for a couple, or bulk orders, our direct line is always open.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent((config.whatsappMessagePrefix || "Hello " + config.brandName + "! ✨") + " I would like to consult on placing an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat & Order on WhatsApp</span>
              </a>

              <a
                href={`https://instagram.com/${config.instagramHandle.replace(/^@/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#1C1A17] hover:bg-[#33302B] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>Message on Instagram (@{config.instagramHandle.replace(/^@/, '')})</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Brand Values & Pillars */}
      <BrandValues />

      {/* Footer */}
      <Footer
        config={config}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as Category);
          scrollToCatalog();
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Modals & Drawers */}
      <QuickOrderModal
        product={quickOrderProduct}
        onClose={() => setQuickOrderProduct(null)}
        onAddToCart={handleAddToCart}
        config={config}
      />

      <ProductModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        config={config}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        config={config}
      />

      {/* Admin Login & Link WhatsApp/Instagram Portal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        isAuthenticated={isAdminAuthenticated}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1A17] text-[#FAF9F5] px-4 py-3 rounded-xs shadow-xl text-xs font-medium flex items-center gap-2 border border-[#33302B] animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#25D366]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sticky Order Bar when cart has items */}
      {cart.length > 0 && !isCartOpen && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#DDD7CC] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase text-[#736B60] block">
              Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
            <span className="font-serif text-base font-semibold text-[#1C1A17] tabular-nums">
              {config.currencySymbol}{cart.reduce((s, i) => s + i.product.price * i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-[#1C1A17] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium rounded-xs flex items-center gap-1.5"
          >
            <span>Review & Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
