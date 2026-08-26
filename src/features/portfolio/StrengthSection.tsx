import { CARDS } from "./content/strengths";
import { DocSection } from "./layout/DocSection";

/** 강점 — 요약 층. 주장 한 줄과 근거 한 줄만 두고, 자세한 것은 아래 사례가 진다. */
export function StrengthSection() {
  return (
    <DocSection id="strength" title="강점" meta="네 가지로 정리했습니다">
      <ul className="scards">
        {CARDS.map((c) => (
          <li className="scard" key={c.label}>
            <p className="slabel">{c.label}</p>
            <p className="sclaim">{c.claim}</p>
            <p className="sproof">{c.proof}</p>
            <a className="sto" href={c.to}>
              {c.cta} <span aria-hidden="true">↓</span>
            </a>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
