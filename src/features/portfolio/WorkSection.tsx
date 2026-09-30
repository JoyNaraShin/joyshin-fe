import { Link } from "react-router-dom";
import { CARDS } from "./content/moreWork";
import { PROJECTS } from "./content/projects";
import { DocSection } from "./layout/DocSection";

/** 글 목록처럼 둔다. 제목, 기간과 역할, 결과 한 줄. */
export function WorkSection() {
  return (
    <DocSection id="work" meta="CLO-SET 2022 – 2026" title="작업">
      <ul className="mt-6 list-none">
        {PROJECTS.map((p) => (
          <li className="border-t border-rule py-5 first:border-t-0 first:pt-2" key={p.slug}>
            <Link className="group block no-underline" to={`/work/${p.slug}`}>
              <h3 className="text-t4 font-semibold tracking-[-0.02em] text-ink group-hover:text-mark group-hover:underline group-hover:underline-offset-4">
                {p.title}
              </h3>
              <p className="mt-1 text-t2 text-mute">
                {p.when} · {p.role}
              </p>
              <p className="mt-2 text-t3 text-pretty leading-[1.7] text-ink-2">{p.result}</p>
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 text-t3 font-semibold text-ink">그 밖의 작업</h3>
      <ul className="mt-3 list-none">
        {CARDS.map((c) => (
          <li className="border-t border-rule py-4 first:border-t-0" key={c.title}>
            <p className="text-t3 font-medium text-ink">{c.title}</p>
            <p className="mt-1 text-t3 text-pretty leading-[1.7] text-ink-3">{c.body}</p>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
