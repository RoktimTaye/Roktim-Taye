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
  flex = true,
  radius = 0.25,
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

  const [fontSize, setFontSize] = useState(minFontSize);
  const chars = Array.from(text);

  // Resize calculation that respects both container width and container height
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const { width: containerW, height: containerH } = container.getBoundingClientRect();
      if (!containerW || !containerH) return;

      // Font size must comfortably fit both width and height to prevent vertical collisions
      const fontFromHeight = containerH * 0.88;
      const fontFromWidth = containerW / (chars.length * 0.62);
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
  }, [chars.length, minFontSize]);

  // Pointer tracking ONLY on the container/letters
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

  // Animation Loop: Reacts ONLY when cursor is inside
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const applied: any[] = [];
    let rafId = 0;
    let last = 0;
    let settlingFrames = 0;

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
      const maxDist = Math.max(titleRect.width * radius, 120);

      const spans = spansRef.current;
      const centers = spans.map((span) => {
        if (!span) return null;
        const rect = span.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      });

      let hasActivePressure = false;

      spans.forEach((span, i) => {
        const center = centers[i];
        if (!span || !center) return;

        // ONLY apply pressure when cursor is hovering over the letters!
        let pressure = 0;
        if (cursor.inside) {
          const distance = dist(mouse, center);
          pressure = clamp01(1 - distance / maxDist);
        }

        if (pressure > 0.01) {
          hasActivePressure = true;
        }

        // Variable font values: resting state = 800 weight, 100 width, 0 italic
        const wdth = width ? Math.floor(100 + 45 * pressure) : 100;
        const wght = weight ? Math.floor(750 + 250 * pressure) : 800;
        const italVal = italic ? (pressure * 0.8).toFixed(2) : "0";
        const color = pressure > 0.15 && pressureColor ? pressureColor : textColor;

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

      // Keep rendering until letters return to resting state smoothly
      if (cursor.inside || hasActivePressure || settlingFrames < 30) {
        if (!cursor.inside && !hasActivePressure) {
          settlingFrames++;
        } else {
          settlingFrames = 0;
        }
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
    margin: 0,
    userSelect: "none",
    whiteSpace: "nowrap",
    width: "100%",
    color: textColor,
    display: flex ? "flex" : "inline-flex",
    justifyContent: flex ? "space-between" : "flex-start",
    alignItems: "center",
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center overflow-hidden cursor-default ${className}`}
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
            className="inline-block transition-transform duration-150"
            style={{
              fontVariationSettings: "'wght' 750, 'wdth' 100, 'ital' 0",
              color: textColor,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
