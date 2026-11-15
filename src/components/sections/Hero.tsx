"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 sm:px-8 lg:px-12 pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Massive Staggered Name */}
        <div className="flex flex-col select-none leading-none tracking-tighter font-black text-white">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.8rem,14vw,11.5rem)] text-left"
          >
            ROKTIM
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.8rem,14vw,11.5rem)] text-right sm:text-center md:text-right pr-2 sm:pr-8 md:pr-12"
          >
            TAYE
          </motion.div>
        </div>

        {/* Subtitle & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t border-neutral-900/60 pt-8"
        >
          <div className="max-w-md">
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              I think, design and build stuff that makes sense.
            </p>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2 font-mono">
              Dibrugarh, Assam, India
            </p>
          </div>

          <div>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-600 transition-all group"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
