"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ErrorBoundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#111010] text-[#edeae4] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md space-y-4">
        <span className="font-mono text-xs text-[#7fa8ff] uppercase tracking-widest block">
          Notice
        </span>
        <h2 className="text-2xl font-bold text-white">Something caught a hiccup</h2>
        <p className="text-xs text-neutral-400">
          The page encountered a small bump, but you can reload smoothly.
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#111010] font-bold bg-[#7fa8ff] hover:bg-[#9bbaff] transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
