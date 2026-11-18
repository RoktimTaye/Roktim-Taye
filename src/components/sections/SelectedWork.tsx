"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import TextPressure from "@/components/ui/TextPressure";

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeProjectRef = useRef(activeProject);
  activeProjectRef.current = activeProject;

  const activeIdx = projects.findIndex((p) => p.id === activeProject.id);
  const currentIdx = activeIdx >= 0 ? activeIdx : 0;
  const currentFormattedNum = `0${currentIdx + 1}`;
  const totalFormattedNum = `0${projects.length}`;

  // Track scroll position to update active project dynamically on mobile & desktop
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;

        // On mobile, the sticky video occupies the upper ~45% of the viewport;
        // target the optical center of the lower scrolling reading zone (~65% viewport height).
        const targetY =
          window.innerWidth < 1024
            ? window.innerHeight * 0.65
            : window.innerHeight * 0.5;

        let closestIdx = 0;
        let minDistance = Infinity;

        itemRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const dist = Math.abs(itemCenter - targetY);

          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        if (
          projects[closestIdx] &&
          projects[closestIdx].id !== activeProjectRef.current.id
        ) {
          setActiveProject(projects[closestIdx]);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="work"
      className="py-[clamp(60px,10vh,140px)] px-[clamp(20px,4vw,56px)] bg-bg select-none relative"
    >
      <div className="w-full">
        {/* Section Head */}
        <div className="flex items-center justify-between pb-8 border-b border-hairline mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-accent text-[clamp(16px,1.4vw,22px)] tracking-wider uppercase font-medium">
              (Selected work)
            </span>
            <span className="font-mono text-accent text-[clamp(16px,1.4vw,22px)] tracking-wider uppercase font-medium">
              ({totalFormattedNum})
            </span>
          </div>
          <span className="eyebrow text-label">2024 — 2026</span>
        </div>

        {/* Mobile Sticky Video Showcase & Progression Tracker */}
        <div className="lg:hidden sticky top-14 sm:top-16 z-30 bg-bg/95 backdrop-blur-md pt-2 pb-5 mb-4 -mx-[clamp(20px,4vw,56px)] px-[clamp(20px,4vw,56px)] border-b border-hairline/30">
          {/* 16:9 Landscape Video Container */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/90 border border-hairline shadow-2xl relative group">
            <video
              key={activeProject.id}
              src={activeProject.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Centered Floating VIEW pill as seen in reference */}
            <Link
              href={`/projects/${activeProject.slug}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#7fa8ff] text-[#111010] flex items-center justify-center font-mono text-xs uppercase tracking-wider font-bold shadow-xl transition-transform active:scale-95 z-10"
            >
              View
            </Link>
          </div>

          {/* Meta row: (01 / 02) + Category */}
          <div className="mt-3.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-label">
            <div className="flex items-center gap-1.5">
              <span className="text-accent font-semibold">
                {currentFormattedNum}
              </span>
              <span className="text-muted">/</span>
              <span className="text-muted">{totalFormattedNum}</span>
            </div>
            <span className="text-muted tracking-widest">
              {activeProject.category}
            </span>
          </div>

          {/* Progression Thin Line */}
          <div className="w-full h-[1.5px] bg-white/10 relative overflow-hidden mt-2.5">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{
                width: `${((currentIdx + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
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
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setActiveProject(project)}
                  className={`group relative box-border border-b border-hairline py-14 sm:py-20 lg:py-[clamp(28px,4vw,48px)] cursor-pointer transition-all duration-500 ${
                    isSelected ? "lg:pl-3" : "hover:lg:pl-2"
                  }`}
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    {/* Top row: Num & Variable Font Title */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-xs tracking-wider transition-colors duration-300 w-6 shrink-0 ${
                          isSelected ? "text-accent font-semibold" : "text-label"
                        }`}
                      >
                        {formattedNum}
                      </span>

                      <div className="flex-1 h-[clamp(44px,6vw,92px)] flex items-center justify-start overflow-visible">
                        <TextPressure
                          text={project.title}
                          tag="h2"
                          flex={false}
                          fontFamily="'Archivo', -apple-system, BlinkMacSystemFont, sans-serif"
                          fontUrl=""
                          minWeight={700}
                          maxWeight={500}
                          minWidth={94}
                          maxWidth={122}
                          letterSpacing="-0.015em"
                          radius={0.35}
                          smoothing={0.35}
                          textColor={isSelected ? "#7fa8ff" : "#7a756f"}
                          pressureColor="#7fa8ff"
                          minFontSize={34}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Meta row: Category, Role, Case Study link */}
                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider pl-10 sm:pl-12">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={isSelected ? "text-text/80" : "text-muted"}
                        >
                          {project.category}
                        </span>
                        <span className="text-muted/40">•</span>
                        <span
                          className={isSelected ? "text-accent" : "text-muted"}
                        >
                          {project.role}
                        </span>
                      </div>

                      <div
                        className={`flex items-center gap-1 transition-opacity duration-300 ${
                          isSelected
                            ? "opacity-100 text-accent"
                            : "opacity-0 group-hover:opacity-100 text-text"
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

          {/* Right Column: Sticky Docked Video Frame (Laptop View - 16:9 Landscape) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start">
            <Link
              href={`/projects/${activeProject.slug}`}
              className="block group"
            >
              <div className="w-full aspect-video rounded-2xl md:rounded-3xl p-3 bg-surface/90 border border-hairline shadow-2xl shadow-black relative overflow-hidden transition-all duration-300 hover:border-accent/40">
                {/* Video Showcase Screen */}
                <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-black relative">
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
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent mb-0.5">
                      {activeProject.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {activeProject.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {activeProject.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Progression thin line & active indicator (Laptop View) */}
            <div className="mt-4 px-1">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-label mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-accent font-semibold">
                    {currentFormattedNum}
                  </span>
                  <span className="text-muted">/</span>
                  <span className="text-muted">{totalFormattedNum}</span>
                </div>
                <span className="text-muted tracking-widest">
                  {activeProject.category}
                </span>
              </div>
              <div className="w-full h-[1.5px] bg-white/10 relative overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300 ease-out"
                  style={{
                    width: `${((currentIdx + 1) / projects.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
