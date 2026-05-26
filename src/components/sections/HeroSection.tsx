'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 80])
  const glowY = useTransform(scrollY, [0, 600], [0, 60])
  const canvasOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number
    }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGrid = () => {
      const size = 60
      ctx.strokeStyle = 'rgba(255,255,255,0.035)'
      ctx.lineWidth = 1
      for (let x = 0; x <= canvas.width; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y <= canvas.height; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
      ctx.fillStyle = 'rgba(255,255,255,0.07)'
      for (let x = 0; x <= canvas.width; x += size) {
        for (let y = 0; y <= canvas.height; y += size) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill()
        }
      }
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < 35; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.12 + 0.03,
        })
      }
    }

    let raf: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      })
      raf = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    const handleResize = () => { resize(); initParticles() }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const headlineLines = ['Cloud.', 'DevOps.', 'AI.']

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      {/* Canvas background */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: canvasOpacity }}
      />

      {/* Central glow */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
          y: glowY,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Geometric floaters */}
      <motion.div
        className="absolute top-[18%] right-[8%] w-px bg-gradient-to-b from-transparent via-white/25 to-transparent z-0"
        style={{ height: 120 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] right-[14%] w-20 h-20 border border-white/[0.06] z-0"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[22%] right-[5%] w-10 h-10 border border-white/10 z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute top-[28%] left-[3%] w-px bg-gradient-to-b from-transparent via-white/12 to-transparent z-0"
        style={{ height: 80 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      {/* Logo mark watermark */}
      <motion.div
        className="absolute bottom-[10%] right-[3%] w-32 h-32 opacity-[0.03] z-0 pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <Image
          src="/images/logo-icon-nb.png"
          alt=""
          fill
          className="object-contain invert brightness-0 invert"
          aria-hidden
        />
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-12 pt-28 w-full"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-3 border border-white/10 px-4 py-2 mb-14 font-mono text-[11px] tracking-[1.5px] text-white/35 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          Brisbane, AU — Azure Cloud Consulting
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(72px,12vw,168px)] font-extrabold leading-[0.9] tracking-[-4px] mb-8">
          {headlineLines.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? 'text-white/35' : 'text-white'}`}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Sub text */}
        <motion.p
          className="text-[18px] text-white/40 leading-relaxed max-w-[480px] mb-12 font-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Premium Azure cloud engineering and AI automation solutions for modern businesses and government.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="#contact"
            className="bg-white text-[#050505] px-8 py-4 text-[14px] font-bold tracking-[0.3px] hover:bg-white/88 transition-colors duration-300 inline-block"
          >
            Book a Consultation
          </Link>
          <Link
            href="#services"
            className="border border-white/20 text-white px-8 py-4 text-[14px] font-semibold tracking-[0.3px] hover:border-white/45 hover:bg-white/[0.03] transition-all duration-300 inline-block"
          >
            View Services
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-8 md:left-12 flex items-center gap-3 font-mono text-[11px] tracking-[1px] text-white/25 uppercase z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-10 h-px bg-white/15 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  )
}
