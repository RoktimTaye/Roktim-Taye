"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";

export default function CTA() {
  const [copied, setCopied] = useState(false);
  const email = "roktimtayecoding@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-40 px-6 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#e63946] mb-8">
          04 / WHAT&apos;S NEXT
        </span>

        {/* Massive "LET'S TALK" link */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center justify-center tracking-tighter font-black text-white hover:text-[#e63946] transition-colors duration-300 leading-none select-none text-[clamp(3.8rem,14vw,12rem)]"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight
              className="inline-block ml-2 sm:ml-4 w-[0.7em] h-[0.7em] opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
            />
          </a>
        </motion.div>

        {/* Email Pill & Copy Button */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="text-base sm:text-xl font-light text-neutral-300 hover:text-white transition-colors underline underline-offset-8 decoration-neutral-800 hover:decoration-white"
          >
            {email}
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 hover:text-white hover:border-neutral-700 transition-all active:scale-95"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Extra collaboration prompt */}
        <p className="mt-6 text-xs text-neutral-500 font-mono">
          Have an idea or looking for a developer & designer? Drop a note.
        </p>
      </div>
    </section>
  );
}
