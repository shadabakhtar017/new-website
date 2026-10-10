"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  Globe,
  Sparkles,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function FooterSection() {
  const [copied, setCopied] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  const contactEmail = "hello@aureliadentalstudio.com"
  const contactPhone = "+91 98765 43210"

  // Live real-time clinic clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      setCurrentTime(formatted)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim() && emailInput.includes("@")) {
      setSubscribed(true)
      setEmailInput("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ]

  const dentalServices = [
    "General Dentistry",
    "Teeth Whitening",
    "Dental Implants",
    "Root Canal Treatment",
    "Cosmetic Dentistry",
    "Braces & Aligners",
  ]

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
    { name: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
    { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  ]

  return (
    <footer
      id="footer"
      className="relative w-full bg-white text-neutral-800 pt-20 sm:pt-28 pb-12 overflow-hidden border-t border-neutral-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Top Call-to-Action Statement Banner */}
        <div className="mb-20 sm:mb-28 rounded-3xl border border-neutral-200 bg-neutral-50/90 shadow-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-4xl">
            {/* Availability pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white text-neutral-700 text-xs font-mono mb-6 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>NOW WELCOMING NEW PATIENTS • CHANDIGARH</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.08]">
              Your healthiest smile <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-[#ff5f00] to-[#e3131b]">
                begins with gentle, modern care.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mb-10 leading-relaxed font-normal">
              Schedule your personalized consultation with Dr. Ayesha Mehta and experience comprehensive, patient-centered dentistry in a calm, modern environment.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Primary Action Button */}
              <a
                href={`tel:${contactPhone}`}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#ff5f00] text-black font-semibold text-sm sm:text-base tracking-wide hover:bg-[#ff721a] hover:shadow-[0_0_30px_rgba(255,95,0,0.35)] transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>BOOK AN APPOINTMENT</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2.5 px-5 py-4 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-100 hover:border-neutral-300 text-neutral-800 text-sm font-mono tracking-tight transition-all duration-200 shadow-sm"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-sans text-xs sm:text-sm font-medium">
                      Email copied to clipboard!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-500" />
                    <span>{contactEmail}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-neutral-200">
          {/* Column 1: Studio Brand & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e3131b] to-[#ff5f00] flex items-center justify-center font-bold text-black text-lg shadow-[0_0_16px_rgba(255,95,0,0.25)]">
                A
              </div>
              <div>
                <span className="font-semibold text-xl tracking-tight text-neutral-900 block leading-tight">
                  Aurelia Dental Studio
                </span>
                <span className="text-[11px] font-mono text-[#ff5f00] tracking-wider uppercase font-semibold">
                  Dr. Ayesha Mehta, BDS, MDS
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed max-w-sm">
              Modern, personalized dental care focused on healthier teeth and confident smiles. Providing preventive, restorative, and cosmetic treatments in a comfortable setting.
            </p>

            {/* Opening Hours Widget */}
            <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50 text-xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-800 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#ff5f00]" />
                <span className="font-mono uppercase tracking-wider text-[11px]">Opening Hours</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600">
                <span>Monday – Saturday</span>
                <span className="text-neutral-900 font-mono font-medium">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600">
                <span>Sunday</span>
                <span className="text-[#e3131b] font-mono font-medium">Closed</span>
              </div>
            </div>

            {/* Real-time Studio Clock & Timezone Widget */}
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-700">
              <Globe className="w-3.5 h-3.5 text-[#ff5f00]" />
              <span>CLINIC CLOCK:</span>
              <span className="text-neutral-900 font-semibold">
                {currentTime || "09:00 AM"}
              </span>
              <span className="text-neutral-500">• Chandigarh (IST)</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-neutral-600 hover:text-[#ff5f00] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#ff5f00]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {dentalServices.map((service) => (
                <li
                  key={service}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f00] shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5f00]" />
              <span>Contact & Visit</span>
            </h4>

            <div className="space-y-3 text-sm text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ff5f00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-900 font-medium">Aurelia Dental Studio</p>
                  <p>Sector 17, Chandigarh, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ff5f00] shrink-0" />
                <a href={`tel:${contactPhone}`} className="hover:text-neutral-900 transition-colors">
                  {contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff5f00] shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-neutral-900 transition-colors break-all">
                  {contactEmail}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-neutral-600 mb-2 leading-relaxed">
                Stay updated with oral healthcare tips & seasonal smile care reminders.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#ff5f00] focus:ring-1 focus:ring-[#ff5f00]/30 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#ff5f00] text-black hover:bg-[#ff721a] transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>

                <AnimatePresence>
                  {subscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-emerald-600 font-mono font-medium"
                    >
                      ✓ Thank you for connecting with us.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-xs text-neutral-500 space-y-1 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Aurelia Dental Studio. All rights reserved.
            </p>
            <p className="text-neutral-500 text-[11px]">
              Dr. Ayesha Mehta, BDS, MDS • Senior Dentist & Smile Care Specialist • Sector 17, Chandigarh, India
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 hover:border-neutral-300 text-neutral-600 hover:text-neutral-950 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
                  aria-label={social.name}
                  title={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          {/* Back To Top Button */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 hover:border-neutral-300 text-neutral-700 hover:text-neutral-950 text-xs font-mono tracking-wider uppercase transition-all duration-200 group shadow-xs"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 text-[#ff5f00]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}


