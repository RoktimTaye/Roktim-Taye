export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription?: string[];
  techStack: string[];
  accentColor: string;
  videoUrl: string;
  posterUrl?: string;
  featured?: boolean;
  role: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "flavour-fleet",
    title: "Flavour Fleet",
    category: "Web App · UI/UX",
    tagline: "A food delivery platform reimagined with motion and taste",
    description: "A concept food delivery web app focused on delightful micro-interactions, smooth ordering flows, and a bold visual identity that makes browsing feel as good as eating.",
    longDescription: [
      "Flavour Fleet was crafted to explore how fluid transitions and tactile design can turn an everyday food ordering task into an appetizing experience.",
      "The interface highlights daily chef specials, smooth cart transitions, dynamic delivery tracking, and responsive layout designs tailored for modern web and mobile viewports.",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase"],
    accentColor: "#FF6B4A",
    videoUrl: "/videos/flavour-fleet.mp4",
    featured: true,
    role: "Design & Development",
    year: "2026",
    liveUrl: "https://github.com/RoktimTaye",
    githubUrl: "https://github.com/RoktimTaye",
  },
  {
    id: "2",
    slug: "pulse-dashboard",
    title: "Pulse Dashboard",
    category: "Dashboard · SaaS",
    tagline: "Real-time analytics that actually feel alive",
    description: "A SaaS analytics dashboard concept with live-updating charts, dark-mode-first design, and buttery smooth transitions. Every data point animates in with purpose.",
    longDescription: [
      "Designed for high-throughput teams who need quick insights without visual clutter.",
      "Features dynamic telemetry widgets, high-contrast metrics, keyboard shortcuts, and smooth data streaming states.",
    ],
    techStack: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    accentColor: "#4A9EFF",
    videoUrl: "/videos/pulse-dashboard.mp4",
    role: "Full-Stack Design & Dev",
    year: "2026",
    liveUrl: "https://github.com/RoktimTaye",
    githubUrl: "https://github.com/RoktimTaye",
  },
  {
    id: "3",
    slug: "moodboard",
    title: "Moodboard",
    category: "Mobile App · Creative Tool",
    tagline: "Capture inspiration on the go",
    description: "A mobile-first mood boarding app where creators save, tag, and arrange visual inspiration into shareable collections. Gesture-driven UI with drag-to-arrange and pinch-to-zoom.",
    longDescription: [
      "Built for designers, photographers, and builders who collect fragments of creative ideas anywhere.",
      "Includes instant palette extraction, drag-and-drop spatial canvas, tag auto-grouping, and rapid export flows.",
    ],
    techStack: ["React Native", "Expo", "Firebase", "Reanimated"],
    accentColor: "#A66BFF",
    videoUrl: "/videos/moodboard.mp4",
    role: "UI Design & Prototyping",
    year: "2025",
    liveUrl: "https://github.com/RoktimTaye",
    githubUrl: "https://github.com/RoktimTaye",
  },
  {
    id: "4",
    slug: "nomad-journal",
    title: "Nomad Journal",
    category: "Web App · Travel",
    tagline: "Document your journey, one place at a time",
    description: "A travel journaling platform where each entry is pinned to a map. Rich text editing, photo galleries, and a timeline view that makes looking back as fun as being there.",
    longDescription: [
      "A tribute to slow travel and meaningful storytelling. Each entry captures geolocation, weather, routes, and candid memories.",
      "Synchronizes offline notes and creates interactive travel trails on interactive vector maps.",
    ],
    techStack: ["Next.js", "Mapbox GL", "Prisma", "PostgreSQL"],
    accentColor: "#4ABA7A",
    videoUrl: "/videos/nomad-journal.mp4",
    role: "Design & Full-Stack Dev",
    year: "2025",
    liveUrl: "https://github.com/RoktimTaye",
    githubUrl: "https://github.com/RoktimTaye",
  },
  {
    id: "5",
    slug: "forma",
    title: "Forma",
    category: "Landing Page · Branding",
    tagline: "Where identity meets interface",
    description: "A branding agency landing page built with scroll-driven storytelling. Each section reveals the agency's process through layered animations, kinetic typography, and bold imagery.",
    longDescription: [
      "Engineered to demonstrate modern agency art direction: dramatic type contrasts, cinematic video textures, and smooth interactive hover states.",
      "Optimized for high-performance mobile scrolling and high-fidelity desktop displays.",
    ],
    techStack: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"],
    accentColor: "#FF4A8D",
    videoUrl: "/videos/forma.mp4",
    role: "Creative Direction & Dev",
    year: "2026",
    liveUrl: "https://github.com/RoktimTaye",
    githubUrl: "https://github.com/RoktimTaye",
  },
];
