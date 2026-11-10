export type Product = {
  id: string;
  slug: string;
  title: string;
  pricePkr: number;
  description: string;
  collection: string;
  image: string;
  imageAlt: string;
  tags?: string[];
};

/**
 * Populate this list only with Vista Royal's confirmed stock, prices and photos.
 * The Facebook page's public view did not expose individual product listings.
 */
export const products: Product[] = [];

export const shopRating = {
  score: 4.3,
  source: "Owner-reported overall feedback received on WhatsApp",
  facebookStatus: "Not yet rated (0 reviews)",
} as const;

export const exchangePolicy =
  "Products can be exchanged only if they are damaged or the wrong item was sent. Proof may be required.";

export const whatsappPhone = "+92 328 5945319";
export const whatsappDigits = "923285945319";
export const facebookPageUrl = "https://www.facebook.com/profile.php?id=61592664248048";
export const contactEmail = "czarzohaib@gmail.com";
