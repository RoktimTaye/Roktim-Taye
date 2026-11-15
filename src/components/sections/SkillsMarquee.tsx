"use client";

export default function SkillsMarquee() {
  const items = [
    "Design",
    "Think",
    "Build",
    "Brainstorm",
    "Ideate",
    "Ship",
    "Next.js",
    "React",
    "Framer Motion",
    "Tailwind CSS",
    "Figma",
  ];

  return (
    <section className="w-full border-y border-neutral-800/80 bg-black/40 py-5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Render 4 repeated arrays to ensure seamless loop on wide screens */}
        {[0, 1, 2, 3].map((setIndex) => (
          <div key={setIndex} className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 sm:gap-8">
                <span className="text-base sm:text-lg md:text-xl font-light text-neutral-300 tracking-wide uppercase font-sans">
                  {item}
                </span>
                <span className="text-neutral-600 text-xs sm:text-sm">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
