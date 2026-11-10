import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import { Link, useRoute } from "wouter";
import { products, shopRating } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";
import { formatPkr, productEnquiryLink } from "@/lib/storefront";

export default function ProductPage() {
  const [, params] = useRoute("/product/:slug");
  const product = products.find((item) => item.slug === params?.slug);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) document.title = `${product.title} | Vista Royal`;
    return () => { document.title = "Vista Royal — Pakistani Boutique Fashion"; };
  }, [product]);

  if (!product) {
    return (
      <main className="product-missing-page">
        <Link className="back-link" href="/"><ArrowLeft size={16} /> Back to Vista Royal</Link>
        <div className="product-missing-card">
          <p className="eyebrow">VISTA ROYAL · CURRENT COLLECTION</p>
          <h1>Product details are being updated.</h1>
          <p>The public Facebook page doesn't currently show this item. Message Vista Royal for confirmed pieces, sizes and prices.</p>
          <a className="button button-primary" href="https://wa.me/923285945319?text=Assalam-o-alaikum%20Vista%20Royal%2C%20please%20share%20your%20current%20collection%20and%20prices." target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowUpRight size={16} /></a>
          <Link className="button button-quiet" href="/#catalog">Browse the catalogue</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <header className="detail-header">
        <Link className="back-link" href="/"><ArrowLeft size={16} /> Vista Royal</Link>
        <span className="eyebrow">PRODUCT DETAILS</span>
      </header>
      <section className="product-detail-layout">
        <div className="product-detail-image"><img src={product.image} alt={product.imageAlt} /></div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.collection}</p>
          <h1>{product.title}</h1>
          <p className="detail-price">{formatPkr(product.pricePkr)}</p>
          <div className="detail-review"><Star size={16} fill="currentColor" /><strong>{shopRating.score.toFixed(1)} / 5</strong><span>overall owner-reported WhatsApp feedback</span></div>
          <p className="detail-description">{product.description}</p>
          {product.tags?.length ? <div className="detail-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
          <div className="detail-availability-note">Please confirm current availability, sizes and delivery details directly with Vista Royal.</div>
          <div className="detail-actions">
            <button className="button button-primary" type="button" onClick={() => { addItem(product.id); setAdded(true); }}>{added ? "Added to bag" : "Add to bag"} <ShoppingBag size={16} /></button>
            <a className="button button-outline" href={productEnquiryLink(product)} target="_blank" rel="noreferrer">Order now on WhatsApp <ArrowUpRight size={16} /></a>
          </div>
          <section className="detail-reviews">
            <p className="eyebrow">CUSTOMER REVIEWS</p>
            <h2><Star size={18} fill="currentColor" /> {shopRating.score.toFixed(1)} <span>/ 5 overall</span></h2>
            <p>This is the overall rating shared by Vista Royal from WhatsApp feedback, not a verified product-specific review score. No individual customer reviews or counts were provided.</p>
            <small>Facebook page status: {shopRating.facebookStatus}.</small>
          </section>
        </div>
      </section>
    </main>
  );
}
