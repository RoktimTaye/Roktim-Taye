"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("13:30");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
      setTimeStr(formatted);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", href: "/#" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Full-width Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-[clamp(20px,4vw,56px)] py-3 md:py-3.5 flex items-center justify-between bg-transparent select-none">
        {/* Left: Brand Identity Logo Image */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="inline-flex items-center transition-opacity hover:opacity-85 z-10"
        >
          <img
            src="/images/roktim-taye-logo.png"
            alt="Roktim Taye"
            className="h-[clamp(17px,1.5vw,21px)] w-auto object-contain"
          />
        </Link>

        {/* Center: Location strictly centered horizontally */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs font-archivo font-medium uppercase tracking-widest text-label select-none pointer-events-none">
          Dibrugarh, Assam
        </div>

        {/* Right: Nav Links & CTA Button (Desktop) */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8 z-10">
          <nav className="flex items-center gap-6 lg:gap-8 text-xs tracking-wider uppercase font-archivo font-bold text-white">
            <a
              href="/#work"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              Work
            </a>
            <a
              href="/#about"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              About
            </a>
            <a
              href="/#services"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              Services
            </a>
          </nav>

          {/* Action Button: START A PROJECT */}
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-xs font-archivo uppercase tracking-wider text-[#111010] font-bold bg-[#7fa8ff] hover:bg-[#9bbaff] rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            Start a project
          </a>
        </div>

        {/* Mobile Animated Pill Menu Button (Fixed stable size: never expands) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden border border-white/20 hover:border-white/40 bg-black/60 backdrop-blur-md rounded-full w-[94px] h-[34px] px-3 flex items-center justify-center gap-2 transition-colors focus:outline-none z-50 select-none active:scale-95"
          aria-label="Toggle menu"
        >
          {/* Animated lines that morph between '=' and '✕' */}
          <div className="relative w-4 h-3.5 flex items-center justify-center flex-shrink-0">
            <motion.span
              initial={false}
              animate={
                mobileMenuOpen
                  ? { rotate: 45, y: 0 }
                  : { rotate: 0, y: -2.5 }
              }
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute h-[1.5px] w-3.5 bg-white rounded-full"
            />
            <motion.span
              initial={false}
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: 0 }
                  : { rotate: 0, y: 2.5 }
              }
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute h-[1.5px] w-3.5 bg-white rounded-full"
            />
          </div>

          {/* Fixed-width text container preventing horizontal box expansion */}
          <div className="relative w-[44px] h-4 overflow-hidden flex items-center flex-shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, y: mobileMenuOpen ? 7 : -7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: mobileMenuOpen ? -7 : 7 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center text-left font-mono text-xs uppercase tracking-wider font-medium text-white"
              >
                {mobileMenuOpen ? "Close" : "Menu"}
              </motion.span>
            </AnimatePresence>
          </div>
        </button>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#111010] flex flex-col justify-between px-[clamp(20px,4vw,56px)] pt-24 pb-8 md:hidden overflow-y-auto select-none"
          >
            {/* Animated Links List with expanding dividing lines */}
            <div className="flex flex-col my-auto py-2">
              {navItems.map((item, idx) => (
                <div key={item.label} className="w-full">
                  {/* Top hairline dividing line for each row */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.12 + 0.07 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: "left" }}
                    className="w-full h-[1px] bg-white/10"
                  />

                  {/* Menu item row */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + 0.06 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="py-4 sm:py-5 flex items-center justify-between group"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl sm:text-5xl font-archivo font-extrabold tracking-tight uppercase text-white hover:text-accent transition-colors"
                    >
                      {item.label}
                    </a>
                    <span className="font-mono text-xs text-muted tracking-widest">
                      0{idx + 1}
                    </span>
                  </motion.div>
                </div>
              ))}

              {/* Bottom hairline dividing line after last row */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.12 + 0.07 * navItems.length,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: "left" }}
                className="w-full h-[1px] bg-white/10"
              />
            </div>

            {/* Bottom Drawer Meta Info & Action */}
            <div className="pt-6 border-t border-hairline/30 flex flex-col gap-4">
              <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider text-label">
                <a
                  href="mailto:roktimtayecoding@gmail.com"
                  className="text-white hover:text-accent transition-colors"
                >
                  roktimtayecoding@gmail.com
                </a>
                <div className="flex items-center gap-2 text-muted">
                  <span>Dibrugarh, Assam</span>
                  <span>/</span>
                  <span>{timeStr}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/#work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 hover:border-accent text-white hover:text-accent font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  See the work →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
