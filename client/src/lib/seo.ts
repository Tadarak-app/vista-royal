const PUBLIC_ORIGIN = "https://vista-royal.vercel.app";

type PageMetadata = { title: string; description: string; image?: string; type?: "website" | "product" };

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

function compact(value: string, max = 158) {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function setMeta(selector: string, attribute: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [key, val] = selector.match(/\[(name|property)="([^"]+)"\]/)?.slice(1) ?? [];
    if (key && val) tag.setAttribute(key, val);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attribute, value);
}

export function updatePageMetadata({ title, description, image = "/assets/catalog/stock-2026/page-017.jpg", type = "website" }: PageMetadata) {
  const safeTitle = titleFor(title);
  const safeDescription = compact(description);
  document.title = safeTitle;
  const url = `${PUBLIC_ORIGIN}${window.location.pathname}`;
  setMeta('meta[name="description"]', "content", safeDescription);
  setMeta('meta[property="og:title"]', "content", safeTitle);
  setMeta('meta[property="og:description"]', "content", safeDescription);
  setMeta('meta[property="og:type"]', "content", type);
  setMeta('meta[property="og:site_name"]', "content", "Vista Royal");
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:image"]', "content", `${PUBLIC_ORIGIN}${image}`);
  setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "content", safeTitle);
  setMeta('meta[name="twitter:description"]', "content", safeDescription);
  setMeta('meta[name="twitter:image"]', "content", `${PUBLIC_ORIGIN}${image}`);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}
