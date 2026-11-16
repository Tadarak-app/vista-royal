import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { type Product } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";
import { formatPkr, productEnquiryLink } from "@/lib/storefront";

type Props = { product: Product; onAdded?: () => void; index?: number };

export default function ProductCard({ product, onAdded, index = 0 }: Props) {
  const { addItem } = useCart();
  const detailPath = `/product/${encodeURIComponent(product.slug)}`;
  const secondary = product.gallery?.find((image) => image !== product.image);
  return <article className="product-card">
    <a className="product-card-image" href={detailPath} aria-label={`View ${product.title}`}>
      <img className="product-image-primary" src={product.image} alt={product.imageAlt} loading={index < 4 ? "eager" : "lazy"} />
      {secondary && <img className="product-image-secondary" src={secondary} alt="" loading="lazy" aria-hidden="true" />}
      {product.isNew && <span className="product-image-mark">JUST ADDED</span>}
      <span className="product-open-icon" aria-hidden="true"><ArrowUpRight size={17} /></span>
    </a>
    <div className="product-card-content">
      <p className="product-collection">{product.collection}</p>
      <a className="product-title-link" href={detailPath}><h3>{product.title}</h3></a>
      <div className="product-card-bottom"><strong className="product-price">{formatPkr(product.pricePkr)}</strong><div className="product-actions"><a className="button button-quiet button-small" href={detailPath}>View details</a><button className="button button-primary button-small" type="button" onClick={() => { addItem(product.id); onAdded?.(); }} aria-label={`Add ${product.title} to bag`}><ShoppingBag size={15} /> Add</button></div></div>
      <a className="product-order-link" href={productEnquiryLink(product)} target="_blank" rel="noreferrer">Ask about availability <ArrowUpRight size={13} /></a>
    </div>
  </article>;
}
