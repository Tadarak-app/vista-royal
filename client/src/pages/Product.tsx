import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Minus, Plus, ShoppingBag, ZoomIn } from "lucide-react";
import { Link, useRoute } from "wouter";
import { products, exchangePolicy } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";
import StoreLayout from "@/components/store/StoreLayout";
import { formatPkr, productEnquiryLink } from "@/lib/storefront";
import { updatePageMetadata } from "@/lib/seo";

export default function ProductPage() {
  const [, params] = useRoute("/product/:slug");
  const product = products.find((item) => item.slug === params?.slug);
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const gallery = useMemo(() => product ? (product.gallery?.length ? product.gallery : [product.image]) : [], [product]);
  const styleNumber = product ? String(products.findIndex((item) => item.id === product.id) + 1).padStart(3, "0") : "000";

  useEffect(() => { setActiveImage(0); setZoomOpen(false); setAdded(false); setQuantity(1); }, [product?.id]);
  useEffect(() => {
    if (!zoomOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setZoomOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [zoomOpen]);
  useEffect(() => {
    if (product) updatePageMetadata({ title: `${product.title} | Vista Royal`, description: `${product.title}. ${product.description} Price ${formatPkr(product.pricePkr)}. Ask Vista Royal to confirm availability and sizing.`, image: product.image, type: "product" });
  }, [product]);

  if (!product) return <StoreLayout><main className="product-missing-page section-pad"><p className="eyebrow">VISTA ROYAL · CURRENT COLLECTION</p><h1>This piece is no longer listed.</h1><p>Ask Vista Royal about the current collection and availability.</p><Link className="button button-primary" href="/collections/all">Browse the collection <ArrowRight size={15} /></Link></main></StoreLayout>;

  return <StoreLayout><div className="product-detail-page section-pad"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/collections/all">Collection</Link><span>/</span><span>{product.title}</span></nav><div className="product-detail-layout">
    <div className="product-gallery"><button className="product-detail-image" type="button" onClick={() => setZoomOpen(true)} aria-label="Open enlarged product image"><img src={gallery[activeImage]} alt={product.imageAlt} /><span><ZoomIn size={15} /> View detail</span></button>{gallery.length > 1 && <div className="gallery-thumbnails" aria-label="Product image gallery">{gallery.map((image, index) => <button type="button" key={image} className={index === activeImage ? "is-active" : ""} onClick={() => setActiveImage(index)} aria-label={`Show product image ${index + 1}`} aria-pressed={index === activeImage}><img src={image} alt="" loading="lazy" /></button>)}</div>}</div>
    <div className="product-detail-copy"><div className="breadcrumbs detail-breadcrumb-mobile"><Link href="/">Home</Link><span>/</span><span>{product.collection}</span></div><p className="eyebrow">{product.collection}</p><h1>{product.title}</h1><p className="detail-style-code">STYLE · VR-{styleNumber}</p><p className="detail-price">{formatPkr(product.pricePkr)}</p><p className="detail-description">{product.description}</p><div className="detail-tags">{product.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="detail-availability-note">Availability, current colours and sizing are confirmed directly with Vista Royal. The price shown is the price provided for this listing. <Link href="/pages/size-guide">See size guidance.</Link></div><div className="detail-quantity"><span>Quantity</span><div className="quantity-stepper" role="group" aria-label="Choose quantity"><button type="button" aria-label="Reduce quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={14} /></button><span aria-live="polite">{quantity}</span><button type="button" aria-label="Increase quantity" disabled={quantity >= 99} onClick={() => setQuantity((value) => Math.min(99, value + 1))}><Plus size={14} /></button></div></div><div className="detail-actions"><button className="button button-quiet" type="button" onClick={() => { addItem(product.id, quantity); setAdded(true); }}><ShoppingBag size={16} /> {added ? "Added to bag" : "Add to bag"}</button><a className="button button-primary" href={productEnquiryLink(product)} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={15} /></a></div>
      <div className="detail-accordions"><details open><summary>Product description</summary><p>{product.description}</p></details><details><summary>Fabric &amp; components</summary><p>{product.fabric ?? "Specific fabric details were not supplied for this listing. Please confirm before ordering."}</p></details><details><summary>Measurements &amp; sizing</summary><p>{product.sizeNotes ?? "Please ask Vista Royal to confirm current available sizes and garment measurements. No assumed size chart is shown."}</p></details><details><summary>Care, delivery &amp; exchange</summary><p>{product.care ?? "Specific care instructions were not supplied for this item. Ask before washing."}</p><p>Delivery details are confirmed directly. {exchangePolicy}</p></details></div>
    </div></div></div>{zoomOpen && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Enlarged image of ${product.title}`} onClick={() => setZoomOpen(false)}><button type="button" aria-label="Close enlarged image" onClick={() => setZoomOpen(false)}>×</button><img src={gallery[activeImage]} alt={product.imageAlt} onClick={(event) => event.stopPropagation()} /></div>}</StoreLayout>;
}
