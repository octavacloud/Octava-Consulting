# Octava Consulting — Website

Premium Azure cloud engineering and AI automation consultancy website.
Built with Next.js 15, Tailwind CSS, and Framer Motion.

**Stack: Azure DevOps Repos → Vercel (auto-deploy on push)**

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Source control**: Azure DevOps Repos
- **Hosting + CI/CD**: Vercel (deploys automatically on every push)

---

## Local Development

### Prerequisites
- Node.js 20+
- npm

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Deployment Guide — Azure DevOps Repos + Vercel

### How it works
```
VS Code → git push → Azure DevOps Repo → Vercel detects push → builds & deploys
                                                    ↓
                                              octava.cloud ✅
```
Every push to `main` triggers Vercel automatically. No pipeline YAML needed.

---

### STEP 1 — Azure DevOps: Create your repo

1. Go to [dev.azure.com](https://dev.azure.com) — sign in with your Microsoft account
2. Create an **Organisation** (e.g. `octava`) and a **Project** (e.g. `octava-website`)
3. Go to **Repos** → it will show an empty repo with a clone URL

Push your code from VS Code terminal:

```bash
cd octava-consulting

git init
git add .
git commit -m "Initial commit — Octava Consulting"

# Paste your clone URL from Azure DevOps → Repos → Clone
git remote add origin https://YOUR_ORG@dev.azure.com/YOUR_ORG/octava-website/_git/octava-website

git push -u origin main
```

> **Tip:** VS Code will prompt you to sign in to Azure DevOps when you push.
> Use your Microsoft account credentials.

---

### STEP 2 — Vercel: Connect Azure DevOps

1. Go to [vercel.com](https://vercel.com) → **Sign up** (use your email, not GitHub)
2. Once in the dashboard → **Add New Project**
3. At the top of the import screen, click **"Import Third-Party Git Repository"** (or "Configure Git Provider")
4. Select **Azure DevOps** as the Git provider
5. Vercel will ask you to **authorise** access to your Azure DevOps organisation — approve it
6. Your repos will appear — select **octava-website**
7. Vercel auto-detects Next.js — no configuration needed
8. Click **Deploy**

First deploy takes ~2 minutes. You'll get a live URL like `octava-website.vercel.app`.

---

### STEP 3 — Add your custom domain (octava.cloud)

1. In Vercel → your project → **Settings → Domains**
2. Click **Add** → type `octava.cloud` → Add
3. Also add `www.octava.cloud`
4. Vercel gives you DNS records to add — two options:

**Option A — Nameservers (easiest, recommended)**
Point your domain's nameservers to Vercel's:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B — Keep your registrar, add DNS records manually**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. SSL certificate auto-provisions within minutes — Vercel handles renewal forever

---

### STEP 4 — Every future update

```bash
# Make changes in VS Code, then:
git add .
git commit -m "Update hero copy"
git push
```

Vercel detects the push → builds → deploys in ~60 seconds. Done.

---

## Contact Form

The form currently simulates submission. To wire it up for real:

### Formspree (easiest — free tier, no backend)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form → copy your form ID (e.g. `xpzvgkja`)
3. In `src/components/sections/ContactSection.tsx`, replace `handleSubmit`:

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)
  const data = new FormData(e.currentTarget)
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  setLoading(false)
  setSubmitted(true)
}
```

4. Add `name="..."` attributes to each `<input>` and `<textarea>` in the form
5. Push → Vercel deploys → form emails land in your inbox

---

## Customisation

| What | Where |
|------|-------|
| Services content | `src/components/sections/ServicesSection.tsx` |
| Projects / case studies | `src/components/sections/ProjectsSection.tsx` |
| Capabilities list | `src/components/sections/CapabilitiesSection.tsx` |
| About / founder text | `src/components/sections/FounderSection.tsx` |
| Nav links | `src/components/layout/Navbar.tsx` |
| SEO / metadata | `src/app/layout.tsx` |
| Global styles | `src/app/globals.css` |

### Add OG image for social sharing
Place a `1200×630px` PNG at `public/images/og-image.png`

---

## Vercel Free Tier Limits

| Feature | Free (Hobby) |
|---------|-------------|
| Custom domains | Unlimited |
| SSL | ✅ Auto |
| Bandwidth | 100 GB/month |
| Deployments | Unlimited |
| Preview deployments | ✅ Every push |
| Serverless functions | 100k/month |
| Price | $0 |

---

© 2024 Octava Consulting
