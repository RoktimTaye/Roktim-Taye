"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const line1 = "ROKTIM".split("");
  const line2 = "TAYE".split("");

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

      {/* Massive Staggered Hero Name */}
      <div className="flex flex-col justify-center flex-auto my-[clamp(20px,4vh,50px)]">
        <h1 className="leading-none tracking-tight font-black uppercase overflow-hidden">
          {/* First Name: ROKTIM */}
          <div className="text-[min(19vw,14rem)] leading-[0.85] tracking-[-0.02em] text-text flex items-center overflow-hidden">
            {line1.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.05 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:text-accent cursor-default"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Second Name: TAYE (Right-aligned) */}
          <div className="text-[min(19vw,14rem)] leading-[0.85] tracking-[-0.02em] text-text flex items-center justify-end overflow-hidden mt-2 sm:mt-0">
            {line2.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.2 + 0.05 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:text-accent cursor-default"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </h1>
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
