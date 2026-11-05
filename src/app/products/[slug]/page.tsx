import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { ProductLogo } from '@/components/sections/ProductsSection'
import { products, getProduct } from '@/data/products'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  const title = `${product.name} — ${product.subtitle}`
  return {
    title,
    description: product.metaDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} | Built by Octava`,
      description: product.metaDescription,
      url: `https://octava.cloud/products/${product.slug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description: product.metaDescription },
  }
}

const mono = 'font-mono text-[11px] tracking-[2px] text-white/30 uppercase'

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-[140px] md:pt-[180px] pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12">
          <Reveal>
            <Link href="/#products" className={`${mono} hover:text-white transition-colors`}>
              ← Built by Octava
            </Link>
          </Reveal>
          <Reveal delay={0.05} className="mt-10 mb-8">
            <ProductLogo product={product} size="hero" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[clamp(40px,6vw,84px)] font-extrabold leading-[1] tracking-[-2.5px] mb-4">
              {product.name}
            </h1>
            <p className="font-mono text-[12px] tracking-[2px] text-white/45 uppercase mb-8">
              {product.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[clamp(18px,2vw,24px)] text-white/60 leading-[1.5] max-w-[40ch] mb-12">
              {product.oneLiner}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-wrap items-center gap-4">
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-background px-7 py-4 text-[14px] font-bold tracking-[0.3px] hover:bg-white/90 transition-colors"
            >
              {product.externalCta} <ArrowUpRight size={15} />
            </a>
            <Link
              href="/#contact"
              className="border border-white/15 hover:border-white/40 text-white px-7 py-4 text-[14px] font-semibold tracking-[0.3px] transition-colors"
            >
              Build something like this with Octava
            </Link>
            <span className={`${mono} ml-2`}>{product.status}</span>
          </Reveal>
        </div>
      </section>

      {/* Problem / What it does */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {product.problem && (
            <Reveal>
              <SectionLabel>The problem</SectionLabel>
              <p className="text-[17px] text-white/50 leading-[1.8]">{product.problem}</p>
            </Reveal>
          )}
          <Reveal delay={0.1} className={product.problem ? '' : 'md:col-span-2 max-w-[68ch]'}>
            <SectionLabel>What {product.name} does</SectionLabel>
            <div className="flex flex-col gap-5">
              {product.what.map((p, i) => (
                <p key={i} className="text-[17px] text-white/50 leading-[1.8]">{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* What customers get */}
      {product.gets && (
        <section className="border-t border-white/[0.05]">
          <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>What customers get</SectionLabel>
            </Reveal>
            <ul className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/[0.06]">
              {product.gets.map((g, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <li className="h-full p-8 md:p-10 border-b border-r border-white/[0.06]">
                    <p className="font-mono text-[11px] tracking-[2px] text-white/20 mb-4">— {String(i + 1).padStart(2, '0')}</p>
                    <p className="text-[15px] text-white/60 leading-relaxed">{g}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Key features */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-24 md:py-32">
          <Reveal>
            <SectionLabel>Key features</SectionLabel>
            <h2 className="text-[clamp(30px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-1.5px] mb-16">
              Built for the people<br />
              <span className="text-white/25">who use it every day.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.06]">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="h-full p-8 md:p-10 border-b border-r border-white/[0.06]">
                  <h3 className="text-[17px] font-bold tracking-[-0.3px] mb-3">{f.title}</h3>
                  <p className="text-[14px] text-white/40 leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Built by Octava on Azure */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 items-start">
          <Reveal>
            <SectionLabel>Built by Octava on Microsoft Azure</SectionLabel>
            <p className="text-[17px] text-white/50 leading-[1.8] mb-10">{product.builtOn}</p>
            <div className="flex flex-wrap gap-2">
              {product.stack.map(t => (
                <span key={t} className="border border-white/[0.08] font-mono text-[11px] tracking-[0.5px] text-white/40 px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-white/10 p-8 md:p-10">
              <p className={`${mono} mb-4`}>Status</p>
              <p className="text-[18px] font-bold tracking-[-0.3px] mb-3">{product.status}</p>
              <p className="text-[14px] text-white/45 leading-relaxed mb-8">{product.statusNote}</p>
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[1.5px] text-white uppercase border-b border-white/30 pb-1 hover:border-white transition-colors"
              >
                {product.externalCta} <ArrowUpRight size={13} />
              </a>
              <p className="font-mono text-[10px] tracking-[1.5px] text-white/20 uppercase mt-8">
                {product.name} · {product.year} · An Octava product
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-24 md:py-32">
          <Reveal>
            <h2 className="text-[clamp(30px,4.5vw,60px)] font-extrabold leading-[1.05] tracking-[-1.5px] mb-8 max-w-[22ch]">
              Have a product idea that needs
              <span className="text-white/25"> serious cloud engineering?</span>
            </h2>
            <Link
              href="/#contact"
              className="inline-block bg-white text-background px-8 py-4 text-[14px] font-bold tracking-[0.3px] hover:bg-white/90 transition-colors"
            >
              Talk to Octava →
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
