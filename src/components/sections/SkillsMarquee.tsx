"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export default function SkillsMarquee() {
  const items = [
    "DESIGN",
    "BUILD",
    "MOTION",
    "SHOPIFY",
    "WEBFLOW",
    "NEXT.JS",
    "APPS",
    "REACT",
    "BRAINSTORM",
    "IDEATE",
  ];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth scroll velocity tracking with gentle spring damping
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 250,
  });

  // Velocity factor clamped to a subtle, gentle boost
  const velocityFactor = useTransform(smoothVelocity, [0, 800], [0, 1.8], {
    clamp: true,
  });

  // Calm default baseline speed (equivalent to smooth 25s continuous loop)
  const baseVelocity = -1.8; // % per second

  // Map baseX to percentage loop (-50% to 0% for continuous loop)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    const dt = delta / 1000;

    // Gentle base drift
    let moveBy = baseVelocity * dt;

    // When scrolling up/down, add a subtle, controlled speed boost
    const currentVelocity = Math.abs(velocityFactor.get());
    if (currentVelocity > 0.02) {
      // Gentle boost: adds a little bit of speed during active scrolling
      const boost = Math.min(currentVelocity * 1.6, 2.5);
      moveBy += Math.sign(baseVelocity) * boost * dt;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="w-full border-y border-hairline bg-surface/40 py-6 sm:py-8 md:py-10 overflow-hidden select-none relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@1,800;1,900&display=swap');

        .archivo-italic-bold {
          font-family: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: italic;
          font-weight: 900;
        }
      `}</style>

      {/* Marquee Track with Gentle Base Drift & Subtle Scroll Boost */}
      <motion.div
        style={{ x }}
        className="flex w-max will-change-transform"
      >
        {[0, 1, 2, 3].map((copyIdx) => (
          <div key={copyIdx} className="flex items-center gap-8 sm:gap-14 md:gap-16 px-4 sm:px-8">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 sm:gap-14 md:gap-16">
                <span className="archivo-italic-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-text uppercase tracking-tight hover:text-accent transition-colors duration-200">
                  {item}
                </span>
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 bg-accent inline-block shrink-0 shadow-[0_0_12px_rgba(127,168,255,0.6)]" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
