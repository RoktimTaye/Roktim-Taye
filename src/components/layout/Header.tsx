"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Expand when scrolling down past 40px
      // Contract back when scrolling up or near the top
      if (currentScrollY > 40 && currentScrollY > lastScrollY) {
        setIsExpanded(true);
      } else if (currentScrollY <= 40 || currentScrollY < lastScrollY - 5) {
        setIsExpanded(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Apple Glass Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 sm:pt-6 px-4 sm:px-6">
        <div
          className={`pointer-events-auto relative w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded
              ? "max-w-[1300px] py-3.5 px-6 sm:px-8 bg-[#161514]/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_50px_rgba(0,0,0,0.7)] border-white/20"
              : "max-w-[880px] py-2.5 px-5 sm:px-7 bg-[#161514]/65 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_10px_35px_rgba(0,0,0,0.45)] border-white/10"
          } backdrop-blur-2xl rounded-full border flex items-center justify-between overflow-hidden`}
        >
          {/* Apple Glass Highlight Sheen on Top Border */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          {/* Left: Brand Identity */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-text transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-accent/80 group-hover:scale-125 transition-transform duration-300" />
            <span className="group-hover:text-accent transition-colors">ROKTIM TAYE</span>
            <span className="hidden sm:inline text-[10px] text-label font-mono">
              / ©2026
            </span>
          </Link>

          {/* Center: Navigation Links (hover #7FA8FF) */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-mono text-muted">
            <a
              href="#work"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              Work
            </a>
            <a
              href="#about"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              Services
            </a>
          </nav>

          {/* Right: Live Clock & Glass Pill CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live Dibrugarh Clock */}
            <div
              className={`flex items-center gap-1.5 text-[11px] font-mono text-label px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-80"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dibrugarh {time || "IST"}</span>
            </div>

            {/* Contact Action Pill (bg #7FA8FF, text #111010) */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-[#111010] font-semibold bg-[#7fa8ff] hover:bg-[#9bbaff] border border-[#7fa8ff] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-[#7fa8ff]/25"
            >
              <span>Contact</span>
              <ArrowUpRight size={13} className="text-[#111010]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-muted hover:text-text p-1.5 rounded-full bg-white/5 border border-white/10 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Apple Glass Style) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#111010]/95 backdrop-blur-3xl flex flex-col justify-between p-8 md:hidden">
          <div className="pt-24 flex flex-col gap-8 text-3xl font-light text-text">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors flex items-center justify-between"
            >
              <span>Work</span>
              <ArrowUpRight size={20} className="text-label" />
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors flex items-center justify-between"
            >
              <span>About</span>
              <ArrowUpRight size={20} className="text-label" />
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors flex items-center justify-between"
            >
              <span>Services</span>
              <ArrowUpRight size={20} className="text-label" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowUpRight size={20} className="text-label" />
            </a>
          </div>

          <div className="border-t border-hairline pt-6 flex flex-col gap-3 text-xs font-mono text-label">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Dibrugarh, Assam, India • {time}</span>
            </div>
            <a
              href="mailto:roktimtayecoding@gmail.com"
              className="text-text hover:text-accent transition-colors"
            >
              roktimtayecoding@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
