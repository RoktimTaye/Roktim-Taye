"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TextPressure from "@/components/ui/TextPressure";

export default function Hero() {
  return (
    <section className="relative box-border flex flex-col justify-between min-h-[100svh] pt-[clamp(110px,15vh,160px)] px-[clamp(20px,4vw,56px)] pb-10 bg-bg select-none overflow-hidden">
      {/* Background Image Behind ROKTIM TAYE with Corner Shadow Vignette */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-[1600px]">
          <Image
            src="/images/hero-bg.jpg"
            alt="Roktim Taye Background Silhouette"
            fill
            priority
            className="object-cover object-center opacity-30 brightness-[0.75] contrast-[1.2]"
            sizes="100vw"
          />

          {/* Deep Radial Vignette: Darkens all corners and edges to blend seamlessly into #111010 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 15%, rgba(17,16,16,0.6) 60%, #111010 92%)",
            }}
          />

          {/* Perimeter Gradient Fades for Flawless Blending */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#111010] via-[#111010]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#111010] via-[#111010]/90 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#111010] via-[#111010]/70 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[#111010] via-[#111010]/70 to-transparent" />
        </div>
      </div>

      {/* Top Eyebrow Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-center eyebrow text-[11px] pb-4 z-10">
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

      {/* Hero Name Container with Tight Character Spacing & Distinct Rows */}
      <div className="flex flex-col justify-center flex-auto my-[clamp(20px,3.5vh,44px)] z-10">
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

      {/* Bottom Row: Intro, Scroll Prompt, Work Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 pt-6 border-t border-hairline z-10"
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
