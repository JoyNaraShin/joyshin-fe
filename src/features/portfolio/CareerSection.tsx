import { JOBS } from "./content/jobs";
import { DocSection, Hang } from "./layout/DocSection";

export function CareerSection() {
  return (
    <DocSection id="career" title="경력" meta="3곳 · 2019–2026">
      {/* ul 에 border-t 를 두면 섹션 머리의 border-b 와 겹쳐 줄이 두 개로 보인다.
          첫 항목 위 경계는 섹션 머리가 이미 긋는다. */}
      <ul className="mt-12 list-none">
        {JOBS.map((job) => (
          <li className="border-b border-rule py-8 print:break-inside-avoid" key={job.company}>
            <Hang label={<span className="font-mono text-t1 tracking-[0.06em]">{job.when}</span>}>
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
              <p className="mt-5 font-mono text-t1 leading-[2] tracking-[0.04em] text-mute">
                {job.stack.join("  ·  ")}
              </p>
            </Hang>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
