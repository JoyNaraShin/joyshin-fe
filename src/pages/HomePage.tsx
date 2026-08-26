import {
  AiSection,
  CareerSection,
  ContactSection,
  Hero,
  MoreWorkSection,
  SkillSection,
} from "@/features/portfolio";

export function HomePage() {
  return (
    <main id="main" className="wrap">
      <Hero />
      <SkillSection />
      <MoreWorkSection />
      <AiSection />
      <CareerSection />
      <ContactSection />
    </main>
  );
}
