/**
 * JE. DIGITAL UNIVERSE — KNOWLEDGE BASE
 * Verified source of truth for Jhon Kylho Estrabo's portfolio,
 * background, education, demonstrated skills, and 7 projects.
 */

const JhonKnowledgeBase = {
  developer: {
    name: "Jhon Kylho Estrabo",
    monogram: "je.",
    role: "Full-Stack & Mobile Developer / IT Student",
    institution: "St. Anthony's College",
    seniorHighSchool: "Antique National School",
    education: [
      { degree: "BS Information Technology", school: "St. Anthony's College", period: "2022 — Present", status: "Currently studying" },
      { degree: "Senior High School · HUMSS", school: "Antique National School", period: "2020 — 2022", status: "Graduated" }
    ],
    location: "San Jose de Buenavista, Antique, Philippines",
    timezone: "Asia/Manila (UTC+8)",
    headline: "Ideas into interfaces. Code into possibility.",
    creativeStatement: "Made to move. Built to feel.",
    bio: "I build thoughtful digital experiences for everyday needs. A little curiosity, a lot of intention, and people at the heart of it all.",
    availability: "Open to software projects & collaborations.",
    github: "https://github.com/kylho1231",
    portfolioUrl: "https://kylho1231.github.io/portfolio/",
    email: "jhonkylhoestrabo@gmail.com"
  },

  skills: {
    frontend: ["React", "Next.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5 / Accessible Semantics", "Interactive WebGL / Three.js"],
    mobile: ["Kotlin", "Android Studio", "Progressive Web Apps (PWA)"],
    backend: ["Node.js", "Express", "Firebase / Firestore", "Supabase / PostgreSQL", "REST APIs", "Authentication / WebAuthn"],
    architecture: ["System Design", "Relational & Document Databases", "Responsive UI", "Motion Design", "State Management"]
  },

  projects: [
    {
      id: "aquaflow",
      title: "AquaFlow",
      tagline: "Water Refilling Station Management System",
      stack: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
      description: "An operational management system for water refilling businesses featuring customer subscription tracking, inventory monitoring, route logistics, and order delivery workflows.",
      simulatorId: "aquaflow-sim",
      liveDemo: "https://aquaflow-preview.vercel.app/"
    },
    {
      id: "toda",
      title: "TODA Tricycle Guide",
      tagline: "Tricycle Route & Fare Guidance System",
      stack: ["React", "Leaflet", "OpenStreetMap", "LocalStorage"],
      description: "A community-focused navigation tool for commuters and tricycle drivers in San Jose, Antique, providing transparent fare calculation, terminal mapping, and offline-ready route lookup.",
      simulatorId: "toda-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "scholarship",
      title: "Antique Provincial Scholarship Portal",
      tagline: "Municipal Student Financial Assistance Platform",
      stack: ["Next.js", "Supabase", "Tailwind CSS"],
      description: "A streamlined grant application and document evaluation system serving students across Antique province with real-time status tracking and eligibility auditing.",
      simulatorId: "scholarship-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "motorelease",
      title: "Yamaha OR/CR Releasing System",
      tagline: "Dealership Vehicle Documentation Management",
      stack: ["Next.js", "Firebase Firestore", "Tailwind CSS"],
      description: "Automated document queue and customer SMS notification portal tracking motorcycle registration certificates (OR/CR) from LTO submission to customer handover.",
      simulatorId: "motorelease-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "ecocollect",
      title: "Basura EcoCollect",
      tagline: "Smart Waste Collection & Passkey System",
      stack: ["React", "WebAuthn / Passkeys", "Tailwind CSS"],
      description: "A civic environmental platform connecting households and collection trucks with biometric passkey authentication, scheduled pickups, and waste diversion analytics.",
      simulatorId: "ecocollect-sim",
      liveDemo: "https://kylho1231.github.io/portfolio/#work"
    },
    {
      id: "antiquesupply",
      title: "Antique Supply B2B Marketplace",
      tagline: "Wholesale Procurement Platform",
      stack: ["Next.js", "Supabase", "Tailwind CSS"],
      description: "A regional commerce platform linking local agricultural producers and suppliers with Antique restaurants and retail establishments for transparent bulk ordering.",
      simulatorId: "antiquesupply-sim",
      liveDemo: "https://antique-supply-marketplace.vercel.app/"
    },
    {
      id: "antiqueride",
      title: "AntiqueRide",
      tagline: "Antique Commuter & Transit Guide",
      stack: ["Vanilla JavaScript", "Leaflet", "Canvas Simulation", "LocalStorage"],
      description: "A comprehensive transit companion for Antique province commuters featuring live route pathfinding, fare verification, municipal terminal rosters, and transport schedules.",
      simulatorId: "antiqueride-sim",
      liveDemo: "https://antiqueride.vercel.app/"
    }
  ],

  characters: {
    code: {
      name: "CODE",
      title: "The Systems Architect",
      accent: "#69E8F2",
      role: "Explains technical architectures, full-stack systems, Kotlin mobile development, and data modeling.",
      intro: "Hello! I'm CODE, your systems engineering guide. I break down how Jhon transforms complex ideas into reliable full-stack applications and mobile software."
    },
    claude: {
      name: "CLAUDE",
      title: "The Human-Centered Storyteller",
      accent: "#E6A47C",
      role: "Shares Jhon's creative journey, philosophy of futuristic humanism, and roots in Antique.",
      intro: "Welcome to JE. Digital Universe. I'm CLAUDE. I celebrate the human stories, local roots in Antique, and thoughtful craftsmanship behind Jhon's code."
    },
    grok: {
      name: "GROK",
      title: "The Edgy Experimenter",
      accent: "#9A83FF",
      role: "Highlights bold experiments, spatial UI prototypes, fast iterations, and hiring opportunities.",
      intro: "Hey there! I'm GROK. You're looking at cutting-edge spatial UI, magnetic interactions, and production-tested apps. Ready to build something extraordinary with Jhon?"
    },
    gemini: {
      name: "GEMINI",
      title: "The Multimodal Polymath",
      accent: "#699CFF",
      role: "Connects cross-disciplinary dots across web, mobile, GIS mapping, and civic tools.",
      intro: "Greetings! I'm GEMINI. I illuminate how Jhon synthesizes mobile engineering, spatial mapping, and web platforms to solve multifaceted real-world challenges."
    },
    council: {
      name: "THE COUNCIL",
      title: "Unified AI Ensemble",
      accent: "#CAFF6B",
      role: "All four digital companions in synchronized harmony.",
      intro: "Welcome to the full AI Council. CODE, CLAUDE, GROK, and GEMINI stand ready to guide you through Jhon Kylho Estrabo's digital universe."
    }
  },

  disclosure: "The AI Council characters are original, interactive 3D companions designed and built by Jhon Kylho Estrabo as portfolio guides. They are not affiliated with or endorsed by Anthropic, Google, or xAI."
};

window.JhonKnowledgeBase = JhonKnowledgeBase;
