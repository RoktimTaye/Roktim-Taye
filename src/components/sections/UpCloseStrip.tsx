"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function UpCloseStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate up-close showcase items from the projects
  const items = [
    {
      key: "1-m",
      title: "Flavour Fleet",
      subtitle: "(01) Mobile Flow",
      href: "/projects/flavour-fleet",
      videoUrl: "/videos/flavour-fleet.mp4",
      accent: "#FF6B4A",
    },
    {
      key: "2-m",
      title: "Pulse Dashboard",
      subtitle: "(02) Real-Time Telemetry",
      href: "/projects/pulse-dashboard",
      videoUrl: "/videos/pulse-dashboard.mp4",
      accent: "#4A9EFF",
    },
    {
      key: "3-m",
      title: "Moodboard",
      subtitle: "(03) Spatial Canvas",
      href: "/projects/moodboard",
      videoUrl: "/videos/moodboard.mp4",
      accent: "#A66BFF",
    },
    {
      key: "4-m",
      title: "Nomad Journal",
      subtitle: "(04) Vector Trails",
      href: "/projects/nomad-journal",
      videoUrl: "/videos/nomad-journal.mp4",
      accent: "#4ABA7A",
    },
    {
      key: "5-m",
      title: "Forma",
      subtitle: "(05) Motion Narrative",
      href: "/projects/forma",
      videoUrl: "/videos/forma.mp4",
      accent: "#FF4A8D",
    },
  ];

  return (
    <section className="py-[clamp(60px,10vh,120px)] bg-bg overflow-hidden border-t border-hairline">
      {/* Head */}
      <div className="w-full px-[clamp(20px,4vw,56px)] flex items-center justify-between mb-8">
        <span className="eyebrow eyebrow--accent">(Up close)</span>
        <span className="eyebrow text-label">Drag or scroll →</span>
      </div>

      {/* Horizontal Rail */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth px-[clamp(20px,4vw,56px)]"
      >
        <div className="flex gap-6 sm:gap-8 w-max pb-4">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group block w-[280px] sm:w-[340px] md:w-[380px] flex-none"
            >
              {/* Card Container 4/5 Aspect Ratio */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-hairline group-hover:border-accent/50 transition-all duration-500 shadow-xl shadow-black/60">
                {/* Background glow tint */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
                  style={{
                    backgroundColor: item.accent,
                  }}
                />

                {/* Looping video showcase */}
                <video
                  src={item.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-muted group-hover:text-text transition-colors">
                  {item.subtitle}
                </span>
                <span className="text-label group-hover:text-accent transition-colors">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
