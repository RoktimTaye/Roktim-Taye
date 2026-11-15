"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Sparkles, Terminal, Palette, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 border-t border-neutral-900/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6eb5ff]">
            03 / ABOUT
          </span>
          <div className="h-px w-12 bg-neutral-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Statement & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light text-neutral-200 leading-snug tracking-tight">
              I&apos;m Roktim. A guy who brainstorms ideas, shapes them up and presents them to the real world for better use.
              I <span className="italic font-serif font-normal text-white">think</span>,{" "}
              <span className="italic font-serif font-normal text-white">design</span> and build stuff that makes sense.
              Crafted with care, built in code, made in{" "}
              <a
                href="https://maps.google.com/?q=Dibrugarh,Assam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6eb5ff] hover:text-[#9bc9ff] underline underline-offset-4 decoration-[#6eb5ff]/40 hover:decoration-[#6eb5ff] transition-all"
              >
                Dibrugarh
              </a>
              .
            </h3>

            {/* Approach Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-900">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#e63946] text-xs font-mono uppercase tracking-wider">
                  <Lightbulb size={14} />
                  <span>01. Brainstorm</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Dissecting complex problems down to their core intent before pushing a single pixel.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#6eb5ff] text-xs font-mono uppercase tracking-wider">
                  <Palette size={14} />
                  <span>02. Shape</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Sculpting interfaces that move, respond, and feel natural under the fingertips.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#4ABA7A] text-xs font-mono uppercase tracking-wider">
                  <Terminal size={14} />
                  <span>03. Ship</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Building with production-ready Next.js and clean TypeScript architecture.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Profile Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative group max-w-[320px] w-full aspect-[9/14] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl shadow-black/80">
              <Image
                src="/images/roktim-profile.jpg"
                alt="Roktim Taye"
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 320px"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
                <div className="flex items-center justify-between text-white font-medium">
                  <span>Roktim Taye</span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] mt-1">
                  <MapPin size={11} />
                  <span>Dibrugarh, Assam, India</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
