import { Overview } from "../components/Overview";
import { Step, Thread } from "../components/Thread";
import { ListDomGrowth, listDomGrowthFallback } from "../figures/ListDomGrowth";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ListRenderingCase() {
  return (
    <Item id="case-list" source="CLO-SET" title="목록 렌더링 성능 개선">
      <Thread title="1차 교체, VirtuosoGrid (2023 하반기)">
        <Step label="문제">
          수만 건까지 늘어나는 에셋 목록. 스크롤마다 아이템 위치를 계산하던 오래된 무한 스크롤
          라이브러리 때문에 리플로우와 프레임 드롭 발생
        </Step>
        <Step label="해결">react-virtuoso의 VirtuosoGrid로 가상화 도입</Step>
        <Step label="한계">
          <ul>
            <li>
              레이아웃을 CSS에 위임하는 구조라, styled-components와 SCSS가 혼재된 코드베이스에서
              카드 스타일 변경 시 스크롤이 깨지고 원인 추적이 어려움
            </li>
            <li>목록별로 구현이 분산되어 유지보수 부담 증가</li>
          </ul>
        </Step>
      </Thread>

      <Thread title="2차 교체, TanStack Virtual (2025 상반기 – 하반기)">
        <Step label="선택">
          레이아웃 계산을 JS 레벨에서 제어할 수 있어 디버깅과 공통 모듈화에 유리한 headless
          라이브러리. 사내 다른 팀에서 이미 검증한 선택지
        </Step>
        <Step label="해결">
          <ul>
            <li>
              목록별 카드 크기로 열 수와 행 높이를 계산하는 행 단위 가상화를 공통 훅으로 모듈화.
              리사이즈 시 열 수와 행 높이 재계산
            </li>
            <li>CLO 데스크톱 앱 내장 웹뷰에 먼저 적용한 뒤 CLO-SET 전체 목록으로 확장</li>
          </ul>
        </Step>
        <Step label="결과">
          <ul>
            <li>수만 건 목록에서도 렌더링되는 DOM 노드를 화면에 보이는 행만큼으로 유지</li>
            <li>목록별로 분산된 가상화 구현을 공통 훅 하나로 통합</li>
            <li>적용 후 목록 성능 관련 사용자 리포트 감소</li>
          </ul>
        </Step>
      </Thread>
      <Figure caption="가상화 전후 DOM에 남는 아이템 수" fallback={listDomGrowthFallback}>
        <ListDomGrowth />
      </Figure>
      <Overview regret="1차 도입 때 공통 훅 인터페이스를 먼저 설계하지 못해, 목록별 개별 구현이 2차 교체의 작업량으로 이어짐" />
    </Item>
  );
}
