"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="work" className="py-[clamp(80px,14vh,160px)] px-[clamp(20px,4vw,56px)] bg-bg">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Head */}
        <div className="flex items-center justify-between pb-8 border-b border-hairline mb-4">
          <div className="flex items-center gap-3">
            <span className="eyebrow eyebrow--accent">(Selected work)</span>
          </div>
          <span className="eyebrow text-label">2024 — 2026</span>
        </div>

        {/* Selected Work 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
          {/* Left Column: Project Rows */}
          <div className="lg:col-span-7 flex flex-col">
            {projects.map((project, idx) => {
              const isSelected = activeProject.id === project.id;
              const formattedNum = `(0${idx + 1})`;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveProject(project)}
                  className={`group relative box-border border-b border-hairline transition-all duration-500 py-[clamp(28px,4vw,48px)] cursor-pointer ${
                    isSelected ? "lg:pl-6 text-accent" : "text-text hover:text-accent lg:hover:pl-4"
                  }`}
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    {/* Top row: Num, Title, Year */}
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-xs text-label group-hover:text-accent transition-colors">
                        {formattedNum}
                      </span>
                      <h2 className="flex-1 text-[clamp(28px,4.5vw,78px)] font-black tracking-tight leading-[0.92] uppercase transition-colors">
                        {project.title}
                      </h2>
                      <span className="font-mono text-xs text-label">
                        {project.year}
                      </span>
                    </div>

                    {/* Meta row: Category, Tagline, Arrow */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-label pl-0 sm:pl-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-muted">{project.category}</span>
                        <span>•</span>
                        <span className="text-accent">{project.role}</span>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-text">
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
