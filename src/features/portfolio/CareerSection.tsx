import { JOBS } from "./content/jobs";
import { DocSection } from "./layout/DocSection";

export function CareerSection() {
  return (
    <DocSection id="career" title="경력" meta="3곳 · 2019–2026">
      {JOBS.map((job) => (
        <div className="job" key={job.company}>
          <p className="when">{job.when}</p>
          <h3>{job.company}</h3>
          <p className="role">{job.role}</p>
          <p className="jlead">{job.lead}</p>
          {job.bullets.length > 0 ? (
            <ul>
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          <ul className="stack">
            {job.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ))}
    </DocSection>
  );
}
