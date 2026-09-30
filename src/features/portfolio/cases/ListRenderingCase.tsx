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
          수만 건까지 늘어나는 에셋 목록. 오래된 무한 스크롤 라이브러리가 스크롤마다 아이템 위치를
          계산해 리플로우와 프레임 드롭 발생
        </li>
      </Bullets>

      <SubHead>1차 교체 (2023 하반기)</SubHead>
      <Bullets>
        <li>react-virtuoso의 VirtuosoGrid 도입</li>
        <li>
          레이아웃을 CSS에 맡기는 구조라, styled-components와 SCSS가 섞인 코드베이스에서 카드
          스타일을 바꾸면 스크롤이 깨졌고 원인 추적이 어려움. 목록마다 구현도 흩어짐
        </li>
      </Bullets>

      <SubHead>2차 교체 (2025)</SubHead>
      <Bullets>
        <li>
          TanStack Virtual로 교체. 목록별 카드 크기로 열 수와 행 높이를 계산하는 행 단위 가상화를
          공통 훅 하나로 모듈화하고, 창 크기가 바뀌면 다시 계산
        </li>
        <li>CLO 데스크톱 앱 내장 웹뷰에 먼저 적용한 뒤 CLO-SET 전체 목록으로 확장</li>
      </Bullets>

      <SubHead>결과</SubHead>
      <Bullets>
        <li>수만 건 목록에서도 화면에 보이는 행만 DOM에 렌더링</li>
        <li>적용 후 목록 성능 관련 사용자 리포트 감소</li>
      </Bullets>
      <Figure caption="가상화 전후 DOM에 남는 아이템 수" fallback={listDomGrowthFallback}>
        <ListDomGrowth />
      </Figure>
      <Overview
        why="레이아웃 계산을 JS에서 직접 제어할 수 있어 디버깅과 공통화가 쉬움. 사내 다른 팀에서 이미 검증한 라이브러리"
        regret="1차 때 목록마다 따로 구현해 2차에서 전부 다시 작업"
      />
    </Item>
  );
}
