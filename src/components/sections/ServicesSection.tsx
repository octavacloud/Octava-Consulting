'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const services = [
  {
    number: '01',
    name: 'Azure Cloud Engineering',
    description:
      'Architecture, migration, and optimisation of enterprise Azure environments. Landing zones, governance, and cloud-native infrastructure designed for scale and security.',
    tags: ['Landing Zones', 'Governance', 'FinOps', 'Security'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        <rect x="8" y="28" width="32" height="14" />
        <path d="M16 28V18a8 8 0 0116 0v10" />
        <circle cx="24" cy="10" r="2" />
        <path d="M8 35h32M14 35v7M34 35v7M20 35v7M28 35v7" />
      </svg>
    ),
  },
  {
    number: '02',
    name: 'DevOps Automation',
    description:
      'CI/CD pipelines, infrastructure as code, and platform engineering. Transform manual processes into automated, reliable, auditable delivery systems.',
    tags: ['Terraform', 'CI/CD Pipelines', 'Bicep', 'GitHub Actions'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" />
        <circle cx="24" cy="24" r="4" />
        <path d="M17 17l2.8 2.8M28.2 28.2L31 31M17 31l2.8-2.8M28.2 19.8L31 17" />
      </svg>
    ),
  },
  {
    number: '03',
    name: 'AI Automation',
    description:
      'Intelligent workflow automation powered by Azure AI services. From document processing to agentic systems that fundamentally transform business operations.',
    tags: ['Azure OpenAI', 'Copilot', 'AI Agents', 'ML Ops'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        <path d="M12 36l8-16 6 8 4-6 6 14" />
        <rect x="6" y="8" width="36" height="28" />
        <path d="M6 40h36" />
        <circle cx="14" cy="16" r="2" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
    setTilt({ x: -y, y: x })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-[#050505] border-r border-white/[0.06] last:border-r-0 p-10 md:p-12 overflow-hidden group"
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }) }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transition: isHovered
          ? { duration: 0.1, ease: 'linear' }
          : { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-hover
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Number */}
      <p className="font-mono text-[11px] tracking-[2px] text-white/20 mb-12">{service.number}</p>

      {/* Icon */}
      <div className="w-12 h-12 mb-8 text-white/55 group-hover:text-white/80 transition-colors duration-500">
        {service.icon}
      </div>

      {/* Name */}
      <h3 className="text-[22px] font-bold tracking-[-0.5px] mb-4">{service.name}</h3>

      {/* Desc */}
      <p className="text-[14px] text-white/40 leading-relaxed font-normal mb-8">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map(tag => (
          <span
            key={tag}
            className="border border-white/[0.08] font-mono text-[11px] tracking-[0.5px] text-white/30 px-3 py-1.5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <motion.div
        className="absolute bottom-10 right-10 w-9 h-9 border border-white/12 flex items-center justify-center"
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight size={14} className="text-white/70" />
      </motion.div>
    </motion.div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="services"
      className="border-t border-white/[0.05]"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Services</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-[clamp(36px,5vw,72px)] font-extrabold leading-[1] tracking-[-2px] mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          What we<br />
          <span className="text-white/30">build for you.</span>
        </motion.h2>

        {/* Grid with separator lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/[0.06]">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
