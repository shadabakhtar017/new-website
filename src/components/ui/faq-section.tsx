"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Clock,
  Layers,
  CreditCard,
  Code2,
  CheckCircle2,
} from "lucide-react"

export interface FaqItem {
  id: string
  category: "Appointments" | "Treatments" | "General Care"
  question: string
  answer: string
  highlights?: string[]
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "01",
    category: "Appointments",
    question: "Do I need an appointment before visiting?",
    answer:
      "Appointments are recommended so we can reserve enough time for your consultation and treatment. Contact the clinic to choose a suitable time.",
    highlights: ["Recommended Booking", "Dedicated Doctor Time", "Flexible Slots"],
  },
  {
    id: "02",
    category: "General Care",
    question: "How often should I visit the dentist?",
    answer:
      "Regular dental checkups can help identify potential problems early. Your dentist can recommend a visit schedule based on your individual oral-health needs.",
    highlights: ["Preventive Checkups", "Early Detection", "Personalized Schedule"],
  },
  {
    id: "03",
    category: "Treatments",
    question: "Is professional teeth cleaning painful?",
    answer:
      "Professional cleaning is generally comfortable for most patients. Your dentist can discuss any sensitivity or concerns before treatment begins.",
    highlights: ["Gentle Procedure", "Patient Comfort", "Sensitivity Care"],
  },
  {
    id: "04",
    category: "Treatments",
    question: "Do you provide cosmetic dental treatments?",
    answer:
      "Yes. We offer smile-focused treatments such as professional teeth whitening and other cosmetic dentistry options based on individual needs.",
    highlights: ["Teeth Whitening", "Smile Aesthetics", "Custom Treatment Plans"],
  },
  {
    id: "05",
    category: "Appointments",
    question: "What should I bring to my first appointment?",
    answer:
      "Bring any relevant dental records or previous treatment information you have. Most importantly, let the dental team know about any concerns or symptoms you want to discuss.",
    highlights: ["Prior Dental Records", "Discussion of Symptoms", "New Patient Welcome"],
  },
  {
    id: "06",
    category: "General Care",
    question: "Do you treat children?",
    answer:
      "Yes. We provide gentle dental care for children and focus on creating a comfortable, positive dental experience.",
    highlights: ["Gentle Pediatric Care", "Positive Environment", "Early Oral Habits"],
  },
  {
    id: "07",
    category: "Appointments",
    question: "How can I book an appointment?",
    answer:
      "Use the Book an Appointment button on the website or contact Aurelia Dental Studio directly to discuss available appointment times.",
    highlights: ["Direct Online Booking", "Phone & Studio Reception", "Sector 17, Chandigarh"],
  },
]

const CATEGORIES = ["All", "Appointments", "Treatments", "General Care"] as const
type CategoryFilter = (typeof CATEGORIES)[number]

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "01": true, // First item opened by default for preview
  })

  // Filter items based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory

      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlights?.some((h) =>
          h.toLowerCase().includes(searchQuery.toLowerCase())
        )

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {}
    filteredFaqs.forEach((faq) => {
      allOpen[faq.id] = true
    })
    setOpenItems(allOpen)
  }

  const collapseAll = () => {
    setOpenItems({})
  }

  const allFilteredOpen =
    filteredFaqs.length > 0 &&
    filteredFaqs.every((item) => !!openItems[item.id])

  return (
    <section
      id="faq"
      className="relative w-full py-24 sm:py-32 bg-[#050505] text-[#f5f5f5] overflow-hidden border-t border-neutral-900"
    >
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-15"
        style={{
          background:
            "radial-gradient(circle, #e3131b 0%, #ff5f00 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-10 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10"
        style={{
          background:
            "radial-gradient(circle, #ff5f00 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-md text-[#ff5f00] text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(255,95,0,0.15)]">
            <HelpCircle className="w-3.5 h-3.5 text-[#ff5f00]" />
            <span>COMMON QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#f5f5f5] mb-4 leading-tight">
            Everything You Need To Know
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Find clear answers about consultations, preventive oral care, personalized dental treatments, and visiting Aurelia Dental Studio.
          </p>
        </div>

        {/* Controls: Search Bar & Category Filters */}
        <div className="mb-10 space-y-6 max-w-4xl mx-auto">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keywords (e.g., appointment, cleaning, whitening, kids)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 text-sm text-[#f5f5f5] placeholder:text-neutral-500 focus:outline-none focus:border-[#ff5f00]/70 focus:ring-1 focus:ring-[#ff5f00]/30 transition-all backdrop-blur-md shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-[#f5f5f5] transition-colors rounded-full hover:bg-neutral-800"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories & Expand/Collapse Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? "bg-[#ff5f00] text-black border-[#ff5f00] shadow-[0_0_16px_rgba(255,95,0,0.35)] font-semibold"
                        : "bg-neutral-900/50 text-neutral-400 border-neutral-800 hover:text-[#f5f5f5] hover:border-neutral-700"
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={allFilteredOpen ? collapseAll : expandAll}
                className="text-xs font-mono tracking-wider text-neutral-400 hover:text-[#ff5f00] transition-colors px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-[#ff5f00]/40 bg-neutral-900/40"
              >
                {allFilteredOpen ? "COLLAPSE ALL" : "EXPAND ALL"}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 rounded-2xl bg-neutral-900/30 border border-neutral-800 text-center">
              <p className="text-neutral-400 text-base mb-2">
                No questions found matching "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                }}
                className="text-xs text-[#ff5f00] font-mono hover:underline uppercase tracking-wider"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = !!openItems[item.id]
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-neutral-700/90 bg-neutral-900/80 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
                      : "border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700/60 hover:bg-neutral-900/50"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 px-6 sm:px-7 flex items-center justify-between gap-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <span className="text-xs font-mono font-medium text-[#ff5f00] opacity-80 shrink-0">
                        {item.id}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-[#f5f5f5] group-hover:text-white transition-colors tracking-tight leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-block text-[11px] font-mono uppercase px-2 py-0.5 rounded-full border border-neutral-800 text-neutral-400 bg-neutral-950/60">
                        {item.category}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "bg-[#ff5f00] text-black border-[#ff5f00] rotate-180 shadow-[0_0_12px_rgba(255,95,0,0.4)]"
                            : "bg-neutral-800/60 text-neutral-400 border-neutral-700/60 group-hover:text-white group-hover:border-neutral-600"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                          <p className="mb-4 text-neutral-300/90">{item.answer}</p>

                          {/* Highlights pills */}
                          {item.highlights && item.highlights.length > 0 && (
                            <div className="pt-3 border-t border-neutral-800/40 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-mono uppercase text-neutral-400 mr-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5f00]" />
                                Key Aspects:
                              </span>
                              {item.highlights.map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2.5 py-1 rounded-md bg-neutral-800/80 border border-neutral-700/50 text-[#b6b095]"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
