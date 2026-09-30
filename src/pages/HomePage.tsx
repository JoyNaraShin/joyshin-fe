import { AiSection, CareerSection, ContactSection, Hero, WorkSection } from "@/features/portfolio";

export function HomePage() {
  return (
    <main id="main" className="w-full">
      <Hero />
      <WorkSection />
      <AiSection />
      <CareerSection />
      <ContactSection />
    </main>
  );
}
