# Vista Royal — storefront plan

## Scope

Build the public, mobile-first Vista Royal boutique storefront as a Vite/React single-page site. Follow the user's requested Penzo Mart reference (https://penzo-lovat.vercel.app/) for commerce clarity and card treatment, and the Call Me Drake reference (https://callmedrake.vercel.app/) for a numbered top-tab navigation and distinct in-page sections. Provide a persistent top row with clear **Home**, **Shop**, **Reviews**, **Exchange**, **About**, and **Contact** tabs. The selected tab replaces the content panel in place without following anchor links, changing the page route, or reloading. Product details remain a separate new-tab route. Use the requested three-part footer: left-side rights notice, centered Facebook logo link, and right-side developer credit link.

The requested Facebook page describes Vista Royal as “Redefining Pakistani fashion for the modern woman, Vista Royal brings you elite boutique designs at highly accessible price points,” and identifies it as a clothing brand in Barki Road. Its accessible public view gives +92 328 5945319 and czarzohaib@gmail.com but no product listings, individual product photographs, or prices. Do not fabricate listings, prices, or testimonials. A typed catalog model and presentation components are ready for real owner-provided data; until then the Shop tab shows a clear no-catalog-yet state and a WhatsApp enquiry. The 4.3/5 display is owner-reported overall WhatsApp feedback, not an individual product score or a Facebook rating; the Facebook page currently reports “Not yet rated (0 reviews).” Do not invent a review count, rating distribution, or customer quote.

**Explicitly deferred per the user's latest instruction:** Google/email authentication, sign-in/sign-out, persistent customer accounts, authenticated checkout, server-side order creation, and automatic order-confirmation email. “Order now” is a WhatsApp enquiry for this phase and must not imply an order is confirmed. Keep the site usable without login.

## Implementation and project structure

- `client/src/pages/Home.tsx`: persistent accessible tab bar, Home/Shop/Reviews/Exchange/About/Contact panels, search/filter, verified rating context, owner/policy/contact content, and the three-column attribution footer.
- `client/src/pages/Product.tsx`: product-detail route opened in a new tab using client-side navigation; render only when a real catalog item exists.
- `client/src/components/store/`: product card and guest cart drawer, with keyboard focus containment and restoration.
- `client/src/data/catalog.ts`: typed, presently empty owner-maintained catalog source; no fake products or prices.
- `client/src/lib/storefront.ts` and `client/src/contexts/CartContext.tsx`: PKR formatting, safe WhatsApp enquiry links, and guest cart backed by local storage.
- `client/public/assets/vista-royal-editorial.webp`: original hero-only editorial fabric artwork bundled into the Vercel static build, never presented as a purchasable garment.
- `client/public/manifest.webmanifest`, `client/public/sw.js`, and `client/public/icons/`: app-owned PWA manifest, install icons, service worker and offline shell.
- `client/public/manus-routes.json`: synchronized page-route declaration required by Webdev.
- `client/index.html` and `app.config.ts`: page/PWA metadata and project logo reference.
- Existing Webdev starter's React/Vite app, Express preview server, and TypeScript diagnostics remain in place. No account, authentication, or checkout backend is added in this phase.

## Design system

**Design movement:** Saffron Modernist — near-black foundations, controlled saffron accents and oversized labels within a crisp, functional marketplace layout.

**Core principles:** commerce controls stay obvious; mobile browsing comes first; brand decoration never obscures product information; business claims remain attributable and accurate.

**Color philosophy:** ink-black surfaces create strong contrast and a boutique editorial tone; saffron is reserved for actions and small signature accents; warm ivory carries reading surfaces without competing with product photography.

**Layout paradigm:** compact sticky brand header, distinct numbered top tabs inspired by the owner's Call Me Drake site, and one active content panel at a time. Home leads with an editorial hero and section shortcuts; Shop contains search, collections and responsive product cards; Reviews, Exchange, About and Contact each have their own in-place panel. On mobile the tab row remains visible, scrolls horizontally when needed, and keeps a distinct active indicator. Do not use scrolling anchor navigation between these sections. The footer has three explicit aligned roles: rights text at left, an accessible Facebook logo-link in the center, and a developer-credit button at right.

**Signature elements:** a restrained crown/VR-inspired wordmark; thin saffron rules and corner markers; concise uppercase section indices. These are graphic framing devices, not claimed official artwork.

**Interaction philosophy and animation:** use semantic tabs with a selected state and arrow/Home/End keyboard navigation; switching tabs replaces the active content in the same page and presents the new panel from its start. Preserve search and cart state; open a product in a separate tab without forcing a full-document navigation; keep motion brief and honor reduced-motion preferences. WhatsApp enquiry buttons open the supplied chat number with a safely encoded product/cart summary.

**Typography:** Syne for display and navigation, paired with DM Sans for body and commerce details. Large editorial headings are balanced by compact, high-legibility prices and controls.

**Brand essence:** accessible boutique fashion for modern women; confident, considered, direct.

**Brand voice:** grounded and helpful, never claiming unverified stock or review details. Examples: “Discover the Vista Royal collection.” “Ask us on WhatsApp for current availability.”

**Wordmark and signature brand color:** a bespoke inline geometric VR/crown mark beside the Vista Royal name; saffron `#D99014` on ink `#171512` is the ownable accent pair.

## Delivery path

The user requests Vercel hosting connected to GitHub and a public GitHub repository. Use a Vercel Git-linked project if the user's existing integrations and permissions support creating a public source repository. Do not silently substitute Manus hosting for the expressly requested Vercel destination or claim a public repository if only a private target is supported. The source contains no credentials. PWA ownership is application-owned because this site supplies its own manifest and service worker. Publish only after the real-catalog limitation and any repository/integration blockers are visible; do not enable automatic publication without an existing authorization state.
