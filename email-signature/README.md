# Octava Email Signatures

Three Outlook-safe HTML signatures built on the Octava brand system (black `#050505`, white,
mono uppercase labels, sharp corners). All are table-based with inline styles only — that is
the only thing classic Outlook (Word rendering engine), Gmail, and Apple Mail all render
consistently. The logo is loaded from `https://www.octava.cloud/images/logo-icon-nb.png`
(the `www` host — the apex domain 307-redirects, which some mail clients won't follow for
images), so recipients always see it without attachments.

| File | Variant | Use for |
|------|---------|---------|
| `octava-dark.html` | **V01 Dark Card** — full black card, contact rows, `BOOK A CALL →` button | New emails. The statement piece. |
| `octava-dark-animated.html` | **V01-A Dark Card, Animated** — same card, logo is a GIF: clock-tick rotation plus a scan line sweeping up and down | New emails, when you want the kinetic version. **Push to deploy first** (see below). |
| `octava-dark-fullsweep.html` | **V01-X Dark Card, Full Sweep** — the whole card is one GIF; the beam sweeps edge to edge while the logo ticks | Maximum effect. Whole card is a single image/click target; real links sit in a line below. **Push to deploy first.** |
| `octava-outline.html` | **V04 Outline Card** — light outlined card with icon rail, brand lockup, and the diagonal-sliced chip | A lighter, editorial look. **Push to deploy first** (uses the `sig-*.png` assets). |
| `octava-light.html` | **V02 Light Chip** — black logo chip, everything else blends into the email | Conservative recipients (government, enterprise). |
| `octava-compact.html` | **V03 Compact** — two-line strip | Replies / forwards. |

## The animated variant

`public/images/logo-icon-scan.gif` (104 KB, 24 frames) combines two movements: the pinwheel
ticks 30° every second like a clock, and a scan line sweeps top → bottom → top once per 12s
loop, mirroring the website's scanner. It is committed with the site — **push the repo so
Vercel deploys it** before installing `octava-dark-animated.html`, otherwise recipients get a
broken image. (`logo-icon-spin.gif` is the earlier tick-only version, kept for reference.)
Client support:

- **Animates:** Gmail, Outlook Web / new Outlook, Apple Mail, Outlook mobile.
- **First frame only:** classic Outlook desktop (Word engine doesn't play GIFs). Frame 1 is
  the normal upright logo, so it degrades to exactly the static V01 look.

## The full-sweep variant

`public/images/signature-card-scan.gif` (318 KB, 960×404 rendered at 2× for a crisp 480×202
display) is the entire V01 card as one image — pinwheel ticking plus the beam sweeping the
full card width, two sweeps per 12s loop, with 16px rounded corners baked into the image
(the only way to get border-radius past Outlook). Corners are transparent with a white-blended
anti-aliasing fringe: flawless on white emails, a faint hairline at worst in dark-mode clients. Because it's a single image: one click target (the
contact page), the mailto/web links live in a small text line under the card, and recipients
can't copy the email address out of the image. Classic Outlook shows the static first frame.
Text is rendered with real Segoe UI / Consolas at 2×, so it stays sharp on retina screens.

## Install — New Outlook (Windows) / Outlook Web

1. Open the signature file in Edge or Chrome (double-click it).
2. Press `Ctrl+A`, then `Ctrl+C` (copies the rendered signature, not the code).
3. Outlook → **Settings (gear) → Account → Signatures**.
4. Click **+ New signature**, name it (e.g. `Octava Dark`), click into the editor and press `Ctrl+V`.
5. Under **Select default signatures**, set **New messages** → `Octava Dark` and
   **Replies/forwards** → `Octava Compact`. Save.

## Install — Classic Outlook (desktop)

1. Same copy step: open the file in a browser, `Ctrl+A`, `Ctrl+C`.
2. Outlook → **File → Options → Mail → Signatures… → New**, name it, paste into the editor, **OK**.
   - If paste loses formatting, use the paste dropdown → **Keep Source Formatting**.

## Install — Gmail

Gmail strips nothing important from these. **Settings → See all settings → General → Signature
→ Create new**, paste, save. (The `mso-` properties are ignored harmlessly.)

## Install — Outlook mobile

Outlook for iOS/Android only supports its own plain-text signature and does not sync desktop
signatures. Set the mobile signature to:

```
Marcelo Santos · Octava Consulting
octava.cloud · marcelo@octava.cloud · Brisbane, AU
```

## Customising

**Add a phone row** (dark card — insert as a new cell group in the contact-rows table):

```html
<td style="font-family:Consolas,'Courier New',monospace; font-size:10px; color:#5c5c64; letter-spacing:1px;">P&nbsp;&nbsp;</td>
<td><a href="tel:+61400000000" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif; font-size:13px; color:#e4e4e7; text-decoration:none;">+61 400 000 000</a></td>
```

**Add LinkedIn** — add another `L` labelled cell pair the same way, linking to your profile.

**Change the CTA** — the `BOOK A CALL →` button links to `https://www.octava.cloud/#contact`.
Swap in a Calendly/Microsoft Bookings URL when you have one; scheduling links are the
highest-converting signature CTA.

## Technical notes

- **Why tables and inline styles:** classic Outlook renders HTML with Microsoft Word's engine —
  no flexbox, no grid, no `border-radius`, no external CSS. Sharp corners are also on-brand.
- **Dark mode:** the dark card survives client dark modes best (already dark). Gmail's dark
  mode may recolor the light variants; text stays legible.
- **Image weight:** the hosted icon is 62 KB — fine for one image. Width/height are set as
  HTML attributes because Outlook ignores CSS sizing on images.
- **Don't edit in Word/Outlook's editor** beyond small text tweaks — it rewrites the HTML.
  Edit the source files here and re-paste instead.
