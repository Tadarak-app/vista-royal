import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import { shopRating, type Product } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";
import { formatPkr, productEnquiryLink } from "@/lib/storefront";

type Props = { product: Product; onAdded?: () => void };

export default function ProductCard({ product, onAdded }: Props) {
  const { addItem } = useCart();
  const detailPath = `/product/${encodeURIComponent(product.slug)}`;

  return (
    <article className="product-card">
      <a className="product-card-image" href={detailPath} target="_blank" rel="noreferrer" aria-label={`Open ${product.title} details in a new tab`}>
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
        <span className="product-image-mark">VISTA ROYAL</span>
        <span className="product-open-icon" aria-hidden="true"><ArrowUpRight size={17} /></span>
      </a>
      <div className="product-card-content">
        <p className="eyebrow product-collection">{product.collection}</p>
        <a className="product-title-link" href={detailPath} target="_blank" rel="noreferrer">
          <h3>{product.title}</h3>
        </a>
        <p className="product-rating" aria-label={`Overall rating ${shopRating.score} out of 5, owner-reported WhatsApp feedback`}>
          <Star size={14} fill="currentColor" aria-hidden="true" />
          <strong>{shopRating.score.toFixed(1)}</strong>
          <span>overall · WhatsApp</span>
        </p>
        <div className="product-card-bottom">
          <strong className="product-price">{formatPkr(product.pricePkr)}</strong>
          <div className="product-actions">
            <a className="button button-quiet button-small" href={detailPath} target="_blank" rel="noreferrer">View</a>
            <button
              className="button button-primary button-small"
              type="button"
              onClick={() => { addItem(product.id); onAdded?.(); }}
              aria-label={`Add ${product.title} to cart`}
            ><ShoppingBag size={15} /> Add</button>
          </div>
        </div>
        <a className="product-order-link" href={productEnquiryLink(product)} target="_blank" rel="noreferrer">Ask about this piece on WhatsApp</a>
      </div>
    </article>
  );
}
