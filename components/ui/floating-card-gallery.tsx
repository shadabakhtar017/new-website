"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowUpRight, Sparkles, Layers, Cpu, Compass, Rocket, Code2 } from "lucide-react"

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

// Default About content tailored specifically for Md Shadab Akhtar's portfolio
const defaultAboutCards: AboutCardItem[] = [
  {
    id: "creative-3d",
    title: "Creative Development & 3D Web",
    subtitle: "WebGL, Shaders & Physics",
    description: "Crafting immersive digital environments with procedural shaders, WebGL interactions, and smooth physics.",
    fullDescription: "I specialize in bridging the gap between evocative art direction and high-performance interactive computing. From procedural WebGL canvas rendering (like the Lycoris specimen) to dynamic spatial lighting and physics-based interactions, I engineer digital stages that command attention and make brands unforgettable.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    author: "Md Shadab Akhtar",
    authorRole: "Creative Engineer",
    category: "Creative Tech",
    tags: ["WebGL", "Three.js & GLSL", "Procedural 3D", "GSAP ScrollTrigger"],
    icon: <Sparkles className="w-4 h-4 text-[#e3131b]" />,
    ctaText: "Explore 3D Work",
    ctaLink: "#hero",
  },
  {
    id: "modern-frontend",
    title: "Modern Fullstack & Systems",
    subtitle: "React 19, TypeScript & Vite",
    description: "Building resilient, lightning-fast web applications with obsessive attention to craft, type safety, and 60fps motion.",
    fullDescription: "Architecture matters. I build enterprise-grade frontend applications utilizing React 19, TypeScript, Next.js, and Tailwind CSS. Every component is designed to be modular, accessible, and optimized for sub-second Core Web Vitals with seamless buttery micro-interactions.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    author: "Md Shadab Akhtar",
    authorRole: "Frontend Architect",
    category: "Engineering",
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: <Code2 className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "View Code Craft",
    ctaLink: "#work",
  },
  {
    id: "build-test-refine",
    title: "The Build → Test → Refine Creed",
    subtitle: "Practical Engineering",
    description: "A pragmatic philosophy rooted in rapid prototyping, live browser experimentation, and continuous iteration.",
    fullDescription: "Instead of being trapped in theoretical planning, I believe in getting working prototypes into the browser as fast as possible. Test against real devices, observe user friction, break boundaries, and iterate ruthlessly until the experience feels intuitive, elegant, and rock-solid.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    author: "Md Shadab Akhtar",
    authorRole: "Builder & Maker",
    category: "Philosophy",
    tags: ["Rapid Prototyping", "Device Testing", "Performance Audits", "Iterative UX"],
    icon: <Compass className="w-4 h-4 text-[#e3131b]" />,
    ctaText: "Read Philosophy",
    ctaLink: "#philosophy",
  },
  {
    id: "ai-velocity",
    title: "AI-Augmented Development",
    subtitle: "Accelerated Velocity",
    description: "Leveraging cutting-edge AI architectures to translate ambitious vision into bug-free production code at 10x speed.",
    fullDescription: "I utilize modern AI tools, LLM APIs, and agentic workflows to augment the engineering lifecycle. By automating boilerplate and rapid prototyping, I focus deeper cognitive energy on bespoke architectural refinement, unique design details, and solving real user problems.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    author: "Md Shadab Akhtar",
    authorRole: "AI Integrator",
    category: "Innovation",
    tags: ["LLM Integrations", "Agentic Workflows", "Prompt Engineering", "Full Automation"],
    icon: <Cpu className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Discover AI Tools",
    ctaLink: "#contact",
  },
  {
    id: "business-conversion",
    title: "Business-First Conversion Architecture",
    subtitle: "ROI Driven Design",
    description: "Transforming visual aesthetics into commercial results by designing clear journeys that convert visitors into clients.",
    fullDescription: "A gorgeous website is only as valuable as the business results it creates. Every typographic hierarchy, visual hook, and call to action is meticulously positioned to elevate brand authority, communicate value propositions immediately, and guide prospects toward conversion.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    author: "Md Shadab Akhtar",
    authorRole: "Product Strategist",
    category: "Strategy",
    tags: ["Conversion Rate Opt", "User Onboarding", "Brand Authority", "Visual Hierarchy"],
    icon: <Layers className="w-4 h-4 text-[#e3131b]" />,
    ctaText: "Review Outcomes",
    ctaLink: "#services",
  },
  {
    id: "direct-partnership",
    title: "1-on-1 Dedicated Partnership",
    subtitle: "Zero Agency Overhead",
    description: "Direct collaboration with a single dedicated engineer who takes personal ownership of every single detail.",
    fullDescription: "No bloated account managers, no communication delays, and no junior handoffs. You work directly with me from kickoff to launch. Together we align on clear milestones, rapid iterations, and uncompromising quality standards tailored to your vision.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    author: "Md Shadab Akhtar",
    authorRole: "Freelance Partner",
    category: "Collaboration",
    tags: ["Direct Communication", "Agile Sprints", "Transparent Milestones", "Global Delivery"],
    icon: <Rocket className="w-4 h-4 text-[#ff5f00]" />,
    ctaText: "Start a Conversation",
    ctaLink: "#contact",
  },
]

export default function FloatingCardGallery({
  cards = defaultAboutCards,
  sectionLabel = "ABOUT ME & MY CRAFT",
  title = "Building digital experiences that make brands impossible to ignore.",
  subtitle = "Hover to explore the 3D perspective, or click any card to reveal in-depth background, technical methodologies, and architectural values.",
  backgroundColor = "bg-[#050505]",
  accentColor = "rgba(227, 19, 27, 0.4)",
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
      id="about"
      className={`relative min-h-screen w-full overflow-hidden ${backgroundColor} text-[#b6b095] py-20 px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center justify-center`}
      style={{
        perspective: isTouchDevice ? "none" : "1600px",
      }}
    >
      {/* Background radial gradient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, #e3131b 0%, #ff5f00 40%, transparent 80%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-10 w-[500px] h-[400px] rounded-full blur-[130px] opacity-15"
        style={{
          background: "radial-gradient(circle, #ff5f00 0%, transparent 70%)",
        }}
      />

      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e3131b]/30 bg-[#e3131b]/10 text-[#ff4d4f] text-xs font-medium tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(227,19,27,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e3131b] animate-pulse" />
          {sectionLabel}
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#f5f5f5] mb-5 leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
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
                className="relative rounded-2xl bg-[#0c0c0e]/90 backdrop-blur-md border border-neutral-800/80 p-5 sm:p-6 h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:border-neutral-700 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
                }}
              >
                {/* Floating ambient corner light */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#e3131b]/30 to-[#ff5f00]/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                />

                {/* Card Image */}
                <div
                  className="w-full h-44 sm:h-48 mb-5 overflow-hidden rounded-xl bg-neutral-950 relative border border-neutral-800/60"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    style={{
                      transform: isTouchDevice ? "none" : "translateZ(20px)",
                    }}
                  />
                  {/* Subtle vignette over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/20" />

                  {/* Top Category Badge */}
                  <div
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#050505]/80 backdrop-blur-md border border-neutral-700/60 text-[11px] font-medium text-neutral-200"
                    style={{ transform: isTouchDevice ? "none" : "translateZ(30px)" }}
                  >
                    {card.icon}
                    <span>{card.category}</span>
                  </div>

                  {/* Tap to expand hint on mobile */}
                  <div
                    className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] text-neutral-400 group-hover:text-white transition-colors"
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
                    <span className="text-[11px] font-medium tracking-wide uppercase text-[#ff5f00]/90 mb-1.5">
                      {card.subtitle}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-[#f5f5f5] mb-2.5 leading-snug group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-5 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer: Author + Tags count */}
                <div
                  className="mt-auto pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3"
                  style={{ transform: isTouchDevice ? "none" : "translateZ(35px)" }}
                >
                  <div className="flex items-center min-w-0">
                    {card.avatar && (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-[#e3131b]/60 flex-shrink-0">
                        <img
                          src={card.avatar}
                          alt={card.author || "Author"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="ml-2.5 min-w-0">
                      <p className="text-xs font-medium text-neutral-200 truncate">
                        {card.author || "Md Shadab Akhtar"}
                      </p>
                      {card.authorRole && (
                        <p className="text-[10px] text-neutral-500 truncate">
                          {card.authorRole}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:border-neutral-700 transition-colors flex-shrink-0">
                    {card.tags?.[0] || card.category}
                  </span>
                </div>
              </div>

              {/* Expanded Modal Overlay (AnimatePresence) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="absolute inset-0 bg-[#08080a]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-7 z-50 flex flex-col justify-between border border-[#e3131b]/40 shadow-[0_25px_60px_-15px_rgba(227,19,27,0.35)] overflow-y-auto"
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
                      className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-[#e3131b]"
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
                          <span className="text-xs text-neutral-400">
                            • {card.subtitle}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3.5 leading-snug">
                        {card.title}
                      </h3>

                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        {card.fullDescription || card.description}
                      </p>

                      {card.tags && card.tags.length > 0 && (
                        <div className="mb-6">
                          <p className="text-[11px] font-semibold text-neutral-400 tracking-wider uppercase mb-2">
                            Key Core Capabilities
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {card.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {card.avatar && (
                          <img
                            src={card.avatar}
                            alt={card.author || "Author"}
                            className="w-6 h-6 rounded-full border border-[#e3131b]/50 object-cover"
                          />
                        )}
                        <span className="text-xs text-neutral-400">
                          {card.author || "Md Shadab Akhtar"}
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
