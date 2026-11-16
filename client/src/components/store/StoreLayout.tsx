import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, MessageCircle, Search, ShoppingBag, X } from "lucide-react";
import { Link } from "wouter";
import CartDrawer from "./CartDrawer";
import { products, facebookPageUrl, contactEmail, whatsappPhone } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";
import { whatsappLink } from "@/lib/storefront";

const navigation = [
  { label: "New In", href: "/collections/new-in" },
  { label: "Occasionwear", href: "/collections/occasionwear" },
  { label: "Embroidered", href: "/collections/embroidered" },
  { label: "Winter Edit", href: "/collections/winter-edit" },
  { label: "Printed Edit", href: "/collections/printed" },
  { label: "Lookbook", href: "/lookbook" },
];

export function StoreHeader({ onCartOpen }: { onCartOpen: () => void }) {
  const { itemCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const matches = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    return products.filter((product) => `${product.title} ${product.description} ${product.collection} ${product.fabric ?? ""} ${(product.tags ?? []).join(" ")}`.toLowerCase().includes(term)).slice(0, 5);
  }, [search]);
  const followUp = whatsappLink("Assalam-o-alaikum Vista Royal, I would like an update about my previous order or enquiry.");

  return <>
    <div className="announcement-bar"><span>A considered edit of Pakistani fashion</span><a href={followUp} target="_blank" rel="noreferrer">Need help with an order? <ArrowUpRight size={13} /></a></div>
    <header className="site-header">
      <div className="header-main">
        <button className="mobile-menu-toggle" type="button" aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <Link className="wordmark" href="/" aria-label="Vista Royal home"><span className="wordmark-emblem"><img src="/icons/vista-royal-mark.png" alt="" /></span><span className="wordmark-text"><strong>VISTA ROYAL</strong><small>PAKISTANI WOMEN'S FASHION</small></span></Link>
        <nav className={`primary-nav${mobileOpen ? " is-open" : ""}`} aria-label="Shop by collection">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>)}<Link className="nav-all" href="/collections/all" onClick={() => setMobileOpen(false)}>Shop All <ArrowRight size={13} /></Link></nav>
        <div className="header-actions">
          <a className="header-order-link" href={followUp} target="_blank" rel="noreferrer" aria-label="Ask about an existing order">Order help</a>
          <button className="icon-button header-icon" type="button" aria-label={searchOpen ? "Close search" : "Search products"} aria-expanded={searchOpen} onClick={() => { setSearchOpen((open) => !open); setSearch(""); }}><Search size={19} /></button>
          <button className="cart-trigger" type="button" onClick={onCartOpen} aria-label={`Open shopping bag, ${itemCount} items`}><ShoppingBag size={19} /><span>Bag</span><b>{itemCount}</b></button>
        </div>
      </div>
      {searchOpen && <div className="search-panel"><label htmlFor="site-search">Search the collection</label><div className="search-field"><Search size={17} /><input id="site-search" autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try silk, embroidered, winter…" /><button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={17} /></button></div>{search.trim() && <div className="search-results" aria-live="polite">{matches.length ? matches.map((product) => <Link key={product.id} href={`/product/${product.slug}`} onClick={() => setSearchOpen(false)}><span>{product.title}</span><small>Rs. {product.pricePkr.toLocaleString("en-PK")}</small></Link>) : <p>No matching pieces. Try another search or ask us on WhatsApp.</p>}</div>}</div>}
    </header>
  </>;
}

export function StoreFooter() {
  const categories = navigation.slice(0, 5);
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link className="wordmark" href="/"><span className="wordmark-emblem"><img src="/icons/vista-royal-mark.png" alt="" /></span><span className="wordmark-text"><strong>VISTA ROYAL</strong><small>PAKISTANI WOMEN'S FASHION</small></span></Link><p>A considered online edit of Pakistani women's fashion, based in Lahore.</p><a className="footer-social" href={facebookPageUrl} target="_blank" rel="noreferrer">Follow Vista Royal on Facebook <ArrowUpRight size={14} /></a></div>
      <div className="footer-column"><h2>Shop</h2>{categories.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/collections/all">Shop All</Link></div>
      <div className="footer-column"><h2>Client care</h2><Link href="/pages/order-follow-up">Order follow-up</Link><Link href="/pages/exchange-policy">Exchange policy</Link><Link href="/pages/size-guide">Size guidance</Link><Link href="/pages/faqs">FAQs</Link><Link href="/pages/contact">Contact us</Link></div>
      <div className="footer-column footer-contact"><h2>Here to help</h2><p>For current availability, sizing and delivery details, speak with Vista Royal directly.</p><a href={whatsappLink("Assalam-o-alaikum Vista Royal, please help me with the current collection.")} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a><a href={`mailto:${contactEmail}`}>{contactEmail}</a><small>{whatsappPhone}<br />Lahore, Pakistan</small></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Vista Royal</span><nav aria-label="Legal and information"><Link href="/pages/about">About</Link><Link href="/pages/shipping">Delivery information</Link><Link href="/pages/privacy">Privacy</Link><Link href="/pages/terms">Terms</Link></nav><span>Designed with care in Lahore</span></div>
  </footer>;
}

export default function StoreLayout({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const chatLink = whatsappLink("Assalam-o-alaikum Vista Royal, please share details about the collection.");
  return <div className="storefront"><StoreHeader onCartOpen={() => setCartOpen(true)} /><main>{children}</main><StoreFooter /><a className="floating-whatsapp" href={chatLink} target="_blank" rel="noreferrer" aria-label="Ask Vista Royal on WhatsApp"><span className="whatsapp-mark"><MessageCircle size={15} /></span><span>Ask on WhatsApp</span></a><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} /></div>;
}
