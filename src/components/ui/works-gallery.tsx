"use client"

import React, { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { defaultGalleryProjects, type GalleryProject } from "@/data/gallery-projects"

export interface WorksGalleryProps {
  projects?: GalleryProject[]
  label?: string
  title?: string
  subtitle?: string
  speedCol1?: number
  speedCol2?: number
  speedCol3?: number
  className?: string
}

/**
 * Single Project Card Component
 * Clean, image-first editorial card design with Framer Motion hover physics
 */
function ProjectCard({
  project,
  isDuplicate = false,
}: {
  project: GalleryProject
  isDuplicate?: boolean
}) {
  const content = (
    <div className="p-3 sm:p-3.5 flex flex-col w-full">
      {/* Large Project Image with smooth hover scale */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[16px] bg-neutral-100">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106 group-focus-visible:scale-106 select-none"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Project Meta: Name & Short Category/Type */}
      <div className="pt-3.5 pb-1 px-1.5 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base sm:text-[17px] text-neutral-900 tracking-tight leading-snug truncate">
            {project.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-neutral-500 font-normal mt-0.5 tracking-normal truncate">
            {project.category}
          </p>
        </div>

        {/* Discreet link indicator if URL is provided */}
        {project.link && (
          <div
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 group-hover:bg-neutral-200/80 transition-all duration-200 shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  )

  const cardMotionProps = {
    whileHover: { y: -6, scale: 1.02 },
    transition: { type: "spring" as const, stiffness: 380, damping: 24 },
    className:
      "group relative flex flex-col w-full rounded-[22px] bg-white text-neutral-900 border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.16)] transition-shadow duration-300 cursor-pointer overflow-hidden transform-gpu will-change-transform",
  }

  if (project.link) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isDuplicate ? -1 : 0}
        aria-hidden={isDuplicate}
        aria-label={`${project.title} - ${project.category}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5f00] focus-visible:ring-offset-2 rounded-[22px]"
      >
        <motion.div {...cardMotionProps}>{content}</motion.div>
      </motion.a>
    )
  }

  return (
    <div
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5f00] focus-visible:ring-offset-2 rounded-[22px]"
    >
      <motion.div {...cardMotionProps}>{content}</motion.div>
    </div>
  )
}

/**
 * ScrollColumn Component
 * Handles the continuous, linear, jump-free infinite vertical scroll
 */
function ScrollColumn({
  projects,
  direction = "up",
  duration = 20,
  prefersReducedMotion = false,
}: {
  projects: GalleryProject[]
  direction?: "up" | "down"
  duration?: number
  prefersReducedMotion?: boolean
}) {
  // Ensure enough items so that each track is taller than the column viewport
  const displayProjects = useMemo(() => {
    if (projects.length === 0) return []
    let list = [...projects]
    while (list.length < 4) {
      list = [...list, ...projects]
    }
    return list
  }, [projects])

  return (
    <div className="h-full overflow-hidden relative">
      <motion.div
        animate={
          prefersReducedMotion
            ? { y: 0 }
            : {
                y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
        className="will-change-transform"
      >
        {/* Track 1: Original Items */}
        <div className="flex flex-col gap-6 pb-6">
          {displayProjects.map((project, idx) => (
            <ProjectCard
              key={`${project.id || project.title}-t1-${idx}`}
              project={project}
              isDuplicate={false}
            />
          ))}
        </div>

        {/* Track 2: Duplicated Items for seamless, 0-jump loop */}
        <div className="flex flex-col gap-6 pb-6" aria-hidden="true">
          {displayProjects.map((project, idx) => (
            <ProjectCard
              key={`${project.id || project.title}-t2-${idx}`}
              project={project}
              isDuplicate={true}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * WorksGallery (Gallery / My Works Section)
 * Features 3 infinite scrolling vertical columns of project cards with alternating movement.
 * Adapts to 2 columns on tablet and 1 column on mobile.
 */
export default function WorksGallery({
  projects = defaultGalleryProjects,
  label = "CLINIC VISUALS",
  title = "Our Care in Pictures",
  subtitle = "An aesthetic glimpse into our comfortable operatory suites, patient care, and modern dental technology at Aurelia Dental Studio.",
  speedCol1 = 18,
  speedCol2 = 23,
  speedCol3 = 20,
  className = "",
}: WorksGalleryProps) {
  const prefersReducedMotion = useReducedMotion() ?? false

  // Partition projects cleanly among the three columns
  const col1Projects = useMemo(
    () => projects.filter((_, idx) => idx % 3 === 0),
    [projects]
  )
  const col2Projects = useMemo(
    () => projects.filter((_, idx) => idx % 3 === 1),
    [projects]
  )
  const col3Projects = useMemo(
    () => projects.filter((_, idx) => idx % 3 === 2),
    [projects]
  )

  return (
    <section
      id="works"
      className={`relative w-full overflow-hidden bg-white text-neutral-800 py-24 sm:py-32 border-t border-neutral-200 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16 text-center max-w-3xl mx-auto">
          {/* Small Label Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white/90 backdrop-blur-md text-[#ff5f00] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5f00]" />
            <span>{label}</span>
          </div>

          {/* Large Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 
          Infinite Scrolling Vertical Columns Viewport
          Subtle vertical gradient mask at top and bottom so cards gracefully fade in and out.
          No scrollbars; overflow is hidden.
        */}
        <div
          className="relative w-full h-[640px] sm:h-[720px] lg:h-[780px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
            {/* Column 1: Moves upward (Always visible: Mobile, Tablet, Desktop) */}
            <div className="h-full">
              <ScrollColumn
                projects={col1Projects}
                direction="up"
                duration={speedCol1}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* Column 2: Moves downward (Visible on Tablet & Desktop) */}
            <div className="hidden md:block h-full">
              <ScrollColumn
                projects={col2Projects}
                direction="down"
                duration={speedCol2}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* Column 3: Moves upward (Visible on Desktop) */}
            <div className="hidden lg:block h-full">
              <ScrollColumn
                projects={col3Projects}
                direction="up"
                duration={speedCol3}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
