import { Link } from "react-router-dom";
import { Cover } from "./components/Cover";
import { CARDS } from "./content/moreWork";
import { FEATURED, MORE, type Project } from "./content/projects";

const wrap = "mx-auto w-[min(1120px,100%-48px)] max-page:w-[min(1120px,100%-32px)]";

function SectionHead({ id, title, meta }: { id: string; title: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-ink pb-3">
      <h2 id={id} className="text-t6 font-bold leading-[1.2] tracking-[-0.04em] max-page:text-t5">
        {title}
      </h2>
      {meta ? <p className="text-t2 text-mute">{meta}</p> : null}
    </div>
  );
}

/**
 * 대표 작업 한 건. 캡처가 지면의 절반 넘게 차지한다 — 이력서가 줄글로 이미 말한 것을
 * 여기서 또 줄글로 말하면 포트폴리오가 할 일이 없다. 화면이 먼저 보이고 글은 그 옆에 붙는다.
 * 짝수 번째는 좌우를 뒤집어 세 건이 한 줄로 늘어선 목록처럼 보이지 않게 한다.
 */
function Featured({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article className="grid grid-cols-12 items-center gap-x-10 gap-y-6 max-page:grid-cols-1">
      <Link
        aria-label={`${p.title} 케이스 읽기`}
        className={`group col-span-7 block overflow-hidden rounded-sm border border-rule max-page:col-span-1 ${
          flip ? "order-2 max-page:order-none" : ""
        }`}
        to={`/work/${p.slug}`}
      >
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Cover cover={p.cover} eager={i === 0} />
        </div>
      </Link>
      <div className="col-span-5 min-w-0 max-page:col-span-1">
        <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-t1 tracking-[0.06em] text-mute">
          <span className="text-mark">{String(i + 1).padStart(2, "0")}</span>
          <span>{p.when}</span>
        </p>
        <h3 className="mt-3 text-t6 font-bold text-balance leading-[1.25] tracking-[-0.04em] max-page:text-t5">
          <Link className="no-underline hover:text-mark" to={`/work/${p.slug}`}>
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 text-t2 font-semibold text-mark">{p.role}</p>
        <p className="mt-4 text-t4 font-medium text-pretty leading-[1.5] tracking-[-0.02em] text-ink">
          {p.result}
        </p>
        <p className="mt-3 text-t3 text-pretty leading-[1.75] text-ink-2">{p.summary}</p>
        <Link
          className="mt-6 inline-block border-b-2 border-mark-line pb-0.5 text-t3 font-semibold text-ink no-underline hover:border-mark hover:text-mark"
          to={`/work/${p.slug}`}
        >
          문제와 해결 보기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function MoreCard({ p }: { p: Project }) {
  return (
    <Link className="group flex min-w-0 flex-col no-underline" to={`/work/${p.slug}`}>
      <div className="overflow-hidden rounded-sm border border-rule">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Cover cover={p.cover} zoom />
        </div>
      </div>
      <p className="mt-4 font-mono text-t1 tracking-[0.06em] text-mute">{p.when}</p>
      <h3 className="mt-1.5 text-t4 font-semibold tracking-[-0.025em] group-hover:text-mark">
        {p.title}
      </h3>
      <p className="mt-1 text-t2 font-semibold text-mark">{p.role}</p>
      <p className="mt-2 text-t3 text-pretty leading-[1.7] text-ink-2">{p.result}</p>
    </Link>
  );
}

/* 케이스 페이지로 펼친 두 건(모노레포, 요금제)은 빼고 나머지만 짧은 목록으로 남긴다. */
const NOTES = CARDS.filter((c) => c.title !== "1차 리뉴얼 모노레포 구성" && c.tag !== "요금 정책");

export function WorkSection() {
  return (
    <>
      <section aria-labelledby="work-title" className={`${wrap} pt-24 max-page:pt-16`} id="work">
        <SectionHead id="work-title" meta="CLO-SET · 2022–2026" title="대표 작업" />
        <div className="mt-14 grid gap-24 max-page:mt-10 max-page:gap-16">
          {FEATURED.map((p, i) => (
            <Featured i={i} key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="more-title" className={`${wrap} pt-28 max-page:pt-20`} id="more">
        <SectionHead id="more-title" title="다른 작업" />
        <div className="mt-10 grid grid-cols-3 gap-x-8 gap-y-12 max-page:grid-cols-1">
          {MORE.map((p) => (
            <MoreCard key={p.slug} p={p} />
          ))}
        </div>

        <ul className="mt-16 list-none border-t border-rule">
          {NOTES.map((c) => (
            <li
              className="grid grid-cols-[160px_minmax(0,1fr)] gap-x-10 border-b border-rule py-6 max-page:grid-cols-1 max-page:gap-y-1"
              key={c.title}
            >
              <p className="text-t2 text-mute">{c.tag}</p>
              <div className="min-w-0">
                <h3 className="text-t4 font-semibold tracking-[-0.025em]">{c.title}</h3>
                <p className="mt-2 max-w-[68ch] text-t3 text-pretty leading-[1.75] text-ink-2">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
