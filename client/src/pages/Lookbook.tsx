import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import StoreLayout from "@/components/store/StoreLayout";
import { whatsappLink } from "@/lib/storefront";
import { updatePageMetadata } from "@/lib/seo";

const photos = [
  ["page-017.jpg", "A rose-toned embroidered formal look, photographed full length."],
  ["page-021.jpg", "A richly coloured formal silhouette with dupatta drape."],
  ["page-023.jpg", "An embroidered deep green outfit, shown on a hanger."],
  ["page-029.jpg", "A model in an emerald-toned embroidered ensemble."],
  ["page-047.jpg", "A dark neutral outfit with a patterned shawl draped wide."],
  ["page-051.jpg", "A vivid pink outfit in a relaxed outdoor setting."],
  ["page-057.jpg", "A formal dark look with a flowing dupatta."],
  ["page-069.jpg", "A deep green two-piece look with contrasting embroidery."],
  ["page-094.jpg", "A formal full-length silhouette in a deep jewel tone."],
];

export default function LookbookPage() {
  useEffect(() => { updatePageMetadata({ title: "Vista Royal Lookbook | Pakistani Fashion", description: "See colour, drape and detail from the Vista Royal Pakistani fashion lookbook." }); }, []);
  return <StoreLayout><section className="collection-hero section-pad lookbook-intro"><p className="eyebrow">VISTA ROYAL · VISUAL NOTES</p><div className="collection-title-row"><h1>The <em>Lookbook.</em></h1><p>Colour, drape and detail from the supplied Vista Royal collection imagery. Individual looks are not linked to a product unless their match has been confirmed.</p></div><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Lookbook</span></div></section><section className="lookbook-page section-pad"><div className="lookbook-wall">{photos.map(([file, alt], index) => <figure key={file} className={`lookbook-tile lookbook-tile-${(index % 4) + 1}`}><img src={`/assets/catalog/stock-2026/${file}`} alt={alt} loading="lazy" /><figcaption><span>0{index + 1} / VISTA ROYAL</span><p>{alt}</p></figcaption></figure>)}</div><div className="lookbook-close"><p className="eyebrow">A CLOSER LOOK, A BETTER QUESTION</p><h2>Want the story behind a piece?</h2><p>Ask us to confirm its fabric, sizing, colour and availability before you order.</p><a className="button button-primary" href={whatsappLink("Assalam-o-alaikum Vista Royal, I would like help identifying a look in the lookbook.")} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowUpRight size={15} /></a></div></section></StoreLayout>;
}
