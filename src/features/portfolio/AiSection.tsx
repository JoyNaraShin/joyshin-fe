import { Bullets } from "./components/Bullets";
import { LINKS } from "./content/profile";
import { DocSection, Hang } from "./layout/DocSection";

const PROTO = LINKS.find((l) => l.label === "프로토타입 모음");

export function AiSection() {
  return (
    <DocSection id="ai" title="AI 활용" meta="개인 프로젝트 · 2026">
      <Hang className="mt-9">
        <Bullets>
          <li>Claude Code에서 설계 리뷰와 코드 리뷰를 역할별 에이전트로 나눈 개발 워크플로 구성</li>
          <li>모든 변경은 훅에서 타입 체크, 린트, 테스트를 자동 실행해 통과한 경우에만 반영</li>
          <li>
            AI가 작성한 인증 코드에서 리뷰 에이전트가 권한 상승 결함을 발견. 타입 체크와 테스트
            38개는 통과한 상태였음
          </li>
          <li>리뷰 통과 여부는 스크립트 검사 결과로 판정</li>
        </Bullets>
        {PROTO ? (
          <a
            className="mt-6 inline-block border-b-2 border-mark-line pb-0.5 text-t3 font-semibold text-ink no-underline hover:border-mark hover:text-mark"
            href={PROTO.href}
            rel="noreferrer"
            target="_blank"
          >
            이 워크플로로 만든 프로토타입 보기 <span aria-hidden="true">↗</span>
            <span className="sr-only"> (새 탭에서 열림)</span>
          </a>
        ) : null}
      </Hang>
    </DocSection>
  );
}
