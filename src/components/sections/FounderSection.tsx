'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-white/[0.05]"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>About</SectionLabel>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mt-4">
          {/* Visual */}
          <motion.div
            className="relative max-w-md"
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer frame */}
            <div className="relative aspect-square border border-white/[0.08]">
              {/* Corner marks */}
              {['tl', 'tr', 'bl', 'br'].map((pos) => (
                <div
                  key={pos}
                  className={`absolute w-4 h-4 border-white/30 ${
                    pos === 'tl' ? 'top-4 left-4 border-t border-l' :
                    pos === 'tr' ? 'top-4 right-4 border-t border-r' :
                    pos === 'bl' ? 'bottom-4 left-4 border-b border-l' :
                    'bottom-4 right-4 border-b border-r'
                  }`}
                />
              ))}

              {/* Inner grid lines */}
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white/[0.04]" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white/[0.04]" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/[0.04]" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/[0.04]" />
              </div>

              {/* Centered logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-40 h-40 opacity-30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                >
                  <Image
                    src="/images/logo-icon-nb.png"
                    alt=""
                    fill
                    className="object-contain invert brightness-0 invert"
                    aria-hidden
                  />
                </motion.div>
              </div>

              {/* Animated scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Caption */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-px bg-white/15" />
              <span className="font-mono text-[11px] tracking-[1px] text-white/25 uppercase">
                Octava Consulting
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[clamp(28px,4vw,54px)] font-extrabold leading-[1.1] tracking-[-2px] mb-8">
              Built in Brisbane.
              <br />
              <span className="text-white/30">Designed for modern cloud teams.</span>
            </h2>

            <p className="text-[16px] text-white/42 leading-[1.8] font-normal mb-6">
              Octava Consulting is led by a Brisbane-based Azure cloud engineer helping
              organisations modernise their cloud infrastructure, automation, and AI capabilities.
            </p>

            <p className="text-[16px] text-white/38 leading-[1.8] font-normal mb-10">
              We work with government agencies, enterprise teams, and forward-thinking SMBs who
              need senior technical expertise without the overhead of a large consulting firm.
            </p>

            {/* Location pill */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-white/35"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="font-mono text-[11px] tracking-[1.5px] text-white/30 uppercase">
                Brisbane, Queensland, Australia
              </span>
            </div>

            {/* Certifications row */}
            <div className="mt-12 pt-8 border-t border-white/[0.06]">
              <p className="font-mono text-[10px] tracking-[1.5px] text-white/20 uppercase mb-4">
                Focus Areas
              </p>
              <div className="flex flex-wrap gap-3">
                {['Microsoft Azure', 'Government Sector', 'Enterprise AI', 'Brisbane Based'].map(cert => (
                  <span
                    key={cert}
                    className="border border-white/[0.08] font-mono text-[11px] tracking-[0.5px] text-white/30 px-3 py-1.5"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
