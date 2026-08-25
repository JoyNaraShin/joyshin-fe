import { MAIL } from "@/components/SiteHeader";
import { DocSection } from "./Section";

const LINKS = [
  { href: "https://github.com/JoyNaraShin", label: "GitHub", desc: "github.com/JoyNaraShin" },
  {
    href: "https://www.linkedin.com/in/joynarashin/",
    label: "LinkedIn",
    desc: "linkedin.com/in/joynarashin",
  },
  {
    href: "https://joyshin-proto-lab.vercel.app/",
    label: "프로토타입 모음",
    desc: "직접 만든 웹앱 프로토타입을 한 곳에 모아 배포해 둔 자리입니다.",
  },
];

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
            <a href={l.href}>
              {l.label} <span aria-hidden="true">↗</span>
            </a>
            <span className="cdesc">{l.desc}</span>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
