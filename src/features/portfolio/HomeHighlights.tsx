import { Link } from "react-router-dom";
import { JOBS } from "./content/jobs";
import { PROJECTS } from "./content/projects";
import { COLUMN } from "./layout/DocSection";

const BASE = import.meta.env.BASE_URL;

/** 첫 화면에서 바로 보이는 수치. 전부 작업 글에 근거가 있는 값만 둔다. */
const STATS = [
  { value: "44%", label: "워크룸 첫 화면 LCP 단축", detail: "2.91s → 1.64s", to: "/work/loading" },
  {
    value: "약 80%",
    label: "쇼룸 배경 로딩 시간 단축",
    detail: "타일 분할 로딩 전환 후, 로컬 테스트 기준",
    to: "/work/showroom",
  },
  {
    value: "수만 건",
    label: "에셋 목록 행 단위 가상화",
    detail: "공통 훅으로 CLO-SET 전체 목록 적용",
    to: "/work/list-rendering",
  },
];

const LEAD = "showroom";
const SIDE = ["list-rendering", "loading"];
const find = (slug: string) => PROJECTS.find((p) => p.slug === slug);

function SectionHead({
  id,
  title,
  to,
  more,
}: { id: string; title: string; to: string; more: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-t5 font-bold tracking-[-0.03em]" id={id}>
        {title}
      </h2>
      <Link className="text-t2 font-medium text-mark no-underline hover:underline" to={to}>
        {more} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export function HomeStats() {
  return (
    <section aria-label="주요 수치" className={`${COLUMN} mt-12`}>
      <ul className="grid list-none grid-cols-3 overflow-hidden rounded-lg bg-deep text-deep-ink max-card:grid-cols-1">
        {STATS.map((s) => (
          <li
            className="border-l border-deep-2 first:border-l-0 max-card:border-t max-card:border-l-0 max-card:first:border-t-0"
            key={s.label}
          >
            <Link className="block h-full px-5 py-5 no-underline hover:bg-deep-2" to={s.to}>
              <span className="block text-[30px] font-bold leading-none tracking-[-0.04em] text-sun tabular-nums">
                {s.value}
              </span>
              <span className="mt-3 block text-t3 font-semibold text-deep-ink">{s.label}</span>
              <span className="mt-1 block text-t2 text-deep-mute">{s.detail}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomeWork() {
  const lead = find(LEAD);
  const side = SIDE.map(find).filter((p) => p !== undefined);
  if (!lead) return null;
  return (
    <section aria-labelledby="home-work" className={`${COLUMN} pt-20 max-page:pt-16`}>
      <SectionHead
        id="home-work"
        more={`작업 ${PROJECTS.length}건 전체 보기`}
        title="대표 작업"
        to="/work"
      />

      <Link className="group mt-6 block no-underline" to={`/work/${lead.slug}`}>
        <img
          alt=""
          className="block aspect-[16/9] h-auto w-full rounded-lg border border-rule object-cover"
          decoding="async"
          height={900}
          src={`${BASE}work/showroom-editor.webp`}
          width={1600}
        />
        <p className="mt-4 text-t2 text-mute tabular-nums">
          {lead.when} · {lead.role}
        </p>
        <h3 className="mt-1 text-t5 font-bold tracking-[-0.03em] text-ink group-hover:text-mark group-hover:underline group-hover:underline-offset-4">
          {lead.title}
        </h3>
        <p className="mt-2 text-t3 text-pretty leading-[1.75] text-ink-2">{lead.summary}</p>
      </Link>

      <div className="mt-10 grid grid-cols-2 gap-6 max-card:grid-cols-1 max-card:gap-10">
        {side.map((p) => (
          <Link className="group block no-underline" key={p.slug} to={`/work/${p.slug}`}>
            <img
              alt=""
              className="block aspect-[16/10] h-auto w-full rounded-lg border border-rule object-cover"
              decoding="async"
              height={600}
              loading="lazy"
              src={`${BASE}work/thumb-${p.slug}.webp`}
              width={960}
            />
            <p className="mt-3 text-t2 text-mute tabular-nums">{p.when}</p>
            <h3 className="mt-1 text-t4 font-semibold tracking-[-0.02em] text-ink group-hover:text-mark group-hover:underline group-hover:underline-offset-4">
              {p.title}
            </h3>
            <p className="mt-1.5 text-t3 text-pretty leading-[1.7] text-ink-2">{p.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomeCareer() {
  return (
    <section aria-labelledby="home-career" className={`${COLUMN} pt-20 max-page:pt-16`}>
      <SectionHead id="home-career" more="경력 자세히 보기" title="경력" to="/career" />
      <ol className="mt-6 list-none border-t border-ink">
        {JOBS.map((j) => (
          <li
            className="grid grid-cols-[150px_minmax(0,1fr)] gap-x-6 border-b border-rule py-5 max-card:grid-cols-1 max-card:gap-y-1"
            key={j.company}
          >
            <p className="text-t2 text-mute tabular-nums">
              {j.when}
              <span className="block text-ink-3">{j.span}</span>
            </p>
            <div>
              <h3 className="text-t4 font-semibold tracking-[-0.02em]">
                {j.company} <span className="text-t2 font-normal text-mute">{j.role}</span>
              </h3>
              <p className="mt-1 text-t3 text-pretty leading-[1.7] text-ink-2">{j.lead}</p>
              {j.projects ? (
                <ul className="mt-3 flex list-none flex-wrap gap-2">
                  {j.projects.map((slug) => {
                    const p = find(slug);
                    return p ? (
                      <li key={slug}>
                        <Link
                          className="inline-block rounded-full border border-rule-2 px-3 py-1 text-t2 text-ink-2 no-underline hover:border-mark hover:text-mark"
                          to={`/work/${slug}`}
                        >
                          {p.title}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
