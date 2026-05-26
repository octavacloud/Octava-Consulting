import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { href: '#services', label: 'Services' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-icon-nb.png"
                alt="Octava"
                width={28}
                height={28}
                className="invert brightness-0 invert w-6 h-6 object-contain opacity-60"
              />
              <span className="text-white font-bold text-[17px] tracking-[-0.3px]">
                Octava<span className="text-white/25">.cloud</span>
              </span>
            </div>
            <p className="text-white/35 text-[13px] leading-relaxed font-normal">
              Premium Azure cloud engineering and AI automation. Built in Brisbane, deployed globally.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-[10px] tracking-[1.5px] text-white/25 uppercase mb-4">Navigation</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white text-[14px] font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] tracking-[1.5px] text-white/25 uppercase mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:marcelo@octava.cloud"
                className="text-white/40 hover:text-white text-[14px] font-medium transition-colors duration-300"
              >
                marcelo@octava.cloud
              </a>
              <a
                href="mailto:info@octava.cloud"
                className="text-white/40 hover:text-white text-[14px] font-medium transition-colors duration-300"
              >
                info@octava.cloud
              </a>
              <p className="text-white/25 text-[13px]">Brisbane, Queensland, AU</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <p className="font-mono text-[11px] tracking-[0.5px] text-white/20">
            © {new Date().getFullYear()} Octava Consulting. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.5px] text-white/15">
            ABN — octava.cloud
          </p>
        </div>
      </div>
    </footer>
  )
}
