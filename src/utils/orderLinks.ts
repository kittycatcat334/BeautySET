import { CartItem, Product } from '../types';

export function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function cleanInstagram(handle: string): string {
  return handle.replace(/^@/, '').trim();
}

export function generateSingleProductWhatsAppUrl(
  product: Product,
  whatsappNumber: string,
  brandName: string,
  currencySymbol = '$',
  customPrefix?: string
): string {
  const number = cleanPhone(whatsappNumber);
  const header = customPrefix || `Hello ${brandName}! ✨\n\nI would like to order:`;
  const text = `${header}
• 1x *${product.name}* (${currencySymbol}${product.price})
Category: ${product.categoryLabel} (${product.audienceLabel})

Please confirm availability and payment/shipping options. Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function generateCartWhatsAppUrl(
  items: CartItem[],
  whatsappNumber: string,
  brandName: string,
  currencySymbol = '$',
  customPrefix?: string
): string {
  const number = cleanPhone(whatsappNumber);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const itemsList = items
    .map((item) => `• ${item.quantity}x *${item.product.name}* (${currencySymbol}${item.product.price * item.quantity})`)
    .join('\n');

  const header = customPrefix || `Hello ${brandName}! ✨\n\nI would like to place an order for the following sets:`;
  const text = `${header}
${itemsList}

*Estimated Total: ${currencySymbol}${total}*

Please confirm availability, delivery address details, and payment options. Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function generateOrderText(
  items: CartItem[] | { product: Product; quantity: number }[],
  brandName: string,
  currencySymbol = '$',
  customPrefix?: string
): string {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemsList = items
    .map((item) => `• ${item.quantity}x ${item.product.name} (${currencySymbol}${item.product.price * item.quantity})`)
    .join('\n');

  const header = customPrefix || `Hello ${brandName}! I want to order:`;
  return `${header}\n${itemsList}\nTotal: ${currencySymbol}${total}\nPlease share ordering & delivery instructions.`;
}

export function generateInstagramUrl(handle: string): string {
  const clean = cleanInstagram(handle);
  return `https://instagram.com/${clean}`;
}

export function generateInstagramDmUrl(handle: string): string {
  const clean = cleanInstagram(handle);
  return `https://ig.me/m/${clean}`;
}
