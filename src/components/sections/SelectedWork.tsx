"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="work" className="py-[clamp(80px,14vh,160px)] px-[clamp(20px,4vw,56px)] bg-bg select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap');

        .font-variable-title {
          font-family: 'Roboto Flex', -apple-system, BlinkMacSystemFont, sans-serif;
          will-change: font-variation-settings, color;
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto">
        {/* Section Head */}
        <div className="flex items-center justify-between pb-8 border-b border-hairline mb-4">
          <div className="flex items-center gap-2">
            <span className="eyebrow eyebrow--accent">(Selected work)</span>
            <span className="eyebrow text-accent">(0{projects.length})</span>
          </div>
          <span className="eyebrow text-label">2024 — 2026</span>
        </div>

        {/* Selected Work 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
          {/* Left Column: Project Rows */}
          <div className="lg:col-span-7 flex flex-col">
            {projects.map((project, idx) => {
              const isSelected = activeProject.id === project.id;
              const formattedNum = `0${idx + 1}`;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveProject(project)}
                  className={`group relative box-border border-b border-hairline py-[clamp(28px,4vw,48px)] cursor-pointer transition-all duration-500 ${
                    isSelected ? "lg:pl-3" : "hover:lg:pl-2"
                  }`}
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    {/* Top row: Num & Variable Font Title */}
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-xs tracking-wider transition-colors duration-300 w-6 shrink-0 ${
                          isSelected ? "text-accent font-semibold" : "text-label"
                        }`}
                      >
                        {formattedNum}
                      </span>

                      <h2
                        className={`font-variable-title flex-1 text-[clamp(34px,5.2vw,86px)] tracking-[-0.01em] leading-[0.98] transition-all duration-500 ${
                          isSelected ? "text-accent" : "text-[#7a756f] group-hover:text-text"
                        }`}
                        style={{
                          fontVariationSettings: isSelected
                            ? "'wdth' 142, 'wght' 450"
                            : "'wdth' 55, 'wght' 850",
                        }}
                      >
                        {project.title}
                      </h2>
                    </div>

                    {/* Meta row: Category, Role, Case Study link */}
                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider pl-10 sm:pl-12">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={isSelected ? "text-text/80" : "text-muted"}>
                          {project.category}
                        </span>
                        <span className="text-muted/40">•</span>
                        <span className={isSelected ? "text-accent" : "text-muted"}>
                          {project.role}
                        </span>
                      </div>

                      <div
                        className={`flex items-center gap-1 transition-opacity duration-300 ${
                          isSelected ? "opacity-100 text-accent" : "opacity-0 group-hover:opacity-100 text-text"
                        }`}
                      >
                        <span>Case study</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Docked Video Frame */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start">
            <div className="w-full aspect-[9/14] max-h-[640px] rounded-[2.5rem] p-3 bg-surface/90 border border-hairline shadow-2xl shadow-black relative overflow-hidden group">
              {/* Dynamic Island Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
              </div>

              {/* Video Showcase Screen */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black relative">
                <video
                  key={activeProject.id}
                  src={activeProject.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Bottom glass overlay with active project info */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">
                    {activeProject.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {activeProject.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
