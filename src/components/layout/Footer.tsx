"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import TextPressure from "@/components/ui/TextPressure";

export default function Footer() {
  const [time, setTime] = useState("");
  const email = "roktimtayecoding@gmail.com";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-bg text-text pt-24 sm:pt-36 pb-12 px-[clamp(20px,4vw,56px)] border-t border-hairline select-none">
      <div className="w-full flex flex-col justify-between">
        {/* Eyebrow Label (Increased size by 2, text color white) */}
        <div className="mb-6 sm:mb-8">
          <span className="font-mono text-white text-[clamp(16px,1.4vw,22px)] tracking-wider uppercase font-medium">
            Got something in mind?
          </span>
        </div>

        {/* Massive LET'S TALK Kinetic Link with TextPressure (arrow removed) */}
        <div className="my-8 sm:my-16 w-full">
          <a
            href={`mailto:${email}`}
            aria-label="Let's Talk - Email Roktim Taye"
            className="group block w-full h-[clamp(90px,16vw,250px)] relative flex items-center justify-start overflow-hidden cursor-pointer"
          >
            <TextPressure
              text="LET'S TALK"
              tag="h2"
              flex={false}
              letterSpacing="0.045em"
              gap="0.045em"
              weight={true}
              width={true}
              italic={true}
              radius={0.25}
              smoothing={0.35}
              textColor="#edeae4"
              pressureColor="#7fa8ff"
              minFontSize={44}
              className="cursor-pointer"
            />
          </a>
        </div>

        {/* Bottom Metadata & Links Bar */}
        <div className="mt-16 pt-8 border-t border-hairline flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono uppercase tracking-wider text-label">
          {/* Email link (uppercase, same size as linkedin, hover #7FA8FF) */}
          <a
            href={`mailto:${email}`}
            className="hover:text-[#7fa8ff] transition-colors duration-200"
          >
            {email}
          </a>

          {/* Social Links (hover #7FA8FF) */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/roktim-taye-86957437a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/RoktimTaye"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7fa8ff] transition-colors duration-200"
            >
              GitHub
            </a>
          </div>

          {/* Location & Time */}
          <div className="flex items-center gap-2 text-muted">
            <span>Dibrugarh</span>
            <span className="text-label">{time || "IST"}</span>
          </div>

          {/* Back to Top (uppercase, hover #7FA8FF) */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#7fa8ff] transition-colors duration-200 cursor-pointer group uppercase"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
