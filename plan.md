# Vista Royal — storefront plan

## Scope

Build and maintain the public, mobile-first Vista Royal boutique storefront as a Vite/React single-page site. Follow the user's requested Penzo Mart reference (https://penzo-lovat.vercel.app/) for commerce clarity and card treatment, and the Call Me Drake reference (https://callmedrake.vercel.app/) for numbered top-tab navigation and distinct in-page sections. Provide persistent Home, Shop, Reviews, Exchange, About, and Contact tabs. The selected tab replaces the content panel in place without following anchor links, changing page route, or reloading. Product details remain a separate new-tab route. Keep the three-part footer: rights notice, centered Facebook link, and developer-credit link.

The owner has supplied a 31-photo stock PDF and requested each photo be listed as a product: catalogue photos 1–13 at PKR 3,850 each, and photos 14–31 at PKR 4,230 each. Write short product titles and descriptions grounded in visible color, garment, and motif details; do not invent fabric composition, stitching, sizes, availability terms, or brand/model names. Use the provided image for each corresponding product and make WhatsApp enquiry the path for confirming availability and delivery. Retain the source-qualified store-wide 4.3/5 owner-reported WhatsApp feedback; do not invent product reviews or Facebook ratings.

The user supplied the official Vista Royal logo image and asked to replace the current crown emblem with that logo and update the favicon. Use the supplied artwork for the visible site wordmark, browser favicon, and PWA install icons. Do not redraw or substitute a different crown mark.

**Explicitly deferred per the user's existing instruction:** Google/email authentication, sign-in/sign-out, persistent customer accounts, authenticated checkout, server-side order creation, and automatic order-confirmation email. “Order now” remains a WhatsApp enquiry and must not imply that an order is confirmed. Keep the site usable without login.

## Implementation and project structure

- `client/src/pages/Home.tsx`: persistent accessible tab bar, Home/Shop/Reviews/Exchange/About/Contact panels, search/filter, rating context, policy/contact content, and attribution footer.
- `client/src/pages/Product.tsx`: product-detail route opened in a new tab; render each of the 31 stocked catalogue items with its title, price, visible-detail description, source photo, store-wide rating context, and WhatsApp enquiry.
- `client/src/components/store/`: product card and guest cart drawer, with keyboard focus containment and restoration.
- `client/src/data/catalog.ts`: typed owner-maintained catalogue containing 31 descriptions, prices, color/design collections, and matching local image paths.
- `client/public/assets/catalog/`: 31 extracted source photos in catalogue order.
- `client/src/lib/storefront.ts` and `client/src/contexts/CartContext.tsx`: PKR formatting, safe WhatsApp enquiry links, and guest cart backed by local storage.
- `client/public/assets/vista-royal-logo.png`: cropped, transparent-background version of the supplied official wordmark used in the site header.
- `client/public/manifest.webmanifest`, `client/public/sw.js`, and `client/public/icons/`: app-owned PWA manifest, supplied-logo favicon and install icons, service worker, and offline shell.
- `client/public/manus-routes.json`: synchronized page-route declaration required by Webdev.
- `client/index.html` and `app.config.ts`: page/PWA metadata and project logo reference.
- Existing Webdev starter React/Vite app, Express preview server, and TypeScript diagnostics remain in place. No account, authentication, or checkout backend is added in this phase.

## Design system

**Design movement:** Saffron Modernist — near-black foundations, controlled saffron accents and oversized labels within a crisp, functional marketplace layout.

**Core principles:** commerce controls stay obvious; mobile browsing comes first; brand decoration never obscures product information; business claims remain attributable and accurate.

**Color philosophy:** ink-black surfaces create strong contrast and a boutique editorial tone; saffron is reserved for actions and small signature accents; replace broad white/ivory webpage panels and card surfaces with coordinated warm-gold tones, using dark ink text for clear contrast. Preserve original product-photo colors.

**Layout paradigm:** compact sticky brand header, distinct numbered top tabs inspired by the owner's Call Me Drake site, and one active content panel at a time. Home leads with an editorial hero and section shortcuts; Shop contains search, collections and responsive product cards; Reviews, Exchange, About and Contact each have their own in-place panel. On mobile the tab row remains visible, scrolls horizontally when needed, and keeps a distinct active indicator. Do not use scrolling anchor navigation between these sections. The footer has three explicit aligned roles: rights text at left, an accessible Facebook logo-link in the center, and a developer-credit button at right.

**Signature elements:** supplied Vista Royal logo artwork, thin saffron rules and corner markers, and concise uppercase section indices.

**Interaction philosophy and animation:** use semantic tabs with a selected state and arrow/Home/End keyboard navigation; switching tabs replaces the active content in the same page and presents the new panel from its start. Preserve search and cart state; open a product in a separate tab without forcing a full-document navigation; keep motion brief and honor reduced-motion preferences. WhatsApp enquiry buttons open the supplied chat number with a safely encoded product/cart summary.

**Typography:** Syne for display and navigation, paired with DM Sans for body and commerce details. Large editorial headings are balanced by compact, high-legibility prices and controls.

**Brand essence:** accessible boutique fashion for modern women; confident, considered, direct.

**Brand voice:** grounded and helpful, never claiming unverified stock or review details. Examples: “Discover the Vista Royal collection.” “Ask us on WhatsApp for current availability.”

**Wordmark and signature brand color:** use the supplied Vista Royal wordmark in place of the old geometric crown emblem; retain the saffron `#D99014` on ink `#171512` accent pair around the new artwork.

## Delivery path

The user identified the public GitHub repository `https://github.com/Tadarak-app/vista-royal` as the existing site source and requested changes to its Vercel site. Make changes in a clean working copy of that repository and validate the static build. A public repository permits reading and preparing changes but does not itself grant authority to push to the repository or deploy to the Vercel project. The currently connected Vercel account has not exposed the Vista Royal project; do not claim publication or attempt to take over the domain. If write/deploy access remains unavailable, deliver the prepared changes and clearly state the access required for publication.
