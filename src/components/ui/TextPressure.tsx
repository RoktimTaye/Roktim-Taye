"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Point {
  x: number;
  y: number;
}

const dist = (a: Point, b: Point) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  flex?: boolean;
  letterSpacing?: string;
  radius?: number;
  smoothing?: number;
  textColor?: string;
  pressureColor?: string;
  className?: string;
  minFontSize?: number;
}

export default function TextPressure({
  text = "ROKTIM",
  fontFamily = "Roboto Flex, -apple-system, BlinkMacSystemFont, sans-serif",
  fontUrl = "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",
  width = true,
  weight = true,
  italic = true,
  flex = false,
  letterSpacing = "-0.035em",
  radius = 0.22,
  smoothing = 0.35,
  textColor = "#edeae4",
  pressureColor = "#7fa8ff",
  className = "",
  minFontSize = 36,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const wakeRef = useRef<(() => void) | null>(null);

  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<{ x: number; y: number; inside: boolean }>({
    x: 0,
    y: 0,
    inside: false,
  });

  // Keep a continuous per-character pressure array for buttery-smooth ease in and ease out
  const currentPressuresRef = useRef<number[]>([]);

  const [fontSize, setFontSize] = useState(minFontSize);
  const chars = Array.from(text);

  // Initialize continuous pressure states for each character
  if (currentPressuresRef.current.length !== chars.length) {
    currentPressuresRef.current = new Array(chars.length).fill(0);
  }

  // Resize calculation: compute font size proportionally to height and width
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const { width: containerW, height: containerH } = container.getBoundingClientRect();
      if (!containerW || !containerH) return;

      const fontFromHeight = containerH * 0.92;
      const fontFromWidth = flex
        ? containerW / (chars.length * 0.62)
        : containerW / (chars.length * 0.52);

      const calculatedFontSize = Math.max(
        Math.min(fontFromWidth, fontFromHeight),
        minFontSize
      );

      setFontSize(calculatedFontSize);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [chars.length, minFontSize, flex]);

  // Pointer tracking ONLY on the container / letters
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wake = () => wakeRef.current?.();

    const handlePointerEnter = (e: PointerEvent) => {
      cursorRef.current.inside = true;
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      wake();
    };

    const handlePointerMove = (e: PointerEvent) => {
      cursorRef.current.inside = true;
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      wake();
    };

    const handlePointerLeave = () => {
      cursorRef.current.inside = false;
      wake();
    };

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Animation Loop with continuous spring-decay interpolation on release
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const applied: any[] = [];
    let rafId = 0;
    let last = 0;

    const tick = (now: number) => {
      rafId = 0;
      const elapsed = last ? Math.min(now - last, 64) : 1000 / 60;
      last = now;

      const mouse = mouseRef.current;
      const cursor = cursorRef.current;

      // Smooth cursor follow
      const follow = 1 - Math.exp(-elapsed / (1000 * smoothing * smoothing));
      mouse.x += (cursor.x - mouse.x) * follow;
      mouse.y += (cursor.y - mouse.y) * follow;

      const titleRect = title.getBoundingClientRect();
      const maxDist = Math.max(titleRect.width * radius, 110);

      const spans = spansRef.current;
      const centers = spans.map((span) => {
        if (!span) return null;
        const rect = span.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      });

      const pressures = currentPressuresRef.current;
      let isStillAnimating = false;

      spans.forEach((span, i) => {
        const center = centers[i];
        if (!span || !center) return;

        // Target pressure: calculated when cursor is inside, otherwise 0
        let target = 0;
        if (cursor.inside) {
          const distance = dist(mouse, center);
          target = clamp01(1 - distance / maxDist);
        }

        // Fluid spring interpolation: smoothly transition towards target
        // Entering is responsive, releasing has gentle exponential decay
        const decayRate = target > (pressures[i] || 0) ? 14 : 7;
        const step = 1 - Math.exp((-elapsed / 1000) * decayRate);
        const currentP = (pressures[i] || 0) + (target - (pressures[i] || 0)) * step;
        pressures[i] = currentP;

        if (Math.abs(currentP - target) > 0.005 || currentP > 0.01) {
          isStillAnimating = true;
        }

        // Compute variable font parameters
        const wdth = width ? Math.floor(100 + 40 * currentP) : 100;
        const wght = weight ? Math.floor(750 + 250 * currentP) : 800;
        const italVal = italic ? (currentP * 0.7).toFixed(2) : "0";
        const color = currentP > 0.15 && pressureColor ? pressureColor : textColor;

        const settings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        const previous = applied[i];

        if (
          !previous ||
          previous.settings !== settings ||
          previous.color !== color
        ) {
          span.style.fontVariationSettings = settings;
          span.style.color = color;
          applied[i] = { settings, color };
        }
      });

      // Continue animation loop while cursor is inside or pressures are decaying back to 0
      if (cursor.inside || isStillAnimating) {
        rafId = requestAnimationFrame(tick);
      } else {
        last = 0;
      }
    };

    const wake = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    wakeRef.current = wake;
    wake();

    return () => {
      cancelAnimationFrame(rafId);
      wakeRef.current = null;
    };
  }, [radius, smoothing, width, weight, italic, textColor, pressureColor]);

  const titleStyle: React.CSSProperties = {
    fontFamily,
    textTransform: "uppercase",
    fontSize,
    lineHeight: 1,
    letterSpacing,
    margin: 0,
    userSelect: "none",
    whiteSpace: "nowrap",
    color: textColor,
    display: flex ? "flex" : "inline-flex",
    justifyContent: flex ? "space-between" : "flex-start",
    alignItems: "center",
    width: flex ? "100%" : "auto",
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center overflow-hidden cursor-default ${className}`}
      style={{ width: flex ? "100%" : "auto", height: "100%" }}
    >
      <style>{`
        @import url('${fontUrl}');
      `}</style>
      <h1 ref={titleRef} aria-label={text} style={titleStyle}>
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            aria-hidden="true"
            className="inline-block"
            style={{
              fontVariationSettings: "'wght' 750, 'wdth' 100, 'ital' 0",
              color: textColor,
              transition:
                "color 0.4s cubic-bezier(0.16, 1, 0.3, 1), font-variation-settings 0.25s ease-out",
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
