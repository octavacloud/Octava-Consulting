'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { products, type Product } from '@/data/products'

export function ProductLogo({ product, size = 'card' }: { product: Product; size?: 'card' | 'hero' }) {
  const isSquare = product.logo.width === product.logo.height
  const tile = size === 'hero' ? 'h-24 px-7' : 'h-16 px-5'
  const bg = product.logo.bg === 'light' ? 'bg-white' : 'bg-[#0a0a0a] border border-white/[0.08]'
  const imgH = size === 'hero' ? (isSquare ? 'h-14' : 'h-10') : (isSquare ? 'h-9' : 'h-7')
  return (
    <div className={`inline-flex items-center justify-center ${tile} ${bg}`}>
      <Image
        src={product.logo.src}
        alt={product.logo.alt}
        width={product.logo.width}
        height={product.logo.height}
        className={`${imgH} w-auto object-contain`}
        unoptimized={product.logo.src.endsWith('.svg')}
      />
    </div>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      className="group relative bg-[#050505] p-12 md:p-14 border-b border-r border-white/[0.06] min-h-[420px] flex flex-col justify-between overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${index % 2 === 0 ? '25% 30%' : '75% 70%'}, rgba(255,255,255,0.035) 0%, transparent 60%)`,
        }}
      />

      <div>
        <div className="flex items-start justify-between gap-6 mb-8">
          <ProductLogo product={product} />
          <div className="text-right">
            <p className="font-mono text-[11px] tracking-[2px] text-white/20 mb-1">— {String(index + 1).padStart(2, '0')}</p>
            <p className="font-mono text-[11px] tracking-[1px] text-white/30 uppercase">{product.status}</p>
          </div>
        </div>

        <h3 className="text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-1.2px] leading-none mb-2">
          {product.name}
        </h3>
        <p className="font-mono text-[11px] tracking-[1.5px] text-white/45 uppercase mb-6">
          {product.subtitle}
        </p>

        <p className="text-[14px] text-white/40 leading-relaxed font-normal mb-8 max-w-[52ch]">
          {product.cardDescription}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-8">
          {product.stack.slice(0, 5).map(t => (
            <span
              key={t}
              className="border border-white/[0.07] font-mono text-[10px] tracking-[0.5px] text-white/25 px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href={`/products/${product.slug}`}
            className="font-mono text-[11px] tracking-[1.5px] text-white uppercase border-b border-white/30 pb-1 hover:border-white transition-colors duration-300"
            data-cursor-hover
          >
            Product details →
          </Link>
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[1.5px] text-white/45 uppercase hover:text-white transition-colors duration-300"
            data-cursor-hover
          >
            {product.externalCta} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="products"
      className="border-t border-white/[0.05]"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Built by Octava</SectionLabel>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end mb-20">
          <motion.h2
            className="text-[clamp(36px,5vw,72px)] font-extrabold leading-[1] tracking-[-2px]"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Products we<br />
            <span className="text-white/25">ship ourselves.</span>
          </motion.h2>
          <motion.p
            className="text-[15px] text-white/40 leading-relaxed max-w-[38ch] md:pb-3"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            We don&apos;t just advise — we design, build and run production software on the
            same Azure, DevOps and AI foundations we recommend to clients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/[0.06]">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
