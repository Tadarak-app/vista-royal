# Vista Royal redesign — production verification

**Status:** Published and smoke-tested on 16 November 2026.

- Live storefront: [vista-royal.vercel.app](https://vista-royal.vercel.app/)
- Source repository: [Tadarak-app/vista-royal](https://github.com/Tadarak-app/vista-royal)
- Application release commit: `314aa705020e62ff60c1597c14d303877a14f2d5` (`Refine Vista Royal campaign hero image crop`)
- Vercel deployment check: [deployment status](https://vercel.com/czarzohaib-6838/vista-royal/GXx6AqyaSqRvjrRrwK5YLa7BLAZJ) — success.

## What changed

The former tab-first boutique page is now a campaign-led Pakistani fashion storefront with the supplied Vista Royal branding, refined white/alabaster/charcoal/champagne-gold palette, editorial typography, responsive category navigation, curated collection pages, a lookbook, product details and client-care information. It uses an original Vista Royal presentation inspired by established Pakistani retail hierarchy, without implying another brand’s history or copying its assets.

The existing 31 catalog entries and their photos were preserved. Seven additional source-backed items were added, for 38 total catalog products. All 97 photos from the supplied PDF are in the repository; 44 are confidently grouped with the seven added products, six additional images are used only as editorial/lookbook imagery, and 47 remain unassigned. Five supplier product entries remain unpublished because their photo matches could not be confidently established. See `TODO.md` for the held item names.

The local guest cart supports quantity changes and subtotals, then hands off an enquiry through WhatsApp. It is not an online checkout, and does not claim to confirm orders. Unsupported stock, size, delivery and payment details are not invented.

## Validation

- `pnpm check` — passed.
- `pnpm test` — 2 test files, 6 tests passed.
- `pnpm build:static` — passed; generated 55 indexable routes, including 38 product pages, sitemap and robots rules.
- Metadata/image audit — 55 sitemap entries, valid sitemap XML, no missing referenced product images, no title/description length errors.
- Browser QA — desktop and 390px mobile previews; collection search for “Amave” returned one item; adding quantity 2 produced the correct Rs. 11,598 subtotal, then the temporary preview cart was cleared.
- Production smoke test — the homepage, New In, Shop All, Amave product, Lookbook, size-guidance page, sitemap, final CSS bundle and a supplied product image all returned HTTP 200. The sitemap contains the new product URL; the live CSS contains the final hero crop.

## Preview images

![Vista Royal desktop homepage preview](/home/ubuntu/vista-royal-preview-desktop.png)

![Vista Royal mobile homepage preview](/home/ubuntu/vista-royal-preview-mobile.png)
