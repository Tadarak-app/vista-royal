import { ArrowDownRight, ArrowRight, ArrowUpRight, Facebook, MessageCircle, MoveUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import StoreLayout from "@/components/store/StoreLayout";
import ProductCard from "@/components/store/ProductCard";
import { products, shopRating, exchangePolicy, facebookPageUrl, whatsappPhone } from "@/data/catalog";
import { whatsappLink } from "@/lib/storefront";
import { updatePageMetadata } from "@/lib/seo";

const imageRoot = "/assets/catalog/stock-2026/";
const lookbook = [
  { src: `${imageRoot}page-017.jpg`, alt: "Soft rose embroidered formal look in a full-length studio photograph.", note: "A moment in rose" },
  { src: `${imageRoot}page-029.jpg`, alt: "Deep green embroidered outfit with coordinating dupatta.", note: "Colour, composed" },
  { src: `${imageRoot}page-051.jpg`, alt: "Model wearing a vivid pink outfit in a relaxed outdoor setting.", note: "A brighter note" },
  { src: `${imageRoot}page-094.jpg`, alt: "Full-length formal outfit with a flowing silhouette.", note: "For the entrance" },
];

const categoryCards = [
  { title: "Occasionwear", href: "/collections/occasionwear", image: `${imageRoot}page-017.jpg`, alt: "Model in a rose-toned embroidered formal outfit." },
  { title: "Embroidered Edit", href: "/collections/embroidered", image: "/assets/catalog/photo-13.jpg", alt: "Model in a deep teal embroidered outfit." },
  { title: "Winter Edit", href: "/collections/winter-edit", image: `${imageRoot}page-062.jpg`, alt: "Winter collection campaign image in a deep colour palette." },
  { title: "Printed Edit", href: "/collections/printed", image: "/assets/catalog/photo-24.jpg", alt: "Navy outfit with a printed border dupatta." },
];

export default function Home() {
  useEffect(() => { updatePageMetadata({ title: "Vista Royal — A Considered Edit of Pakistani Fashion", description: "Discover a considered edit of Pakistani women's fashion at Vista Royal. Explore embroidered, occasionwear, winter and printed collections, and ask about availability." }); }, []);
  const newPieces = products.filter((product) => product.isNew).slice(0, 4);
  const featuredPieces = newPieces.length ? newPieces : products.slice(0, 4);
  const generalWhatsApp = whatsappLink("Assalam-o-alaikum Vista Royal, please share the current collection and availability.");
  return <StoreLayout>
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow hero-kicker"><span /> THE ROYAL EDIT · 01</p>
        <h1>An entrance<br />of <em>your own.</em></h1>
        <p className="hero-intro">A considered edit of Pakistani womenswear, shaped by expressive colour, intricate detail and silhouettes made to be remembered.</p>
        <div className="hero-ctas"><Link className="button button-primary" href="/collections/new-in">Discover new arrivals <ArrowRight size={16} /></Link><a className="button button-text" href={generalWhatsApp} target="_blank" rel="noreferrer">Speak with us <ArrowUpRight size={15} /></a></div>
        <div className="hero-bottom-note"><span>VISTA ROYAL · LAHORE</span><span>PAKISTANI WOMEN'S FASHION</span></div>
      </div>
      <div className="hero-art"><img src={`${imageRoot}page-017.jpg`} alt="Full-length editorial photograph of a model in a rose-toned embroidered Pakistani formal outfit." fetchPriority="high" /><span className="hero-art-frame" aria-hidden="true">VR</span><div className="hero-art-label"><span>THE OCCASION EDIT</span><ArrowDownRight size={15} /></div><span className="hero-side-label">COLOUR · CRAFT · PRESENCE</span></div>
    </section>

    <section className="category-section section-pad">
      <div className="section-heading-row"><div><p className="eyebrow">A POINT OF VIEW, IN FOUR EDITS</p><h2>Find your <em>expression.</em></h2></div><Link className="text-link" href="/collections/all">View the full collection <ArrowUpRight size={14} /></Link></div>
      <div className="category-grid">{categoryCards.map((item, index) => <Link className={`category-card category-card-${index + 1}`} href={item.href} key={item.title}><img src={item.image} alt={item.alt} loading="lazy" /><span className="category-card-index">0{index + 1} / THE EDIT</span><strong>{item.title}</strong><span className="category-arrow"><ArrowUpRight size={17} /></span></Link>)}</div>
    </section>

    <section className="featured-section section-pad">
      <div className="section-topline"><span>01 / THE SELECTION</span><span>VISTA ROYAL · CURRENT EDIT</span></div>
      <div className="section-heading-row"><div><p className="eyebrow">NEWLY ADDED, CAREFULLY DESCRIBED</p><h2>Pieces with <em>presence.</em></h2></div><Link className="text-link" href="/collections/new-in">Shop new in <ArrowUpRight size={14} /></Link></div>
      <div className="product-grid">{featuredPieces.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
    </section>

    <section className="editorial-feature section-pad">
      <div className="editorial-image"><img src="/assets/vista-royal-editorial.webp" alt="Close editorial view of fabric and decorative detail from the existing Vista Royal image collection." loading="lazy" /><span>DETAILS IN FOCUS · VISTA ROYAL</span></div>
      <div className="editorial-copy"><p className="eyebrow">A CLOSER LOOK</p><h2>It is the detail<br />that makes the <em>moment.</em></h2><p>Explore embroidered work, considered colour and the pieces that bring an occasion into focus. Product details and prices are shown as supplied; ask us to confirm current availability before ordering.</p><Link className="button button-outline" href="/collections/embroidered">Explore the embroidered edit <ArrowRight size={15} /></Link><span className="editorial-index">THE ROYAL EDIT · 02</span></div>
    </section>

    <section className="lookbook-section section-pad">
      <div className="section-heading-row"><div><p className="eyebrow">VISTA ROYAL LOOKBOOK</p><h2>Made to <em>move.</em></h2></div><Link className="text-link" href="/lookbook">Open lookbook <ArrowUpRight size={14} /></Link></div>
      <div className="lookbook-grid">{lookbook.map((item, index) => <Link className={`lookbook-card lookbook-card-${index + 1}`} href="/lookbook" key={item.src}><img src={item.src} alt={item.alt} loading="lazy" /><span>0{index + 1} · {item.note}</span></Link>)}</div>
    </section>

    <section className="brand-note section-pad">
      <div className="brand-note-mark"><span>V</span><span>R</span></div><div><p className="eyebrow">A LUMINOUS POINT OF VIEW</p><h2>Pakistani fashion,<br /><em>with a signature.</em></h2></div><p>Vista Royal is a Lahore-based online boutique with a focus on expressive Pakistani women's fashion. For fit, colour, stock and delivery details, our team is a message away.</p>
    </section>

    <section className="service-strip section-pad" aria-label="Customer information">
      <div><span>01</span><h3>Details, clearly stated</h3><p>Product descriptions reflect the information currently supplied.</p></div><div><span>02</span><h3>Availability by enquiry</h3><p>Ask us to confirm stock, colour and sizing before ordering.</p></div><div><span>03</span><h3>A clear exchange policy</h3><p>{exchangePolicy}</p></div><div><span>04</span><h3>Direct support</h3><p>Contact Vista Royal on WhatsApp at {whatsappPhone}.</p></div>
    </section>

    <section className="rating-note section-pad"><div className="rating-number">{shopRating.score.toFixed(1)}<small>/ 5</small></div><div><p className="eyebrow">A NOTE FROM THE STORE</p><h2>Customer feedback, <em>shared honestly.</em></h2><p>This is the owner's reported overall feedback received on WhatsApp. It is not a product-specific rating. Facebook currently shows: {shopRating.facebookStatus}.</p></div><a href={facebookPageUrl} target="_blank" rel="noreferrer" aria-label="Vista Royal on Facebook"><Facebook size={24} /><span>Visit our page</span><MoveUpRight size={14} /></a></section>

    <section className="contact-strip section-pad"><div><p className="eyebrow">THE NEXT STEP IS YOURS</p><h2>Need a little more <em>detail?</em></h2><p>Message Vista Royal to ask about fabric, fit, availability or delivery.</p></div><a className="button button-primary" href={generalWhatsApp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Start a WhatsApp enquiry <ArrowUpRight size={15} /></a></section>
  </StoreLayout>;
}
