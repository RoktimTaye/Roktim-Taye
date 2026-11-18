"use client";

import { motion } from "framer-motion";
import ParticleText from "@/components/ui/ParticleText";
import HalftoneReveal from "@/components/ui/HalftoneReveal";

const HERO_INK_COLOR: [number, number, number] = [0.93, 0.92, 0.89];

export default function Hero() {
  return (
    <section className="relative box-border flex flex-col justify-between min-h-[100svh] pt-[clamp(80px,12vh,150px)] px-[clamp(20px,4vw,56px)] pb-8 sm:pb-10 bg-bg select-none overflow-hidden">
      {/* Background Image Layer with React Bits Halftone Reveal Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-auto">
        <HalftoneReveal
          imageSrc="/images/hero-roktim.png"
          dotSize={9.0}
          revealRadius={210.0}
          inkColor={HERO_INK_COLOR}
          className="w-full h-full"
        />

        {/* Bottom subtle blend into divider & content */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-[#111010] via-[#111010]/80 to-transparent pointer-events-none" />

        {/* Left & Right Edge Blends */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-[#111010] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-[#111010] to-transparent pointer-events-none" />
      </div>

      {/* Top Eyebrow Metadata Grid (relative z-10) */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 items-center text-xs font-archivo uppercase tracking-widest pb-4">
        <span className="justify-self-start text-label">
          (Portfolio / ©2026)
        </span>
        <span className="hidden md:block justify-self-center text-muted">
          Creative developer
        </span>
        <span className="justify-self-end text-label">
          Dibrugarh, Assam, India
        </span>
      </div>

      {/* Hero Name Container with Letter Gap & Balanced Proportions (relative z-10, main middle section) */}
      <div className="relative z-10 flex flex-col justify-center flex-auto my-auto py-2 sm:py-6">
        {/* Line 1: ROKTIM (Spaced wordmark, scaled) */}
        <div className="w-full h-[clamp(56px,13vw,200px)] relative flex items-center justify-start overflow-hidden">
          <ParticleText
            text="ROKTIM"
            align="left"
            color="#edeae4"
            highlightColor="#7fa8ff"
            particleSize={2.6}
            particleGap={4}
            mouseRadius={110}
          />
        </div>

        {/* Line 2: TAYE (Right-Aligned, spaced wordmark, scaled) */}
        <div className="w-full h-[clamp(56px,13vw,200px)] relative flex items-center justify-end mt-1 sm:mt-4 overflow-hidden">
          <ParticleText
            text="TAYE"
            align="right"
            color="#edeae4"
            highlightColor="#7fa8ff"
            particleSize={2.6}
            particleGap={4}
            mouseRadius={110}
          />
        </div>
      </div>

      {/* Bottom Row: Intro, Scroll Prompt, Work Button (relative z-10) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-end gap-5 pt-4 sm:pt-6"
      >
        {/* Intro in Archivo Light 300 Regular */}
        <p className="archivo-light max-w-[38ch] text-[clamp(15px,1.5vw,22px)] text-text leading-[1.4] m-0 tracking-wide">
          I design {"&"} Build ideas into working stuff that you want to bring to the real world
        </p>

        {/* Scroll gently indicator */}
        <div className="hidden md:flex justify-center items-center eyebrow text-label pb-2">
          <span>↓ Scroll, gently</span>
        </div>

        {/* Button */}
        <div className="flex md:justify-end">
          <a
            href="/#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-hairline hover:border-accent text-xs font-mono tracking-wider uppercase text-text hover:text-accent hover:bg-surface transition-all duration-300"
          >
            <span>See the work</span>
            <span>→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
