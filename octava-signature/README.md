# OCTAVA — Production Email Signature ("Assembly")

Premium monochrome signature with the exploded-assembly hero animation: the four
geometric components of the OCTAVA symbol drift in shallow 3D space, magnetically
assemble with a subtle mechanical lock, receive one quiet light sweep, and hold on
the completed symbol. The GIF carries **no loop extension**, so it plays **once**
and rests on the assembled logo (brief Option A).

## Files

```
/octava-signature
    signature.html      production, email-safe only (tables + inline CSS)
    preview.html        dev preview — open locally, uses relative asset paths
    README.md           this file
    /assets             master copies of all six images
```

## Asset list

| Asset | Dimensions (asset → displayed) | Size | Live URL |
|-------|-------------------------------|------|----------|
| `octava-symbol-animated.gif` | 300×300 → 150×150 (2× retina) | 493 KB | https://www.octava.cloud/images/email/octava-symbol-animated.gif |
| `octava-symbol.png` | 300×300 → 150×150 | 7 KB | https://www.octava.cloud/images/email/octava-symbol.png |
| `octava-wordmark.png` | 280×44 → 134×21 | 7 KB | https://www.octava.cloud/images/email/octava-wordmark.png |
| `octava-small-icon.png` | 52×52 → 26×26 | 1 KB | https://www.octava.cloud/images/email/octava-small-icon.png |
| `icon-web.png` | 48×48 → 20×20 | 3 KB | https://www.octava.cloud/images/email/icon-web.png |
| `icon-email.png` | 48×48 → 20×20 | 1 KB | https://www.octava.cloud/images/email/icon-email.png |

GIF timeline (35 frames): 0.7s exploded hold → 1.0s eased assembly with ~1.5px
overshoot → 0.3s settle lock → 0.4s rest → 0.6s vertical light sweep → 4s final
hold, then stops. First frame = elegant exploded view (what classic Outlook
shows); last frame = pristine assembled symbol.

## Hosting

The assets are **already live** — they ship with the website repo
(`public/images/email/`), so a normal `git push` deploys them via Vercel. Nothing
else to do.

To move to a dedicated host later (e.g. `https://assets.octava.cloud/email/`):
1. Create the subdomain (Vercel → add domain, or any static host / Azure Storage).
2. Upload the six files from `/octava-signature/assets/`.
3. In `signature.html`, replace every occurrence of
   `https://www.octava.cloud/images/email/` with the new base URL. Those are the
   only URLs in the file (all six are listed in the header comment).

Note: always host on a URL that returns the image directly — the apex
`octava.cloud` 307-redirects to `www`, and some mail clients won't follow
redirects for images (links are fine, so `href`s use the apex).

## Installing in Outlook

**New Outlook (Windows) / Outlook Web**
1. Open `signature.html` in Edge/Chrome (or use the preview page's copy button).
2. `Ctrl+A`, `Ctrl+C`.
3. Outlook → Settings (gear) → Account → **Signatures** → **+ New signature**.
4. Click into the editor, `Ctrl+V`, name it `OCTAVA Assembly`, **Save**.
5. Set it as default for **New messages** (use a compact signature for replies).

**Classic Outlook (Windows)**
1. Same copy step as above.
2. File → Options → Mail → **Signatures…** → **New** → paste → **OK**.
3. If styling drops, use the paste dropdown → *Keep Source Formatting*.

**Outlook for Mac / Apple Mail / Gmail** — same copy-paste flow into each
client's signature settings. Gmail: Settings → See all settings → General →
Signature → Create new → paste → Save.

**Outlook mobile** — supports plain text only; use:
`Marcelo Santos · OCTAVA Consulting · octava.cloud`

## Compatibility checklist

- [x] Layout: nested tables, no flex/grid/position/margin dependencies
- [x] All styles inline; no `<style>` block required by the signature
- [x] Explicit `width`/`height` HTML attributes on every image
- [x] System fonts only (Arial / Helvetica; Courier New for technical labels)
- [x] All six images hosted (no attachments, no local paths, no redirects)
- [x] `alt` text on every image (`OCTAVA`, `OCTAVA Consulting`, `Website`, `Email`)
- [x] Contact info is real selectable HTML text, never only inside an image
- [x] Every link explicit: symbol/wordmark/globe → https://octava.cloud, envelope/address → mailto
- [x] Animation via GIF only — no CSS animation/JS/SVG dependencies
- [x] First and last GIF frames both look professional on their own
- [x] GIF 493 KB (under the 500 KB target); all other assets ≤ 7 KB
- [x] `mso-line-height-rule:exactly` guards line heights in Word engine
- [x] Border-radius is decorative only — square fallback loses nothing

## What renders differently in Classic Outlook (Word engine)

| Feature | Everywhere else | Classic Outlook |
|---------|-----------------|-----------------|
| Hero animation | Plays once, rests on assembled symbol | Static first frame (exploded view — still looks designed) |
| Rounded card + capsule corners | 20px / 21px radius | Square corners |
| Letter-spacing on labels | 2px tracking | Renders, may vary ±0.5px |
| Border color | #E2E2E2 hairline | Identical |
| Layout / spacing / fonts | Table-locked | Identical |

No conditional MSO code was needed — the base markup is already Word-engine-safe.
