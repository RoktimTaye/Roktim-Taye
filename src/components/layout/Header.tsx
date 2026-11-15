"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm md:text-base font-semibold tracking-wider uppercase text-white hover:opacity-80 transition-opacity"
          >
            ROKTIM TAYE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-neutral-400">
            <a
              href="#portfolio"
              className="hover:text-white transition-colors duration-200"
            >
              Portfolio
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="px-5 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#e63946] hover:bg-[#ff5a67] rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center px-8 md:hidden">
          <nav className="flex flex-col items-center gap-8 text-2xl font-light text-neutral-200">
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white hover:scale-105 transition-all"
            >
              Portfolio
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white hover:scale-105 transition-all"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white hover:scale-105 transition-all"
            >
              Contact
            </a>
            <a
              href="mailto:roktimtayecoding@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 px-7 py-3 text-sm font-semibold tracking-wider uppercase text-white bg-[#e63946] rounded-full shadow-lg shadow-red-500/30"
            >
              Let&apos;s Talk
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
