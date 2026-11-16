# TODO

## Existing storefront requirements retained

- [x] **Owner-supplied 31-product catalog:** Preserve the 31 existing photographed products and their current owner-provided prices (13 at PKR 3,850 and 18 at PKR 4,230). Keep their source image descriptions; do not invent fabric, sizes, stock or brand claims.
- [x] **Supplied Vista Royal branding and PWA:** Retain the existing Vista Royal logo, favicon/app icons, installable PWA manifest and offline shell.
- [x] **Honest store context and support:** Keep the owner-reported 4.3/5 overall WhatsApp feedback clearly distinguished from Facebook reviews; preserve the sourced Lahore contact details and Facebook link. Do not claim an establishment date, physical stores, awards, customer totals or payment/shipping promises without evidence.
- [x] **Guest cart and WhatsApp handoff:** Keep locally stored cart, add/remove/quantity behavior and WhatsApp order enquiries. Make clear that a WhatsApp message is not a confirmed order.
- [x] **Exchange and contact information:** Preserve the supplied exchange policy (damaged or wrong item only; proof may be required), customer contact details and direct WhatsApp enquiry workflow.
- [x] **Previously published baseline:** The earlier storefront commit `bf44b119347b4fd2d306f1de2dee0af79ec63bcf` was pushed to `main` and verified on Vercel. The current redesign’s deployment is tracked below.

## Current established-brand redesign — 16 November 2026

- [x] **Editorial brand direction:** Rework Vista Royal into a polished Pakistani fashion-house storefront with crisp white, alabaster, charcoal and champagne-gold surfaces, high-fashion serif headlines, clean sans-serif commerce UI, the supplied logo and the existing website imagery. Use the Nishat Linen reference for retail hierarchy only; create Vista Royal’s own wording and presentation, without implying a false company history.
- [x] **Retail homepage and navigation:** Replace the tab-first landing flow with a campaign-led editorial home page and responsive navigation. Use supported catalog groupings—New In, Occasionwear, Embroidered, Winter Edit, Printed Edit, Lookbook and Shop All—rather than advertising unsupported Unstitched/Ready-to-Wear subcategories. Provide collection routes, editorial/lookbook content, direct customer-care links and a structured footer.
- [x] **New source inventory:** Extract and retain all 97 photos from `100stockVR.pdf`. Add seven new listings with exact supplied prices/details and confidently grouped photos; preserve all 31 existing listings. Do not publish unmatched items as guessed products.
- [x] **Collection discovery and product pages:** Add searchable collection routes, collection selection, fabric filters only for sourced fabric fields, PKR price range/sorting, multi-image product galleries with zoom, sourced measurements/care details where available, an accessible quantity selector, and product-specific WhatsApp enquiry. When sizes/availability are not supplied, ask customers to confirm instead of showing assumed options.
- [x] **Cart and policy disclosures:** Keep a locally persisted guest cart and truthful WhatsApp handoff. Retain the provided exchange policy. Describe order follow-up as a WhatsApp-assisted enquiry, not live tracking. Do not add unsupported delivery fees, free-shipping thresholds, COD/bank-transfer badges, newsletter collection or checkout/payment integrations.
- [x] **SEO and direct routes:** Generate initial HTML for canonical home, collection, product, lookbook and information pages; add route-aware metadata, canonical/social previews, sitemap, robots rules and Vercel route mapping.
- [x] **Responsive and technical checks:** Verify desktop collection/product pages and the 390px mobile homepage preview. Run TypeScript, production static build, tests, route/image/sitemap checks and title/description-length audit.
- [ ] **Publish current redesign:** Commit with the required attribution, push the authorized changes to `main`, then verify Git/Vercel deployment status and the live route responses before claiming publication.

## Held for owner confirmation

- [ ] **Five unmatched supplier entries:** The notes for Winterpret/Dhank Marina 2-piece, Velvetpret 3-piece, Festivecollection chiffon sharara, Hania Aamir Viral Dress, and the new velvet 3-piece are not listed yet because their corresponding photos could not be matched confidently. Do not present their prices, celebrity association, sizing or order/payment language as live product facts until matched and confirmed.
- [ ] **53 photos not assigned to product PDPs:** Six are used only as unlinked editorial/lookbook imagery (without product claims); the other 47 remain in the source asset folder and are not surfaced in the storefront. Review these before adding additional products.
- [ ] **Account and payment checkout:** Customer accounts, order management and payment processing remain outside this source-backed phase and require separate authorization and configured integrations.
