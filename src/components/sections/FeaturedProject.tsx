"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Project } from "@/data/projects";

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e63946] flex items-center gap-1.5">
              <Sparkles size={13} />
              Featured Project
            </span>
          </div>
          <span className="text-xs font-mono text-neutral-500">01 / 05</span>
        </div>

        {/* Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#161616] via-[#111111] to-[#0d0d0d] border border-white/10 p-6 sm:p-10 lg:p-14 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {project.category} • {project.year}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#e63946] hover:bg-[#ff5a67] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-neutral-400 hover:text-white px-4 py-3 transition-colors"
                >
                  GitHub Repository
                </a>
              </div>
            </div>

            {/* Right Video Showcase (Phone Mockup / Clean Window) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[580px] rounded-[2.5rem] p-3 bg-neutral-900/90 border border-neutral-700/60 shadow-2xl shadow-black/80 ring-1 ring-white/10 overflow-hidden">
                {/* Dynamic island / notch aesthetic */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                </div>

                {/* Video container */}
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black relative">
                  <video
                    src={project.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
