export type Audience = 'all' | 'unisex' | 'her' | 'him';

export type Category = 'all' | 'moisturizer' | 'perfume' | 'makeup' | 'rituals';

export interface ProductItem {
  name: string;
  size: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  audience: Audience;
  audienceLabel: string;
  price: number;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  itemsIncluded: ProductItem[];
  keyBenefits: string[];
  scentOrFinish?: string;
  howToUse: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BrandConfig {
  whatsappNumber: string;
  whatsappMessagePrefix?: string;
  instagramHandle: string;
  instagramCustomMessage?: string;
  brandName: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  adminPasscode: string;
  businessHours?: string;
}
