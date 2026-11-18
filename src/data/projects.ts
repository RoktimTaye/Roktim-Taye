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
    slug: "aura",
    title: "Aura",
    category: "AI Web App · UI/UX",
    tagline: "An ambient AI platform crafted for generative workflows and deep focus",
    description: "An intelligent ambient workspace with fluid micro-interactions, generative interfaces, and real-time responsiveness.",
    longDescription: [
      "Aura was engineered to explore how intelligent interfaces can feel natural, responsive, and seamlessly calm.",
      "The interface highlights generative canvas workflows, contextual toolbars, real-time streaming states, and responsive layout designs tailored for modern web viewports.",
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "FastAPI"],
    accentColor: "#7FA8FF",
    videoUrl: "/videos/flavour-fleet.mp4",
    featured: true,
    role: "Design & Development",
    year: "2026",
    liveUrl: "https://github.com/RoktimTaye",
    githubUrl: "https://github.com/RoktimTaye",
  },
  {
    id: "2",
    slug: "lumalabs",
    title: "LumaLabs",
    category: "Creative Tech · 3D Experience",
    tagline: "Next-generation 3D generative visuals and spatial interaction",
    description: "A spatial visual playground leveraging 3D interactive graphics, shaders, and kinetic typography for immersive brand experiences.",
    longDescription: [
      "Built to showcase real-time web-based 3D graphics and generative interactions that push browser capabilities.",
      "Features interactive shader effects, gesture-driven model controls, dynamic lighting systems, and cinematic transitions.",
    ],
    techStack: ["React", "Three.js", "GSAP", "Tailwind CSS", "WebGL"],
    accentColor: "#FF6B4A",
    videoUrl: "/videos/forma.mp4",
    featured: true,
    role: "Creative Direction & Dev",
    year: "2026",
    liveUrl: "https://github.com/RoktimTaye",
    githubUrl: "https://github.com/RoktimTaye",
  },
];
