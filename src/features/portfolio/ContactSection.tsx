import { LINKS, MAIL } from "./content/profile";
import { DocSection, Hang } from "./layout/DocSection";

export function ContactSection() {
  return (
    <DocSection id="contact" title="연락처">
      <Hang>
        <a
          className="mt-[22px] inline-block border-b-2 border-mark-line pb-1 font-mono text-[clamp(20px,3.2vw,32px)] tracking-[-0.02em] text-ink no-underline hover:border-mark hover:text-mark focus-visible:border-mark focus-visible:text-mark active:border-mark-deep active:text-mark-deep"
          href={`mailto:${MAIL}`}
        >
          {MAIL}
        </a>
        <ul className="mt-[38px] list-none border-t border-rule">
          {LINKS.map((l) => (
            <li className="border-b border-rule py-4" key={l.href}>
              <a
                className="border-b border-mark-line pb-0.5 text-t3 font-medium text-ink no-underline hover:border-mark hover:text-mark focus-visible:border-mark focus-visible:text-mark active:border-mark-deep active:text-mark-deep"
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                {l.label} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (새 탭에서 열림)</span>
              </a>
              <span className="mt-[7px] block text-[13px] font-normal text-mute">{l.desc}</span>
            </li>
          ))}
        </ul>
      </Hang>
    </DocSection>
  );
}
