import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { products } from "../client/src/data/catalog";

const root = process.cwd();
const output = join(root, "dist/public");
const origin = "https://vista-royal.vercel.app";
const indexPath = join(output, "index.html");
const baseHtml = readFileSync(indexPath, "utf8");

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function compact(value: string, max = 158) {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
function titleFor(value: string) {
  let [base, suffix = ""] = value.split(/\s+(\|\s+[^|]+)$/).filter(Boolean);
  if (!base) base = value;
  if (!suffix) {
    if (base.length >= 30 && base.length <= 60) return base;
    suffix = " | Pakistani Fashion";
    base = `Vista Royal ${base}`;
  }
  suffix = ` ${suffix.trim()}`;
  if (base.endsWith("Vista Royal")) base = base.slice(0, -"Vista Royal".length).trim();
  if (base.length + suffix.length < 30) {
    base = `Vista Royal ${base}`;
    suffix = " | Pakistani Fashion";
  }
  const maxBase = 60 - suffix.length;
  if (base.length > maxBase) base = `${base.slice(0, maxBase - 1).replace(/\s+\S*$/, "")}…`;
  return `${base}${suffix}`;
}
function money(value: number) {
  return `Rs. ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value)}`;
}
function productPath(slug: string) {
  return `/product/${encodeURIComponent(slug)}`;
}
function productCard(product: (typeof products)[number]) {
  return `<article class="seo-card"><a href="${productPath(product.slug)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}" loading="lazy"><span>${escapeHtml(product.collection)}</span><h2>${escapeHtml(product.title)}</h2><strong>${money(product.pricePkr)}</strong></a></article>`;
}
function documentFor(path: string, title: string, description: string, image: string, body: string, noindex = false) {
  const canonical = `${origin}${path}`;
  const safeTitle = titleFor(title);
  const safeDescription = compact(description, 158);
  let html = baseHtml;
  const setMeta = (pattern: RegExp, replacement: string) => { html = html.replace(pattern, replacement); };
  setMeta(/<title>[^<]*<\/title>/, `<title>${escapeHtml(safeTitle)}</title>`);
  setMeta(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(safeDescription)}" />`);
  setMeta(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(safeTitle)}" />`);
  setMeta(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(safeDescription)}" />`);
  setMeta(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${path.startsWith("/product/") ? "product" : "website"}" />`);
  setMeta(/<meta property="og:site_name"[^>]*>/, `<meta property="og:site_name" content="Vista Royal" />`);
  setMeta(/<meta name="twitter:card"[^>]*>/, `<meta name="twitter:card" content="summary_large_image" />`);
  const socialTags = `<meta property="og:url" content="${escapeHtml(canonical)}" /><meta property="og:image" content="${escapeHtml(`${origin}${image}`)}" /><meta name="twitter:title" content="${escapeHtml(safeTitle)}" /><meta name="twitter:description" content="${escapeHtml(safeDescription)}" /><meta name="twitter:image" content="${escapeHtml(`${origin}${image}`)}" /><link rel="canonical" href="${escapeHtml(canonical)}" />${noindex ? '<meta name="robots" content="noindex,follow" />' : ""}`;
  html = html.replace("</head>", `${socialTags}</head>`);
  const rootPattern = /(<div id="root">)[\s\S]*?(<\/div>)/;
  if (!rootPattern.test(html)) throw new Error(`Could not find root mount in ${indexPath}`);
  return html.replace(rootPattern, `$1${body}$2`);
}
function writePage(file: string, html: string) {
  const path = join(output, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html, "utf8");
}

const nav = `<header class="seo-header"><a href="/" aria-label="Vista Royal home"><strong>VISTA ROYAL</strong><small>PAKISTANI WOMEN'S FASHION</small></a><nav aria-label="Shop"><a href="/collections/new-in">New In</a><a href="/collections/occasionwear">Occasionwear</a><a href="/collections/embroidered">Embroidered</a><a href="/collections/winter-edit">Winter Edit</a><a href="/collections/printed">Printed Edit</a><a href="/collections/all">Shop All</a></nav></header>`;
const foot = `<footer class="seo-footer"><p>Vista Royal · Lahore, Pakistan</p><a href="/pages/contact">Contact</a><a href="/pages/exchange-policy">Exchange policy</a><a href="https://wa.me/923285945319">Ask us on WhatsApp</a></footer>`;

const collections: Record<string, { title: string; intro: string; filter: (product: (typeof products)[number]) => boolean }> = {
  all: { title: "The Collection", intro: "Explore the Vista Royal catalog, including embroidered, printed, occasionwear and winter pieces. Product prices are listed in Pakistani rupees; availability and sizing are confirmed directly.", filter: () => true },
  "new-in": { title: "Just Arrived", intro: "Newly added Vista Royal pieces, described from the supplied product notes. Ask about current colour, size and availability before ordering.", filter: (product) => Boolean(product.isNew) },
  occasionwear: { title: "Occasionwear", intro: "An edit of formal and festive Pakistani outfits, with item details and prices shown as supplied.", filter: (product) => product.collection === "Luxury / Festive" },
  embroidered: { title: "Embroidered Edit", intro: "Explore embroidered designs from the Vista Royal catalog. Ask about the current available colours and sizes.", filter: (product) => product.collection === "Embroidered Designs" },
  "winter-edit": { title: "Winter Edit", intro: "A seasonal edit featuring winter fabrics and coordinating pieces. Stock and colours should be confirmed with Vista Royal.", filter: (product) => product.collection === "Winter Edit" },
  printed: { title: "Printed Edit", intro: "Discover printed border designs and related pieces from the current Vista Royal collection.", filter: (product) => product.collection === "Printed Border Designs" },
};

const homeProducts = products.filter((product) => product.isNew).slice(0, 4);
const homeBody = `${nav}<main class="seo-home"><section class="seo-hero"><div><p>THE ROYAL EDIT · 01</p><h1>An entrance of your own.</h1><p>A considered edit of Pakistani womenswear, shaped by expressive colour, intricate detail and silhouettes made to be remembered.</p><a href="/collections/new-in">Discover new arrivals</a><a href="/collections/all">Explore the full collection</a></div><img src="/assets/catalog/stock-2026/page-017.jpg" alt="A model wearing a rose-toned embroidered Pakistani formal outfit"></section><section><p>VISTA ROYAL · CURRENT EDIT</p><h2>Pieces with presence.</h2><div class="seo-grid">${homeProducts.map(productCard).join("")}</div></section><section><h2>Find your expression.</h2><ul><li><a href="/collections/occasionwear">Occasionwear</a></li><li><a href="/collections/embroidered">Embroidered Edit</a></li><li><a href="/collections/winter-edit">Winter Edit</a></li><li><a href="/collections/printed">Printed Edit</a></li><li><a href="/lookbook">Lookbook</a></li></ul></section><section><h2>Details, clearly stated.</h2><p>Prices and item details are shown as supplied. Ask Vista Royal to confirm current stock, sizing and delivery before ordering. A WhatsApp enquiry is not an order confirmation.</p><a href="/pages/exchange-policy">Read the exchange policy</a></section></main>${foot}`;
writeFileSync(indexPath, documentFor("/", "Vista Royal — A Considered Edit of Pakistani Fashion", "Discover a considered edit of Pakistani women's fashion at Vista Royal. Explore embroidered, occasionwear, winter and printed collections, and ask about availability.", "/assets/catalog/stock-2026/page-017.jpg", homeBody), "utf8");

for (const [slug, collection] of Object.entries(collections)) {
  const path = `/collections/${slug}`;
  const list = products.filter(collection.filter);
  const description = compact(`${collection.title} from Vista Royal. Explore the collection and ask about current availability, sizing and delivery details.`);
  const body = `${nav}<main class="seo-collection"><p>VISTA ROYAL · ${escapeHtml(slug.replaceAll("-", " ").toUpperCase())}</p><h1>${escapeHtml(collection.title)}</h1><p>${escapeHtml(collection.intro)}</p><p>${list.length} ${list.length === 1 ? "piece" : "pieces"}</p><div class="seo-grid">${list.length ? list.map(productCard).join("") : "<p>Ask Vista Royal about the current collection and availability.</p>"}</div></main>${foot}`;
  writePage(`seo/collections/${slug}.html`, documentFor(path, `${collection.title} | Vista Royal`, description, list[0]?.image ?? "/assets/catalog/stock-2026/page-017.jpg", body));
}

for (const product of products) {
  const path = productPath(product.slug);
  const description = compact(`${product.title}. ${product.description} Price ${money(product.pricePkr)}. Ask Vista Royal to confirm current availability and sizing.`);
  const body = `${nav}<main class="seo-product"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/collections/all">Collection</a> / ${escapeHtml(product.title)}</nav><article><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}"><div><p>${escapeHtml(product.collection)}</p><h1>${escapeHtml(product.title)}</h1><p>${money(product.pricePkr)}</p><p>${escapeHtml(product.description)}</p>${product.fabric ? `<section><h2>Fabric &amp; components</h2><p>${escapeHtml(product.fabric)}</p></section>` : ""}${product.sizeNotes ? `<section><h2>Measurements</h2><p>${escapeHtml(product.sizeNotes)}</p></section>` : "<p>Ask Vista Royal to confirm current sizing and availability.</p>"}<a href="https://wa.me/923285945319?text=${encodeURIComponent(`Assalam-o-alaikum Vista Royal, I am interested in ${product.title}. Please confirm availability and sizing.`)}">Enquire on WhatsApp</a></div></article></main>${foot}`;
  writePage(`seo/product/${product.slug}.html`, documentFor(path, `${product.title} | Vista Royal`, description, product.image, body));
}

const infoPages: Record<string, { title: string; intro: string; body: string }> = {
  about: { title: "About Vista Royal", intro: "A considered edit of Pakistani women's fashion from a Lahore-based online boutique.", body: "Product information is shared where the supplied listing supports it. No establishment date, physical retail location or customer totals are claimed." },
  contact: { title: "Contact Vista Royal", intro: "For current availability, sizing, colour and delivery details, contact Vista Royal before placing an order.", body: "WhatsApp: +92 328 5945319 · Email: czarzohaib@gmail.com · Lahore, Pakistan." },
  shipping: { title: "Delivery information", intro: "Delivery charges, timing, courier and destination availability are confirmed directly with Vista Royal for each order enquiry.", body: "This website does not provide live shipment tracking. Contact Vista Royal on WhatsApp for a previous order update." },
  "exchange-policy": { title: "Exchange policy", intro: "Products can be exchanged only if they are damaged or the wrong item was sent. Proof may be required.", body: "Please message Vista Royal with your order details and clear photos of the issue so the team can review your request." },
  "order-follow-up": { title: "Order follow-up", intro: "Send Vista Royal your order details on WhatsApp and ask for an update. This is a direct enquiry, not an automated tracking service.", body: "Adding an item to the bag or sending an enquiry does not confirm an order." },
  "size-guide": { title: "Size guidance", intro: "A single standard size chart is not listed because sizes and measurements vary by piece.", body: "Where the supplier has provided measurements, they appear on the individual product page. Ask Vista Royal to confirm current sizes before ordering." },
  faqs: { title: "Frequently asked questions", intro: "Availability, colours, sizes and delivery details are confirmed directly before an order is accepted.", body: "The website bag creates a WhatsApp enquiry and does not take payment. Please confirm available payment options with Vista Royal." },
  privacy: { title: "Privacy", intro: "This storefront does not create customer accounts or accept payment details. WhatsApp and email enquiries are handled through those services.", body: "For questions about information shared in an enquiry, contact Vista Royal at czarzohaib@gmail.com." },
  terms: { title: "Terms and conditions", intro: "Product descriptions reflect the information supplied for each item. Prices, colours, sizing and delivery are confirmed before an order is accepted.", body: "A WhatsApp enquiry is not an order confirmation. No payment is collected on this website." },
};
for (const [slug, page] of Object.entries(infoPages)) {
  const path = `/pages/${slug}`;
  const body = `${nav}<main class="seo-info"><p>VISTA ROYAL · LAHORE, PAKISTAN</p><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.intro)}</p><section>${escapeHtml(page.body)}</section><a href="https://wa.me/923285945319">Contact Vista Royal on WhatsApp</a></main>${foot}`;
  writePage(`seo/pages/${slug}.html`, documentFor(path, `${page.title} | Vista Royal`, compact(page.intro), "/assets/catalog/stock-2026/page-017.jpg", body));
}

const lookbookImages = ["page-017.jpg", "page-021.jpg", "page-023.jpg", "page-029.jpg", "page-047.jpg", "page-051.jpg", "page-057.jpg", "page-069.jpg", "page-094.jpg"];
const lookbookBody = `${nav}<main class="seo-lookbook"><p>VISTA ROYAL · VISUAL NOTES</p><h1>The Lookbook</h1><p>Colour, drape and detail from the supplied Vista Royal collection imagery. Individual looks are not linked to products unless their match has been confirmed.</p><div class="seo-grid">${lookbookImages.map((file, index) => `<figure><img src="/assets/catalog/stock-2026/${file}" alt="Vista Royal fashion look ${index + 1}" loading="lazy"><figcaption>Vista Royal · Look ${index + 1}</figcaption></figure>`).join("")}</div></main>${foot}`;
writePage("seo/lookbook.html", documentFor("/lookbook", "Vista Royal Lookbook | Pakistani Fashion", "See colour, drape and detail from the Vista Royal Pakistani fashion lookbook.", "/assets/catalog/stock-2026/page-017.jpg", lookbookBody));

const robots = `User-agent: *\nAllow: /\nDisallow: /seo/\nSitemap: ${origin}/sitemap.xml\n`;
writeFileSync(join(output, "robots.txt"), robots, "utf8");
const sitemapUrls = ["/", ...Object.keys(collections).map((slug) => `/collections/${slug}`), ...Object.keys(infoPages).map((slug) => `/pages/${slug}`), "/lookbook", ...products.map((product) => productPath(product.slug))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((path) => `  <url><loc>${origin}${escapeHtml(path)}</loc></url>`).join("\n")}\n</urlset>\n`;
writeFileSync(join(output, "sitemap.xml"), sitemap, "utf8");

const notFoundBody = `${nav}<main class="seo-info"><p>VISTA ROYAL · PAGE NOT FOUND</p><h1>This page is not in the collection.</h1><p>Browse the current collection or contact Vista Royal for help.</p><a href="/collections/all">Shop the collection</a></main>${foot}`;
writePage("404.html", documentFor("/404", "Page not found | Vista Royal", "The requested Vista Royal page could not be found.", "/assets/catalog/stock-2026/page-017.jpg", notFoundBody, true));

console.log(`Prerendered ${sitemapUrls.length} canonical pages, product entries, sitemap and robots.txt for ${origin}.`);
