import { DeployCase } from "./cases/DeployCase";
import { ListRenderingCase } from "./cases/ListRenderingCase";
import { LoadingCase } from "./cases/LoadingCase";
import { ShowroomCase } from "./cases/ShowroomCase";
import { StateCase } from "./cases/StateCase";
import { CARDS } from "./content/moreWork";
import { DocSection, Hang } from "./layout/DocSection";

/**
 * CLO-SET 에서 한 일 열 건을 **한 섹션에** 둔다.
 *
 * 전에는 「작업」과 「맡은 일」이 최상위 섹션 두 개였는데, 둘 다 같은 회사·같은 기간이라
 * 이름으로는 갈리지 않았다. 실제로 가른 것은 얼마나 길게 썼느냐 하나뿐이었다.
 *
 * 실측한 선례(brittanychiang.com v4 `src/components/sections/*.js`)도 깊이를 섹션 이름이 아니라
 * **형식**으로 가른다 — Featured 큰 카드 / Other 작은 카드 / Archive 표. 회사 일을 두 섹션으로
 * 쪼갠 사례는 찾지 못했다. 그래서 이름을 새로 짓는 대신 축을 없앴다.
 *
 * 01–10 번호가 그 축을 대신 진다. 순서가 곧 위계고, 앞 다섯만 도판과 함께 길게 편다.
 */
export function SkillSection() {
  return (
    <DocSection id="skill" title="주요 작업" meta="CLO-SET · 10건 · 2022–2026">
      <LoadingCase />
      <ListRenderingCase />
      <StateCase />
      <ShowroomCase />
      <DeployCase />

      {/* 06–10. 카드 격자가 아니다 — 훑는 목록이라 번호와 분류만 왼쪽에 매달고 한 줄씩 흐른다.
          예전 `#more` 앵커로 들어오던 링크가 여기 착지하도록 id 는 그대로 둔다. */}
      <Hang className="mt-18 max-page:mt-14">
        <p className="text-t2 font-normal text-mute" id="more">
          06–10은 항목마다 두세 줄로 적었습니다.
        </p>
      </Hang>
      <ul className="mt-5 list-none border-t border-rule">
        {CARDS.map((c, i) => (
          <li className="border-b border-rule py-7 print:break-inside-avoid" key={c.title}>
            <Hang
              label={
                <>
                  <span className="block font-mono text-t2 font-medium tracking-[0.08em] text-mark">
                    {String(i + 6).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-t1">{c.tag}</span>
                </>
              }
            >
              <h3 className="text-t4 font-semibold text-balance leading-[1.4] tracking-[-0.025em]">
                {c.title}
              </h3>
              <p className="mt-2.5 text-t3 font-normal text-pretty leading-[1.75] text-ink-2">
                {c.body}
              </p>
            </Hang>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
