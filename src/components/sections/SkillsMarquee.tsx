"use client";

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
  ];

  return (
    <div className="w-full border-y border-hairline bg-surface/30 py-4 sm:py-5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1, 2, 3].map((copyIdx) => (
          <div key={copyIdx} className="flex items-center gap-6 sm:gap-10 px-4 sm:px-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 sm:gap-10">
                <span className="text-sm sm:text-base md:text-lg font-light text-text uppercase tracking-wider font-sans">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rotate-45 bg-accent/80 inline-block" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
