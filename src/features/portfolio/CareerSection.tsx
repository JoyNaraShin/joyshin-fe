import { Link } from "react-router-dom";
import { EDUCATION, SKILLS } from "./content/education";
import { JOBS } from "./content/jobs";
import { PROJECTS } from "./content/projects";
import { COLUMN, Hang } from "./layout/DocSection";

export function CareerSection() {
  return (
    <main className={`${COLUMN} pt-16 max-page:pt-10`} id="main">
      <h1 className="text-t6 font-bold tracking-[-0.04em]">경력</h1>
      <p className="mt-2 text-t3 text-mute">총 6년 11개월 · 3곳</p>
      <ul className="mt-10 list-none">
        {JOBS.map((job) => (
          <li
            className="border-t border-rule py-6 first:border-t-0 print:break-inside-avoid"
            key={job.company}
          >
            <Hang
              label={
                <span className="tabular-nums">
                  {job.when}
                  <span className="mt-0.5 block text-ink-3">{job.span}</span>
                </span>
              }
            >
              <h3 className="text-t4 font-semibold tracking-[-0.025em]">{job.company}</h3>
              <p className="mt-1 text-t3 font-normal text-mute">{job.role}</p>
              <p className="mt-4 text-t3 font-normal text-pretty leading-[1.75] text-ink-2">
                {job.lead}
              </p>
              {job.projects ? (
                <>
                  <h4 className="mt-6 text-t2 font-semibold text-ink-3">주요 작업</h4>
                  <ul className="mt-2 list-none border-t border-rule">
                    {job.projects.map((slug) => {
                      const p = PROJECTS.find((x) => x.slug === slug);
                      if (!p) return null;
                      return (
                        <li className="border-b border-rule" key={slug}>
                          <Link
                            className="group flex items-baseline justify-between gap-4 py-3 no-underline max-card:flex-col max-card:gap-0.5"
                            to={`/work/${slug}`}
                          >
                            <span className="text-t3 font-medium text-ink group-hover:text-mark group-hover:underline group-hover:underline-offset-4">
                              {p.title} <span aria-hidden="true">→</span>
                            </span>
                            <span className="shrink-0 text-t2 text-mute tabular-nums">
                              {p.when}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <h4 className="mt-6 text-t2 font-semibold text-ink-3">그 밖의 작업</h4>
                </>
              ) : null}
              {job.bullets.length > 0 ? (
                <ul className="mt-3 list-none">
                  {job.bullets.map((b) => (
                    <li
                      className="relative mt-2 pl-5 text-t3 font-normal text-pretty leading-[1.75] text-ink-3 before:absolute before:top-[0.88em] before:left-0 before:h-px before:w-2.5 before:bg-rule-3 before:content-['']"
                      key={b}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
              {/* 스택은 읽는 것이 아니라 훑는 것이라 한 줄로 흘린다 */}
              <p className="mt-4 text-t2 leading-[1.8] text-mute">{job.stack.join(", ")}</p>
            </Hang>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-t5 font-bold tracking-[-0.03em]">기술</h2>
      <ul className="mt-4 list-none border-t border-rule">
        {SKILLS.map((k) => (
          <li className="border-b border-rule py-3" key={k.label}>
            <Hang label={k.label}>
              <p className="text-t3 leading-[1.7] text-ink-2">{k.items}</p>
            </Hang>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-t5 font-bold tracking-[-0.03em]">학력과 교육</h2>
      <ul className="mt-4 list-none border-t border-rule">
        {EDUCATION.map((e) => (
          <li className="border-b border-rule py-3" key={e.text}>
            <Hang label={<span className="tabular-nums">{e.when}</span>}>
              <p className="text-t3 leading-[1.7] text-ink-2">{e.text}</p>
            </Hang>
          </li>
        ))}
      </ul>
    </main>
  );
}
