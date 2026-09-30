import { AiSection, ContactSection, Hero } from "@/features/portfolio";

export function HomePage() {
  return (
    <main id="main" className="w-full">
      <Hero />
      <AiSection />
      <ContactSection />
    </main>
  );
}
