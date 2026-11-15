import Hero from "@/components/sections/Hero";
import SkillsMarquee from "@/components/sections/SkillsMarquee";
import SelectedWork from "@/components/sections/SelectedWork";
import UpCloseStrip from "@/components/sections/UpCloseStrip";
import Statement from "@/components/sections/Statement";
import ServiceTiles from "@/components/sections/ServiceTiles";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-bg">
      <Hero />
      <SkillsMarquee />
      <SelectedWork />
      <UpCloseStrip />
      <Statement />
      <ServiceTiles />
    </div>
  );
}
