import { ListRenderingDemo } from "@/features/list-demo/ListRenderingDemo";
import { Bullets } from "../layout/Bullets";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";
import { Overview } from "../layout/Overview";

/** 목록 렌더링 구조 교체. */
export function ListRenderingCase() {
  return (
    <Item id="case-list" source="CLO-SET" title="목록 렌더링 구조 교체">
      <Overview
        owned="목록 화면의 렌더링 구조"
        problem="유지보수가 중단된 무한 스크롤 라이브러리가 스크롤 이벤트마다 전체 항목의 위치를 다시 계산해 강제 리플로우를 일으켰습니다. 항목 수에 비례해 프레임 시간이 늘었습니다."
        did="1차 IntersectionObserver → 2차 react-virtualized + 공통 훅"
        result="DOM 상주 수를 화면 크기로 고정하고 페이지별 차이는 뷰에만 남겼습니다."
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
      <div className="body">
        <p>두 작업 모두 화면 단위로 단계적으로 옮겼습니다.</p>
      </div>
      <Figure
        index="그림 2"
        caption="1차는 DOM에 쌓인 6,000개를 줄이지 못하고 2차에서야 화면에 보이는 수십 개로 고정됩니다. 실제 화면은 아닙니다. 같은 문제를 가상 데이터 6,000건으로 다시 만들었습니다."
      >
        <ListRenderingDemo />
      </Figure>
    </Item>
  );
}
