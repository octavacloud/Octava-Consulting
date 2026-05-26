'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const projects = [
  {
    number: '01',
    name: 'Government Cloud Migration',
    category: 'Azure / Government',
    description:
      'Full Azure landing zone implementation and workload migration for a Queensland government agency. ISO 27001 aligned with PROTECTED data classification and full audit trail.',
    tech: ['Azure', 'Terraform', 'Entra ID', 'Defender'],
    outcome: 'Zero-downtime migration across 40+ workloads',
  },
  {
    number: '02',
    name: 'AI Document Processing Platform',
    category: 'AI / Enterprise',
    description:
      'End-to-end AI-powered document ingestion, classification, and extraction system using Azure OpenAI and Document Intelligence for an enterprise client.',
    tech: ['Azure OpenAI', 'Python', 'Document Intelligence', 'Azure Functions'],
    outcome: '87% reduction in manual processing time',
  },
  {
    number: '03',
    name: 'DevOps Platform Modernisation',
    category: 'DevOps / Engineering',
    description:
      'Rebuilt legacy CI/CD infrastructure onto Azure DevOps and GitHub Actions. Deployment frequency increased 12x, lead time reduced by 80% across 20+ repositories.',
    tech: ['Azure DevOps', 'GitHub Actions', 'AKS', 'Helm'],
    outcome: '12× faster deployment frequency',
  },
  {
    number: '04',
    name: 'SMB Cloud Transformation',
    category: 'Azure / SMB',
    description:
      'Azure adoption and automation programme for a Brisbane professional services firm. Hybrid identity, Microsoft 365, and automated backup strategy.',
    tech: ['Azure', 'M365', 'Bicep', 'Intune'],
    outcome: 'Full cloud adoption in 6 weeks',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6
    setTilt({ x: -y, y: x })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-[#050505] p-12 md:p-14 overflow-hidden group min-h-[340px] flex flex-col justify-between border-b border-r border-white/[0.06]"
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
          background: `radial-gradient(circle at ${index % 2 === 0 ? '30% 40%' : '70% 60%'}, rgba(255,255,255,0.03) 0%, transparent 60%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div>
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] tracking-[2px] text-white/20 mb-1">— {project.number}</p>
            <p className="font-mono text-[11px] tracking-[1px] text-white/25 uppercase">{project.category}</p>
          </div>
          <motion.div
            className="w-10 h-10 border border-white/10 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={14} className="text-white/60" />
          </motion.div>
        </div>

        <h3 className="text-[clamp(22px,2.5vw,32px)] font-extrabold tracking-[-1px] leading-[1.1] mb-4">
          {project.name}
        </h3>

        <p className="text-[14px] text-white/38 leading-relaxed font-normal mb-8">
          {project.description}
        </p>
      </div>

      <div>
        {/* Outcome */}
        <motion.div
          className="mb-6 px-4 py-3 border-l-2 border-white/20"
          animate={{ borderColor: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)' }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-mono text-[11px] tracking-[1px] text-white/30 uppercase mb-0.5">Outcome</p>
          <p className="text-[13px] font-semibold text-white/70">{project.outcome}</p>
        </motion.div>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span
              key={t}
              className="border border-white/[0.07] font-mono text-[10px] tracking-[0.5px] text-white/25 px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-t border-white/[0.05]"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Selected Work</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-[clamp(36px,5vw,72px)] font-extrabold leading-[1] tracking-[-2px] mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Recent<br />
          <span className="text-white/25">engagements.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/[0.06]">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
