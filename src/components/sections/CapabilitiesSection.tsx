'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

const capabilities = [
  'Azure Architecture & Migration',
  'Cloud Security & Compliance',
  'Infrastructure as Code',
  'Kubernetes & Container Platforms',
  'AI Integration & Automation',
  'Government Cloud Frameworks',
  'FinOps & Cost Optimisation',
  '24/7 Monitoring & Observability',
]

const stats = [
  { value: '100%', label: 'Azure focused' },
  { value: 'AU', label: 'Based Brisbane' },
  { value: '24h', label: 'Response time' },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="border-t border-white/[0.05]"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Capabilities</SectionLabel>
            </motion.div>

            <motion.h2
              className="text-[clamp(36px,5vw,72px)] font-extrabold leading-[1] tracking-[-2px] mb-16"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Enterprise<br />
              <span className="text-white/25">grade expertise.</span>
            </motion.h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="border-t border-white/10 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[28px] font-extrabold tracking-[-1px] mb-1">{stat.value}</p>
                  <p className="font-mono text-[11px] tracking-[1px] text-white/30 uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — capability list */}
          <div>
            <motion.div
              className="flex flex-col"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
            >
              {capabilities.map((cap) => (
                <motion.div
                  key={cap}
                  className="group flex items-center justify-between py-5 border-b border-white/[0.05] cursor-default"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  data-cursor-hover
                >
                  <span className="text-[15px] font-semibold text-white/55 group-hover:text-white transition-colors duration-300">
                    {cap}
                  </span>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300"
                    whileHover={{ scale: 1.5 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
