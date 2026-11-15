"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

interface WordData {
  text: string;
  italic?: boolean;
  accent?: boolean;
}

const MAIN_WORDS: WordData[] = [
  { text: "I'm" },
  { text: "Roktim." },
  { text: "I" },
  { text: "design" },
  { text: "and" },
  { text: "build" },
  { text: "websites" },
  { text: "and" },
  { text: "apps" },
  { text: "that" },
  { text: "move,", italic: true },
  { text: "respond", italic: true },
  { text: "and" },
  { text: "feel" },
  { text: "good" },
  { text: "to" },
  { text: "use." },
  { text: "Designed" },
  { text: "in" },
  { text: "Figma," },
  { text: "built" },
  { text: "in" },
  { text: "code," },
  { text: "made" },
  { text: "in" },
  { text: "Dibrugarh.", accent: true },
];

const SUBTITLE_WORDS: WordData[] = [
  { text: "Brainstorming" },
  { text: "•" },
  { text: "Shaping" },
  { text: "•" },
  { text: "Presenting" },
  { text: "to" },
  { text: "the" },
  { text: "real" },
  { text: "world" },
];

interface CharItem {
  char: string;
  range: [number, number];
}

interface ProcessedWord {
  text: string;
  italic?: boolean;
  accent?: boolean;
  chars: CharItem[];
  wordRange: [number, number];
}

function Char({
  char,
  progress,
  range,
  isReduced,
  className = "",
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  isReduced: boolean;
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  if (isReduced) {
    return <span className={className}>{char}</span>;
  }

  return (
    <motion.span style={{ opacity }} className={className}>
      {char}
    </motion.span>
  );
}

function Word({
  word,
  progress,
  isReduced,
}: {
  word: ProcessedWord;
  progress: MotionValue<number>;
  isReduced: boolean;
}) {
  const underlineColor = useTransform(
    progress,
    word.wordRange,
    ["rgba(127, 168, 255, 0)", "rgba(127, 168, 255, 0.45)"]
  );

  const wordClasses = [
    "inline-block whitespace-nowrap",
    word.italic ? "italic font-serif font-light text-text/90" : "",
    word.accent ? "text-accent underline underline-offset-8" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.span
      className={wordClasses}
      style={word.accent && !isReduced ? { textDecorationColor: underlineColor } : undefined}
    >
      {word.chars.map((item, idx) => (
        <Char
          key={idx}
          char={item.char}
          progress={progress}
          range={item.range}
          isReduced={isReduced}
          className="inline-block"
        />
      ))}
    </motion.span>
  );
}

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isReduced = Boolean(shouldReduceMotion);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { processedMainWords, processedSubtitleWords } = useMemo(() => {
    // 1. Calculate total chars in main words
    let totalMainChars = 0;
    MAIN_WORDS.forEach((w) => {
      totalMainChars += w.text.length;
    });

    const mainStart = 0.05;
    const mainEnd = 0.72;
    const mainStep = (mainEnd - mainStart) / totalMainChars;

    let globalMainIdx = 0;
    const processedMain: ProcessedWord[] = MAIN_WORDS.map((w) => {
      const chars: CharItem[] = [];
      const wordStartIdx = globalMainIdx;

      for (let i = 0; i < w.text.length; i++) {
        const start = mainStart + globalMainIdx * mainStep;
        const end = Math.min(mainEnd + mainStep, start + mainStep * 2.2);
        chars.push({
          char: w.text[i],
          range: [start, end],
        });
        globalMainIdx++;
      }

      const wordStart = mainStart + wordStartIdx * mainStep;
      const wordEnd = mainStart + (globalMainIdx - 1) * mainStep + mainStep * 2.2;

      return {
        ...w,
        chars,
        wordRange: [wordStart, Math.min(1, wordEnd)],
      };
    });

    // 2. Calculate total chars in subtitle words
    let totalSubChars = 0;
    SUBTITLE_WORDS.forEach((w) => {
      totalSubChars += w.text.length;
    });

    const subStart = 0.76;
    const subEnd = 0.92;
    const subStep = (subEnd - subStart) / totalSubChars;

    let globalSubIdx = 0;
    const processedSub: ProcessedWord[] = SUBTITLE_WORDS.map((w) => {
      const chars: CharItem[] = [];
      const wordStartIdx = globalSubIdx;

      for (let i = 0; i < w.text.length; i++) {
        const start = subStart + globalSubIdx * subStep;
        const end = Math.min(subEnd + subStep, start + subStep * 2.2);
        chars.push({
          char: w.text[i],
          range: [start, end],
        });
        globalSubIdx++;
      }

      const wordStart = subStart + wordStartIdx * subStep;
      const wordEnd = subStart + (globalSubIdx - 1) * subStep + subStep * 2.2;

      return {
        ...w,
        chars,
        wordRange: [wordStart, Math.min(1, wordEnd)],
      };
    });

    return {
      processedMainWords: processedMain,
      processedSubtitleWords: processedSub,
    };
  }, []);

  const dividerOpacity = useTransform(scrollYProgress, [0.68, 0.76], [0.2, 1]);
  const locationOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0.2, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative h-[220vh] bg-bg border-t border-hairline"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-[clamp(20px,4vw,56px)] overflow-hidden">
        <div className="w-full flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="mb-8 md:mb-12">
            <span className="font-mono text-accent text-[clamp(16px,1.4vw,22px)] tracking-wider uppercase font-medium">
              (Hello)
            </span>
          </div>

          {/* Big Pinned Statement with Letter-by-Letter Scroll Scrub */}
          <h2 className="text-[clamp(32px,5.5vw,96px)] leading-[1.04] tracking-tight font-semibold flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] text-text select-none">
            {processedMainWords.map((word, idx) => (
              <Word
                key={idx}
                word={word}
                progress={scrollYProgress}
                isReduced={isReduced}
              />
            ))}
          </h2>

          {/* Small subtitle detail */}
          <motion.div
            style={isReduced ? undefined : { opacity: dividerOpacity }}
            className="mt-12 pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono uppercase"
          >
            <div className="flex flex-wrap gap-x-[0.35em] text-label">
              {processedSubtitleWords.map((word, idx) => (
                <Word
                  key={idx}
                  word={word}
                  progress={scrollYProgress}
                  isReduced={isReduced}
                />
              ))}
            </div>

            <motion.div
              style={isReduced ? undefined : { opacity: locationOpacity }}
              className="text-label"
            >
              Assam, India
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
