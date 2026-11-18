'use client';

// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// React Bits TextPressure Component
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const RIPPLE_LIFE = 1.3;
const MAX_RIPPLES = 6;
const WAVE_PERIOD = 3.2;
const PULSE_PERIOD = 2.8;
const PULSE_DEPTH = 0.42;

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const getIdlePressure = (mode: string, position: number, clock: number, spread: number) => {
  if (mode === 'wave') {
    const crest = 0.5 + 0.5 * Math.cos(Math.PI * 2 * (position / spread - clock / WAVE_PERIOD));
    return crest * crest;
  }
  if (mode === 'pulse') {
    const lag = Math.abs(position - 0.5) * 0.4;
    const breath = 0.5 - 0.5 * Math.cos(Math.PI * 2 * (clock / PULSE_PERIOD - lag));
    return PULSE_DEPTH * breath * breath * (3 - 2 * breath);
  }
  return 0;
};

const getRipplePressure = (ripples: any[], point: { x: number; y: number }, now: number, span: number) => {
  const band = Math.max(span * 0.14, 32);
  let total = 0;
  for (const ripple of ripples) {
    const age = (now - ripple.start) / 1000;
    if (age <= 0 || age >= RIPPLE_LIFE) continue;
    const offset = (dist(ripple, point) - age * span * 1.25) / band;
    if (offset <= -1 || offset >= 1) continue;
    const fade = 1 - age / RIPPLE_LIFE;
    const swell = (1 - offset * offset) ** 2 * fade * fade * Math.min(1, age / 0.06);
    total = 1 - (1 - total) * (1 - swell);
  }
  return total;
};

export interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;

  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;

  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;

  align?: 'left' | 'center' | 'right';
  minWeight?: number;
  maxWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  letterSpacing?: string;
  gap?: string;

  radius?: number;
  smoothing?: number;

  idle?: 'none' | 'wave' | 'pulse';
  idleSpeed?: number;
  clickRipple?: boolean;

  textColor?: string;
  pressureColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;

  minFontSize?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Compressa',
  fontFamily = "'Archivo', -apple-system, BlinkMacSystemFont, sans-serif",
  fontUrl = '',

  width = true,
  weight = true,
  italic = false,
  alpha = false,

  flex = false,
  stroke = false,
  scale = false,

  align = 'left',
  minWeight = 700,
  maxWeight = 500,
  minWidth = 94,
  maxWidth = 122,
  letterSpacing,
  gap,

  radius = 0.5,
  smoothing = 0.5,

  idle = 'none',
  idleSpeed = 1,
  clickRipple = true,

  textColor = '#edeae4',
  pressureColor = '#7fa8ff',
  strokeColor = '#FF0000',
  strokeWidth = 3,
  className = '',

  minFontSize = 24,
  tag = 'h2'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const wakeRef = useRef<(() => void) | null>(null);
  const visibleRef = useRef(true);
  const ripplesRef = useRef<{ x: number; y: number; start: number }[]>([]);
  const optionsRef = useRef({
    width,
    weight,
    italic,
    alpha,
    minWeight,
    maxWeight,
    minWidth,
    maxWidth,
    radius,
    smoothing,
    idle,
    idleSpeed,
    clickRipple,
    textColor,
    pressureColor
  });

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0, seen: false });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);

  const chars = Array.from(text);

  useEffect(() => {
    optionsRef.current = {
      width,
      weight,
      italic,
      alpha,
      minWeight,
      maxWeight,
      minWidth,
      maxWidth,
      radius,
      smoothing,
      idle,
      idleSpeed,
      clickRipple,
      textColor,
      pressureColor
    };
    wakeRef.current?.();
  }, [
    width,
    weight,
    italic,
    alpha,
    minWeight,
    maxWeight,
    minWidth,
    maxWidth,
    radius,
    smoothing,
    idle,
    idleSpeed,
    clickRipple,
    textColor,
    pressureColor
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    const wake = () => wakeRef.current?.();
    const track = (x: number, y: number) => {
      cursor.x = x;
      cursor.y = y;
      cursor.seen = true;
      wake();
    };
    const handleMouseMove = (e: MouseEvent) => track(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) track(t.clientX, t.clientY);
    };
    const handleLeave = () => {
      cursor.seen = false;
      wake();
    };
    const handlePress = (e: MouseEvent) => {
      if (!optionsRef.current.clickRipple) return;
      const ripples = ripplesRef.current;
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      wake();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchend', handleLeave);
    window.addEventListener('touchcancel', handleLeave);
    window.addEventListener('scroll', wake, { passive: true, capture: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    // @ts-ignore
    document.fonts?.addEventListener?.('loadingdone', wake);
    container?.addEventListener('pointerdown', handlePress as any);

    if (container) {
      const { left, top, width, height } = container.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursor.x = mouseRef.current.x;
      cursor.y = mouseRef.current.y;
    }

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) wake();
    });
    if (container) observer.observe(container);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleLeave);
      window.removeEventListener('touchcancel', handleLeave);
      window.removeEventListener('scroll', wake, { capture: true });
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      // @ts-ignore
      document.fonts?.removeEventListener?.('loadingdone', wake);
      container?.removeEventListener('pointerdown', handlePress as any);
      observer.disconnect();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    const resize = () => {
      const { width: containerW, height: containerH } = container.getBoundingClientRect();
      if (!containerW || !containerH) return;

      const fontFromHeight = containerH * 0.90;
      const fontFromWidth = chars.length ? containerW / (chars.length * 0.54) : minFontSize;
      const nextFontSize = Math.max(
        flex ? Math.min(fontFromWidth, fontFromHeight) : fontFromHeight,
        minFontSize
      );

      setFontSize(nextFontSize);
      setScaleY(scale && containerH > 0 ? containerH / nextFontSize : 1);
    };

    resize();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(resize);
    });
    observer.observe(container);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [chars.length, minFontSize, scale, flex]);

  useEffect(() => {
    const title = titleRef.current;
    const container = containerRef.current;
    if (!title || !container) return;

    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const applied: any[] = [];
    let rafId = 0;
    let last = 0;
    let idleFrames = 0;
    let clock = 0;
    let engage = optionsRef.current.idle === 'wave' || optionsRef.current.idle === 'pulse' ? 0 : 1;

    const tick = (now: number) => {
      rafId = 0;
      const elapsed = last ? Math.min(now - last, 64) : 1000 / 60;
      last = now;

      const options = optionsRef.current;
      const idleMode =
        (options.idle === 'wave' || options.idle === 'pulse') && !motionQuery?.matches ? options.idle : 'none';
      const mouse = mouseRef.current;
      const cursor = cursorRef.current;
      const lag = 1000 * options.smoothing * options.smoothing;
      const follow = lag > 1 ? 1 - Math.exp(-elapsed / lag) : 1;
      mouse.x += (cursor.x - mouse.x) * follow;
      mouse.y += (cursor.y - mouse.y) * follow;

      let present = 1;
      if (idleMode !== 'none') {
        const box = container.getBoundingClientRect();
        const inside = cursor.x >= box.left && cursor.x <= box.right && cursor.y >= box.top && cursor.y <= box.bottom;
        present = cursor.seen && inside ? 1 : 0;
      }
      engage += (present - engage) * (1 - Math.exp(-elapsed / 320));
      if (Math.abs(present - engage) < 0.002) engage = present;
      const idling = idleMode !== 'none' && engage < 1;
      if (idling) clock += (elapsed / 1000) * options.idleSpeed;

      const ripples = ripplesRef.current;
      while (ripples.length && now - ripples[0].start > RIPPLE_LIFE * 1000) ripples.shift();

      const titleRect = title.getBoundingClientRect();
      const maxDist = Math.max(titleRect.width * options.radius, 1);
      const spread = Math.max(options.radius * 2, 0.2);
      const spans = spansRef.current;
      const centers = spans.map(span => {
        if (!span) return null;
        const rect = span.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      });

      let changed = false;
      spans.forEach((span, i) => {
        const center = centers[i];
        if (!span || !center) return;

        let pressure = clamp01(1 - dist(mouse, center) / maxDist);
        if (idling) {
          const position = (center.x - titleRect.left) / Math.max(titleRect.width, 1);
          const resting = getIdlePressure(idleMode, position, clock, spread);
          pressure = resting + (pressure - resting) * engage;
        }
        if (ripples.length) {
          const swell = getRipplePressure(ripples, center, now, titleRect.width);
          pressure = 1 - (1 - pressure) * (1 - swell);
        }

        // Compute variable font parameters with Archivo constraints
        const wdth = options.width
          ? Math.floor(options.minWidth + (options.maxWidth - options.minWidth) * pressure)
          : options.minWidth;
        const wght = options.weight
          ? Math.floor(options.minWeight + (options.maxWeight - options.minWeight) * pressure)
          : options.minWeight;
        const italVal = options.italic ? pressure.toFixed(2) : '0';
        const alphaVal = options.alpha ? pressure.toFixed(2) : '';
        const tint = Math.round((1 - (1 - pressure) * (1 - pressure)) * 100);
        const color = options.pressureColor
          ? `color-mix(in oklab, ${options.pressureColor} ${tint}%, ${options.textColor})`
          : options.textColor;
        const settings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        const previous = applied[i];

        if (
          !previous ||
          previous.span !== span ||
          previous.settings !== settings ||
          previous.alphaVal !== alphaVal ||
          previous.color !== color
        ) {
          span.style.fontVariationSettings = settings;
          span.style.opacity = alphaVal;
          span.style.color = color;
          applied[i] = { span, settings, alphaVal, color };
          changed = true;
        }
      });

      const moving = Math.abs(cursor.x - mouse.x) > 0.1 || Math.abs(cursor.y - mouse.y) > 0.1;
      const animating = moving || idling || engage !== present || ripples.length > 0;
      idleFrames = animating ? 0 : idleFrames + 1;

      if (animating || (changed && idleFrames < 60)) rafId = requestAnimationFrame(tick);
      else last = 0;
    };

    const wake = () => {
      if (!rafId && visibleRef.current) rafId = requestAnimationFrame(tick);
    };

    wakeRef.current = wake;
    wake();

    return () => {
      cancelAnimationFrame(rafId);
      wakeRef.current = null;
    };
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  }, [fontSize, scaleY, text, flex, fontFamily]);

  const isLeft = align === 'left';
  const titleStyle: React.CSSProperties = {
    fontFamily,
    fontSize,
    lineHeight: 1,
    transform: `scale(1, ${scaleY})`,
    transformOrigin: isLeft ? 'left center' : 'center top',
    margin: 0,
    textAlign: align,
    userSelect: 'none',
    whiteSpace: 'nowrap',
    fontWeight: minWeight,
    letterSpacing,
    gap,
    width: flex ? '100%' : 'auto',
    color: textColor,
    display: flex ? 'flex' : 'inline-flex',
    justifyContent: flex ? 'space-between' : (isLeft ? 'flex-start' : 'center'),
    alignItems: 'center',
    // @ts-ignore
    '--text-pressure-stroke-width': `${strokeWidth}px`,
    '--text-pressure-stroke-color': strokeColor
  };

  const Component = tag;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: flex ? '100%' : 'auto',
        height: '100%',
        background: 'transparent',
        display: flex ? 'block' : 'inline-flex',
        alignItems: 'center',
        justifyContent: isLeft ? 'flex-start' : 'center',
        transformOrigin: isLeft ? 'left center' : 'center top',
      }}
    >
      <Component
        ref={titleRef as any}
        aria-label={text}
        className={`text-pressure-title ${stroke ? 'is-stroke' : ''} ${className}`}
        style={titleStyle}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              transformOrigin: isLeft ? 'left center' : 'center top',
              fontVariationSettings: `'wght' ${minWeight}, 'wdth' ${minWidth}, 'ital' 0`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Component>
    </div>
  );
};

export default TextPressure;
