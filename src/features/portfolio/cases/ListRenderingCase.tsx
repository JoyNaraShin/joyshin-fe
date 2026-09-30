import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { ListDomGrowth, listDomGrowthFallback } from "../figures/ListDomGrowth";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ListRenderingCase() {
  return (
    <Item index="02" id="case-list" source="CLO-SET" title="목록 렌더링 구조 교체">
      <Overview
        lead="수만 건까지 늘어나는 에셋 목록을 행 단위 가상화 공통 훅으로 옮겨, 렌더링되는 DOM 노드를 화면에 보이는 행만큼으로 유지했습니다."
        situation="유지보수가 끊긴 무한 스크롤 라이브러리가 스크롤마다 전체 항목의 위치를 다시 계산했습니다. 강제 리플로우가 나고, 항목이 늘수록 프레임 시간이 늘었습니다."
        task="목록 라이브러리 교체를 두 차례 주도. 1차는 2023 하반기, 2차는 2025 상반기부터 하반기까지"
        action="1차 react-virtuoso(VirtuosoGrid) → 2차 TanStack Virtual 공통 훅. CLO 데스크톱 앱 내장 웹뷰에 먼저 적용하고 CLO-SET 전체 목록으로 확장"
        why="VirtuosoGrid 는 레이아웃을 CSS 에 맡기는 구조라, styled-components 와 SCSS 가 섞인 코드베이스에서 스크롤이 깨지면 원인을 좇기 어려웠습니다. TanStack Virtual 은 레이아웃 계산을 JS 에서 제어할 수 있는 headless 라이브러리라 디버깅과 공통 모듈화에 유리했습니다. 사내 다른 팀에서 이미 검증한 선택지였습니다."
        again="공통 훅 인터페이스를 1차 때 먼저 잡았을 것입니다. 목록마다 따로 구현한 것이 그대로 2차의 작업량이 됐습니다."
      />
      {/* 사례 공통 형식 — SubHead 로 문제와 해결을 가르고, 항목은 <b>라벨</b> — 문장. */}
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          <b>위치 재계산</b> — 유지보수가 끊긴 무한 스크롤 라이브러리가 스크롤마다 전체 항목의
          위치를 다시 계산했습니다. 강제 리플로우가 나고, 항목이 늘수록 프레임 시간이 늘었습니다.
        </li>
        <li>
          <b>VirtuosoGrid 의 한계</b> — 1차로 가상화해 노드 수는 줄었지만, 레이아웃을 CSS 에 맡기는
          구조라 카드 스타일이 바뀌어 스크롤이 깨질 때 원인을 찾기 어려웠습니다. 목록마다 구현이
          흩어져 있어 유지보수 부담도 컸습니다.
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          <b>공통 훅</b> — 2차에서 TanStack Virtual 로 교체하고, 목록별 카드 크기로 열 수와 행
          높이를 계산하는 행 단위 가상화를 공통 훅 하나로 모았습니다. 창 크기가 바뀌면 열 수와 행
          높이를 다시 계산합니다.
        </li>
        <li>
          <b>적용 순서</b> — CLO 데스크톱 앱에 내장된 웹뷰에 먼저 적용한 뒤 CLO-SET 전체 목록으로
          넓혔습니다. 적용 뒤 목록 성능에 관한 사용자 리포트가 줄었습니다.
        </li>
      </Bullets>
      <Figure
        index="그림 2"
        caption="가상화 전후로 DOM 에 남는 항목 수를 비교한 도식입니다."
        fallback={listDomGrowthFallback}
      >
        <ListDomGrowth />
      </Figure>
    </Item>
  );
}
