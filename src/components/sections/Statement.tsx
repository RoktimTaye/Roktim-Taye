"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = [
    { text: "I'm", italic: false, accent: false },
    { text: "Roktim.", italic: false, accent: false },
    { text: "I", italic: false, accent: false },
    { text: "design", italic: false, accent: false },
    { text: "and", italic: false, accent: false },
    { text: "build", italic: false, accent: false },
    { text: "websites", italic: false, accent: false },
    { text: "and", italic: false, accent: false },
    { text: "apps", italic: false, accent: false },
    { text: "that", italic: false, accent: false },
    { text: "move,", italic: true, accent: false },
    { text: "respond", italic: true, accent: false },
    { text: "and", italic: false, accent: false },
    { text: "feel", italic: false, accent: false },
    { text: "good", italic: false, accent: false },
    { text: "to", italic: false, accent: false },
    { text: "use.", italic: false, accent: false },
    { text: "Designed", italic: false, accent: false },
    { text: "in", italic: false, accent: false },
    { text: "Figma,", italic: false, accent: false },
    { text: "built", italic: false, accent: false },
    { text: "in", italic: false, accent: false },
    { text: "code,", italic: false, accent: false },
    { text: "made", italic: false, accent: false },
    { text: "in", italic: false, accent: false },
    { text: "Dibrugarh.", italic: false, accent: true },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[120vh] bg-bg py-20 px-[clamp(20px,4vw,56px)] flex items-center justify-center border-t border-hairline"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col justify-center">
        {/* Eyebrow */}
        <div className="mb-10">
          <span className="eyebrow eyebrow--accent">(Hello)</span>
        </div>

        {/* Big Pinned Statement */}
        <h2 className="text-[clamp(32px,5.5vw,96px)] leading-[1.02] tracking-tight font-semibold flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] text-text">
          {words.map((w, idx) => (
            <span
              key={idx}
              className={`inline-block transition-colors duration-300 ${
                w.italic
                  ? "italic font-serif font-light text-text/90"
                  : ""
              } ${w.accent ? "text-accent underline underline-offset-8 decoration-accent/40" : ""}`}
            >
              {w.text}
            </span>
          ))}
        </h2>

        {/* Small subtitle detail */}
        <div className="mt-12 pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-label uppercase">
          <div>Brainstorming • Shaping • Presenting to the real world</div>
          <div>Assam, India</div>
        </div>
      </div>
    </section>
  );
}
