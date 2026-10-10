"use client"

import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery-2"
import { Sparkles, MoveHorizontal, Compass } from "lucide-react"

// Curated items showcasing creative engineering, 3D explorations, and high-impact visual design
export const portfolioGalleryItems: GalleryItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    text: "Lycoris Specimen",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    text: "Frontend Systems",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/07/07b4e801248a3aea53329b56e50ff0bf4500ee0e603742000db362557ccd609f.jpg",
    text: "Desk Setup",
  },
  {
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    text: "Neural AI Workflows",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/ef/ef490a9710d011911f365ff14eaa1ba7cca5d8f327c67df6e2d8796abdd0afb0.jpg",
    text: "Waterfall Canvas",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    text: "Minimalist Studio",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/01/01d0cba6c7a56afeef2040d5d2a1dfd6a1c86fafa703e0f498f6f8794c11ef66.jpg",
    text: "Deep Space Dive",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    text: "Conversion Logic",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/3a/3a7a5e345bc71cb788e0a8538006dec703983b3f32412623d5a64d5b1e4cd00e.jpg",
    text: "Architecture & Light",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    text: "Direct Partnership",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/46/46065f54c2e5b2f6b9f178227e0383cf0a8b12daab1556be26dbfcfb1de1de82.jpg",
    text: "City Vibrance",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/e9/e9f40fde089106509f8f0618d109f54f6d684390f843e8d1a6b5059e81453caf.jpg",
    text: "Golden Bridge",
  },
]

export interface GallerySectionProps {
  items?: GalleryItem[]
  bend?: number
  borderRadius?: number
  scrollSpeed?: number
  scrollEase?: number
  title?: string
  subtitle?: string
}

export default function GallerySection({
  items = portfolioGalleryItems,
  bend = 3,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.02,
  title = "Curated Visuals & Interactive Artifacts",
  subtitle = "An infinite WebGL cylinder gallery rendered with real-time vertex displacement shaders. Drag horizontally or scroll to explore.",
}: GallerySectionProps) {
  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden bg-[#050505] text-[#b6b095] py-20 border-t border-neutral-900 select-none"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 w-[600px] h-[400px] rounded-full blur-[140px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, #e3131b 0%, #ff5f00 45%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 w-[500px] h-[350px] rounded-full blur-[130px] opacity-15"
        style={{
          background: "radial-gradient(circle, #ff5f00 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e3131b]/30 bg-[#e3131b]/10 text-[#ff4d4f] text-xs font-medium tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(227,19,27,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#e3131b]" />
          <span>CURATED WORK GALLERY</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#f5f5f5] mb-4 leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* Drag / Scroll navigation cue badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-400 backdrop-blur-md">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#ff5f00] animate-pulse" />
          <span>Click & drag or scroll horizontally to spin the gallery</span>
        </div>
      </div>

      {/* WebGL 3D Circular Cylinder Canvas Container */}
      <div className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] lg:h-[700px] flex items-center justify-center">
        <CircularGallery
          items={items}
          bend={bend}
          borderRadius={borderRadius}
          scrollSpeed={scrollSpeed}
          scrollEase={scrollEase}
          className="text-[#f5f5f5]"
        />

        {/* Edge gradient vignettes for smooth infinity fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#050505] via-[#050505]/70 to-transparent z-10" />
      </div>
    </section>
  )
}
