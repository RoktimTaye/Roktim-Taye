"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Indian Standard Time (Dibrugarh, Assam)
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#111010]/85 backdrop-blur-md border-b border-hairline py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between">
          {/* Left: Brand */}
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-text hover:text-accent transition-colors flex items-center gap-2"
          >
            <span>ROKTIM TAYE</span>
            <span className="hidden sm:inline-block text-[10px] text-label font-mono">
              / ©2026
            </span>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-wider uppercase font-mono text-muted">
            <a
              href="#work"
              className="hover:text-text transition-colors duration-200"
            >
              Work
            </a>
            <a
              href="#about"
              className="hover:text-text transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-text transition-colors duration-200"
            >
              Services
            </a>
          </nav>

          {/* Right: Clock & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] font-mono text-label">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dibrugarh {time || "IST"}</span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider text-text bg-surface hover:bg-neutral-800 border border-hairline hover:border-accent hover:text-accent rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span>Start a project</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-muted hover:text-text p-2"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#111010]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden">
          <div className="pt-20 flex flex-col gap-8 text-3xl font-light text-text">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Services
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="border-t border-hairline pt-6 flex flex-col gap-4 text-xs font-mono text-label">
            <div>Dibrugarh, Assam, India • {time}</div>
            <a
              href="mailto:roktimtayecoding@gmail.com"
              className="text-text hover:text-accent"
            >
              roktimtayecoding@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
