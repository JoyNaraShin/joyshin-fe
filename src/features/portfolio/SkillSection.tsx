import { ListRenderingCase } from "./cases/ListRenderingCase";
import { LoadingCase } from "./cases/LoadingCase";
import { SearchCase } from "./cases/SearchCase";
import { StateCase } from "./cases/StateCase";
import { DocSection } from "./layout/DocSection";

/** 작업 — 사례 층. 사례 하나가 파일 하나다. 여기는 순서만 진다. */
export function SkillSection() {
  return (
    <DocSection id="skill" title="작업" meta="CLO-SET · 2022–2026">
      <LoadingCase />
      <ListRenderingCase />
      <SearchCase />
      <StateCase />
    </DocSection>
  );
}
