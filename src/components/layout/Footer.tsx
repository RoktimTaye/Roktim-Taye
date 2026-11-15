import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-[#0a0a0a] text-neutral-400 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-neutral-500">
          <span>© {new Date().getFullYear()} Roktim Taye. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span>Dibrugarh, Assam, India</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/RoktimTaye"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors group"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="https://www.linkedin.com/in/roktim-taye-86957437a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors group"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
            <span className="hidden sm:inline">LinkedIn</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="mailto:roktimtayecoding@gmail.com"
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors group"
            aria-label="Email Contact"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Email</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
}
