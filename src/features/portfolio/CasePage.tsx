import type { ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import { DeployCase } from "./cases/DeployCase";
import { ListRenderingCase } from "./cases/ListRenderingCase";
import { LoadingCase } from "./cases/LoadingCase";
import { PricingCase } from "./cases/PricingCase";
import { ShowroomCase } from "./cases/ShowroomCase";
import { StateCase } from "./cases/StateCase";
import { Cover } from "./components/Cover";
import { PROJECTS } from "./content/projects";
import { BareItem } from "./layout/Item";

const BODIES: Record<string, ComponentType> = {
  showroom: ShowroomCase,
  "list-rendering": ListRenderingCase,
  loading: LoadingCase,
  pricing: PricingCase,
  deploy: DeployCase,
  renewal: StateCase,
};

/**
 * 케이스 한 편. 머리(제목·역할·기간·스택) → 대표 이미지 → 내 몫과 범위 밖 → 본문 순이다.
 *
 * 「내 몫」 칸을 본문보다 먼저 둔다. 읽는 사람이 가장 먼저 확인하는 것이 "이 중 무엇을
 * 이 사람이 했나"이고, 같은 서비스의 작업을 다른 사람도 자기 포트폴리오에 올린다.
 */
export function CasePage() {
  const { slug = "" } = useParams();
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[i];
  const Body = BODIES[slug];
  if (!p || !Body) return null;
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <main className="pb-32" id="main">
      <header className="mx-auto w-[min(1120px,100%-48px)] pt-14 max-page:w-[min(1120px,100%-32px)] max-page:pt-8">
        <Link className="text-t2 text-mute no-underline hover:text-mark" to="/#work">
          <span aria-hidden="true">←</span> 작업 목록
        </Link>
        <p className="mt-10 font-mono text-t1 tracking-[0.06em] text-mute">CLO-SET · {p.when}</p>
        <h1 className="mt-3 max-w-[20ch] text-t7 font-bold text-balance leading-[1.12] tracking-[-0.045em]">
          {p.title}
        </h1>
        <p className="mt-5 max-w-[46ch] text-t4 font-medium text-pretty leading-[1.55] tracking-[-0.02em] text-ink-2">
          {p.result}
        </p>
        <dl className="mt-10 grid grid-cols-3 border-t border-ink max-page:grid-cols-1">
          {[
            ["역할", p.role],
            ["기간", p.when],
            ["스택", p.stack.join(", ")],
          ].map(([k, v]) => (
            <div
              className="border-r border-rule py-4 pr-5 not-first:pl-5 last:border-r-0 max-page:border-r-0 max-page:border-b max-page:not-first:pl-0"
              key={k}
            >
              <dt className="text-t1 text-mute">{k}</dt>
              <dd className="mt-1.5 text-t3 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        {/* 도판 표지는 본문에 같은 그림이 다시 나오므로 머리에는 캡처만 올린다. */}
        {p.cover.kind === "shot" ? (
          <div className="mt-10 overflow-hidden rounded-sm border border-rule">
            <Cover cover={p.cover} eager />
          </div>
        ) : null}
      </header>

      <div className="mx-auto mt-16 grid w-[min(1120px,100%-48px)] grid-cols-12 gap-x-10 max-page:w-[min(1120px,100%-32px)] max-page:grid-cols-1 max-page:mt-12">
        <aside className="col-span-4 max-page:col-span-1 max-page:mb-12">
          <div className="sticky top-[calc(var(--header-h)+84px)]">
            <h2 className="text-t2 font-semibold text-mark">제가 한 일</h2>
            <ul className="mt-3 list-none">
              {p.mine.map((m) => (
                <li
                  className="relative mt-2 pl-4 text-t3 text-pretty leading-[1.65] text-ink before:absolute before:top-[0.8em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-mark before:content-['']"
                  key={m}
                >
                  {m}
                </li>
              ))}
            </ul>
            {p.notMine ? (
              <>
                <h2 className="mt-8 text-t2 font-semibold text-mute">제 몫이 아닌 것</h2>
                <ul className="mt-3 list-none">
                  {p.notMine.map((m) => (
                    <li
                      className="relative mt-2 pl-4 text-t3 text-pretty leading-[1.65] text-mute before:absolute before:top-[0.8em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:border before:border-rule-3 before:content-['']"
                      key={m}
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </aside>
        {/* 사례 컴포넌트는 원래 홈 지면의 매달린 레이블 칼럼을 전제로 도판을 왼쪽으로 당긴다.
            여기서는 그 칼럼이 없으므로 당김을 푼다. */}
        <article className="col-span-8 min-w-0 max-page:col-span-1 [&_figure]:ml-0">
          <BareItem value={true}>
            <Body />
          </BareItem>
        </article>
      </div>

      <nav
        aria-label="다음 작업"
        className="mx-auto mt-28 w-[min(1120px,100%-48px)] border-t border-ink pt-6 max-page:w-[min(1120px,100%-32px)]"
      >
        <Link className="group block no-underline" to={`/work/${next.slug}`}>
          <span className="text-t2 text-mute">다음 작업</span>
          <span className="mt-1 block text-t6 font-bold tracking-[-0.04em] group-hover:text-mark max-page:text-t5">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </nav>
    </main>
  );
}
