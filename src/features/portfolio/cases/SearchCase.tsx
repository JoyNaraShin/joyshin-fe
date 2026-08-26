import { AutocompleteKeys } from "../figures/AutocompleteKeys";
import { DebounceTimeline } from "../figures/DebounceTimeline";
import { SearchUrl } from "../figures/SearchUrl";
import { Bullets } from "../layout/Bullets";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";
import { Overview } from "../layout/Overview";

/** 서비스 전체 검색. */
export function SearchCase() {
  return (
    <Item id="case-search" source="CLO-SET" title="서비스 전체 검색">
      <Overview
        owned="검색 UI 전반의 클라이언트 구현. 색인과 질의 처리, 결과 순위는 서버가 맡았습니다."
        problem="에셋·파일과 프로젝트·폴더가 흩어져 있어 한 번에 찾을 수 없었습니다."
        did="자동완성 입력 · 요청 줄이기 · 이미지 업로드 · 화면 상태 · 대용량 결과"
        result={
          <>
            조건에 따라 <b className="n ko">수만 건</b>까지 가는 결과를 목록 케이스의 가상화 구조로
            렌더했습니다.
          </>
        }
      />

      <h4 className="sub">자동완성 입력</h4>
      <Bullets>
        <li>
          마우스 없이 고를 수 있게 위아래 방향키·Enter·Esc를 붙이고 포커스는 입력창에 뒀습니다.
          목록으로 포커스를 옮기면 이어서 타이핑할 수 없습니다.
        </li>
        <li>
          한글은 IME 조합 중 자모가 여러 번 들어와 미완성 글자로 추천을 부르기 때문에, 조합이 끝난
          뒤에 보내도록 고쳤습니다.
        </li>
      </Bullets>
      <Figure
        index="그림 2"
        caption="추천을 고르는 동안의 포커스 위치와, 한글이 조합되는 동안 들어오는 입력입니다."
      >
        <AutocompleteKeys />
      </Figure>

      <h4 className="sub">요청 줄이기</h4>
      <Bullets>
        <li>
          입력할 때마다 부르던 추천 API를 디바운스로 묶고 앞선 요청이 남아 있으면 취소했습니다.
        </li>
      </Bullets>
      <Figure index="그림 3" caption="자동완성 요청을 줄인 방식입니다.">
        <DebounceTimeline />
      </Figure>

      <h4 className="sub">이미지를 올려서 하는 검색</h4>
      <Bullets>
        <li>
          파일 선택과 드래그앤드롭으로 받고 고른 이미지는 서버 응답 전에 바로 미리보기로 띄운 뒤
          진행 상태를 보여줬습니다.
        </li>
        <li>
          용량·형식 제한은 업로드 전에 걸었습니다. 실패하면 화면 전환 없이 안내 모달만 띄웠습니다.
        </li>
      </Bullets>

      <h4 className="sub">검색 중 화면 상태</h4>
      <Bullets>
        <li>
          요청 중에는 <b>이전 결과를 지우지 않고 스켈레톤을 함께 띄웠습니다.</b>
        </li>
        <li>
          결과가 안 보이는 건 같아도 사용자가 다음에 할 일은 달라서, 결과 없음·오류·권한 없음을 각각
          다른 화면으로 뒀습니다.
        </li>
      </Bullets>
      <div className="body">
        <p>
          요청마다 결과를 비우면 조건을 바꿀 때마다 목록이 언마운트됐다 다시 마운트돼, 화면이 빈
          상태를 한 번 거칩니다. 검색은 조건을 연달아 바꿔 가며 좁히는 동선이라, 그때마다 직전
          결과가 사라지면 무엇이 어떻게 달라졌는지 비교할 수 없습니다.
        </p>
      </div>

      <h4 className="sub">규모와 URL</h4>
      <Bullets>
        <li>
          결과는 조건에 따라 수천·수만 건까지 가기 때문에 목록 케이스에서 만든 가상화 구조를
          재사용했습니다.
        </li>
        <li>검색어·필터·정렬·페이지는 전부 URL 쿼리스트링에 넣어 단일 출처로 뒀습니다.</li>
      </Bullets>
      <Figure index="그림 4" caption="검색 조건을 어디에 두었는지입니다.">
        <SearchUrl />
      </Figure>
    </Item>
  );
}
