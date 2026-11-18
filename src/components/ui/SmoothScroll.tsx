"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Suppress benign ResizeObserver notifications from triggering dev overlays
    const handleWindowError = (e: ErrorEvent) => {
      if (
        e.message &&
        (e.message.includes("ResizeObserver") ||
          e.message.includes("undelivered notifications"))
      ) {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("error", handleWindowError);

    // Only initialize smooth scroll on non-touch devices or when user prefers motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return () => window.removeEventListener("error", handleWindowError);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("error", handleWindowError);
    };
  }, []);

  return <>{children}</>;
}
