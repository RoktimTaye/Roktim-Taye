"use client";

import { motion } from "framer-motion";
import TextPressure from "@/components/ui/TextPressure";

export default function Hero() {
  return (
    <section className="relative box-border flex flex-col justify-between min-h-[100svh] pt-[clamp(110px,15vh,160px)] px-[clamp(20px,4vw,56px)] pb-10 bg-bg select-none overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@100;200;300;400;700;800;900&display=swap');

        .archivo-extralight {
          font-family: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 200;
        }
      `}</style>

      {/* Background Image Layer (z-0: in front of bg color, behind text z-10) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Fullcover Photo - High Fidelity */}
        <img
          src="/images/hero-bg.jpg"
          alt="Roktim Taye"
          className="w-full h-full object-cover object-[center_38%] opacity-70 md:opacity-80 contrast-[1.05]"
        />

        {/* Radial Vignette to darken corners and blend edges seamlessly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(17,16,16,0.5) 68%, #111010 92%)",
          }}
        />

        {/* Top Edge Blend into Header */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#111010] via-[#111010]/75 to-transparent pointer-events-none" />

        {/* Bottom Edge Blend into Divider & Content */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#111010] via-[#111010]/85 to-transparent pointer-events-none" />

        {/* Left & Right Edge Blends */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#111010] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#111010] to-transparent pointer-events-none" />
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

      {/* Hero Name Container with Letter Gap & Balanced Proportions (relative z-10) */}
      <div className="relative z-10 flex flex-col justify-center flex-auto my-[clamp(16px,2.5vh,36px)]">
        {/* Line 1: ROKTIM (Spaced wordmark, scaled) */}
        <div className="w-full h-[clamp(85px,14.5vw,205px)] relative flex items-center justify-start overflow-hidden">
          <TextPressure
            text="ROKTIM"
            flex={false}
            letterSpacing="0.045em"
            gap="0.045em"
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

        {/* Line 2: TAYE (Right-Aligned, spaced wordmark, scaled) */}
        <div className="w-full h-[clamp(85px,14.5vw,205px)] relative flex items-center justify-end mt-2 sm:mt-4 overflow-hidden">
          <TextPressure
            text="TAYE"
            flex={false}
            letterSpacing="0.045em"
            gap="0.045em"
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
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-end gap-6 pt-6"
      >
        {/* Intro in Archivo ExtraLight 200 */}
        <p className="archivo-extralight max-w-[36ch] text-[clamp(17px,1.6vw,22px)] text-text leading-[1.4] m-0 tracking-wide">
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
