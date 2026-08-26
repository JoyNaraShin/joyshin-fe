import { ListRenderingCase } from "./cases/ListRenderingCase";
import { LoadingCase } from "./cases/LoadingCase";
import { SearchCase } from "./cases/SearchCase";
import { StateCase } from "./cases/StateCase";
import { DocSection } from "./layout/DocSection";

export function SkillSection() {
  return (
    <DocSection id="skill" title="작업" meta="CLO-SET · 사례 4건 · 2022–2026">
      <LoadingCase />
      <ListRenderingCase />
      <SearchCase />
      <StateCase />
    </DocSection>
  );
}
