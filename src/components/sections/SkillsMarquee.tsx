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
    "Design",
    "Build",
    "Motion",
    "Shopify",
    "Webflow",
    "Next.js",
    "Apps",
    "React",
    "Brainstorm",
    "Ideate",
  ];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth scroll velocity tracking with spring damping
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 280,
  });

  // Track absolute velocity so scrolling UP and DOWN accelerate identically
  const absVelocityBoost = useTransform(smoothVelocity, (v) => {
    return Math.min(Math.abs(v) / 320, 2.8);
  });

  // Calm default baseline speed (smooth continuous loop)
  const baseVelocity = -1.8; // % per second

  // Map baseX to percentage loop (-50% to 0% for continuous loop)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    const dt = delta / 1000;

    // Gentle base drift
    let moveBy = baseVelocity * dt;

    // Symmetrical acceleration: boosts speed whether scrolling DOWN or UP
    const currentVelocity = absVelocityBoost.get();
    if (currentVelocity > 0.02) {
      moveBy += Math.sign(baseVelocity) * currentVelocity * 1.8 * dt;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    // Top border removed (only border-b retained), background #111010
    <div className="w-full border-b border-hairline bg-[#111010] py-8 sm:py-10 md:py-12 overflow-hidden select-none relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@1,400;1,500&display=swap');

        .archivo-italic-medium {
          font-family: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: italic;
          font-weight: 400;
        }
      `}</style>

      {/* Marquee Track with Symmetrical Scroll Boost */}
      <motion.div
        style={{ x }}
        className="flex w-max will-change-transform"
      >
        {[0, 1, 2, 3].map((copyIdx) => (
          <div key={copyIdx} className="flex items-center gap-10 sm:gap-16 md:gap-20 px-6 sm:px-10">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-10 sm:gap-16 md:gap-20">
                <span className="archivo-italic-medium text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.2rem] text-text tracking-tight hover:text-accent transition-colors duration-200">
                  {item}
                </span>
                <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rotate-45 bg-accent inline-block shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
