import { type ComponentType, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DeployCase } from "./cases/DeployCase";
import { ListRenderingCase } from "./cases/ListRenderingCase";
import { LoadingCase } from "./cases/LoadingCase";
import { PricingCase } from "./cases/PricingCase";
import { ShowroomCase } from "./cases/ShowroomCase";
import { StateCase } from "./cases/StateCase";
import { Cover } from "./components/Cover";
import { Metrics } from "./components/Metrics";
import { PROJECTS } from "./content/projects";
import { DeployTopology } from "./figures/DeployTopology";
import { StateBoundary } from "./figures/StateBoundary";
import { BareItem } from "./layout/Item";

const HEAD_FIGURES: Record<string, ComponentType> = {
  state: StateBoundary,
  deploy: DeployTopology,
};

const BODIES: Record<string, ComponentType> = {
  showroom: ShowroomCase,
  "list-rendering": ListRenderingCase,
  loading: LoadingCase,
  pricing: PricingCase,
  deploy: DeployCase,
  renewal: StateCase,
};

/**
 * 케이스 한 편. 머리(제목, 결과 한 줄) → 대표 캡처 → 본문이고, 옆 칸에 역할과 기간,
 * 스택, 맡은 일을 고정한다. 결론은 머리의 결과 한 줄 하나뿐이다.
 */
export function CasePage() {
  const { slug = "" } = useParams();
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[i];
  const Body = BODIES[slug];
  useEffect(() => {
    if (p) document.title = `${p.title} — 신나라 포트폴리오`;
    return () => {
      document.title = "신나라 — 프론트엔드 개발자";
    };
  }, [p]);
  if (!p || !Body) return null;
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <main className="pb-32" id="main">
      <header className="mx-auto w-[min(1200px,100%-48px)] pt-14 max-page:w-[min(1200px,100%-32px)] max-page:pt-8">
        <Link className="text-t2 text-mute no-underline hover:text-mark" to="/#work">
          <span aria-hidden="true">←</span> 작업 목록
        </Link>
        <p className="mt-10 text-t2 text-mute tabular-nums">CLO-SET · {p.when}</p>
        <h1 className="mt-3 max-w-[20ch] text-[clamp(36px,5.2vw,68px)] font-bold text-balance leading-[1.1] tracking-[-0.055em]">
          {p.title}
        </h1>
        <p className="mt-5 max-w-[46ch] text-t4 font-medium text-pretty leading-[1.55] tracking-[-0.02em] text-ink-2">
          {p.result}
        </p>
        {/* 머리 그림: 캡처는 청록 판에, 수치와 도식은 모래색 판에. 도식은 본문에서 반복하지 않는다. */}
        {p.cover.kind === "shot" ? (
          <figure className="mt-12 rounded-[28px] bg-deep p-[clamp(16px,4vw,48px)]">
            <div className="overflow-hidden rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]">
              <Cover cover={p.cover} eager natural />
            </div>
            <figcaption className="mt-4 text-t2 text-deep-mute">출처 CLO-SET 헬프센터</figcaption>
          </figure>
        ) : (
          <figure
            className={`mt-12 flex justify-center rounded-[28px] bg-sand-2 p-[clamp(20px,4vw,56px)] ${p.cover.kind === "figure" ? "max-page:hidden" : ""}`}
          >
            {p.cover.kind === "metric" ? (
              <Metrics />
            ) : p.cover.kind === "figure" && HEAD_FIGURES[p.cover.figure] ? (
              <div className="w-full max-w-[820px] rounded-xl bg-surface p-[clamp(16px,3vw,32px)] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)]">
                {(() => {
                  const F = HEAD_FIGURES[p.cover.figure];
                  return <F />;
                })()}
              </div>
            ) : null}
          </figure>
        )}
      </header>

      <div className="mx-auto mt-16 grid w-[min(1200px,100%-48px)] grid-cols-12 gap-x-10 max-page:w-[min(1200px,100%-32px)] max-page:grid-cols-1 max-page:mt-12">
        <aside className="col-span-4 max-page:order-2 max-page:col-span-1 max-page:mt-14">
          <div className="sticky top-[calc(var(--header-h)+32px)]">
            <dl className="border-t border-ink">
              {[
                ["역할", p.role],
                ["기간", p.when],
                ["스택", p.stack.join(", ")],
              ].map(([k, v]) => (
                <div className="border-b border-rule py-3" key={k}>
                  <dt className="text-t1 text-mute">{k}</dt>
                  <dd className="mt-1 text-t3 font-medium text-pretty">{v}</dd>
                </div>
              ))}
            </dl>
            <h2 className="mt-8 text-t2 font-semibold text-mark">맡은 일</h2>
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
          </div>
        </aside>
        {/* 사례 컴포넌트는 원래 홈 지면의 매달린 레이블 칼럼을 전제로 도판을 왼쪽으로 당긴다.
            여기서는 그 칼럼이 없으므로 당김을 푼다. */}
        <article className="col-span-8 min-w-0 max-page:order-1 max-page:col-span-1 [&_figure]:ml-0">
          <BareItem value={true}>
            <Body />
          </BareItem>
        </article>
      </div>

      <nav
        aria-label="다음 작업"
        className="mx-auto mt-28 w-[min(1200px,100%-48px)] border-t border-ink pt-6 max-page:w-[min(1200px,100%-32px)]"
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
