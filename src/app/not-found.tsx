import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#111010] text-[#edeae4] flex flex-col items-center justify-center px-6 text-center select-none">
      <div className="max-w-md space-y-6">
        <span className="font-mono text-xs text-[#7fa8ff] uppercase tracking-widest block">
          (404 — Not Found)
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Lost in the ether.
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          The page you are looking for doesn’t exist or has moved. Let’s get you back to the portfolio.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-[#111010] font-bold bg-[#7fa8ff] hover:bg-[#9bbaff] transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
