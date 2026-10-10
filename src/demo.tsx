"use client"

import LycorisSpecimen from "@/components/ui/lycoris-specimen"

export default function Demo() {
  return (
    <div className="w-full">
      <LycorisSpecimen
        name="Aurelia"
        studio="Dr. Ayesha Mehta"
        year="2026"
        description="Personalized dental care designed around your comfort, oral health, and long-term smile."
        specs={[
          "General • Cosmetic • Restorative",
          "Dr. Ayesha Mehta (BDS, MDS)",
          "Sector 17, Chandigarh, India",
          "Gentle & Comfort-Focused Care",
          "Modern Dental Environment",
        ]}
        tagline={[
          { text: "Modern" },
          { text: "Dentistry", small: true },
          { text: "Confident" },
          { text: "Smiles", small: true },
        ]}
        multilingual="Aurelia·Dental·Studio"
        ligatureWord="Smiles"
        links={[
          { label: "BOOK AN APPOINTMENT", href: "#contact" },
          { label: "EXPLORE OUR SERVICES", href: "#services" },
        ]}
        ink="#FFFFFF"
        bone="#171717"
      />
    </div>
  )
}
