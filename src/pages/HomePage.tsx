import {
  AiSection,
  ContactSection,
  Hero,
  HomeCareer,
  HomeStats,
  HomeWork,
} from "@/features/portfolio";

export function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="w-full">
      <Hero />
      <HomeStats />
      <HomeWork />
      <HomeCareer />
      <AiSection />
      <ContactSection />
    </main>
  );
}
