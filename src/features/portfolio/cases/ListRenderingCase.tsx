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
        lead="DOM 상주 수를 화면 크기로 고정하고, 페이지마다 흩어져 있던 목록 로직을 공통 훅 하나로 모았습니다."
        situation="유지보수가 끊긴 무한 스크롤 라이브러리가 스크롤마다 전체 항목의 위치를 다시 계산했습니다. 강제 리플로우가 나고, 항목이 늘수록 프레임 시간이 늘었습니다."
        task="목록 화면의 렌더링 구조"
        action="1차 IntersectionObserver → 2차 react-virtualized + 공통 훅. 화면 단위로 단계적 교체"
        why="1차 뒤에도 목록 상태가 페이지마다 흩어져 한 곳을 고치면 나머지도 따라 고쳐야 했습니다. 라이브러리는 사내에서 이미 쓰던 것으로 맞췄습니다."
        again="공통 훅 인터페이스를 1차 때 먼저 잡았을 것입니다. 페이지마다 따로 구현한 것이 그대로 2차의 작업량이 됐습니다."
      />
      {/* 사례 공통 형식 — SubHead 로 문제와 해결을 가르고, 항목은 <b>라벨</b> — 문장. */}
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          <b>위치 재계산</b> — 유지보수가 끊긴 무한 스크롤 라이브러리가 스크롤마다 전체 항목의
          위치를 다시 계산했습니다. 강제 리플로우가 나고, 항목이 늘수록 프레임 시간이 늘었습니다.
        </li>
        <li>
          <b>1차의 한계</b> — IntersectionObserver로 옮겨 위치 재계산은 없앴지만, 화면 크기에 따라
          한 줄의 항목 수와 크기가 달라지는 대응을 페이지마다 따로 구현해야 했습니다. DOM 노드도
          줄지 않아 스크롤한 만큼 쌓였습니다.
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          <b>가상화</b> — react-virtualized 위에서 DOM 상주 수를 화면 크기로 고정했습니다. 리사이징
          대응은 라이브러리 기능을 썼습니다.
        </li>
        <li>
          <b>공통 훅</b> — 페이지마다 흩어져 있던 목록 로직을 훅 하나로 모으고 뷰와 분리했습니다.
        </li>
      </Bullets>
      <Figure
        index="그림 2"
        caption="세 단계에서 DOM 에 남는 항목 수를 비교한 도식입니다."
        fallback={listDomGrowthFallback}
      >
        <ListDomGrowth />
      </Figure>
    </Item>
  );
}
