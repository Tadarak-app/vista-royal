import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Facebook, Search, ShoppingBag } from "lucide-react";
import { products, shopRating, exchangePolicy, facebookPageUrl, contactEmail, whatsappPhone } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/store/ProductCard";
import CartDrawer from "@/components/store/CartDrawer";
import { cartEnquiryLink, whatsappLink } from "@/lib/storefront";

const ownerQuote = "What are your choices when someone puts a gun to your head? You take the gun, or you pull out a bigger one. Or, you call their bluff.";
const whatsappGeneral = whatsappLink("Assalam-o-alaikum Vista Royal, please share your current collection, availability and prices.");
const tabs = [
  { id: "home", index: "I", label: "Home" },
  { id: "shop", index: "II", label: "Shop" },
  { id: "reviews", index: "III", label: "Reviews" },
  { id: "exchange", index: "IV", label: "Exchange" },
  { id: "about", index: "V", label: "About" },
  { id: "contact", index: "VI", label: "Contact" },
] as const;
type StoreTab = (typeof tabs)[number]["id"];

function Wordmark({ compact = false, onHome }: { compact?: boolean; onHome: () => void }) {
  return (
    <button className={`wordmark${compact ? " wordmark-compact" : ""}`} type="button" onClick={onHome} aria-label="Show Vista Royal home tab">
      <span className="wordmark-emblem" aria-hidden="true">
        <img src="/icons/icon-192.png" alt="" />
      </span>
      <span className="wordmark-text"><strong>VISTA ROYAL</strong><small>LUXURY LADIES WEAR</small></span>
    </button>
  );
}

function InstallButton() {
  const [promptEvent, setPromptEvent] = useState<(Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }) | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> });
    };
    const onInstalled = () => { setInstalled(true); setPromptEvent(null); };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!promptEvent || installed) return null;
  return <button className="install-button" type="button" onClick={async () => { await promptEvent.prompt(); setPromptEvent(null); }}>Install app <ArrowDown size={14} /></button>;
}

export default function Home() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<StoreTab>("home");
  const [query, setQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("All pieces");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const collections = useMemo(() => Array.from(new Set(products.map((product) => product.collection))), []);
  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCollection = selectedCollection === "All pieces" || product.collection === selectedCollection;
      const matchesTerm = !term || `${product.title} ${product.description} ${product.collection} ${(product.tags ?? []).join(" ")}`.toLowerCase().includes(term);
      return matchesCollection && matchesTerm;
    });
  }, [query, selectedCollection]);

  const selectTab = (id: StoreTab) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const current = tabs.findIndex((tab) => tab.id === activeTab);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabRefs.current[next]?.focus();
    selectTab(tabs[next].id);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <div className="storefront" id="top">
      <div className="announcement-bar"><span>VISTA ROYAL · LAHORE, PAKISTAN</span><a href={whatsappGeneral} target="_blank" rel="noreferrer">Ask for the current collection <ArrowUpRight size={12} /></a></div>
      <header className="site-header">
        <div className="site-header-main">
          <Wordmark onHome={() => selectTab("home")} />
          <div className="header-actions">
            <InstallButton />
            <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${itemCount} items`}>
              <ShoppingBag size={18} /><span>Bag</span><b>{itemCount}</b>
            </button>
          </div>
        </div>
        <nav className="top-tabs" role="tablist" aria-label="Vista Royal sections" onKeyDown={handleTabKeyDown}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`tab-${tab.id}`}
              className="top-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => selectTab(tab.id)}
            >
              <span className="top-tab-index">{tab.index}</span><span className="top-tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <section className="tab-panel home-tab" id="panel-home" role="tabpanel" aria-labelledby="tab-home" tabIndex={0} hidden={activeTab !== "home"}>
          <section className="hero-section">
            <div className="hero-copy">
              <p className="eyebrow hero-kicker"><span /> VISTA ROYAL · LAHORE</p>
              <h1>Made for the<br /><em>way you arrive.</em></h1>
              <p className="hero-intro">Redefining Pakistani fashion for the modern woman — elite boutique designs at highly accessible price points.</p>
              <div className="hero-ctas">
                <button className="button button-primary" type="button" onClick={() => selectTab("shop")}>Explore the collection <ArrowRight size={16} /></button>
                <a className="button button-text" href={whatsappGeneral} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowUpRight size={15} /></a>
              </div>
              <div className="hero-bottom-note"><span className="hero-index">01 / 03</span><span>PAKISTANI BOUTIQUE FASHION</span></div>
            </div>
            <div className="hero-art" aria-label="Editorial detail of dark fabric and saffron embroidery">
              <img src="/assets/vista-royal-editorial.webp" alt="Decorative editorial fabric detail in Vista Royal's ink and saffron palette" fetchPriority="high" />
              <span className="hero-art-label">AN EDIT FOR EVERY ARRIVAL</span>
              <span className="hero-art-index">V / R</span>
            </div>
            <div className="hero-side-label" aria-hidden="true">VISTA ROYAL — 2026</div>
          </section>
          <section className="home-shortcuts section-pad" aria-label="Explore Vista Royal">
            <div className="section-topline"><span>01 / EXPLORE</span><span>CHOOSE A SECTION</span></div>
            <div className="home-shortcut-grid">
              <button className="home-shortcut" type="button" onClick={() => selectTab("shop")}><span>I / THE COLLECTION</span><strong>Shop Vista Royal</strong><small>Open the collection and check current availability.</small><ArrowRight size={17} /></button>
              <button className="home-shortcut" type="button" onClick={() => selectTab("reviews")}><span>II / CUSTOMER NOTES</span><strong>4.3 / 5 overall</strong><small>Owner-reported feedback received on WhatsApp.</small><ArrowRight size={17} /></button>
              <button className="home-shortcut" type="button" onClick={() => selectTab("exchange")}><span>III / BEFORE YOU BUY</span><strong>Exchange policy</strong><small>See the rule for damaged or incorrect items.</small><ArrowRight size={17} /></button>
              <button className="home-shortcut" type="button" onClick={() => selectTab("about")}><span>IV / THE PERSON BEHIND THE LABEL</span><strong>About the owner</strong><small>Meet Zohaib Qaiser and learn the story.</small><ArrowRight size={17} /></button>
            </div>
          </section>
        </section>

        <section className="tab-panel shop-tab" id="panel-shop" role="tabpanel" aria-labelledby="tab-shop" tabIndex={0} hidden={activeTab !== "shop"}>
          <section className="shop-section section-pad">
            <div className="section-topline"><span>01 / SHOP</span><span>{products.length ? `${products.length} VERIFIED PIECES` : "CURRENT COLLECTION"}</span></div>
            <div className="section-heading-row">
              <div><p className="eyebrow">THE VISTA ROYAL EDIT</p><h2>Find your <em>look.</em></h2></div>
              <a className="text-link" href={whatsappGeneral} target="_blank" rel="noreferrer">Ask us what's in <ArrowUpRight size={15} /></a>
            </div>
            <form className="search-form" onSubmit={submitSearch} role="search">
              <Search size={19} aria-hidden="true" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" aria-label="Search Vista Royal products" />
              <button className="search-submit" type="submit">Search</button>
            </form>
            {collections.length > 0 && <div className="collection-filters" aria-label="Filter by collection">
              {["All pieces", ...collections].map((collection) => <button className={selectedCollection === collection ? "filter-chip active" : "filter-chip"} type="button" key={collection} onClick={() => setSelectedCollection(collection)}>{collection}</button>)}
            </div>}
            {products.length === 0 ? (
              <div className="catalog-empty-state">
                <div className="empty-state-number">01</div>
                <div className="empty-state-content">
                  <p className="eyebrow">THE COLLECTION IS BEING UPDATED</p>
                  <h3>New pieces belong here.</h3>
                  <p>We couldn't find individual product listings, photos or prices on Vista Royal's public Facebook page. Message us for current designs, sizes and prices while the verified catalogue is prepared.</p>
                  <a className="button button-primary" href={whatsappGeneral} target="_blank" rel="noreferrer">Request today's collection <ArrowUpRight size={16} /></a>
                </div>
                <div className="empty-state-stamp"><span>VR</span><small>VISTA<br />ROYAL</small></div>
              </div>
            ) : visibleProducts.length > 0 ? (
              <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdded={() => setCartOpen(true)} />)}</div>
            ) : (
              <div className="no-search-results"><p>No pieces match “{query}”.</p><button className="button button-quiet" type="button" onClick={() => { setQuery(""); setSelectedCollection("All pieces"); }}>Clear filters</button></div>
            )}
          </section>
        </section>

        <section className="tab-panel reviews-tab" id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" tabIndex={0} hidden={activeTab !== "reviews"}>
          <section className="rating-section section-pad">
            <div className="section-topline"><span>02 / CUSTOMER NOTES</span><span>WHATSAPP FEEDBACK</span></div>
            <div className="rating-content">
              <div className="rating-score"><strong>{shopRating.score.toFixed(1)}</strong><span>/ 5</span><div className="rating-stars" aria-label="4.3 out of 5 stars"><span style={{ background: "linear-gradient(90deg, #271a07 86%, rgba(39,26,7,.28) 86%)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>★★★★★</span></div></div>
              <div className="rating-explainer"><p className="eyebrow">A NOTE FROM THE STORE</p><h1>Good pieces.<br /><em>Good people.</em></h1><p>Vista Royal's owner reports an overall 4.3/5 rating from customer feedback on WhatsApp. This is a store-wide rating, not a product-specific score.</p><small>Facebook currently shows: “{shopRating.facebookStatus}.” No individual review counts or customer quotes were available to verify.</small></div>
            </div>
          </section>
        </section>

        <section className="tab-panel exchange-tab" id="panel-exchange" role="tabpanel" aria-labelledby="tab-exchange" tabIndex={0} hidden={activeTab !== "exchange"}>
          <section className="promise-section section-pad">
            <div className="section-topline"><span>03 / THE VISTA ROYAL PROMISE</span><span>EXCHANGE POLICY</span></div>
            <div className="promise-grid">
              <div><p className="eyebrow">A CLEAR POLICY</p><h1>Shopping with<br /><em>peace of mind.</em></h1></div>
              <div className="promise-copy"><span className="promise-mark">↗</span><p>{exchangePolicy}</p><small>Please contact Vista Royal with your order details and photos of the issue.</small><a className="text-link" href={whatsappGeneral} target="_blank" rel="noreferrer">Contact us on WhatsApp <ArrowUpRight size={15} /></a></div>
            </div>
          </section>
        </section>

        <section className="tab-panel about-tab" id="panel-about" role="tabpanel" aria-labelledby="tab-about" tabIndex={0} hidden={activeTab !== "about"}>
          <section className="owner-section section-pad">
            <div className="owner-watermark" aria-hidden="true">VR</div>
            <div className="section-topline"><span>04 / ABOUT THE OWNER</span><span>LAHORE → THE WORLD</span></div>
            <div className="owner-layout">
              <div className="owner-heading"><p className="eyebrow">THE PERSON BEHIND THE LABEL</p><h1>Zohaib<br /><em>Qaiser.</em></h1><p className="owner-alias">ALSO KNOWN AS DRAKE QAISER · DRAKE · CALL ME DRAKE</p></div>
              <div className="owner-bio"><p>Zohaib Qaiser is a Lahore-based Cambridge student, independent software developer, and international policy researcher. He is the founder and CEO of Tadarak and the owner of Vista Royal.</p><p className="owner-source">Profile details adapted from <a href="https://callmedrake.vercel.app/" target="_blank" rel="noreferrer">Call Me Drake <ArrowUpRight size={13} /></a>.</p><blockquote><span>“</span><p>{ownerQuote}</p><cite>01 / ON THE FIELD</cite></blockquote></div>
            </div>
          </section>
        </section>

        <section className="tab-panel contact-tab" id="panel-contact" role="tabpanel" aria-labelledby="tab-contact" tabIndex={0} hidden={activeTab !== "contact"}>
          <section className="contact-page section-pad">
            <div className="contact-page-intro"><p className="eyebrow">GOOD THINGS START WITH A MESSAGE</p><h1>Let's find your <em>next favourite.</em></h1><p>Contact Vista Royal for current designs, sizing, availability and prices.</p></div>
            <div className="contact-card-grid">
              <a className="contact-card whatsapp-card" href={whatsappGeneral} target="_blank" rel="noreferrer"><span>I / CHAT WITH US</span><strong>WhatsApp</strong><small>{whatsappPhone}</small><ArrowUpRight size={18} /></a>
              <a className="contact-card" href={`mailto:${contactEmail}`}><span>II / WRITE TO US</span><strong>Email</strong><small>{contactEmail}</small><ArrowUpRight size={18} /></a>
              <a className="contact-card" href={facebookPageUrl} target="_blank" rel="noreferrer"><span>III / FOLLOW THE PAGE</span><strong>Facebook</strong><small>Vista Royal · Barki Road, Lahore</small><ArrowUpRight size={18} /></a>
            </div>
          </section>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-owner-credit"><span>© 2026 · VISTA ROYAL</span><strong>All rights to Zohaib Qaiser</strong><small>{whatsappPhone} · Barki Road, Lahore</small><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div>
          <a className="footer-facebook" href={facebookPageUrl} target="_blank" rel="noreferrer" aria-label="Visit Vista Royal on Facebook"><span className="footer-facebook-mark"><Facebook size={23} strokeWidth={2.5} /></span><span>VISTA ROYAL ON FACEBOOK</span></a>
          <a className="developer-credit-button" href="https://callmedrake.vercel.app/" target="_blank" rel="noreferrer">Dev by Zohaib Qaiser <ArrowUpRight size={15} /></a>
        </div>
        <nav className="footer-tabs" aria-label="Footer store sections">
          {tabs.map((tab) => <button type="button" key={tab.id} onClick={() => selectTab(tab.id)}>{tab.label}</button>)}
        </nav>
        <div className="footer-bottom"><span>© 2026 VISTA ROYAL · MADE FOR THE WAY YOU ARRIVE</span><span>PAKISTANI BOUTIQUE FASHION</span><button type="button" onClick={() => selectTab("home")}>BACK TO HOME ↑</button></div>
      </footer>
      <a className="floating-whatsapp" href={whatsappGeneral} target="_blank" rel="noreferrer" aria-label="Chat with Vista Royal on WhatsApp"><span className="whatsapp-mark">W</span><span>Chat with us</span></a>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
