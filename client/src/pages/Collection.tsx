import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { Link, useRoute } from "wouter";
import StoreLayout from "@/components/store/StoreLayout";
import ProductCard from "@/components/store/ProductCard";
import { products } from "@/data/catalog";
import { whatsappLink } from "@/lib/storefront";
import { updatePageMetadata } from "@/lib/seo";

const collections: Record<string, { title: string; eyebrow: string; match: (collection: string) => boolean; isNew?: boolean }> = {
  all: { title: "The Collection", eyebrow: "VISTA ROYAL · SHOP ALL", match: () => true },
  "new-in": { title: "Just Arrived", eyebrow: "THE LATEST EDIT", match: () => true, isNew: true },
  occasionwear: { title: "Occasionwear", eyebrow: "THE OCCASION EDIT", match: (value) => value === "Luxury / Festive" },
  embroidered: { title: "Embroidered Edit", eyebrow: "DETAILS IN FOCUS", match: (value) => value === "Embroidered Designs" },
  "winter-edit": { title: "Winter Edit", eyebrow: "A SEASONAL EDIT", match: (value) => value === "Winter Edit" },
  printed: { title: "Printed Edit", eyebrow: "COLOUR AND PATTERN", match: (value) => value === "Printed Border Designs" },
};

export default function CollectionPage() {
  const [, params] = useRoute("/collections/:slug");
  const slug = params?.slug ?? "all";
  const collection = collections[slug] ?? collections.all;
  const [query, setQuery] = useState("");
  const [fabric, setFabric] = useState("all");
  const [sort, setSort] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const fabrics = useMemo(() => Array.from(new Set(
    products.filter((product) => collection.match(product.collection) && (!collection.isNew || product.isNew)).map((product) => product.fabric).filter((value): value is string => Boolean(value)),
  )).sort(), [collection]);
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (collection.isNew && !product.isNew) return false;
      if (!collection.match(product.collection)) return false;
      if (fabric !== "all" && product.fabric !== fabric) return false;
      if (minPrice && product.pricePkr < Number(minPrice)) return false;
      if (maxPrice && product.pricePkr > Number(maxPrice)) return false;
      return !term || `${product.title} ${product.description} ${product.fabric ?? ""} ${(product.tags ?? []).join(" ")}`.toLowerCase().includes(term);
    });
    if (sort === "price-low") filtered.sort((a, b) => a.pricePkr - b.pricePkr);
    if (sort === "price-high") filtered.sort((a, b) => b.pricePkr - a.pricePkr);
    if (sort === "newest") filtered.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    return filtered;
  }, [collection, fabric, maxPrice, minPrice, query, sort]);
  const help = whatsappLink("Assalam-o-alaikum Vista Royal, please confirm current availability and sizing for the collection.");
  useEffect(() => { updatePageMetadata({ title: `${collection.title} | Vista Royal`, description: `${collection.title} from Vista Royal. Explore the collection and ask about current availability, sizing and delivery details.` }); }, [collection.title]);
  return <StoreLayout>
    <section className="collection-hero section-pad"><p className="eyebrow">{collection.eyebrow}</p><div className="collection-title-row"><h1>{collection.title}<em>.</em></h1><p>Considered pieces, with the details worth knowing. Availability and sizing are confirmed directly with Vista Royal.</p></div><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{collection.title}</span></div></section>
    <section className="collection-page section-pad">
      <div className="collection-toolbar"><span>{visible.length} {visible.length === 1 ? "piece" : "pieces"}</span><label className="sort-control">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="newest">Newest</option></select></label></div>
      <div className="collection-controls"><label className="search-form"><Search size={18} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search styles, colours or fabric" aria-label="Search this collection" /></label>{fabrics.length > 1 && <label className="filter-select">Fabric <select value={fabric} onChange={(event) => setFabric(event.target.value)}><option value="all">All listed fabrics</option>{fabrics.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>}<label className="price-filter">Price from <span>Rs.</span><input type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} aria-label="Minimum price in Pakistani rupees" placeholder="0" /><span>to Rs.</span><input type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} aria-label="Maximum price in Pakistani rupees" placeholder="Any" /></label></div>
      {visible.length ? <div className="product-grid collection-product-grid">{visible.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="collection-empty"><span>THE EDIT · {slug.toUpperCase()}</span><h2>This selection is being refreshed.</h2><p>We do not list items when the matching details are unclear. Ask Vista Royal about current pieces, colours and sizes.</p><a className="button button-primary" href={help} target="_blank" rel="noreferrer">Ask about the current edit <ArrowUpRight size={15} /></a><Link className="text-link" href="/collections/all"><ArrowLeft size={14} /> Browse the full collection</Link></div>}
    </section>
  </StoreLayout>;
}
