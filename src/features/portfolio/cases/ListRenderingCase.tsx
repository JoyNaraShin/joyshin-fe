import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { ListDomGrowth, listDomGrowthFallback } from "../figures/ListDomGrowth";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ListRenderingCase() {
  return (
    <Item id="case-list" source="CLO-SET" title="목록 렌더링 성능 개선">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          수만 건까지 늘어나는 에셋 목록. 유지보수가 끊긴 무한 스크롤 라이브러리가 스크롤마다 전체
          아이템의 위치를 다시 계산해 강제 리플로우와 프레임 드롭 발생
        </li>
      </Bullets>

      <SubHead>1차 교체, VirtuosoGrid (2023 하반기)</SubHead>
      <Bullets>
        <li>react-virtuoso의 VirtuosoGrid로 가상화 도입</li>
        <li>
          레이아웃을 CSS에 맡기는 구조라, styled-components와 SCSS가 섞인 코드베이스에서 카드
          스타일을 바꾸면 스크롤이 깨졌고 원인 추적이 어려움
        </li>
        <li>목록마다 구현이 흩어져 유지보수 부담이 커짐</li>
      </Bullets>

      <SubHead>2차 교체, TanStack Virtual (2025 상반기 – 하반기)</SubHead>
      <Bullets>
        <li>
          레이아웃 계산을 JS 레벨에서 제어할 수 있어 디버깅과 공통 모듈화에 유리한 headless
          라이브러리로 교체. 사내 다른 팀에서 검증된 선택지였고 그 팀의 사례를 참고
        </li>
        <li>
          목록별 카드 크기로 열 수와 행 높이를 계산하는 행 단위 가상화를 공통 훅 하나로 모듈화.
          리사이즈 시 열 수와 행 높이를 다시 계산
        </li>
        <li>CLO 데스크톱 앱 내장 웹뷰에 먼저 적용한 뒤 CLO-SET 전체 목록으로 확장</li>
      </Bullets>

      <SubHead>결과</SubHead>
      <Bullets>
        <li>수만 건 목록에서도 렌더링되는 DOM 노드를 화면에 보이는 행만큼으로 유지</li>
        <li>목록마다 따로 있던 가상화 구현을 공통 훅 하나로 통합</li>
        <li>적용 후 목록 성능 관련 사용자 리포트 감소</li>
      </Bullets>
      <Figure caption="가상화 전후 DOM에 남는 아이템 수" fallback={listDomGrowthFallback}>
        <ListDomGrowth />
      </Figure>
      <Overview regret="공통 훅 인터페이스를 1차 때 먼저 잡지 못함. 목록마다 따로 구현한 것이 그대로 2차의 작업량이 됨" />
    </Item>
  );
}
