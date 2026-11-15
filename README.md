# 🚀 Roktim Taye — Designer & Developer Portfolio

A sleek, dark-themed, cinematic portfolio website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, inspired by the design language of [mikewilcockdesign.com](https://mikewilcockdesign.com/).

---

## ✨ Features

- **Massive Typographic Hero**: Staggered, clamp-scaled `ROKTIM` / `TAYE` entrance animation.
- **Continuous Skills Marquee**: Smooth infinite horizontal loop showcasing key crafts and tools (`Design · Think · Build · Brainstorm · Ideate · Ship · Next.js · React · Figma · Tailwind`).
- **Featured Project Showcase**: Interactive mockup highlighting the hero case study (`Flavour Fleet`) with video playback.
- **Interactive Project Grid**: 4-column layout with fluid video-on-hover previews and color-tinted overlays.
- **Artistic About Section**: Bio highlighting Roktim's problem-solving philosophy, italicized emphasis, and interactive profile photo card.
- **Bold "LET'S TALK" CTA**: Full-width statement linking to email with instant copy-to-clipboard functionality.
- **Dynamic Case Study Pages**: Dedicated `/projects/[slug]` route for each project featuring long-form descriptions, tech stack pills, and prev/next navigation.
- **Buttery Smooth Scroll**: Integrated with Lenis with automatic `prefers-reduced-motion` compliance.
- **SEO & Social Ready**: Complete OpenGraph, Twitter Cards, and schema.org `Person` JSON-LD structured data.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/
│   ├── images/
│   │   └── roktim-profile.jpg       # Profile picture
│   └── videos/                      # Showcase videos (.mp4)
│       ├── flavour-fleet.mp4
│       ├── pulse-dashboard.mp4
│       ├── moodboard.mp4
│       ├── nomad-journal.mp4
│       └── forma.mp4
├── src/
│   ├── app/
│   │   ├── globals.css              # Global styles, scrollbar, marquee animation
│   │   ├── layout.tsx               # Root layout, metadata, JSON-LD, smooth scroll
│   │   ├── page.tsx                 # Home page (all sections composed)
│   │   └── projects/[slug]/page.tsx # Dynamic case study route
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Fixed blur navbar & mobile drawer
│   │   │   └── Footer.tsx           # Social links & copyright
│   │   ├── sections/
│   │   │   ├── Hero.tsx             # Typographic hero
│   │   │   ├── SkillsMarquee.tsx    # Infinite ticker
│   │   │   ├── FeaturedProject.tsx  # Standout device mockup
│   │   │   ├── ProjectGrid.tsx      # 4-column video hover grid
│   │   │   ├── About.tsx            # Story & profile showcase
│   │   │   └── CTA.tsx              # "LET'S TALK"
│   │   └── ui/
│   │       ├── ProjectCard.tsx      # Video hover card component
│   │       └── SmoothScroll.tsx     # Lenis provider
│   ├── data/
│   │   └── projects.ts              # Single source of truth for all projects
│   └── lib/
│       ├── animations.ts            # Framer motion variants
│       └── utils.ts                 # Class merging helper
└── tailwind.config.ts               # Custom design system tokens
```

---

## 🔄 Updating Projects

To add or modify projects, simply edit `src/data/projects.ts`. Place any new video in `public/videos/` and link it in the project object.
