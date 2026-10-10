"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react"
import { selectedProjects, type Project } from "@/data/projects"

export interface SelectedWorkGalleryProps {
  projects?: Project[]
  title?: string
  subtitle?: string
  description?: string
}

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor
}

export default function SelectedWorkGallery({
  projects = selectedProjects,
  title = "Our Smile Gallery",
  subtitle = "OUR GALLERY",
  description = "Explore real smile transformations, advanced clinical procedures, and aesthetic artistry crafted with precision at Aurelia Dental Studio.",
}: SelectedWorkGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)

  const numProjects = projects.length

  // Screen size & motion preference detection
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    }

    checkMobile()
    checkReducedMotion()

    window.addEventListener("resize", checkMobile)
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    motionQuery.addEventListener("change", checkReducedMotion)

    return () => {
      window.removeEventListener("resize", checkMobile)
      motionQuery.removeEventListener("change", checkReducedMotion)
    }
  }, [])

  // Smooth scroll progress tracking using requestAnimationFrame
  const currentProgressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const windowH = window.innerHeight
    const totalDist = rect.height - windowH

    if (totalDist <= 0) return

    // Calculate normalized progress from 0 (top of section) to 1 (bottom of section)
    const rawProgress = -rect.top / totalDist
    targetProgressRef.current = Math.max(0, Math.min(1, rawProgress))
  }, [])

  useEffect(() => {
    let isVisible = false

    const updateProgress = () => {
      if (!isVisible) {
        rafIdRef.current = null
        return
      }

      currentProgressRef.current = lerp(
        currentProgressRef.current,
        targetProgressRef.current,
        isMobile ? 0.22 : 0.12
      )

      // Snap when close enough and stop RAF to free main thread
      if (Math.abs(currentProgressRef.current - targetProgressRef.current) < 0.0005) {
        currentProgressRef.current = targetProgressRef.current
        setScrollProgress(currentProgressRef.current)
        rafIdRef.current = null
        return
      }

      setScrollProgress(currentProgressRef.current)
      rafIdRef.current = requestAnimationFrame(updateProgress)
    }

    const startRafIfNeeded = () => {
      if (isVisible && !rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateProgress)
      }
    }

    const onScroll = () => {
      handleScroll()
      startRafIfNeeded()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          handleScroll()
          startRafIfNeeded()
        } else if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = null
        }
      },
      { rootMargin: "150px 0px" }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    handleScroll()

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [handleScroll, isMobile])

  // Subtle mouse tilt parallax on desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || prefersReducedMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMouseTilt({ x, y })
    },
    [isMobile, prefersReducedMotion]
  )

  const handleMouseLeave = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 })
  }, [])

  // Phase Calculations:
  // Phase 1 (0.0 to 0.12): Pure circular ring
  // Phase 2 & 3 (0.12 to 0.28): Ring collapses inward into vertical 3D sequence
  // Phase 4 & 5 (0.28 to 1.0): Sequential progression through each project
  const collapseStart = 0.12
  const collapseEnd = 0.28

  const circleWeight = useMemo(() => {
    if (scrollProgress <= collapseStart) return 1
    if (scrollProgress >= collapseEnd) return 0
    // Smooth cosine easing
    const t = (scrollProgress - collapseStart) / (collapseEnd - collapseStart)
    return 0.5 * (1 + Math.cos(t * Math.PI))
  }, [scrollProgress])

  // In stack mode, virtual index progresses from 0 to numProjects - 1
  const stackProgress = useMemo(() => {
    if (scrollProgress < collapseEnd) return 0
    return Math.min(1, (scrollProgress - collapseEnd) / (1 - collapseEnd))
  }, [scrollProgress])

  const virtualIndex = stackProgress * (numProjects - 1)
  const activeIndex = Math.min(
    numProjects - 1,
    Math.max(0, Math.round(virtualIndex))
  )
  const activeProject = projects[activeIndex] || projects[0]

  // Keyboard navigation support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!containerRef.current) return
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        const nextIndex = Math.min(numProjects - 1, activeIndex + 1)
        const targetP =
          collapseEnd + (nextIndex / (numProjects - 1)) * (1 - collapseEnd)
        window.scrollTo({
          top:
            window.scrollY +
            containerRef.current.getBoundingClientRect().top +
            targetP * (containerRef.current.offsetHeight - window.innerHeight),
          behavior: "smooth",
        })
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        const prevIndex = Math.max(0, activeIndex - 1)
        const targetP =
          collapseEnd + (prevIndex / (numProjects - 1)) * (1 - collapseEnd)
        window.scrollTo({
          top:
            window.scrollY +
            containerRef.current.getBoundingClientRect().top +
            targetP * (containerRef.current.offsetHeight - window.innerHeight),
          behavior: "smooth",
        })
      }
    },
    [activeIndex, numProjects]
  )

  return (
    <section
      ref={containerRef}
      id="gallery"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Our Gallery - Aurelia Dental Studio"
      // Height proportional to project count for generous breathing room
      className="relative w-full bg-white text-neutral-800 select-none outline-none"
      style={{
        height: `${Math.max(480, 100 + numProjects * 70)}vh`,
      }}
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Section Top Header Pill */}
        <div
          className="absolute top-8 left-6 sm:left-12 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/90 bg-white/90 backdrop-blur-md text-[11px] font-mono tracking-widest text-neutral-600 uppercase transition-opacity duration-300 shadow-sm"
          style={{
            opacity: scrollProgress < 0.98 ? 1 : 0.2,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f00] animate-pulse" />
          <span>OUR GALLERY • AURELIA DENTAL STUDIO</span>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 1: Minimal Typography at Center of Circular Ring                   */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center transition-all duration-300 px-4"
          style={{
            opacity: circleWeight,
            transform: `scale(${0.85 + 0.15 * circleWeight}) translateZ(0)`,
          }}
        >
          <span className="text-xs sm:text-sm font-mono tracking-[0.35em] text-[#ff5f00] uppercase mb-3 font-semibold">
            {subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-neutral-900 leading-tight mb-4 max-w-2xl">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-md sm:max-w-lg mx-auto mb-4 font-sans leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 mt-2">
            <span>SCROLL TO EXPLORE GALLERY</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#ff5f00] animate-bounce" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 4 & 5: Active Project Left Typography Area                         */}
        {/* ========================================================================= */}
        <div
          className={`absolute z-30 pointer-events-auto transition-all duration-500 ${
            isMobile
              ? "left-4 right-4 sm:left-6 sm:right-6 bottom-6 sm:bottom-8 max-w-none text-left bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 md:bg-white/95 md:backdrop-blur-lg shadow-md md:shadow-xl"
              : "left-8 sm:left-14 lg:left-24 top-1/2 -translate-y-1/2 max-w-sm sm:max-w-md lg:max-w-lg"
          }`}
          style={{
            opacity: Math.max(0, 1 - circleWeight * 1.5),
            transform: isMobile
              ? "none"
              : `translateY(calc(-50% + ${circleWeight * 50}px))`,
            pointerEvents: circleWeight > 0.4 ? "none" : "auto",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Counter & Category */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs sm:text-sm tracking-widest text-[#ff5f00] font-semibold">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(numProjects).padStart(2, "0")}
                </span>
                <span className="w-8 h-px bg-neutral-200" />
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 font-mono">
                  {activeProject.category}
                </span>
                {activeProject.year && (
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                    • {activeProject.year}
                  </span>
                )}
              </div>

              {/* Large Project Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-neutral-900 mb-3 leading-tight tracking-tight">
                {activeProject.title}
              </h3>

              {/* Short Editorial Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 font-normal max-w-md line-clamp-3 sm:line-clamp-none">
                {activeProject.description}
              </p>

              {/* CTA Button */}
              <div className="flex items-center gap-4">
                <a
                  href="#contact"
                  aria-label={`Inquire about transformation: ${activeProject.title}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm font-medium tracking-wide hover:border-[#ff5f00] hover:bg-neutral-800 hover:shadow-[0_0_25px_rgba(255,95,0,0.25)] transition-all group"
                >
                  <span>Inquire Transformation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5f00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Tags preview on desktop */}
                {activeProject.tags && !isMobile && (
                  <div className="hidden lg:flex items-center gap-1.5 flex-wrap">
                    {activeProject.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* 3D CARDS STAGE & TRANSFORMATION ENGINE                                  */}
        {/* ========================================================================= */}
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {projects.map((project, index) => {
            const diff = index - virtualIndex
            const isActive = index === activeIndex
            const isHovered = hoveredCardIndex === index

            // 1. CIRCLE CALCULATIONS (Phase 1)
            // Radii configured to fit balanced circle without clipping
            const ringRx = isMobile ? 130 : 380
            const ringRy = isMobile ? 150 : 250
            const angle = (index / numProjects) * 2 * Math.PI - Math.PI / 2

            const circX = Math.cos(angle) * ringRx
            const circY = Math.sin(angle) * ringRy
            const circZ = Math.sin(angle) * 60
            const circRotZ = (angle * 180) / Math.PI + 90
            const circScale = isMobile ? 0.42 : 0.52
            const circOpacity = 0.9

            // 2. VERTICAL 3D STACK CALCULATIONS (Phase 4 & 5)
            // On desktop: offset to the right (+180px) to balance info on the left
            // On mobile: centered (0px) and shifted slightly up to leave room for bottom info
            const stackBaseX = isMobile ? 0 : 200
            const stackBaseY = isMobile ? -50 : 0

            let stackX = stackBaseX
            let stackY = stackBaseY
            let stackZ = 130
            let stackScale = isMobile ? 0.88 : 1.06
            let stackRotX = 0
            let stackRotY = 0
            let stackRotZ = 0
            let stackOpacity = 1.0

            if (Math.abs(diff) < 0.6) {
              // Active Center Card
              stackY += diff * 120
              stackZ = 130 - Math.abs(diff) * 140
              stackScale = (isMobile ? 0.88 : 1.06) - Math.abs(diff) * 0.15
              stackRotX = mouseTilt.y * 6 - diff * 8
              stackRotY = mouseTilt.x * 6
              stackRotZ = diff * -2
              stackOpacity = 1.0
            } else if (diff < 0) {
              // Scrolled past cards (floating upward & receding into background)
              stackY += diff * 130 - 30
              stackZ = 130 + diff * 100
              stackScale = Math.max(0.6, (isMobile ? 0.88 : 1.06) + diff * 0.12)
              stackRotX = -12 + mouseTilt.y * 3
              stackRotY = mouseTilt.x * 3
              stackRotZ = diff * -2.5
              stackOpacity = Math.max(0, 1.0 + diff * 0.75)
            } else {
              // Upcoming cards (stacked below & peeking from behind)
              stackY += diff * 110 + 30
              stackZ = 130 - diff * 90
              stackScale = Math.max(0.65, (isMobile ? 0.88 : 1.06) - diff * 0.1)
              stackRotX = 10 + mouseTilt.y * 3
              stackRotY = mouseTilt.x * 3
              stackRotZ = diff * 1.5
              stackOpacity = Math.max(0, 1.0 - diff * 0.45)
            }

            // 3. CONTINUOUS INTERPOLATION BETWEEN CIRCLE & STACK
            const finalX = lerp(stackX, circX, circleWeight)
            const finalY = lerp(stackY, circY, circleWeight)
            const finalZ = lerp(stackZ, circZ, circleWeight)
            const finalScale = lerp(stackScale, circScale, circleWeight)
            const finalRotX = lerp(stackRotX, 0, circleWeight)
            const finalRotY = lerp(stackRotY, 0, circleWeight)
            const finalRotZ = lerp(stackRotZ, circRotZ * 0.35, circleWeight)
            const finalOpacity = lerp(stackOpacity, circOpacity, circleWeight)

            // Dynamic z-index so front-most cards layer properly
            const zIndexVal = Math.round(
              100 - Math.abs(diff) * 10 + (isActive ? 30 : 0)
            )

            // Active Card hover boost
            const hoverScale = isHovered && isActive ? 1.02 : 1.0

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onClick={() => {
                  if (isActive) {
                    window.open(project.url, "_blank", "noopener,noreferrer")
                  }
                }}
                className={`absolute pointer-events-auto rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${
                  isActive
                    ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-neutral-300"
                    : "shadow-[0_15px_30px_-10px_rgba(0,0,0,0.12)] border border-neutral-200"
                }`}
                style={{
                  width: isMobile ? "240px" : "380px",
                  height: isMobile ? "310px" : "480px",
                  transform: `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateX(${finalRotX}deg) rotateY(${finalRotY}deg) rotateZ(${finalRotZ}deg) scale(${
                    finalScale * hoverScale
                  })`,
                  opacity: finalOpacity,
                  zIndex: zIndexVal,
                  transformStyle: "preserve-3d",
                  willChange: isActive ? "transform, opacity" : "auto",
                  transition: "transform 0.08s ease-out, opacity 0.08s ease-out",
                }}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  sizes="(max-width: 640px) 240px, 380px"
                  srcSet={
                    project.image.includes("unsplash.com")
                      ? `${project.image.replace(/w=\d+/, "w=400")} 400w, ${project.image.replace(/w=\d+/, "w=800")} 800w`
                      : undefined
                  }
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  style={{
                    transform: isHovered && isActive ? "scale(1.05)" : "scale(1)",
                  }}
                />

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Corner ID and Category Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white border border-neutral-700/50">
                    {project.id}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-neutral-300 border border-neutral-700/50">
                    {project.category}
                  </span>
                </div>

                {/* Bottom title preview when in circular mode or non-active */}
                <div
                  className="absolute bottom-3.5 left-3.5 right-3.5 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: circleWeight > 0.4 || !isActive ? 1 : 0,
                  }}
                >
                  <p className="text-xs sm:text-sm font-serif text-white truncate drop-shadow">
                    {project.title}
                  </p>
                </div>

                {/* Subtle active card border glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none border border-[#e3131b]/40 shadow-[inset_0_0_30px_rgba(227,19,27,0.15)]" />
                )}
              </div>
            )
          })}
        </div>

        {/* Scroll Progress Bar at Bottom of Section */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-3 pointer-events-none">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(numProjects).padStart(2, "0")}
          </span>
          <div className="w-24 sm:w-36 h-[2px] bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#e3131b] to-[#ff5f00] transition-all duration-150"
              style={{
                width: `${Math.round(scrollProgress * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
