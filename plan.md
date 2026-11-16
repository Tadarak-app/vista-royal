# Vista Royal — current storefront plan

## Goal and source of truth

Redesign the existing public Vista Royal storefront in `Tadarak-app/vista-royal` as a mature, premium Pakistani fashion retailer. Treat the Nishat Linen reference as inspiration for clear category hierarchy and confident merchandising—not as a template to copy or a claim that Vista Royal has another retailer’s scale or history. The user's attached brief, product notes and `100stockVR.pdf` are the sources for new item details and prices. Preserve the existing 31-item catalog, logo, images, policies, contact links, guest cart and owner-reported review context.

## Brand direction

Use an editorial fashion-house visual system: crisp white `#FFFFFF`, warm alabaster `#FAF9F6`, deep charcoal `#111111`, champagne gold `#C5A059`, and light-gray rules `#E5E5E5`. Pair Cormorant Garamond with Inter; emphasize large editorial type, disciplined image crops, generous whitespace, consistent product cards and polished responsive details. Build trust through quality design and transparent product/service disclosures—not invented founding dates, stores, awards, customer counts, stock or delivery promises.

Use original Vista Royal language and the supplied logo. The homepage should lead with an editorial campaign, then guide visitors into supported collection edits, curated product features, lookbook imagery and clear client care. Primary navigation is New In, Occasionwear, Embroidered, Winter Edit, Printed Edit, Lookbook and Shop All. Avoid unsupported Unstitched/Ready-to-Wear taxonomies where item attributes do not substantiate them.

## Product and service rules

Keep all 31 existing products and prices. The uploaded PDF contains 97 new photos; seven new products are included using 44 confidently matched images, preserving supplied specifications/prices and rewriting the source notes as concise retail copy. Five supplier product entries and 53 photos are held outside product PDP groupings until their matches are verified. Six of the unmatched photos appear only in the lookbook without product claims. Details are recorded in `TODO.md` and `verification-summary.md`.

Collection pages support search, the selected collection, PKR price range/sorting, and fabric filtering only when the source data names a fabric. Product pages show the grouped gallery, exact price, source-backed notes, an accessible quantity selector, zoom, and a WhatsApp enquiry. Do not show guessed stock states, size selectors or generalized measurement charts. A WhatsApp message is an enquiry, not an order confirmation. Retain the user-supplied exchange policy; describe delivery/order follow-up honestly. Do not claim live tracking, free delivery, COD, bank transfer, payment processing or newsletter registration without a configured service.

## Routes, accessibility and discoverability

- `/`: campaign-led editorial home and primary category entry points.
- `/collections/:slug`: collection filters, search, sorting and product cards.
- `/product/:slug`: product gallery, facts, PKR price, quantity and enquiry.
- `/lookbook`: user-supplied fashion imagery without unsupported item claims.
- `/pages/:slug`: about, contact, delivery, exchange, size guidance, FAQs, privacy, terms and order follow-up.

Use semantic responsive controls, accessible names, visible keyboard focus, reduced-motion support, descriptive image alternatives, and touch-friendly mobile navigation/actions. Generate content-bearing static route HTML, per-route title/description/canonical/social metadata, sitemap and robots rules; map direct paths through Vercel rewrites.

## Implementation status and release gate

Implemented in React/Vite using `client/src/pages/`, `client/src/components/store/`, `client/src/data/catalog.ts`, and `scripts/prerender-static.ts`. The latest build produced 55 canonical pages (including 38 product detail pages). TypeScript, 6 tests, static build, generated sitemap/page metadata, asset checks, desktop and 390px mobile previews passed. Browser QA verified direct collection/product routes, Amave search filtering, quantity increment, two-unit cart subtotal, and clearing the temporary test cart.

**Not yet published:** commit with the required attribution, push to the authorized `main` branch, wait for the GitHub/Vercel deployment result, then verify the public homepage, collection, product and static assets. Only report publication after those live checks succeed.
