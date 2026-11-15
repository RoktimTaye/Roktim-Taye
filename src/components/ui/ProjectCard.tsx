"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group block relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 transition-all duration-300 hover:border-white/20 hover:scale-[1.02] shadow-lg shadow-black/50"
      >
        {/* Video / Visual container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Color Tint / Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-40 group-hover:opacity-10 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}33 0%, rgba(10,10,10,0.85) 100%)`,
            }}
          />

          {/* Hover Play Indicator or Badge */}
          <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-100 scale-75">
            <ArrowUpRight size={16} />
          </div>

          {/* Category Pill Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-neutral-300">
              {project.category}
            </span>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent pointer-events-none" />
        </div>

        {/* Card Content Footer */}
        <div className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#6eb5ff] transition-colors">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-neutral-500">{project.year}</span>
          </div>
          <p className="mt-1 text-xs text-neutral-400 font-light line-clamp-1">
            {project.tagline}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
