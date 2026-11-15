"use client";

import { ArrowRight } from "lucide-react";

export default function ServiceTiles() {
  const services = [
    {
      num: "01",
      title: "Websites",
      desc: "Marketing sites and portfolios, designed and built with motion baked in.",
    },
    {
      num: "02",
      title: "Shopify",
      desc: "Custom Shopify stores and ecommerce themes built around your brand and products.",
    },
    {
      num: "03",
      title: "Webflow",
      desc: "Webflow & Next.js builds that are lightning fast, responsive, and easy to maintain.",
    },
    {
      num: "04",
      title: "Apps",
      desc: "Mobile app UI / UX development and prototyping, from early flows to launch.",
    },
  ];

  return (
    <section id="services" className="py-[clamp(60px,10vh,120px)] px-[clamp(20px,4vw,56px)] bg-bg border-t border-hairline">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Head */}
        <div className="flex items-center justify-between pb-8 mb-4">
          <h2 className="eyebrow text-text font-mono text-xs uppercase tracking-widest">
            What I do
          </h2>
          <a
            href="#contact"
            className="eyebrow text-muted hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>Start a project</span>
            <span>→</span>
          </a>
        </div>

        {/* 4-Column Grid with Hairline Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline group/grid">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="group/tile relative p-8 sm:p-10 border-b border-r border-hairline bg-surface/30 hover:bg-surface transition-all duration-500 overflow-hidden cursor-default group-hover/grid:hover:opacity-100 group-hover/grid:opacity-60"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between text-xs font-mono text-label mb-14 group-hover/tile:text-accent transition-colors">
                <span>{svc.num}</span>
                <span className="group-hover/tile:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-4 group-hover/tile:text-accent transition-colors">
                {svc.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
