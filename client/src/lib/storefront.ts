import type { Product } from "@/data/catalog";
import { whatsappDigits } from "@/data/catalog";

export type EnquiryLine = { product: Product; quantity: number };

export function formatPkr(value: number) {
  return `Rs. ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value)}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryLink(product: Product) {
  return whatsappLink(
    `Assalam-o-alaikum Vista Royal, I am interested in ${product.title}. Please confirm current availability, sizing and delivery details.`,
  );
}

export function cartEnquiryLink(lines: EnquiryLine[]) {
  const itemLines = lines.map(
    ({ product, quantity }) => `• ${product.title} × ${quantity} — ${formatPkr(product.pricePkr)} each`,
  );
  const details = itemLines.length ? itemLines.join("\n") : "Please share your current collection, availability and prices.";
  return whatsappLink(`Assalam-o-alaikum Vista Royal, I would like to enquire about:\n${details}\n\nPlease confirm availability and delivery details.`);
}
