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
    <main className="min-h-screen bg-bg text-text pt-28 pb-24 px-[clamp(20px,4vw,56px)]">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <div className="mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 eyebrow text-muted hover:text-text transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>(Back to Selected Work)</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="eyebrow eyebrow--accent">
              {project.category}
            </span>
            <span className="text-label">•</span>
            <span className="eyebrow text-label">{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-text uppercase">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted font-light leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </div>

        {/* Cinematic Video Showcase */}
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-hairline shadow-2xl shadow-black aspect-[16/9] mb-14">
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

        {/* Metadata Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-hairline mb-12">
          <div>
            <span className="eyebrow block mb-1.5 flex items-center gap-1">
              <User size={12} /> Role
            </span>
            <span className="text-sm font-medium text-text">{project.role}</span>
          </div>

          <div>
            <span className="eyebrow block mb-1.5 flex items-center gap-1">
              <Calendar size={12} /> Year
            </span>
            <span className="text-sm font-medium text-text">{project.year}</span>
          </div>

          <div>
            <span className="eyebrow block mb-1.5 flex items-center gap-1">
              <Layers size={12} /> Category
            </span>
            <span className="text-sm font-medium text-text">{project.category}</span>
          </div>

          <div>
            <span className="eyebrow block mb-1.5">Deliverables</span>
            <span className="text-sm font-medium text-text">Prototype & Code</span>
          </div>
        </div>

        {/* Case Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-8 space-y-6 text-muted font-light leading-relaxed text-base sm:text-lg">
            <h2 className="text-xl font-bold text-text tracking-tight uppercase">Overview & Architecture</h2>
            <p>{project.description}</p>
            {project.longDescription?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="md:col-span-4 space-y-6">
            <div>
              <h3 className="eyebrow mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface border border-hairline text-text font-mono"
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-black bg-accent hover:bg-accent-hover transition-all hover:scale-[1.02]"
              >
                <span>Live Project</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={project.githubUrl || "https://github.com/RoktimTaye"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-muted bg-surface border border-hairline hover:text-text hover:border-muted transition-all hover:scale-[1.02]"
              >
                <Github size={15} />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>

        {/* Prev / Next Navigation */}
        <div className="pt-12 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-6 rounded-2xl bg-surface/40 border border-hairline hover:border-accent/40 transition-all group"
          >
            <span className="eyebrow block mb-1">
              ← Previous Project
            </span>
            <span className="text-lg font-bold text-text group-hover:text-accent transition-colors uppercase">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-6 rounded-2xl bg-surface/40 border border-hairline hover:border-accent/40 transition-all text-right group"
          >
            <span className="eyebrow block mb-1">
              Next Project →
            </span>
            <span className="text-lg font-bold text-text group-hover:text-accent transition-colors uppercase">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
