# TODO

## Existing storefront requirements retained

- [x] Preserve the 31 existing photographed products and their owner-provided prices (13 at PKR 3,850; 18 at PKR 4,230), image descriptions and source image paths.
- [x] Retain the supplied Vista Royal logo, favicon/app icons, PWA manifest and offline shell.
- [x] Keep the owner-reported 4.3/5 WhatsApp feedback distinct from Facebook reviews; preserve sourced Lahore contact details, the Facebook link and exchange wording.
- [x] Retain the locally persisted guest cart and WhatsApp enquiry workflow; make clear that an enquiry is not a confirmed order.

## Established-brand redesign — 16 November 2026

- [x] Replace the tab-first landing flow with an editorial campaign homepage, direct collection navigation, a lookbook and structured client-care footer.
- [x] Apply the premium Pakistani fashion-house direction using white, warm alabaster, charcoal and restrained champagne-gold; pair editorial serif display type with clean commerce UI and the supplied brand mark.
- [x] Add New In, Occasionwear, Embroidered, Winter Edit, Printed Edit, Lookbook and Shop All navigation, plus collection, product and information routes.
- [x] Add search, source-backed fabric filtering, PKR price range and sorting; improve product galleries, detail disclosures, quantity selection, cart subtotals and WhatsApp enquiries.
- [x] Retain all 31 existing listings and add seven source-backed listings for a total of 38 catalog items.
- [x] Copy all 97 photos from `100stockVR.pdf`. Group 44 photos with the seven added products; use six other photos only as lookbook/editorial imagery without product claims; leave 47 unassigned.
- [x] Hold five supplier entries out of the catalog because their photos could not be confidently matched: Winterpret/Dhank Marina 2-piece, Velvetpret 3-piece, Festivecollection chiffon sharara, Hania Aamir Viral Dress, and the new velvet 3-piece.
- [x] Keep claims honest: no guessed stock, sizing, brand association, company history, awards, delivery promises or payment methods.
- [x] Generate 55 indexable static routes with per-route metadata, canonicals, sitemap, robots rules and Vercel direct-path support.
- [x] Pass `pnpm check`; pass `pnpm test` (6 tests); pass `pnpm build:static`; pass generated-page, SEO metadata and asset audits.
- [x] Verify desktop and 390px mobile layouts; check collection search, product quantity, two-unit cart subtotal (Rs. 11,598), and cart clearing.
- [x] Publish application code commit `314aa70` to `main`; the Vercel status completed successfully and the production route, sitemap, CSS and uploaded image checks returned HTTP 200.

## Intentionally deferred until an owner-connected service is configured

Customer accounts, payment checkout, online order management, live order tracking, newsletter registration, stock synchronization and COD/bank-transfer or delivery promises. WhatsApp remains an enquiry handoff, not order confirmation.


## November stock and campaign media update — 19 November 2026

- [x] Review the November stock PDF and separate supplier details. Combine similar photos of the same product in one gallery and place each matched item in an existing category.
- [x] Add CRIMSOON BRAND Embroidered 2PC Collection at Rs. 2,900 with Dhanak Marina fabric, an embroidered shirt front, embroidered sleeves and embroidered trouser; group the matching PDF colourways.
- [x] Add Blissonia silk kaftan 2-piece at Rs. 5,200 with heavy sequin embroidery, lace embellishment and silk trouser; retain supplier size and length notation with units flagged as unspecified.
- [x] Add Blissonia chiffon maxi 3-piece at Rs. 4,550 with sequins-tilla embroidery, attached full inner, chiffon dupatta embellished with gotta lace and kattan silk trouser; retain supplier measurement notation with units flagged as unspecified.
- [x] Replace the homepage hero photo with the supplied deep-teal embroidered look and frame it responsively so the neckline embroidery and roses remain visible.
- [x] Add the supplied lookbook video in a dedicated homepage showcase; autoplay, loop and begin muted, with an accessible mute/unmute control and responsive sizing; preserve the established warm luxury palette, typography and layout balance.
- [x] Preserve the previously published 38 listings, add these three November products for a total of 41 product pages, and prerender 58 canonical pages including collections and information routes.
