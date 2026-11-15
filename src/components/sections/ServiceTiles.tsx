"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  {
    num: "01",
    title: "Websites",
    desc: "Marketing sites and portfolios, designed and built with motion baked in.",
  },
  {
    num: "02",
    title: "Shopify",
    desc: "Custom Shopify themes built around your brand and products.",
  },
  {
    num: "03",
    title: "Webflow",
    desc: "Webflow builds your team can edit on their own.",
  },
  {
    num: "04",
    title: "Apps",
    desc: "Mobile app UI / UX development, from early flows to launch.",
  },
];

export default function ServiceTiles() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isInsideGrid, setIsInsideGrid] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor follower for the "OPEN" circular badge
  const badgeX = useSpring(0, { damping: 24, stiffness: 220, mass: 0.5 });
  const badgeY = useSpring(0, { damping: 24, stiffness: 220, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    badgeX.set(e.clientX - rect.left);
    badgeY.set(e.clientY - rect.top);
  };

  const handleMouseEnterGrid = () => {
    setIsInsideGrid(true);
  };

  const handleMouseLeaveGrid = () => {
    setIsInsideGrid(false);
    setHoveredIdx(null);
  };

  return (
    <section id="services" className="py-[clamp(50px,8vh,90px)] px-[clamp(20px,4vw,56px)] bg-bg border-t border-hairline select-none">
      <div className="w-full">
        {/* Section Head */}
        <div className="flex items-center justify-between pb-6 mb-4 border-b border-hairline">
          <h2 className="font-mono text-white text-[clamp(16px,1.4vw,22px)] tracking-wider uppercase font-medium">
            (What I do)
          </h2>
          <a
            href="#contact"
            className="eyebrow text-muted hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>Start a project</span>
            <span>→</span>
          </a>
        </div>

        {/* 4-Column Low-Height Wide Rectangle Grid with vertically centered text */}
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnterGrid}
          onMouseLeave={handleMouseLeaveGrid}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-hairline divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-hairline overflow-hidden cursor-default"
        >
          {/* Floating Magnetic "OPEN" Circle Badge */}
          <motion.div
            className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#111010] border border-white/20 shadow-2xl flex items-center justify-center z-30"
            style={{
              x: badgeX,
              y: badgeY,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isInsideGrid && hoveredIdx !== null ? 1 : 0,
              opacity: isInsideGrid && hoveredIdx !== null ? 1 : 0,
            }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-medium">
              OPEN
            </span>
          </motion.div>

          {services.map((svc, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <a
                key={svc.num}
                href="#contact"
                onMouseEnter={() => setHoveredIdx(idx)}
                className="group relative flex flex-col justify-center h-[clamp(200px,22vw,240px)] px-7 sm:px-9 py-6 overflow-hidden cursor-pointer"
              >
                {/* Sliding Blue Fill Layer (slides IN from bottom, slides OUT to top) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key={`fill-${idx}`}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 bg-[#7fa8ff] z-0"
                    />
                  )}
                </AnimatePresence>

                {/* Vertically Centered Content Stack */}
                <div className="relative z-10 flex flex-col justify-center">
                  {/* Top Row: Number & Arrow (↗ transforms to → on hover) */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                        isHovered ? "text-[#111010] font-semibold" : "text-[#7fa8ff]"
                      }`}
                    >
                      {svc.num}
                    </span>

                    <span
                      className={`font-mono text-sm transition-all duration-300 inline-block ${
                        isHovered
                          ? "text-[#111010] translate-x-0.5"
                          : "text-[#7fa8ff]"
                      }`}
                    >
                      {isHovered ? "→" : "↗"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight leading-tight mb-2 transition-colors duration-300 ${
                      isHovered ? "text-[#111010]" : "text-text"
                    }`}
                  >
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed transition-colors duration-300 line-clamp-2 ${
                      isHovered ? "text-[#111010]/85 font-normal" : "text-muted font-light"
                    }`}
                  >
                    {svc.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
