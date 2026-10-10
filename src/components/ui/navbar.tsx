"use client"

import React, { useState, useEffect } from "react"
import { Calendar, Menu, X, ArrowUpRight } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-3 sm:top-5 left-0 right-0 z-50 mx-auto w-[94%] max-w-5xl transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2.5 px-4 sm:px-6 rounded-full"
          : "bg-white/80 backdrop-blur-md border border-neutral-200/70 shadow-[0_6px_20px_rgba(0,0,0,0.05)] py-3 px-4 sm:px-6 rounded-full"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e3131b] to-[#ff5f00] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_14px_rgba(255,95,0,0.35)] group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-neutral-900 group-hover:text-[#ff5f00] transition-colors leading-none">
              Aurelia
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase leading-tight mt-0.5">
              Dental Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1 rounded-full bg-neutral-100/80 border border-neutral-200/80"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-medium text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/70 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary Navbar CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#ff5f00] text-black font-semibold text-xs tracking-wide hover:bg-[#ff7722] hover:shadow-[0_0_20px_rgba(255,95,0,0.4)] transition-all duration-200"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 rounded-lg bg-neutral-100 border border-neutral-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-neutral-200 flex flex-col gap-1 pb-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-4 py-2 text-sm text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
