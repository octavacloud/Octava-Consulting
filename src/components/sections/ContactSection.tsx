'use client'

import { useRef, useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission — replace with real API call or Formspree/EmailJS
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-t border-white/[0.05]"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Contact</SectionLabel>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-4">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[clamp(32px,5vw,66px)] font-extrabold leading-[1] tracking-[-2px] mb-8">
              Build modern cloud platforms{' '}
              <span className="text-white/25">properly.</span>
            </h2>

            <p className="text-[16px] text-white/40 leading-relaxed font-normal mb-12">
              Ready to modernise your cloud, automate your operations, or integrate AI into your workflows?
              Let&apos;s start a conversation.
            </p>

            {/* Contact links */}
            <div className="flex flex-col">
              <a
                href="mailto:marcelo@octava.cloud"
                className="group flex flex-col py-5 border-b border-white/[0.06] transition-colors hover:border-white/20"
              >
                <span className="font-mono text-[10px] tracking-[1.5px] text-white/25 uppercase mb-1">Founder</span>
                <span className="text-[15px] font-semibold text-white/50 group-hover:text-white transition-colors duration-300">
                  marcelo@octava.cloud
                </span>
              </a>

              <a
                href="mailto:info@octava.cloud"
                className="group flex flex-col py-5 border-b border-white/[0.06] transition-colors hover:border-white/20"
              >
                <span className="font-mono text-[10px] tracking-[1.5px] text-white/25 uppercase mb-1">General Enquiries</span>
                <span className="text-[15px] font-semibold text-white/50 group-hover:text-white transition-colors duration-300">
                  info@octava.cloud
                </span>
              </a>

              <div className="flex flex-col py-5 border-b border-white/[0.06]">
                <span className="font-mono text-[10px] tracking-[1.5px] text-white/25 uppercase mb-1">Location</span>
                <span className="text-[15px] font-semibold text-white/40">
                  Brisbane, Queensland, Australia
                </span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-white/10 p-10"
                >
                  <div className="w-12 h-12 border border-white/30 flex items-center justify-center mb-6">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M4 10l4.5 4.5L16 6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[22px] font-bold tracking-[-0.5px] mb-3">Message received.</h3>
                  <p className="text-white/40 text-[14px] leading-relaxed">
                    Thanks for reaching out. We'll be in touch within 24 hours.
                  </p>
                </motion.div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block font-mono text-[10px] tracking-[1.5px] text-white/30 uppercase mb-2.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white px-4 py-3.5 text-[15px] font-[400] outline-none transition-colors duration-300 focus:border-white/25 placeholder:text-white/20 font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[1.5px] text-white/30 uppercase mb-2.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white px-4 py-3.5 text-[15px] font-[400] outline-none transition-colors duration-300 focus:border-white/25 placeholder:text-white/20 font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[1.5px] text-white/30 uppercase mb-2.5">
                    Service
                  </label>
                  <select
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 px-4 py-3.5 text-[15px] font-[400] outline-none transition-colors duration-300 focus:border-white/25 font-sans appearance-none"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <option value="" style={{ background: '#050505' }}>Select a service…</option>
                    <option value="azure" style={{ background: '#050505' }}>Azure Cloud Engineering</option>
                    <option value="devops" style={{ background: '#050505' }}>DevOps Automation</option>
                    <option value="ai" style={{ background: '#050505' }}>AI Automation</option>
                    <option value="general" style={{ background: '#050505' }}>General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[1.5px] text-white/30 uppercase mb-2.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project or challenge…"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white px-4 py-3.5 text-[15px] font-[400] outline-none transition-colors duration-300 focus:border-white/25 placeholder:text-white/20 font-sans resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="self-start bg-white text-[#050505] px-8 py-4 text-[14px] font-bold tracking-[0.3px] disabled:opacity-60 transition-all duration-300 mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Sending…' : 'Send Message →'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
