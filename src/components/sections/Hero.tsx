"use client";

import { motion } from "framer-motion";
import TextPressure from "@/components/ui/TextPressure";

export default function Hero() {
  return (
    <section className="box-border flex flex-col justify-between min-h-[100svh] pt-[clamp(110px,15vh,160px)] px-[clamp(20px,4vw,56px)] pb-10 bg-bg select-none">
      {/* Top Eyebrow Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-center eyebrow text-[11px] pb-4">
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

      {/* Hero Name Container with Distinct Vertical Spacing */}
      <div className="flex flex-col justify-center flex-auto my-[clamp(24px,4vh,48px)]">
        {/* Line 1: ROKTIM */}
        <div className="w-full h-[clamp(75px,12vw,170px)] relative flex items-center">
          <TextPressure
            text="ROKTIM"
            flex={true}
            weight={true}
            width={true}
            italic={true}
            radius={0.22}
            smoothing={0.35}
            textColor="#edeae4"
            pressureColor="#7fa8ff"
            minFontSize={42}
          />
        </div>

        {/* Line 2: TAYE (Right-Aligned, Zero Overlap) */}
        <div className="w-full flex justify-end mt-4 sm:mt-6">
          <div className="w-full sm:w-[60%] md:w-[50%] h-[clamp(75px,12vw,170px)] relative flex items-center justify-end">
            <TextPressure
              text="TAYE"
              flex={true}
              weight={true}
              width={true}
              italic={true}
              radius={0.25}
              smoothing={0.35}
              textColor="#edeae4"
              pressureColor="#7fa8ff"
              minFontSize={42}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: Intro, Scroll Prompt, Work Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 pt-6 border-t border-hairline"
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
