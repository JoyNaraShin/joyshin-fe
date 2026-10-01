import { LINKS, MAIL } from "./content/profile";
import { COLUMN } from "./layout/DocSection";

export function Hero() {
  return (
    <section className={`${COLUMN} pt-20 max-page:pt-12`}>
      {/* 이름은 헤더가 모든 페이지에서 보여 준다. 홈 첫 줄은 이름을 반복하지 않고 무엇을 잘하는지로 연다. */}
      <p className="text-t2 font-medium text-mark tabular-nums">
        프론트엔드 개발자 · 경력 6년 11개월
      </p>
      <h1 className="mt-3 text-[clamp(26px,4.2vw,34px)] font-bold text-balance leading-[1.35] tracking-[-0.035em]">
        대량 목록 렌더링과 복잡한 클라이언트 상태 관리에 강점이 있습니다
      </h1>
      <p className="mt-6 text-t3 text-pretty leading-[1.85] text-ink-2">
        글로벌 B2B 3D 협업 플랫폼 <span className="whitespace-nowrap">CLO-SET</span>에서 수만 건
        목록의 가상화, 워크룸 첫 화면 LCP 44% 단축, MobX 중심 상태 관리를 서버 상태와 클라이언트
        상태로 나누는 구조 전환을 주도했습니다.
      </p>
      <p className="mt-4 text-t3 text-pretty leading-[1.85] text-ink-2">
        같이 일하는 사람들과의 관계를 중요하게 생각합니다. 기획 회의에서는 구현이 어려운 지점을 일찍
        꺼내 PO, 디자이너와 범위를 함께 정했습니다. 백엔드와 응답 필드를 줄이거나 인프라 담당자와
        배포 구조를 바꿀 때도 상대 쪽 사정을 먼저 듣고, 서로 납득할 수 있는 방향을 찾아 왔습니다.
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
