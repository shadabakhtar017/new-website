"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Star, CheckCircle2, MessageSquareQuote } from "lucide-react"

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  treatment: string
  rating: number
  date: string
  verified: boolean
  initials: string
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    id: "test-01",
    author: "Rohit Sharma",
    initials: "RS",
    treatment: "Dental Implants • Chandigarh",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    quote:
      "I was terrified of getting a dental implant after a bad experience elsewhere. Dr. Ayesha Mehta was incredibly gentle, explained every step on the 3D scan, and the entire procedure was completely painless. My new tooth feels and looks 100% natural!",
  },
  {
    id: "test-02",
    author: "Pooja Malhotra",
    initials: "PM",
    treatment: "Teeth Whitening & Smile Design",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    quote:
      "The clinic ambience feels more like a luxury boutique than a dental clinic! The laser teeth whitening results exceeded my expectations—zero sensitivity afterwards and my smile was 4 shades brighter for my sister's wedding.",
  },
  {
    id: "test-03",
    author: "Vikramaditya Sen",
    initials: "VS",
    treatment: "Painless Root Canal & Crown",
    rating: 5,
    date: "1 month ago",
    verified: true,
    quote:
      "Had severe toothache on a Sunday evening. Dr. Ayesha accommodatingly saw me first thing Monday. The rotary root canal was finished in a single visit without a trace of discomfort. Hands down the best dental care in the Tricity.",
  },
  {
    id: "test-04",
    author: "Ananya Verma",
    initials: "AV",
    treatment: "Clear Aligners / Invisalign",
    rating: 5,
    date: "1 month ago",
    verified: true,
    quote:
      "Started my clear aligner journey 6 months ago. The digital progress tracking and discreet trays fit perfectly into my busy workday. My alignment is practically complete now. Absolutely worth every rupee!",
  },
  {
    id: "test-05",
    author: "Dr. Shalini Kapoor",
    initials: "SK",
    treatment: "Preventive Care & Ultrasonic Cleaning",
    rating: 5,
    date: "2 months ago",
    verified: true,
    quote:
      "As a physician myself, I appreciate Dr. Mehta's strict sterilization standards, modern operatory equipment, and clinical transparency. Routine scaling was done with remarkable gentleness. Highly recommended to all families.",
  },
  {
    id: "test-06",
    author: "Amanpreet Kaur",
    initials: "AK",
    treatment: "Porcelain Veneers & Gap Closure",
    rating: 5,
    date: "2 months ago",
    verified: true,
    quote:
      "I used to hide my smile in photographs because of spacing between my front teeth. The custom ceramic veneers crafted here look so organic and subtle. I haven't stopped smiling since!",
  },
  {
    id: "test-07",
    author: "Kunal Singhal",
    initials: "KS",
    treatment: "Wisdom Tooth Extraction",
    rating: 5,
    date: "3 months ago",
    verified: true,
    quote:
      "My impacted wisdom tooth had been bothering me for months. Dr. Ayesha performed the minor surgery in under 25 minutes. Healing was remarkably fast with almost zero swelling the next morning.",
  },
  {
    id: "test-08",
    author: "Meera Nair",
    initials: "MN",
    treatment: "Full Mouth Oral Wellness",
    rating: 5,
    date: "3 months ago",
    verified: true,
    quote:
      "The entire team at Aurelia is warm and attentive. They take digital intraoral photos and walk you through what needs attention without any pushy upselling. Genuine, modern, ethical dentistry.",
  },
  {
    id: "test-09",
    author: "Devansh Joshi",
    initials: "DJ",
    treatment: "Composite Restorations & Enamel Care",
    rating: 5,
    date: "4 months ago",
    verified: true,
    quote:
      "Replaced two old metal fillings with tooth-colored ceramic composite. You literally cannot tell where the filling ends and the tooth begins. Exemplary attention to detail!",
  },
]

/**
 * Text-based Testimonial Card Component
 */
function TestimonialCard({
  item,
  isDuplicate = false,
}: {
  item: TestimonialItem
  isDuplicate?: boolean
}) {
  return (
    <div
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate}
      className="group relative flex flex-col w-full rounded-2xl bg-white text-neutral-900 border border-neutral-200 p-5 sm:p-6 shadow-xs hover:border-neutral-300 hover:shadow-md transition-all duration-300 transform-gpu select-none"
    >
      {/* Top Row: 5 Stars + Date */}
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-[#ff5f00] text-[#ff5f00]"
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-[11px] font-mono text-neutral-400">
          {item.date}
        </span>
      </div>

      {/* Review Text Body */}
      <blockquote className="text-neutral-700 text-sm sm:text-[14.5px] leading-relaxed mb-5 font-normal">
        "{item.quote}"
      </blockquote>

      {/* Author Info */}
      <div className="mt-auto pt-3.5 border-t border-neutral-100 flex items-center gap-3">
        {/* Monogram Initials Avatar */}
        <div
          className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center font-semibold text-xs text-neutral-800 shrink-0 group-hover:border-[#ff5f00]/40 group-hover:bg-[#ff5f00]/10 transition-colors"
          aria-hidden="true"
        >
          {item.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm text-neutral-900 leading-tight">
              {item.author}
            </span>
            {item.verified && (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80"
                title="Verified Clinic Patient"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified</span>
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 font-normal mt-0.5 truncate">
            {item.treatment}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Vertical Column Scroll Stream
 */
function TestimonialColumn({
  items,
  direction = "up",
  duration = 24,
  prefersReducedMotion = false,
  isActive = true,
}: {
  items: TestimonialItem[]
  direction?: "up" | "down"
  duration?: number
  prefersReducedMotion?: boolean
  isActive?: boolean
}) {
  const displayItems = useMemo(() => {
    if (items.length === 0) return []
    let list = [...items]
    while (list.length < 4) {
      list = [...list, ...items]
    }
    return list
  }, [items])

  return (
    <div className="h-full overflow-hidden relative">
      <motion.div
        animate={
          prefersReducedMotion || !isActive
            ? { y: 0 }
            : {
                y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
              }
        }
        transition={
          prefersReducedMotion || !isActive
            ? { duration: 0 }
            : {
                duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
        className={isActive ? "will-change-transform" : ""}
      >
        {/* Track 1: Original */}
        <div className="flex flex-col gap-4 sm:gap-5 pb-4 sm:pb-5">
          {displayItems.map((item, idx) => (
            <TestimonialCard
              key={`${item.id}-t1-${idx}`}
              item={item}
              isDuplicate={false}
            />
          ))}
        </div>

        {/* Track 2: Duplicate for seamless loop */}
        <div className="flex flex-col gap-4 sm:gap-5 pb-4 sm:pb-5" aria-hidden="true">
          {displayItems.map((item, idx) => (
            <TestimonialCard
              key={`${item.id}-t2-${idx}`}
              item={item}
              isDuplicate={true}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * TestimonialsSection Component
 * Replaces the Clinic Visuals section with an aesthetic, text-only patient review experience.
 */
export default function TestimonialsSection({
  testimonials = defaultTestimonials,
  label = "PATIENT REVIEWS",
  title = "Care That Speaks for Itself",
  subtitle = "Read honest experiences from patients who trust Dr. Ayesha Mehta for gentle, modern, and transformative dentistry.",
  speedCol1 = 28,
  speedCol2 = 34,
  speedCol3 = 30,
  className = "",
}: {
  testimonials?: TestimonialItem[]
  label?: string
  title?: string
  subtitle?: string
  speedCol1?: number
  speedCol2?: number
  speedCol3?: number
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: "150px 0px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Partition testimonials among 3 columns
  const col1 = useMemo(
    () => testimonials.filter((_, idx) => idx % 3 === 0),
    [testimonials]
  )
  const col2 = useMemo(
    () => testimonials.filter((_, idx) => idx % 3 === 1),
    [testimonials]
  )
  const col3 = useMemo(
    () => testimonials.filter((_, idx) => idx % 3 === 2),
    [testimonials]
  )

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative w-full overflow-hidden bg-white text-neutral-800 py-24 sm:py-32 border-t border-neutral-200 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16 text-center max-w-3xl mx-auto">
          {/* Label Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white text-[#ff5f00] text-xs font-mono tracking-widest uppercase mb-4 shadow-xs">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#ff5f00]" />
            <span>{label}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 
          Vertical Review Stream Viewport
          3 columns on desktop, 2 on tablet, 1 on mobile
        */}
        <div
          className="relative w-full h-[620px] sm:h-[700px] lg:h-[760px] overflow-hidden"
          style={
            isMobile
              ? undefined
              : {
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                }
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 h-full">
            {/* Column 1: Moves upward */}
            <div className="h-full">
              <TestimonialColumn
                items={col1}
                direction="up"
                duration={speedCol1}
                prefersReducedMotion={prefersReducedMotion}
                isActive={isInView}
              />
            </div>

            {/* Column 2: Moves downward */}
            <div className="hidden md:block h-full">
              <TestimonialColumn
                items={col2}
                direction="down"
                duration={speedCol2}
                prefersReducedMotion={prefersReducedMotion}
                isActive={isInView}
              />
            </div>

            {/* Column 3: Moves upward */}
            <div className="hidden lg:block h-full">
              <TestimonialColumn
                items={col3}
                direction="up"
                duration={speedCol3}
                prefersReducedMotion={prefersReducedMotion}
                isActive={isInView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
