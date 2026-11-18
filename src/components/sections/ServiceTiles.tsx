"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import TextPressure from "@/components/ui/TextPressure";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  {
    num: "01",
    title: "Portfolio Website",
    desc: "Marketing sites and portfolios, designed and built with motion baked in.",
  },
  {
    num: "02",
    title: "Landing Pages",
    desc: "High-converting, performance-focused pages designed to turn visitors into users.",
  },
  {
    num: "03",
    title: "Business Websites",
    desc: "Modern digital homes tailored for brands, startups, and companies.",
  },
  {
    num: "04",
    title: "Full Stack Web Applications",
    desc: "End-to-end web apps built with modern frameworks and clean architecture.",
  },
  {
    num: "05",
    title: "SaaS Development",
    desc: "Scalable software products with auth, payments, and subscription flows.",
  },
  {
    num: "06",
    title: "API & Backend Development",
    desc: "Fast, secure RESTful & GraphQL APIs, microservices, and databases.",
  },
];

export default function ServiceTiles() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isInsideGrid, setIsInsideGrid] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor follower for the "OPEN" circular badge
  const badgeX = useSpring(0, { damping: 28, stiffness: 280, mass: 0.3 });
  const badgeY = useSpring(0, { damping: 28, stiffness: 280, mass: 0.3 });

  const handleMouseEnterGrid = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    badgeX.jump(x);
    badgeY.jump(y);
    setIsInsideGrid(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    badgeX.set(e.clientX - rect.left);
    badgeY.set(e.clientY - rect.top);
  };

  const handleMouseLeaveGrid = () => {
    setIsInsideGrid(false);
    setHoveredIdx(null);
  };

  return (
    <section id="services" className="py-[clamp(50px,8vh,90px)] px-[clamp(20px,4vw,56px)] bg-bg select-none">
      <div className="w-full">
        {/* Section Head */}
        <div className="flex items-center justify-between pb-6 mb-4">
          <h2 className="font-mono text-white text-[clamp(16px,1.4vw,22px)] tracking-wider uppercase font-medium">
            (What I do)
          </h2>
          <a
            href="/#contact"
            className="eyebrow text-muted hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>Start a project</span>
            <span>→</span>
          </a>
        </div>

        {/* Low-Height Wide Rectangle Grid with vertically centered text */}
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnterGrid}
          onMouseLeave={handleMouseLeaveGrid}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-hairline bg-hairline gap-[1px] overflow-hidden cursor-default md:cursor-none [&_*]:md:cursor-none"
        >
          {/* Floating Magnetic "OPEN" Circle Badge */}
          <motion.div
            className="pointer-events-none hidden md:flex absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#111010] border border-white/20 shadow-2xl items-center justify-center z-30"
            style={{
              x: badgeX,
              y: badgeY,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isInsideGrid ? 1 : 0,
              opacity: isInsideGrid ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                href="/#contact"
                onMouseEnter={() => setHoveredIdx(idx)}
                className="group relative flex flex-col justify-center bg-bg min-h-[clamp(190px,18vw,230px)] px-7 sm:px-9 py-6 overflow-hidden cursor-default md:cursor-none"
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

                  {/* Title with React Bits TextPressure component - Uniform consistent font size across all boxes */}
                  <div className="w-full h-[22px] xs:h-[24px] sm:h-[26px] md:h-[30px] lg:h-[34px] xl:h-[38px] flex items-center justify-start mb-2 overflow-visible">
                    <TextPressure
                      text={svc.title}
                      tag="h3"
                      flex={false}
                      align="left"
                      fontFamily="'Archivo', -apple-system, BlinkMacSystemFont, sans-serif"
                      fontUrl=""
                      width={true}
                      weight={true}
                      italic={false}
                      minWeight={700}
                      maxWeight={500}
                      minWidth={94}
                      maxWidth={122}
                      radius={0.4}
                      smoothing={0.4}
                      clickRipple={true}
                      textColor={isHovered ? "#111010" : "#edeae4"}
                      pressureColor={isHovered ? "#111010" : "#7fa8ff"}
                      minFontSize={14}
                      className="cursor-default md:cursor-none"
                    />
                  </div>

                  {/* Description */}
                  <p
                    className={`archivo-thin text-xs sm:text-[13px] leading-relaxed transition-colors duration-300 line-clamp-2 ${
                      isHovered ? "text-[#111010]" : "text-muted"
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
