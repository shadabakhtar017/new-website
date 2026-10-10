export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  url: string
  year?: string
  tags?: string[]
}

export const selectedProjects: Project[] = [
  {
    id: "01",
    title: "General Dentistry",
    category: "Preventive & Routine Care",
    description:
      "Regular examinations, professional cleaning, fillings, and preventive dental care to help maintain healthy teeth and gums.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 01",
    tags: ["Examinations", "Deep Cleaning", "Fillings", "Preventive Care"],
  },
  {
    id: "02",
    title: "Teeth Whitening",
    category: "Cosmetic Dentistry",
    description:
      "Professional whitening solutions designed to brighten your smile safely and naturally.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 02",
    tags: ["Enamel-Safe", "Natural Brightness", "In-Clinic", "Take-Home Kits"],
  },
  {
    id: "03",
    title: "Dental Implants",
    category: "Restorative Dentistry",
    description:
      "A long-term tooth replacement solution designed to restore function, comfort, and confidence.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 03",
    tags: ["Tooth Replacement", "Titanium Implants", "Permanent Stability", "Natural Feel"],
  },
  {
    id: "04",
    title: "Root Canal Treatment",
    category: "Endodontics",
    description:
      "Modern root canal care focused on treating infected teeth while preserving your natural smile.",
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 04",
    tags: ["Infection Relief", "Tooth Preservation", "Gentle Anesthesia", "Crown Sealing"],
  },
  {
    id: "05",
    title: "Cosmetic Dentistry",
    category: "Smile Enhancement",
    description:
      "Smile-focused treatments that can improve the appearance, shape, and overall harmony of your teeth.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 05",
    tags: ["Porcelain Veneers", "Composite Bonding", "Smile Design", "Harmonious Contouring"],
  },
  {
    id: "06",
    title: "Braces & Aligners",
    category: "Orthodontics",
    description:
      "Orthodontic solutions designed to gradually improve tooth alignment and create a healthier, more balanced smile.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 06",
    tags: ["Clear Aligners", "Traditional Braces", "Bite Alignment", "Discreet Wear"],
  },
  {
    id: "07",
    title: "Dental Crowns & Bridges",
    category: "Restorative Dentistry",
    description:
      "Restorative solutions for damaged or missing teeth, helping restore both function and appearance.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 07",
    tags: ["Ceramic Crowns", "Fixed Bridges", "Custom Shade Match", "Durable Function"],
  },
  {
    id: "08",
    title: "Kids Dentistry",
    category: "Pediatric Care",
    description:
      "Gentle, comfortable dental care designed to help children develop healthy oral-care habits from an early age.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    url: "#contact",
    year: "Gallery Case 08",
    tags: ["Gentle Checkups", "Cavity Prevention", "Friendly Care", "Positive Habits"],
  },
]
