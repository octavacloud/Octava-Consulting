import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { FounderSection } from '@/components/sections/FounderSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <FounderSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
