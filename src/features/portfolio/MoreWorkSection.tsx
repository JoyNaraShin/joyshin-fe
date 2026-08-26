import { CARDS } from "./content/moreWork";
import { DocSection } from "./layout/DocSection";

export function MoreWorkSection() {
  return (
    <DocSection id="more" title="그 외 맡은 것" meta="CLO-SET · 6건 · 2022–2026">
      <ul className="wcards">
        {CARDS.map((c) => (
          <li className="wcard" key={c.title}>
            <p className="wtag">{c.tag}</p>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
