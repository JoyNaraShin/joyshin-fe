import { AiSection, CareerSection, ContactSection, Hero } from "@/features/portfolio";

export function HomePage() {
  return (
    <main id="main" className="w-full">
      <Hero />
      <CareerSection />
      <AiSection />
      <ContactSection />
    </main>
  );
}
