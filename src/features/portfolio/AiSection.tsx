import { Bullets } from "./components/Bullets";
import { Prose } from "./components/Prose";
import { ReviewPipeline, reviewPipelineFallback } from "./figures/ReviewPipeline";
import { DocSection, Hang } from "./layout/DocSection";
import { Figure } from "./layout/Figure";
import { Item } from "./layout/Item";

export function AiSection() {
  return (
    <DocSection id="ai" title="AI 파이프라인" meta="개인 프로젝트 · 2026">
      {/* 이 섹션의 축 = AI 로 효율·생산성을 내려 한 노력의 증거. 도구 소개가 아니다.
          현재 상태만 적는다. */}
      <Hang className="mt-9">
        <p className="max-w-[62ch] text-t3 font-normal text-pretty leading-[1.8] text-ink-2">
          개인 프로젝트는 기획부터 배포까지 AI를 주 도구로 씁니다. 생성 속도가 오르면 그만큼 검증할
          양이 늡니다. 그 검증을 매번 손으로 하지 않도록 리뷰·게이트·재검증을 워크플로로
          고정했습니다.
        </p>
      </Hang>

      <Item index="A" title="리뷰어를 축별로 나눴습니다">
        <Bullets>
          <li>
            구조·도메인 적합성, 인증·권한·DB 정합, 프론트엔드 구현·접근성으로 리뷰 축을 나누고
            축마다 전담 에이전트를 뒀습니다. 슬라이스 단위에서는 변경 성격에 맞는 축만, 전수는 통합
            시점에만 돌립니다.
          </li>
          <li>
            리뷰어는 산문 요약 대신 파싱 가능한 결함 레코드를 냅니다. 병합 스크립트가 항목 수와
            심각도를 대조해 누락이나 강등이 있으면 실패로 끝냅니다.
          </li>
          <li>
            <b>타입 검사도 테스트 38개도 통과한 코드</b>에서 표시 문구가 엔진 코어에 섞여
            있었습니다. AI가 쓴 인증 코드의 권한 상승 결함도 리뷰가 잡았습니다.
          </li>
        </Bullets>
        <Figure
          index="그림 6"
          caption="설계 리뷰부터 재검증까지의 순서입니다."
          fallback={reviewPipelineFallback}
        >
          <ReviewPipeline />
        </Figure>
      </Item>

      <Item index="B" title="규칙을 문서에서 훅으로 옮겼습니다">
        <Bullets>
          <li>
            문서로만 있던 규칙은 에이전트가 서너 번 건너뛰었습니다. 지금은 훅이 저장된 파일 내용을
            직접 읽어 판정합니다.
          </li>
          <li>판정 조건은 룰 데이터로 두고 실행 엔진 하나가 읽습니다.</li>
          <li>게이트마다 끌 수 있는 상태 파일을 뒀습니다.</li>
          <li>
            설정을 프로젝트마다 옮기지 않도록 플러그인으로 묶었고, 설치본이 소스보다 뒤처지는 캐시
            드리프트는 세션 시작 시 버전 대조로 잡습니다.
          </li>
        </Bullets>
        {/* 가르는 축은 AI 여부가 아니라 찾기냐 판정이냐다. */}
        <Prose>
          <p>
            에이전트는 결함을 찾는 자리에 씁니다. 못 찾으면 놓친 것으로 끝나지만,{" "}
            <b>
              통과·차단 판정까지 맡기면 실패를 통과로 적어 두게 되어 안전장치가 반대로 작동합니다.
            </b>{" "}
            검사 에이전트가 깨진 코드에 성공을 보고한 사례를 리서치에서 확인했습니다. 게이트 술어는
            파일 존재나 패턴 일치처럼 결정론적인 것만 씁니다.
          </p>
        </Prose>
      </Item>
    </DocSection>
  );
}
