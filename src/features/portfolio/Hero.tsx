import { Link } from "react-router-dom";
import { LINKS, MAIL } from "./content/profile";
import { PROJECTS } from "./content/projects";
import { COLUMN } from "./layout/DocSection";

const PROJECTS_COUNT = PROJECTS.length - 2;

export function Hero() {
  return (
    <section className={`${COLUMN} pt-20 max-page:pt-12`}>
      <h1 className="text-t6 font-bold tracking-[-0.04em]">신나라</h1>
      <p className="mt-1 text-t3 text-mute">프론트엔드 개발자 · 경력 6년 11개월</p>
      <p className="mt-8 text-t3 text-pretty leading-[1.85] text-ink-2">
        대량 목록 렌더링과 복잡한 클라이언트 상태 관리에 강점이 있습니다. 글로벌 B2B 3D 협업 플랫폼{" "}
        <span className="whitespace-nowrap">CLO-SET</span>에서 수만 건 목록의 가상화, 워크룸 첫 화면
        LCP 44% 단축, MobX 중심 상태 관리를 서버 상태와 클라이언트 상태로 나누는 구조 전환을
        주도했습니다.
      </p>
      <p className="mt-4 text-t3 text-pretty leading-[1.85] text-ink-2">
        기획 회의에 참여해 PO, 디자이너에게 구현 제약을 설명하고 범위를 함께 정해 왔습니다.
        백엔드와는 응답 필드 축소를, 인프라 담당자와는 배포 구조 변경을 협의했습니다.
      </p>
      <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-t3">
        <a
          className="text-mark underline underline-offset-4 hover:text-mark-deep"
          href={`mailto:${MAIL}`}
        >
          {MAIL}
        </a>
        {LINKS.slice(0, 2).map((l) => (
          <a
            className="text-mark underline underline-offset-4 hover:text-mark-deep"
            href={l.href}
            key={l.href}
            rel="noreferrer"
            target="_blank"
          >
            {l.label}
          </a>
        ))}
      </p>
      <nav aria-label="페이지" className="mt-10 grid gap-3">
        {[
          { to: "/work", label: "작업", desc: `버추얼 쇼룸, 목록 렌더링 외 ${PROJECTS_COUNT}건` },
          { to: "/career", label: "경력", desc: "클로버추얼패션, 쓰리아이, 노스스타컨설팅" },
        ].map((l) => (
          <Link
            className="flex items-center justify-between gap-4 rounded-md border border-rule px-5 py-4 text-t3 font-semibold text-ink no-underline hover:border-mark hover:text-mark"
            key={l.to}
            to={l.to}
          >
            {l.label}
            <span className="text-t2 font-normal text-mute">{l.desc} →</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
