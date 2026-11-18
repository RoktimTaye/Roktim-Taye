"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  text: string;
  align?: "left" | "center" | "right";
  color?: string;
  highlightColor?: string;
  particleSize?: number;
  particleGap?: number;
  mouseRadius?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseColor: string;
  highlightColor: string;
  color: string;
  ease: number;
  friction: number;
}

export default function ParticleText({
  text,
  align = "left",
  color = "#edeae4",
  highlightColor = "#7fa8ff",
  particleSize = 2.4,
  particleGap = 4,
  mouseRadius = 100,
  className = "",
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: mouseRadius,
      isHovered: false,
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const init = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width <= 0 || height <= 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Create an offscreen canvas to sample the text pixels
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offscreen.width = width;
      offscreen.height = height;

      // Font size proportional to container height with mobile width auto-scaling
      let fontSize = Math.floor(height * 0.88);
      offCtx.font = `800 ${fontSize}px 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif`;

      const textMetrics = offCtx.measureText(text);
      const maxAllowedW = width - 12;
      if (textMetrics.width > maxAllowedW && textMetrics.width > 0) {
        const scaleFactor = maxAllowedW / textMetrics.width;
        fontSize = Math.floor(fontSize * scaleFactor);
        offCtx.font = `800 ${fontSize}px 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif`;
      }
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#ffffff";

      let textX = 0;
      if (align === "left") {
        offCtx.textAlign = "left";
        textX = 4;
      } else if (align === "right") {
        offCtx.textAlign = "right";
        textX = width - 4;
      } else {
        offCtx.textAlign = "center";
        textX = width / 2;
      }

      const textY = height / 2;
      offCtx.fillText(text, textX, textY);

      // Read image data from offscreen canvas
      const imgData = offCtx.getImageData(0, 0, width, height).data;
      particles = [];

      const gap = Math.max(3, Math.floor(particleGap));

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 128) {
            // Random scatter around origin for initial assembly animation
            const initialAngle = Math.random() * Math.PI * 2;
            const initialDist = Math.random() * 20;

            particles.push({
              x: x + Math.cos(initialAngle) * initialDist,
              y: y + Math.sin(initialAngle) * initialDist,
              originX: x,
              originY: y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              size: particleSize * (0.85 + Math.random() * 0.3),
              baseColor: color,
              highlightColor: highlightColor,
              color: color,
              ease: 0.08 + Math.random() * 0.04,
              friction: 0.88 + Math.random() * 0.03,
            });
          }
        }
      }
    };

    init();

    let cachedRect = canvas.getBoundingClientRect();
    const updateCachedRect = () => {
      cachedRect = canvas.getBoundingClientRect();
    };

    // Mouse Tracking on Window
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - cachedRect.left;
      mouse.y = e.clientY - cachedRect.top;
      mouse.isHovered =
        mouse.x >= 0 && mouse.x <= cachedRect.width && mouse.y >= 0 && mouse.y <= cachedRect.height;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovered = false;
    };

    // Click burst explosion
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX - cachedRect.left;
      const clickY = e.clientY - cachedRect.top;

      particles.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 24;
          p.vy += Math.sin(angle) * force * 24;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", updateCachedRect, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const handleResize = () => {
      init();
      updateCachedRect();
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with Visibility Throttling
    let isVisible = true;
    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 7;
          const pushY = Math.sin(angle) * force * 7;

          p.vx -= pushX;
          p.vy -= pushY;
          p.color = p.highlightColor;
        } else {
          p.color = p.baseColor;
        }

        // Spring physics return to origin
        const springDx = p.originX - p.x;
        const springDy = p.originY - p.y;

        p.vx += springDx * p.ease;
        p.vy += springDy * p.ease;
        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
        p.y += p.vy;

        // Render particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updateCachedRect();
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", updateCachedRect);
      window.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [text, align, color, highlightColor, particleSize, particleGap, mouseRadius]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-pointer select-none ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
