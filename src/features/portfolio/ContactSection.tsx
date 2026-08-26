import { LINKS, MAIL } from "@/content/profile";
import { DocSection } from "./layout/DocSection";

export function ContactSection() {
  return (
    <DocSection id="contact" title="연락처">
      <p className="clead">
        위 내용에서 더 듣고 싶은 부분이 있으시면 연락 주세요. 확인하는 대로 답장드리겠습니다.
      </p>
      <a className="mail" href={`mailto:${MAIL}`}>
        {MAIL}
      </a>
      <ul className="clinks">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (새 탭에서 열림)</span>
            </a>
            <span className="cdesc">{l.desc}</span>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
