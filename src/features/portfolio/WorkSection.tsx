import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { Cover } from "./components/Cover";
import { CARDS } from "./content/moreWork";
import { PROJECTS, type Project } from "./content/projects";
import { DeployTopology } from "./figures/DeployTopology";
import { StateBoundary } from "./figures/StateBoundary";

const wrap = "mx-auto w-[min(1200px,100%-48px)] max-page:w-[min(1200px,100%-32px)]";
const FIGURES = { state: StateBoundary, deploy: DeployTopology } as Record<string, ComponentType>;
const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug) as Project;

function Meta({ p, dark }: { p: Project; dark?: boolean }) {
  return (
    <p className={`text-t2 font-semibold ${dark ? "text-mark-bright" : "text-mark"}`}>
      {p.role}
      <span className={`ml-2 font-normal ${dark ? "text-night-mute" : "text-mute"}`}>{p.when}</span>
    </p>
  );
}

/** 캡처가 타일을 꽉 채우고, 글은 아래 그라데이션 위에 얹는다. */
function ShotTile({ p, className, big }: { p: Project; className: string; big?: boolean }) {
  return (
    <Link
      className={`group relative block overflow-hidden rounded-2xl bg-night no-underline ${className}`}
      to={`/work/${p.slug}`}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 [&_img]:h-full [&_img]:aspect-auto">
        <Cover cover={p.cover} eager={big} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 max-card:p-5">
        <Meta dark p={p} />
        <h3
          className={`mt-2 font-bold tracking-[-0.035em] text-night-ink ${big ? "text-[clamp(26px,3vw,38px)]" : "text-t5"}`}
        >
          {p.title}
        </h3>
        <p
          className={`mt-2 max-w-[52ch] text-pretty leading-[1.6] text-night-ink/85 ${big ? "text-t3" : "text-t2"}`}
        >
          {p.result}
        </p>
      </div>
    </Link>
  );
}

/** 가로로 긴 타일. 흰 배경 캡처는 글을 얹으면 읽히지 않아 글과 캡처를 좌우로 나눈다. */
function WideShotTile({ p, className }: { p: Project; className: string }) {
  return (
    <Link
      className={`group grid grid-cols-5 overflow-hidden rounded-2xl bg-night no-underline max-page:grid-cols-1 ${className}`}
      to={`/work/${p.slug}`}
    >
      <div className="col-span-2 flex flex-col justify-end p-7 max-page:order-2 max-page:col-span-1 max-card:p-5">
        <Meta dark p={p} />
        <h3 className="mt-2 text-t5 font-bold tracking-[-0.035em] text-night-ink group-hover:text-mark-bright">
          {p.title}
        </h3>
        <p className="mt-2 text-t2 text-pretty leading-[1.6] text-night-ink/85">{p.result}</p>
      </div>
      <div className="col-span-3 flex min-h-0 items-center justify-center bg-surface p-6 max-page:col-span-1 [&_img]:aspect-auto [&_img]:max-h-[272px] [&_img]:w-auto [&_img]:max-w-full [&_img]:px-0">
        <Cover cover={p.cover} />
      </div>
    </Link>
  );
}

/** 계측 작업. 수치가 곧 표지다. */
function MetricTile({ p, className }: { p: Project; className: string }) {
  return (
    <Link
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl bg-night p-7 no-underline max-card:p-5 ${className}`}
      to={`/work/${p.slug}`}
    >
      <div>
        <Meta dark p={p} />
        <h3 className="mt-2 text-t5 font-bold tracking-[-0.035em] text-night-ink group-hover:text-mark-bright">
          {p.title}
        </h3>
      </div>
      <dl className="mt-6 grid gap-4">
        {[
          ["LCP", "2.91s", "1.64s", "44%"],
          ["DOMContentLoaded", "2.47s", "1.33s", "46%"],
        ].map(([k, from, to, pct]) => (
          <div className="border-t border-night-line pt-3" key={k}>
            <dt className="text-t1 text-night-mute">{k}</dt>
            <dd className="mt-1 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[clamp(26px,2.6vw,34px)] leading-none font-medium text-mark-bright">
                {to}
                <span className="ml-2 text-t2 text-night-mute line-through decoration-1">
                  {from}
                </span>
              </span>
              <span className="text-t2 font-semibold text-night-ink">−{pct}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}

/** 화면이 없는 구조 작업. 도판 전체를 높이에 맞춰 줄여 두고, 휴대폰에서는 글자가 너무 작아 숨긴다. */
function FigureTile({ p, className }: { p: Project; className: string }) {
  const Figure = p.cover.kind === "figure" ? FIGURES[p.cover.figure] : null;
  return (
    <Link
      className={`group flex flex-col overflow-hidden rounded-2xl border border-rule bg-inset no-underline ${className}`}
      to={`/work/${p.slug}`}
    >
      {Figure ? (
        <div className="flex min-h-0 flex-1 items-center justify-center px-6 pt-6 max-page:hidden">
          <div className="w-full max-w-[470px]">
            <Figure />
          </div>
        </div>
      ) : null}
      <div className="p-7 pt-4 max-card:p-5">
        <Meta p={p} />
        <h3 className="mt-2 text-t5 font-bold tracking-[-0.035em] text-ink group-hover:text-mark">
          {p.title}
        </h3>
        <p className="mt-2 max-w-[52ch] text-t2 text-pretty leading-[1.6] text-ink-3">{p.result}</p>
      </div>
    </Link>
  );
}

/**
 * 작업 격자. 크기로 위계를 준다 — 가장 오래, 혼자 맡은 쇼룸이 가장 크고,
 * 수치가 있는 로딩은 수치로, 화면이 없는 구조 작업은 도식으로 표지를 삼는다.
 */
export function WorkSection() {
  return (
    <section aria-labelledby="work-title" className={`${wrap} pt-24 max-page:pt-16`} id="work">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-title" className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.045em]">
          작업
        </h2>
        <p className="text-t2 text-mute">
          CLO-SET · 2022–2026 · 카드를 누르면 문제와 해결을 볼 수 있습니다
        </p>
      </div>

      <div className="mt-8 grid auto-rows-[320px] grid-cols-6 gap-5 max-page:auto-rows-auto max-page:grid-cols-1">
        <ShotTile
          big
          className="col-span-4 row-span-2 max-page:col-span-1 max-page:aspect-[4/5]"
          p={bySlug("showroom")}
        />
        <MetricTile className="col-span-2 max-page:col-span-1" p={bySlug("loading")} />
        <ShotTile
          className="col-span-2 max-page:col-span-1 max-page:aspect-[4/3]"
          p={bySlug("list-rendering")}
        />
        <FigureTile className="col-span-3 max-page:col-span-1" p={bySlug("renewal")} />
        <FigureTile className="col-span-3 max-page:col-span-1" p={bySlug("deploy")} />
        <WideShotTile className="col-span-6 max-page:col-span-1" p={bySlug("pricing")} />
      </div>

      <h3 className="mt-20 text-t5 font-bold tracking-[-0.035em]">그 밖의 작업</h3>
      <ul className="mt-5 grid list-none grid-cols-3 gap-5 max-page:grid-cols-1">
        {CARDS.map((c) => (
          <li
            className="flex flex-col overflow-hidden rounded-2xl border border-rule"
            key={c.title}
          >
            {"image" in c && c.image ? (
              <img
                alt={c.image.alt}
                className="block aspect-[16/9] w-full border-b border-rule object-cover object-top"
                decoding="async"
                height={c.image.height}
                loading="lazy"
                src={`${import.meta.env.BASE_URL}work/${c.image.src}`}
                width={c.image.width}
              />
            ) : null}
            <div className="p-6">
              <p className="text-t2 font-semibold text-mark">{c.tag}</p>
              <h4 className="mt-1.5 text-t4 font-semibold tracking-[-0.025em]">{c.title}</h4>
              <p className="mt-2 text-t2 text-pretty leading-[1.7] text-ink-3">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
