import Hero from "@/components/sections/Hero";
import SkillsMarquee from "@/components/sections/SkillsMarquee";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ProjectGrid from "@/components/sections/ProjectGrid";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.find((p) => p.featured) || projects[0];

  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <SkillsMarquee />
      <FeaturedProject project={featured} />
      <ProjectGrid />
      <About />
      <CTA />
    </div>
  );
}
