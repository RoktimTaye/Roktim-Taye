import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Calendar, Layers, User } from "lucide-react";
import { projects } from "@/data/projects";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Roktim Taye`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: Props) {
  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Bar / Back */}
        <div className="mb-12">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Works</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e63946]">
              {project.category}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-mono text-neutral-500">{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </div>

        {/* Cinematic Video Showcase */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl shadow-black/80 aspect-[16/9] mb-14">
          <video
            src={project.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-neutral-900 mb-12">
          <div>
            <span className="text-xs font-mono uppercase text-neutral-500 block mb-1 flex items-center gap-1">
              <User size={12} /> Role
            </span>
            <span className="text-sm font-medium text-neutral-200">{project.role}</span>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-neutral-500 block mb-1 flex items-center gap-1">
              <Calendar size={12} /> Year
            </span>
            <span className="text-sm font-medium text-neutral-200">{project.year}</span>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-neutral-500 block mb-1 flex items-center gap-1">
              <Layers size={12} /> Category
            </span>
            <span className="text-sm font-medium text-neutral-200">{project.category}</span>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-neutral-500 block mb-1">
              Deliverables
            </span>
            <span className="text-sm font-medium text-neutral-200">Prototype & Code</span>
          </div>
        </div>

        {/* Content & Story */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-8 space-y-6 text-neutral-300 font-light leading-relaxed text-base sm:text-lg">
            <h2 className="text-xl font-bold text-white tracking-tight">Overview & Architecture</h2>
            <p>{project.description}</p>
            {project.longDescription?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="md:col-span-4 space-y-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <a
                href={project.liveUrl || "https://github.com/RoktimTaye"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#e63946] hover:bg-[#ff5a67] transition-all hover:scale-[1.02] shadow-lg shadow-red-500/20"
              >
                <span>Live Project</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={project.githubUrl || "https://github.com/RoktimTaye"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900 border border-neutral-800 hover:text-white hover:border-neutral-700 transition-all hover:scale-[1.02]"
              >
                <Github size={15} />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>

        {/* Previous / Next Project Navigation */}
        <div className="pt-12 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-6 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-white/20 transition-all group"
          >
            <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">
              ← Previous Project
            </span>
            <span className="text-lg font-bold text-white group-hover:text-[#6eb5ff] transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-6 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-white/20 transition-all text-right group"
          >
            <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">
              Next Project →
            </span>
            <span className="text-lg font-bold text-white group-hover:text-[#6eb5ff] transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
