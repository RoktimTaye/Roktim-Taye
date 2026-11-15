"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectGrid() {
  // Exclude featured project (id: 1) or show projects 2 to 5 in the 4-column grid
  const gridProjects = projects.filter((p) => !p.featured);

  return (
    <section id="portfolio" className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 border-b border-neutral-900 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              02 / WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Selected Works
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400">
            Hover cards to preview motion & interactions
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
