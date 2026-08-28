import { AiSection, CareerSection, ContactSection, Hero, SkillSection } from "@/features/portfolio";

export function HomePage() {
  return (
    // 지면 폭은 섹션이 각자 잡는다. 어두운 밴드가 단을 뚫고 전폭으로 나가야 하기 때문이다.
    <main id="main" className="w-full">
      <Hero />
      <SkillSection />
      <AiSection />
      <CareerSection />
      <ContactSection />
    </main>
  );
}
