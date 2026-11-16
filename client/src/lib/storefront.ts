import type { Product } from "@/data/catalog";
import { products, whatsappDigits } from "@/data/catalog";

export type EnquiryLine = { product: Product; quantity: number };

export function formatPkr(value: number) {
  return `Rs. ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value)}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryLink(product: Product) {
  const styleCode = `VR-${String(products.findIndex((item) => item.id === product.id) + 1).padStart(3, "0")}`;
  return whatsappLink(
    `Assalam-o-alaikum Vista Royal, I am interested in ${product.title}.\nStyle code: ${styleCode}\nListed price: ${formatPkr(product.pricePkr)}\nProduct link: https://vista-royal.vercel.app/product/${encodeURIComponent(product.slug)}\nPlease confirm current availability, sizing and delivery details.`,
  );
}

export function cartEnquiryLink(lines: EnquiryLine[]) {
  const itemLines = lines.map(
    ({ product, quantity }) => {
      const styleCode = `VR-${String(products.findIndex((item) => item.id === product.id) + 1).padStart(3, "0")}`;
      return `• ${product.title} × ${quantity} — ${formatPkr(product.pricePkr)} each (${styleCode})\n  https://vista-royal.vercel.app/product/${encodeURIComponent(product.slug)}`;
    },
  );
  const details = itemLines.length ? itemLines.join("\n") : "Please share your current collection, availability and prices.";
  return whatsappLink(`Assalam-o-alaikum Vista Royal, I would like to enquire about:\n${details}\n\nPlease confirm availability and delivery details.`);
}
