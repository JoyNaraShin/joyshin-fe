import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Cover } from "./components/Cover";
import { Metrics } from "./components/Metrics";
import { CARDS } from "./content/moreWork";
import { PROJECTS, type Project } from "./content/projects";

const wrap = "mx-auto w-[min(1200px,100%-48px)] max-page:w-[min(1200px,100%-32px)]";
const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug) as Project;

function Visual({ p }: { p: Project }) {
  if (p.cover.kind === "metric") return <Metrics />;
  if (p.cover.kind === "shot") {
    return (
      <img
        alt={p.cover.alt}
        className={`block h-full w-full rounded-lg shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] ${
          p.cover.fit === "contain"
            ? "bg-surface object-contain p-[4%]"
            : "object-cover object-[left_top]"
        }`}
        decoding="async"
        height={1000}
        loading="lazy"
        src={p.cover.src}
        width={1600}
      />
    );
  }
  return (
    <div className="w-full overflow-hidden rounded-lg bg-surface shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)] [&>div]:bg-surface">
      <Cover cover={p.cover} />
    </div>
  );
}

/**
 * 작업 카드. 위는 색 판 위에 앉힌 화면, 아래는 역할과 제목, 결과 한 줄.
 * 판 색은 짙은 청록과 모래색 두 가지만 번갈아 쓴다.
 */
function Card({
  p,
  wide,
  tone = "sand",
  shot,
}: {
  p: Project;
  wide?: boolean;
  tone?: "deep" | "sand";
  shot?: ReactNode;
}) {
  return (
    <Link
      className={`group block no-underline ${wide ? "col-span-2 max-page:col-span-1" : ""}`}
      to={`/work/${p.slug}`}
    >
      <div
        className={`flex items-center justify-center overflow-hidden rounded-[24px] p-[clamp(20px,4.5%,48px)] ${
          wide ? "aspect-[21/9] max-page:aspect-[4/3]" : "aspect-[4/3]"
        } ${tone === "deep" ? "bg-deep" : "bg-sand-2"}`}
      >
        <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          {shot ?? <Visual p={p} />}
        </div>
      </div>
      <div className="mt-5 px-1">
        <p className="text-t2 text-mute">
          <span className="font-semibold text-deep">{p.role}</span>
          <span className="mx-2 text-rule-3">/</span>
          {p.when}
        </p>
        <h3
          className={`mt-1.5 font-bold tracking-[-0.04em] text-ink group-hover:text-deep ${
            wide ? "text-[clamp(26px,2.8vw,36px)]" : "text-[clamp(22px,2vw,27px)]"
          }`}
        >
          {p.title}
        </h3>
        <p className="mt-2 max-w-[60ch] text-t3 text-pretty leading-[1.65] text-ink-3">
          {p.result}
        </p>
      </div>
    </Link>
  );
}

export function WorkSection() {
  const editor = (
    <img
      alt="공간 목록과 360° 매장 공간이 보이는 쇼룸 편집 페이지"
      className="block h-full w-full rounded-lg object-cover object-top shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)]"
      decoding="async"
      height={902}
      loading="lazy"
      src={`${import.meta.env.BASE_URL}work/showroom-editor.webp`}
      width={1600}
    />
  );
  return (
    <section aria-labelledby="work-title" className={`${wrap} pt-28 max-page:pt-20`} id="work">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-5">
        <h2
          className="text-[clamp(32px,3.6vw,48px)] font-bold tracking-[-0.05em] text-ink"
          id="work-title"
        >
          작업
        </h2>
        <p className="text-t2 text-mute">CLO-SET 2022 – 2026</p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-16 max-page:grid-cols-1 max-page:gap-y-12">
        <Card p={bySlug("showroom")} shot={editor} tone="deep" wide />
        <Card p={bySlug("loading")} />
        <Card p={bySlug("list-rendering")} />
        <Card p={bySlug("renewal")} />
        <Card p={bySlug("deploy")} />
        <Card p={bySlug("pricing")} wide />
      </div>

      <h3 className="mt-28 text-[clamp(22px,2vw,27px)] font-bold tracking-[-0.04em] text-ink">
        그 밖의 작업
      </h3>
      <ul className="mt-6 grid list-none grid-cols-3 items-start gap-6 max-page:grid-cols-1">
        {CARDS.map((c) => (
          <li className="flex flex-col overflow-hidden rounded-[20px] bg-surface" key={c.title}>
            {"image" in c && c.image ? (
              <img
                alt={c.image.alt}
                className="block aspect-[16/9] w-full object-cover object-top"
                decoding="async"
                height={c.image.height}
                loading="lazy"
                src={`${import.meta.env.BASE_URL}work/${c.image.src}`}
                width={c.image.width}
              />
            ) : null}
            <div className="p-6">
              <p className="text-t2 font-semibold text-deep">{c.tag}</p>
              <h4 className="mt-1.5 text-t4 font-bold tracking-[-0.03em] text-ink">{c.title}</h4>
              <p className="mt-2 text-t2 text-pretty leading-[1.75] text-ink-3">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
