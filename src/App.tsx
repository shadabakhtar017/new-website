import Navbar from "@/components/ui/navbar"
import Demo from "./demo"
import FloatingCardGallery from "@/components/ui/floating-card-gallery"
import SelectedWorkGallery from "@/components/ui/selected-work-gallery"
import TimelineDemo from "@/components/ui/demo"
import WorksGallery from "@/components/ui/works-gallery"
import ContactWithGlobe from "@/components/ui/contact-with-globe"
import FooterSection from "@/components/ui/footer-section"

export default function App() {
  return (
    <main className="min-h-screen w-full bg-white text-neutral-900 selection:bg-[#e3131b] selection:text-white relative">
      {/* Primary Floating Navigation Bar */}
      <Navbar />

      {/* Hero section containing the Lycoris Specimen interactive experience */}
      <section id="hero" className="relative w-full bg-white">
        <Demo />
      </section>

      {/* About Section - 3D Interactive Floating Card Gallery */}
      <FloatingCardGallery />

      {/* Selected Work - Scroll-Driven 3D Circular to Vertical Stack Project Showcase */}
      <SelectedWorkGallery />

      {/* Horizontal Scroll Product Storyline Timeline Section */}
      <section id="storyline" className="relative w-full border-t border-neutral-200 bg-white">
        <TimelineDemo
          backgroundColor="#FFFFFF"
          textColor="#171717"
          mutedTextColor="#737373"
          activeColor="#ff5f00"
        />
      </section>

      {/* Premium Infinite Vertical Column Gallery / My Works Section */}
      <WorksGallery />

      {/* Interactive Contact Section with D3 Wireframe Globe & Accessible Form */}
      <ContactWithGlobe />

      {/* Ultra-Aesthetic Footer Section with Call to Action, Live Clock & Navigation */}
      <FooterSection />
    </main>
  )
}


