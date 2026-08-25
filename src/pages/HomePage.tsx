import { AiSection } from "@/features/portfolio/AiSection";
import { CareerSection } from "@/features/portfolio/CareerSection";
import { ContactSection } from "@/features/portfolio/ContactSection";
import { Hero } from "@/features/portfolio/Hero";
import { MoreWorkSection } from "@/features/portfolio/MoreWorkSection";
import { SkillSection } from "@/features/portfolio/SkillSection";
import { StrengthSection } from "@/features/portfolio/StrengthSection";

export function HomePage() {
  return (
    <main id="main" className="wrap">
      <Hero />
      <StrengthSection />
      <SkillSection />
      <MoreWorkSection />
      <AiSection />
      <CareerSection />
      <ContactSection />
    </main>
  );
}
