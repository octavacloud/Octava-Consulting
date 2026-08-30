'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

/**
 * Products built in-house by Octava.
 * To show a real logo, drop a PNG/SVG in /public/images/products/ and set `logo`.
 * Until then the card renders a typographic wordmark. Add `url` when live.
 */
const products = [
  {
    slug: 'certifyme',
    name: 'CertifyMe',
    tagline: 'Master your certifications.',
    description:
      'A certification mastery platform that helps engineers plan, track and pass professional cloud certifications — structured study paths, progress tracking and exam readiness in one place.',
    stack: ['Next.js', 'Azure', 'AI'],
    status: 'In development',
    url: undefined as string | undefined,
    logo: undefined as string | undefined,
  },
  {
    slug: 'meridian',
    name: 'Meridian',
    tagline: 'Global freight, orchestrated to the minute.',
    description:
      'A logistics orchestration platform with a 24/7 control tower — live shipment monitoring across air, ocean and overland freight, customs and final-mile, unified under one accountable view.',
    stack: ['Next.js', 'Vercel', 'Real-time'],
    status: 'Live',
    url: 'https://meridian-logistics.vercel.app' as string | undefined,
    logo: undefined as string | undefined,
  },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const Wrapper = product.url ? motion.a : motion.div
  const linkProps = product.url
    ? { href: product.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...linkProps}
      className="group relative block bg-[#050505] p-12 md:p-14 border-b border-r border-white/[0.06] min-h-[360px] flex flex-col justify-between overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-hover
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${index % 2 === 0 ? '25% 30%' : '75% 70%'}, rgba(255,255,255,0.035) 0%, transparent 60%)`,
        }}
      />

      <div>
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="font-mono text-[11px] tracking-[2px] text-white/20 mb-1">— PRODUCT {String(index + 1).padStart(2, '0')}</p>
            <p className="font-mono text-[11px] tracking-[1px] text-white/25 uppercase">
              Built by Octava &middot; {product.status}
            </p>
          </div>
          {product.url && (
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight size={14} className="text-white/60" />
            </div>
          )}
        </div>

        {/* Logo or typographic wordmark */}
        {product.logo ? (
          <Image
            src={product.logo}
            alt={product.name}
            width={220}
            height={56}
            className="h-12 w-auto object-contain mb-6"
          />
        ) : (
          <h3 className="text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-1.5px] leading-none mb-4">
            {product.name}
          </h3>
        )}

        <p className="font-mono text-[12px] tracking-[1px] text-white/50 uppercase mb-6">
          {product.tagline}
        </p>

        <p className="text-[14px] text-white/38 leading-relaxed font-normal mb-8 max-w-[46ch]">
          {product.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {product.stack.map(t => (
          <span
            key={t}
            className="border border-white/[0.07] font-mono text-[10px] tracking-[0.5px] text-white/25 px-2.5 py-1"
          >
            {t}
          </span>
        ))}
        {product.url ? (
          <span className="ml-auto font-mono text-[10px] tracking-[1.5px] text-white/40 uppercase group-hover:text-white transition-colors duration-300">
            Visit product ↗
          </span>
        ) : (
          <span className="ml-auto font-mono text-[10px] tracking-[1.5px] text-white/25 uppercase">
            Coming soon
          </span>
        )}
      </div>
    </Wrapper>
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
            We don&apos;t just advise — we build and run production software on the same
            Azure, DevOps and AI foundations we recommend to clients.
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
