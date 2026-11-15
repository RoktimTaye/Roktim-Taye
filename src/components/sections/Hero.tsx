"use client";

import { motion } from "framer-motion";
import TextPressure from "@/components/ui/TextPressure";

export default function Hero() {
  return (
    <section className="relative box-border flex flex-col justify-between min-h-[100svh] pt-[clamp(110px,15vh,160px)] px-[clamp(20px,4vw,56px)] pb-10 bg-bg select-none overflow-hidden">
      {/* Background Image Layer (z-0: in front of bg color, behind text z-10) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Fullcover Photo */}
        <img
          src="/images/hero-bg.jpg"
          alt="Roktim Taye Background"
          className="w-full h-full object-cover object-[center_35%] opacity-40 md:opacity-50 brightness-95 contrast-110"
        />

        {/* Radial Vignette to darken corners and blend edges seamlessly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(17,16,16,0.55) 60%, #111010 88%)",
          }}
        />

        {/* Top Edge Blend into Header */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#111010] via-[#111010]/80 to-transparent pointer-events-none" />

        {/* Bottom Edge Blend into Divider & Content */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#111010] via-[#111010]/90 to-transparent pointer-events-none" />

        {/* Left & Right Edge Blends */}
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#111010] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#111010] to-transparent pointer-events-none" />
      </div>

      {/* Top Eyebrow Metadata Grid (relative z-10) */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 items-center eyebrow text-[11px] pb-4">
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

      {/* Hero Name Container with Tight Character Spacing & Distinct Rows (relative z-10) */}
      <div className="relative z-10 flex flex-col justify-center flex-auto my-[clamp(20px,3.5vh,44px)]">
        {/* Line 1: ROKTIM (Tightly spaced wordmark) */}
        <div className="w-full h-[clamp(75px,12.5vw,175px)] relative flex items-center justify-start overflow-hidden">
          <TextPressure
            text="ROKTIM"
            flex={false}
            letterSpacing="-0.035em"
            weight={true}
            width={true}
            italic={true}
            radius={0.25}
            smoothing={0.35}
            textColor="#edeae4"
            pressureColor="#7fa8ff"
            minFontSize={48}
          />
        </div>

        {/* Line 2: TAYE (Right-Aligned, Tightly spaced wordmark) */}
        <div className="w-full h-[clamp(75px,12.5vw,175px)] relative flex items-center justify-end mt-3 sm:mt-5 overflow-hidden">
          <TextPressure
            text="TAYE"
            flex={false}
            letterSpacing="-0.035em"
            weight={true}
            width={true}
            italic={true}
            radius={0.25}
            smoothing={0.35}
            textColor="#edeae4"
            pressureColor="#7fa8ff"
            minFontSize={48}
          />
        </div>
      </div>

      {/* Bottom Row: Intro, Scroll Prompt, Work Button (relative z-10) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-end gap-6 pt-6 border-t border-hairline"
      >
        {/* Intro */}
        <p className="max-w-[36ch] text-[clamp(16px,1.5vw,21px)] text-muted font-light leading-[1.4] m-0">
          I design and build websites and apps with a lot of movement in them. Startups, small businesses and fellow creators, mostly.
        </p>

        {/* Scroll gently indicator */}
        <div className="hidden md:flex justify-center items-center eyebrow text-label pb-2">
          <span>↓ Scroll, gently</span>
        </div>

        {/* Button */}
        <div className="flex md:justify-end">
          <a
            href="#work"
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
