import { JOBS } from "./content/jobs";
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
            <Hang label={<span className="tabular-nums">{job.when}</span>}>
              <h3 className="text-t4 font-semibold tracking-[-0.025em]">{job.company}</h3>
              <p className="mt-1 text-t3 font-normal text-mute">{job.role}</p>
              <p className="mt-4 text-t3 font-normal text-pretty leading-[1.75] text-ink-2">
                {job.lead}
              </p>
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
    </main>
  );
}
