import { Bullets } from "./components/Bullets";
import { Prose } from "./components/Prose";
import { ReviewPipeline, reviewPipelineFallback } from "./figures/ReviewPipeline";
import { DocSection, Hang } from "./layout/DocSection";
import { Figure } from "./layout/Figure";
import { Item } from "./layout/Item";

export function AiSection() {
  return (
    <DocSection id="ai" title="AI 활용" meta="개인 프로젝트 · 2026">
      <Hang className="mt-9">
        <p className="max-w-[62ch] text-t3 font-normal text-pretty leading-[1.8] text-ink-2">
          Claude Code에서 설계 리뷰와 코드 리뷰를 역할별 에이전트로 나눈 개발 워크플로 구성. 모든
          변경은 훅에서 타입 체크, 린트, 테스트를 자동 실행해 통과한 경우에만 반영. 이 워크플로로
          서비스 프로토타입 제작
        </p>
      </Hang>

      <Item index="A" title="역할별 리뷰 에이전트">
        <Bullets>
          <li>
            리뷰 축을 구조와 도메인 적합성, 인증과 권한과 DB 정합성, 프론트엔드 구현과 접근성으로
            나누고 축마다 전담 에이전트 배치. 슬라이스 단위에서는 변경에 맞는 축만, 전체 리뷰는 통합
            시점에만 실행
          </li>
          <li>
            리뷰 결과는 파싱 가능한 결함 레코드로 출력. 병합 스크립트가 항목 수와 심각도를 대조해
            누락이나 심각도 하향이 있으면 실패 처리
          </li>
          <li>
            타입 검사와 테스트 38개를 통과한 코드에서 엔진 코어에 섞인 표시 문구, AI가 작성한 인증
            코드의 권한 상승 결함을 리뷰로 발견
          </li>
        </Bullets>
        <Figure
          index="그림 6"
          caption="설계 리뷰부터 재검증까지의 순서"
          fallback={reviewPipelineFallback}
        >
          <ReviewPipeline />
        </Figure>
      </Item>

      <Item index="B" title="규칙을 훅으로 강제">
        <Bullets>
          <li>
            문서로만 둔 규칙은 에이전트가 서너 번 건너뜀. 훅이 저장된 파일 내용을 직접 읽어
            판정하도록 변경
          </li>
          <li>
            판정 조건은 룰 데이터로 분리하고 실행 엔진 하나가 읽는 구조. 게이트별로 끌 수 있는 상태
            파일
          </li>
          <li>
            설정은 플러그인으로 묶어 프로젝트 간 재사용. 설치본이 소스보다 뒤처지는 문제는 세션 시작
            시 버전 대조로 확인
          </li>
        </Bullets>
        <Prose>
          <p>
            에이전트는 결함을 찾는 데만 쓰고, 통과와 차단 판정은 파일 존재나 패턴 일치 같은 결정론적
            조건으로만 처리. 검사 에이전트가 깨진 코드에 성공을 보고한 사례를 리서치에서 확인해
            판정은 맡기지 않음
          </p>
        </Prose>
      </Item>
    </DocSection>
  );
}
