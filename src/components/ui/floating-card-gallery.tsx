"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Smile,
  Award,
  Stethoscope,
} from "lucide-react"

export interface AboutCardItem {
  id?: string
  title: string
  subtitle?: string
  description: string
  fullDescription?: string
  image: string
  avatar?: string
  author?: string
  authorRole?: string
  category: string
  tags?: string[]
  icon?: React.ReactNode
  ctaText?: string
  ctaLink?: string
}

export interface FloatingCardGalleryProps {
  cards?: AboutCardItem[]
  sectionLabel?: string
  title?: string
  subtitle?: string
  backgroundColor?: string
  accentColor?: string
  maxCards?: number
}

// Curated Dental Services tailored for Aurelia Dental Studio
const defaultAboutCards: AboutCardItem[] = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    subtitle: "01 — Routine & Preventive Care",
    description: "Comprehensive checkups, ultrasonic scaling, and proactive tooth preservation.",
    fullDescription: "Our foundational general dentistry focuses on preventing problems before they arise. Using low-radiation digital radiography, gentle ultrasonic cleanings, enamel-strengthening treatments, and tooth-colored composite restorations, we maintain your lifelong oral wellness with maximum comfort.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    author: "Dr. Ayesha Mehta",
    authorRole: "Senior Dentist (BDS, MDS)",
    category: "01 — General Dentistry",
    tags: ["Digital Checkups", "Ultrasonic Cleaning", "Tooth Fillings", "Gum Health"],
    icon: <ShieldCheck className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Book Examination",
    ctaLink: "#contact",
  },
  {
    id: "cosmetic-whitening",
    title: "Teeth Whitening & Smile Aesthetics",
    subtitle: "02 — Cosmetic Dentistry",
    description: "Enamel-safe whitening solutions and custom cosmetic smile makeovers.",
    fullDescription: "Brighten your natural smile safely with our clinical-grade teeth whitening procedures. Offering both rapid in-clinic laser whitening sessions and custom take-home whitening trays that lift stubborn stains without damaging tooth enamel or causing hypersensitivity.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    author: "Dr. Ayesha Mehta",
    authorRole: "Cosmetic Specialist",
    category: "02 — Cosmetic Care",
    tags: ["Enamel-Safe Whitening", "Smile Makeover", "Porcelain Veneers", "Stain Removal"],
    icon: <Sparkles className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Smile Consultation",
    ctaLink: "#contact",
  },
  {
    id: "dental-implants",
    title: "Precision Dental Implants",
    subtitle: "03 — Restorative Dentistry",
    description: "Permanent titanium implant solutions restoring complete bite strength and aesthetics.",
    fullDescription: "The gold standard for missing teeth. Using 3D computer-guided implant planning, biocompatible titanium posts are seamlessly placed to integrate with jawbone structure, topped with custom lifelike ceramic crowns that feel and chew just like natural teeth.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    author: "Dr. Ayesha Mehta",
    authorRole: "Implantology Specialist",
    category: "03 — Restorative Implants",
    tags: ["Titanium Implants", "3D Digital Guided", "Lifetime Durability", "Full Chew Power"],
    icon: <Award className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Implant Assessment",
    ctaLink: "#contact",
  },
  {
    id: "root-canal",
    title: "Painless Root Canal Therapy",
    subtitle: "04 — Endodontics",
    description: "Modern, gentle microscopic endodontic procedures to relieve pain and preserve natural teeth.",
    fullDescription: "Modern root canal therapy at Aurelia Dental Studio is smooth and comfortable. Utilizing rotary endodontics, high-precision apex locators, and targeted local anesthesia, we eliminate deep inflammation and seal the tooth beneath a durable protective ceramic crown.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    author: "Dr. Ayesha Mehta",
    authorRole: "Endodontic Care",
    category: "04 — Endodontics",
    tags: ["Infection Relief", "Single-Visit Options", "Gentle Anesthesia", "Crown Sealing"],
    icon: <HeartPulse className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Relieve Tooth Pain",
    ctaLink: "#contact",
  },
  {
    id: "clear-aligners",
    title: "Orthodontics & Clear Aligners",
    subtitle: "05 — Smile Alignment",
    description: "Discreet digital clear aligners providing predictable, comfortable teeth straightening.",
    fullDescription: "Achieve a balanced, confident smile without traditional metal wires or brackets. Our custom clear aligners are engineered using high-resolution 3D intraoral scans, delivering gradual, comfortable bite correction that fits smoothly into your professional lifestyle.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    author: "Dr. Ayesha Mehta",
    authorRole: "Aligner Specialist",
    category: "05 — Orthodontics",
    tags: ["Clear Aligners", "Invisible Braces", "3D Digital Scan", "Bite Correction"],
    icon: <Smile className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Aligner Assessment",
    ctaLink: "#contact",
  },
  {
    id: "pediatric-family",
    title: "Pediatric & Family Dentistry",
    subtitle: "06 — Family & Kids",
    description: "Compassionate, stress-free dental care building healthy lifelong oral hygiene habits.",
    fullDescription: "We make visits reassuring and enjoyable for children of all ages. From preventive fluoride applications and fissure sealants to habit counseling and gentle dental exams, our team ensures every visit is engaging, fun, and completely reassuring.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    author: "Dr. Ayesha Mehta",
    authorRole: "Family Dental Care",
    category: "06 — Pediatric Care",
    tags: ["Gentle Touch", "Child-Friendly", "Fissure Sealants", "Family Care"],
    icon: <Stethoscope className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Book Family Visit",
    ctaLink: "#contact",
  },
]

export default function FloatingCardGallery({
  cards = defaultAboutCards,
  sectionLabel = "OUR SERVICES",
  title = "Comprehensive Dental Care & Specialized Treatments",
  subtitle = "Explore our complete range of personalized dental solutions—from preventive routine care to advanced cosmetic enhancements and restorative therapies.",
  backgroundColor = "bg-white",
  accentColor = "rgba(255, 95, 0, 0.4)",
  maxCards = 6,
}: FloatingCardGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect touch devices to avoid uncomfortable 3D tilt on mobile touch
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      )
    }
  }, [])

  // Track mouse movement for 3D perspective effect
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      // Calculate mouse position relative to container center
      const x = (e.clientX - rect.left - rect.width / 2) / 35
      const y = (e.clientY - rect.top - rect.height / 2) / 35

      setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isTouchDevice])

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveIndex(activeIndex === index ? null : index)
    } else if (e.key === "Escape" && activeIndex !== null) {
      setActiveIndex(null)
    }
  }

  // Stable ambient particle positions to prevent hydration mismatches
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      width: (i % 4) * 1.5 + 2,
      height: (i % 4) * 1.5 + 2,
      top: `${(i * 19) % 100}%`,
      left: `${(i * 29) % 100}%`,
      duration: 18 + (i % 10) * 2,
      delay: (i % 5) * 1.5,
      opacity: 0.12 + (i % 3) * 0.08,
    }))
  }, [])

  const displayCards = cards.slice(0, maxCards)

  return (
    <section
      ref={containerRef}
      id="services"
      className={`relative min-h-screen w-full overflow-hidden ${backgroundColor} text-neutral-800 py-20 px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center justify-center`}
      style={{
        perspective: isTouchDevice ? "none" : "1600px",
      }}
    >
      {/* Ambient background particles (hidden on mobile to eliminate compositor overhead) */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-neutral-300"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: p.top,
              left: p.left,
              opacity: p.opacity,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl w-full text-center mb-14 md:mb-18 px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e3131b]/30 bg-[#e3131b]/10 text-[#ff4d4f] text-xs font-medium tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(227,19,27,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e3131b] animate-pulse" />
          {sectionLabel}
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-5 leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* 3D Perspective Grid */}
      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 z-10 w-full max-w-7xl"
        style={{
          transform: isTouchDevice
            ? "none"
            : `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {displayCards.map((card, index) => {
          const isExpanded = activeIndex === index

          return (
            <motion.div
              key={card.id || index}
              className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3131b]"
              onClick={() => setActiveIndex(isExpanded ? null : index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded}
              aria-label={`View details for ${card.title}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              animate={{
                opacity: 1,
                y: 0,
                z: isExpanded ? 70 : 0,
                scale: isExpanded ? 1.02 : 1,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                type: "spring",
                stiffness: 110,
              }}
              whileHover={
                isTouchDevice
                  ? undefined
                  : {
                      z: 25,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }
              }
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Ambient Glow effect */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                animate={{
                  opacity: isExpanded ? 0.8 : 0,
                  boxShadow: `0 0 35px 2px ${accentColor}`,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, transparent 75%)`,
                }}
              />

              {/* Card Container */}
              <div
                className="relative rounded-2xl bg-white border border-neutral-200/90 p-5 sm:p-6 h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:border-neutral-300 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Floating ambient corner light */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#e3131b]/20 to-[#ff5f00]/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                />

                {/* Card Image */}
                <div
                  className="w-full h-44 sm:h-48 mb-5 overflow-hidden rounded-xl bg-neutral-100 relative border border-neutral-200"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    srcSet={
                      card.image.includes("unsplash.com")
                        ? `${card.image.replace(/w=\d+/, "w=400")} 400w, ${card.image.replace(/w=\d+/, "w=800")} 800w`
                        : undefined
                    }
                    className="w-full h-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-108"
                    style={{
                      transform: isTouchDevice ? "none" : "translateZ(20px)",
                    }}
                  />
                  {/* Subtle vignette over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Top Category Badge */}
                  <div
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white md:bg-white/90 md:backdrop-blur-md border border-neutral-200/90 text-[11px] font-medium text-neutral-800 shadow-xs md:shadow-sm"
                    style={{ transform: isTouchDevice ? "none" : "translateZ(30px)" }}
                  >
                    {card.icon}
                    <span>{card.category}</span>
                  </div>

                  {/* Tap to expand hint on mobile */}
                  <div
                    className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900/80 md:bg-black/60 md:backdrop-blur-sm text-[10px] text-white/90 group-hover:text-white transition-colors"
                    style={{ transform: isTouchDevice ? "none" : "translateZ(30px)" }}
                  >
                    <span>Read Details</span>
                    <ArrowUpRight className="w-3 h-3 text-[#ff5f00]" />
                  </div>
                </div>

                {/* Card Header and Content */}
                <div
                  className="flex-1 flex flex-col"
                  style={{ transform: isTouchDevice ? "none" : "translateZ(25px)" }}
                >
                  {card.subtitle && (
                    <span className="text-[11px] font-medium tracking-wide uppercase text-[#ff5f00] mb-1.5 font-mono">
                      {card.subtitle}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2.5 leading-snug group-hover:text-black transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-5 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer: Author + Tags count */}
                <div
                  className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between gap-3"
                  style={{ transform: isTouchDevice ? "none" : "translateZ(35px)" }}
                >
                  <div className="flex items-center min-w-0">
                    {card.avatar && (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-[#e3131b]/60 flex-shrink-0">
                        <img
                          src={card.avatar}
                          alt={card.author || "Author"}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="ml-2.5 min-w-0">
                      <p className="text-xs font-medium text-neutral-800 truncate">
                        {card.author || "Dr. Ayesha Mehta"}
                      </p>
                      {card.authorRole && (
                        <p className="text-[10px] text-neutral-500 truncate">
                          {card.authorRole}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 group-hover:border-neutral-300 transition-colors flex-shrink-0">
                    {card.tags?.[0] || card.category}
                  </span>
                </div>
              </div>

              {/* Expanded Modal Overlay (AnimatePresence) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="absolute inset-0 bg-white md:bg-white/98 md:backdrop-blur-xl rounded-2xl p-6 sm:p-7 z-50 flex flex-col justify-between border border-neutral-200 shadow-lg md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-y-auto text-neutral-800"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      transform: isTouchDevice ? "none" : "translateZ(60px)",
                    }}
                  >
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveIndex(null)
                      }}
                      className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 border border-neutral-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#e3131b]"
                      aria-label="Close detail modal"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="pr-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#e3131b]/15 text-[#ff4d4f] border border-[#e3131b]/30">
                          {card.category}
                        </span>
                        {card.subtitle && (
                          <span className="text-xs text-neutral-500">
                            • {card.subtitle}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3.5 leading-snug">
                        {card.title}
                      </h3>

                      <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        {card.fullDescription || card.description}
                      </p>

                      {card.tags && card.tags.length > 0 && (
                        <div className="mb-6">
                          <p className="text-[11px] font-semibold text-neutral-500 tracking-wider uppercase mb-2">
                            Treatment Highlights & Benefits
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {card.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-neutral-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {card.avatar && (
                          <img
                            src={card.avatar}
                            alt={card.author || "Author"}
                            className="w-6 h-6 rounded-full border border-[#e3131b]/50 object-cover"
                          />
                        )}
                        <span className="text-xs text-neutral-400">
                          {card.author || "Dr. Ayesha Mehta"}
                        </span>
                      </div>

                      <a
                        href={card.ctaLink || "#contact"}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveIndex(null)
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#e3131b] to-[#ff5f00] text-white text-xs font-semibold tracking-wide hover:from-[#c51017] hover:to-[#e55300] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#e3131b]/20"
                      >
                        <span>{card.ctaText || "Learn More"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
