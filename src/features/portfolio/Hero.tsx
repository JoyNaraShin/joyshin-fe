import { LINKS, MAIL } from "./content/profile";
import { COLUMN } from "./layout/DocSection";

export function Hero() {
  return (
    <section className={`${COLUMN} pt-20 max-page:pt-12`}>
      {/* 이름과 직무는 헤더가 모든 페이지에서 보여 준다. 홈 첫 줄은 그 반복 대신 무엇을 잘하는지로 연다. */}
      <p className="text-t2 font-medium text-mark tabular-nums">경력 6년 11개월</p>
      <h1 className="mt-3 text-[clamp(26px,4.2vw,34px)] font-bold text-balance leading-[1.35] tracking-[-0.035em]">
        대량 목록 렌더링과 복잡한 클라이언트 상태 관리에 강점이 있습니다
      </h1>
      <p className="mt-6 text-t3 text-pretty leading-[1.85] text-ink-2">
        글로벌 B2B 3D 협업 플랫폼 <span className="whitespace-nowrap">CLO-SET</span>에서 수만 건
        목록의 가상화, 워크룸 첫 화면 LCP 44% 단축, MobX 중심 상태 관리를 서버 상태와 클라이언트
        상태로 나누는 구조 전환을 주도했습니다.
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
    </section>
  );
}
