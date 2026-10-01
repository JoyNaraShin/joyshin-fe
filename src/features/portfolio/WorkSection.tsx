import { Link } from "react-router-dom";
import { CARDS } from "./content/moreWork";
import { PROJECTS } from "./content/projects";
import { COLUMN } from "./layout/DocSection";

const thumb = (key: string) => `${import.meta.env.BASE_URL}work/thumb-${key}.webp`;

function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      alt={alt}
      className="block aspect-[16/10] h-auto w-[200px] shrink-0 self-start rounded-md border border-rule object-cover max-card:w-[120px]"
      decoding="async"
      height={600}
      loading="lazy"
      src={src}
      width={960}
    />
  );
}

/** 작업 페이지. 블로그 글 목록처럼 썸네일, 제목, 기간과 역할, 결과 한 줄. */
export function WorkSection() {
  return (
    <main className={`${COLUMN} pt-16 max-page:pt-10`} id="main">
      <h1 className="text-t6 font-bold tracking-[-0.04em]">작업</h1>
      <p className="mt-2 text-t3 text-mute">CLO-SET, 2022 – 2026</p>

      <ul className="mt-10 list-none">
        {PROJECTS.map((p) => (
          <li className="border-t border-rule first:border-t-0" key={p.slug}>
            <Link
              className="group flex gap-6 py-6 no-underline max-card:gap-4"
              to={`/work/${p.slug}`}
            >
              <Thumb alt="" src={thumb(p.slug)} />
              <div className="min-w-0">
                <h2 className="text-t4 font-semibold tracking-[-0.02em] text-ink group-hover:text-mark group-hover:underline group-hover:underline-offset-4">
                  {p.title}
                </h2>
                <p className="mt-1 text-t2 text-mute">
                  {p.when} · {p.role}
                </p>
                <p className="mt-2 text-t3 text-pretty leading-[1.7] text-ink-2 max-card:text-t2">
                  {p.result}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-t5 font-bold tracking-[-0.03em]">그 밖의 작업</h2>
      <ul className="mt-4 list-none">
        {CARDS.map((c) => (
          <li
            className="flex gap-6 border-t border-rule py-6 first:border-t-0 max-card:gap-4"
            key={c.title}
          >
            <Thumb alt="" src={thumb(c.thumb)} />
            <div className="min-w-0">
              <h3 className="text-t4 font-semibold tracking-[-0.02em] text-ink">{c.title}</h3>
              <p className="mt-1 text-t2 text-mute">{c.tag}</p>
              <ul className="mt-2 list-none">
                {c.body.map((b) => (
                  <li
                    className="relative mt-1.5 pl-4 text-t3 text-pretty leading-[1.7] text-ink-2 before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-2 before:bg-rule-3 before:content-[''] max-card:text-t2"
                    key={b}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
