import { Bullets } from "../layout/Bullets";
import { Item } from "../layout/Item";
import { Overview } from "../layout/Overview";

export function ListRenderingCase() {
  return (
    <Item id="case-list" source="CLO-SET" title="목록 렌더링 구조 교체">
      <Overview
        lead="DOM 상주 수를 화면 크기로 고정하고, 페이지마다 흩어져 있던 목록 로직을 공통 훅 하나로 모았습니다."
        situation="유지보수가 중단된 무한 스크롤 라이브러리가 스크롤 이벤트마다 전체 항목의 위치를 다시 계산해 강제 리플로우를 일으켰습니다. 항목 수에 비례해 프레임 시간이 늘었습니다."
        task="목록 화면의 렌더링 구조"
        action="1차 IntersectionObserver → 2차 react-virtualized + 공통 훅. 두 작업 모두 화면 단위로 단계적으로 옮겼습니다."
        why="1차 뒤에도 목록 상태가 페이지마다 흩어져 있어 한 곳을 고치면 나머지를 따라 고쳐야 했고, 2차는 그것 때문에 했습니다. 라이브러리는 사내 다른 화면에서 이미 쓰던 것으로 맞췄습니다."
        again="공통 훅의 인터페이스를 1차 때 먼저 잡았을 것입니다. 1차에서 페이지마다 따로 구현한 것이 2차의 작업량이 됐습니다."
      />
      <Bullets>
        <li>
          <b>1차</b> — IntersectionObserver로 옮겨 위치 재계산을 없앴습니다. 페이지마다 목록
          레이아웃이 달라 공통 모듈로 묶는 것까지는 못 했습니다.
        </li>
        <li>
          <b>1차의 한계 ①</b> — 화면 리사이징에 따라 한 줄에 들어가는 항목 수와 항목 크기가
          달라지는데, 그 대응을 페이지마다 따로 구현해야 했습니다.
        </li>
        <li>
          <b>1차의 한계 ②</b> — DOM 노드는 줄지 않아 스크롤한 만큼 누적됐습니다. 목록 화면
          규모에서는 문제가 되지 않았지만, 결과가 수천·수만 건까지 가는 통합 검색에서는 노드 수가
          항목 수에 비례해 늘어 쓸 수 없는 방식이었습니다.
        </li>
        <li>
          <b>2차</b> — <code>react-virtualized</code> 위에서 목록 로직을 공통 훅 하나로 모으고 뷰와
          분리했습니다. 화면 리사이징과 그에 따른 반응형 UI 대응은 라이브러리 기능을 활용했습니다.
        </li>
      </Bullets>
    </Item>
  );
}
