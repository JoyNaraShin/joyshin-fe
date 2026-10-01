import { type ComponentType, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DeployCase } from "./cases/DeployCase";
import { ListRenderingCase } from "./cases/ListRenderingCase";
import { LoadingCase } from "./cases/LoadingCase";
import { PricingCase } from "./cases/PricingCase";
import { ShowroomCase } from "./cases/ShowroomCase";
import { StateCase } from "./cases/StateCase";
import { PROJECTS } from "./content/projects";
import { DeployTopology, deployTopologyFallback } from "./figures/DeployTopology";
import { StateBoundary, stateBoundaryFallback } from "./figures/StateBoundary";
import { COLUMN } from "./layout/DocSection";
import { BareItem } from "./layout/Item";

const BODIES: Record<string, ComponentType> = {
  showroom: ShowroomCase,
  "list-rendering": ListRenderingCase,
  loading: LoadingCase,
  pricing: PricingCase,
  deploy: DeployCase,
  renewal: StateCase,
};

/* 도식은 좁은 폭에서 글자가 너무 작아져 숨기고, 같은 내용을 문단으로 대신 보여 준다 */
const HEAD_FIGURES: Record<string, { Figure: ComponentType; fallback: string }> = {
  state: { Figure: StateBoundary, fallback: stateBoundaryFallback },
  deploy: { Figure: DeployTopology, fallback: deployTopologyFallback },
};

/** 작업 한 편을 블로그 글처럼 읽히게 둔다. 제목, 요약, 메타 한 줄, 대표 그림, 본문. */
export function CasePage() {
  const { slug = "" } = useParams();
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[i];
  const Body = BODIES[slug];
  /*
   * 작업 글은 항상 맨 위에서 시작한다. 스크롤 복원이나 html 의 smooth scroll 이 끼어들면
   * 글을 열 때 화면이 미끄러지듯 움직여 거슬린다. 페인트 전에 즉시 맨 위로 보낸다.
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: 같은 컴포넌트로 다음 글로 넘어갈 때도 slug 가 바뀌면 다시 맨 위로 보낸다
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    if (p) document.title = `${p.title} — 신나라`;
    return () => {
      document.title = "신나라 JoyNara — 프론트엔드 개발자";
    };
  }, [p]);
  if (!p || !Body) return null;
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const HeadFigure = p.cover.kind === "figure" ? HEAD_FIGURES[p.cover.figure] : undefined;

  return (
    <main className={`${COLUMN} pt-12 pb-10`} id="main" tabIndex={-1}>
      <Link className="text-t2 text-mute no-underline hover:text-mark" to="/work">
        <span aria-hidden="true">←</span> 작업 목록
      </Link>

      <article className="mt-10">
        <p className="text-t2 text-mute tabular-nums">CLO-SET · {p.when}</p>
        <h1 className="mt-2 text-t6 font-bold text-balance leading-[1.25] tracking-[-0.04em]">
          {p.title}
        </h1>
        <p className="mt-4 text-t4 text-pretty leading-[1.6] text-ink-2">{p.result}</p>
        <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-t2">
          <dt className="text-mute">역할</dt>
          <dd className="text-ink-2">{p.role}</dd>
          <dt className="text-mute">스택</dt>
          <dd className="text-ink-2">{p.stack.join(", ")}</dd>
        </dl>

        {p.cover.kind === "shot" ? (
          <figure className="mt-8">
            <img
              alt={p.cover.alt}
              className="block h-auto w-full rounded-md border border-rule"
              height={1000}
              src={p.cover.src}
              width={1600}
            />
            <figcaption className="mt-2 text-t2 text-mute">출처 CLO-SET 헬프센터</figcaption>
          </figure>
        ) : HeadFigure ? (
          <figure className="mt-8">
            <div className="rounded-md border border-rule p-5 max-fig:hidden">
              <HeadFigure.Figure />
            </div>
            <p className="hidden rounded-md bg-inset px-4 py-3 text-t2 leading-[1.7] text-ink-2 max-fig:block">
              {HeadFigure.fallback}
            </p>
          </figure>
        ) : p.cover.kind === "metric" ? (
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule max-card:grid-cols-1">
            {p.cover.items.map((m) => (
              <div className="bg-paper px-5 py-4" key={m.label}>
                <dt className="text-t2 text-mute">{m.label}</dt>
                <dd className="mt-1 text-[28px] font-bold leading-tight tracking-[-0.03em] text-mark tabular-nums">
                  {m.value}
                </dd>
                <dd className="mt-1 text-t2 text-ink-2 tabular-nums">{m.detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-4 [&_figure]:ml-0">
          <BareItem value={true}>
            <Body />
          </BareItem>
        </div>
      </article>

      <nav aria-label="다음 작업" className="mt-16 border-t border-rule pt-6">
        <Link className="group no-underline" to={`/work/${next.slug}`}>
          <span className="text-t2 text-mute">다음 글</span>
          <span className="mt-1 block text-t4 font-semibold group-hover:text-mark group-hover:underline group-hover:underline-offset-4">
            {next.title} →
          </span>
        </Link>
      </nav>
    </main>
  );
}
