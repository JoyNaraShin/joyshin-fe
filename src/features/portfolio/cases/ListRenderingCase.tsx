import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { ListDomGrowth, listDomGrowthFallback } from "../figures/ListDomGrowth";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ListRenderingCase() {
  return (
    <Item index="02" id="case-list" source="CLO-SET" title="목록 렌더링 성능 개선">
      <Overview
        lead="수만 건 목록에서도 렌더링되는 DOM 노드를 화면에 보이는 행만큼으로 유지"
        situation="스크롤마다 아이템 위치를 계산하던 오래된 무한 스크롤 라이브러리 때문에 리플로우와 프레임 드롭 발생"
        task="목록 라이브러리 교체 두 차례 주도. 1차 2023 하반기, 2차 2025 상반기부터 하반기"
        action="1차 react-virtuoso(VirtuosoGrid), 2차 TanStack Virtual 공통 훅. CLO 데스크톱 앱 내장 웹뷰에 먼저 적용 후 CLO-SET 전체 목록으로 확장"
        why="레이아웃 계산을 JS에서 제어할 수 있어 디버깅과 공통 모듈화에 유리한 headless 라이브러리. 사내 다른 팀에서 검증된 선택지"
        again="1차 때 공통 훅 인터페이스부터 설계. 목록마다 따로 구현한 코드가 2차 작업량이 됨"
      />
      <SubHead>문제</SubHead>
      <Bullets>
        <li>오래된 무한 스크롤 라이브러리가 스크롤마다 전체 아이템 위치를 다시 계산</li>
        <li>
          1차로 도입한 VirtuosoGrid는 레이아웃을 CSS에 맡기는 구조라, styled-components와 SCSS가
          섞인 코드베이스에서 카드 스타일 변경으로 스크롤이 깨질 때 원인 추적이 어려움
        </li>
        <li>목록마다 구현이 흩어져 유지보수 부담 증가</li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          TanStack Virtual로 교체하고, 목록별 카드 크기로 열 수와 행 높이를 계산하는 행 단위
          가상화를 공통 훅으로 모듈화. 리사이즈 시 재계산
        </li>
        <li>CLO 데스크톱 앱 내장 웹뷰에 먼저 적용한 뒤 CLO-SET 전체 목록으로 확장</li>
        <li>적용 후 목록 성능 관련 사용자 리포트 감소</li>
      </Bullets>
      <Figure
        index="그림 2"
        caption="가상화 전후 DOM에 남는 아이템 수"
        fallback={listDomGrowthFallback}
      >
        <ListDomGrowth />
      </Figure>
    </Item>
  );
}
