import { ListRenderingDemo } from "@/features/list-demo/ListRenderingDemo";
import { Bullets, Overview } from "./Overview";
import { DocSection, Figure, Item } from "./Section";
import { AutocompleteKeys } from "./figures/AutocompleteKeys";
import { DebounceTimeline } from "./figures/DebounceTimeline";
import { LoadTimeChart } from "./figures/LoadTimeChart";
import { SearchUrl } from "./figures/SearchUrl";
import { StateBoundary } from "./figures/StateBoundary";

export function SkillSection() {
  return (
    <DocSection id="skill" title="작업" meta="CLO-SET · 2022–2026">
      <Item id="case-loading" source="CLO-SET" title="메인 화면 로딩 속도 개선">
        <Overview
          owned="메인 작업 공간의 웹 화면"
          problem="에셋 목록을 한 번에 다 보여주는 화면이 처음 뜰 때 느렸습니다."
          did="번들 · API · 모듈 초기화 · 이미지, 네 축을 함께"
          result={
            <>
              <b className="n">DCL 2.47s → 1.33s</b> · <b className="n">LCP 2.91s → 1.64s</b>
            </>
          }
        />
        <Bullets>
          <li>
            <b>번들</b> — 번들 분석기로 큰 청크를 찾아 라우트·컴포넌트 단위로 다이나믹 임포트를
            걸었습니다. 폴리필과 브라우저 타깃(browserslist)도 실제 지원 범위로 낮췄습니다.
          </li>
          <li>
            <b>API</b> — 첫 화면에 필요 없는 호출을 지연시키고 중복 호출을 제거했습니다. 응답
            페이로드는 백엔드와 협의해 필드를 줄였습니다.
          </li>
          <li>
            <b>무거운 모듈</b> — 당장 쓰지 않는 모듈의 초기화를 지연시켰습니다.
          </li>
          <li>
            <b>이미지</b> — 목록 표시 크기로 리사이즈하고 webp로 바꿔, 뷰포트에 들어올 때 lazy
            로딩했습니다.
          </li>
        </Bullets>

        <Figure
          index="그림 1"
          caption="개선 전후의 로딩 계측값입니다. 막대는 실제 초 단위에 맞춰 그렸습니다."
          note="팀원 각자 PC에서 DevTools Performance 패널과 Lighthouse로 잰 값의 평균입니다. 랩 기준이고 실사용자 데이터가 아닙니다."
        >
          <LoadTimeChart />
        </Figure>
      </Item>

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
            <b>2차</b> — <code>react-virtualized</code> 위에서 목록 로직을 공통 훅 하나로 모으고
            뷰와 분리했습니다. 화면 리사이징과 그에 따른 반응형 UI 대응은 라이브러리 기능을
            활용했습니다.
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

      <Item id="case-search" source="CLO-SET" title="서비스 전체 검색">
        <Overview
          owned="검색 UI 전반의 클라이언트 구현. 색인과 질의 처리, 결과 순위는 서버가 맡았습니다."
          problem="에셋·파일과 프로젝트·폴더가 흩어져 있어 한 번에 찾을 수 없었습니다."
          did="자동완성 입력 · 요청 줄이기 · 이미지 업로드 · 화면 상태 · 대용량 결과"
          result={
            <>
              조건에 따라 <b className="n ko">수만 건</b>까지 가는 결과를 목록 케이스의 가상화
              구조로 렌더했습니다.
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
          index="그림 3"
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
        <Figure index="그림 4" caption="자동완성 요청을 줄인 방식입니다.">
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
            결과가 안 보이는 건 같아도 사용자가 다음에 할 일은 달라서, 결과 없음·오류·권한 없음을
            각각 다른 화면으로 뒀습니다.
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
        <Figure index="그림 5" caption="검색 조건을 어디에 두었는지입니다.">
          <SearchUrl />
        </Figure>
      </Item>

      <Item id="case-state" source="CLO-SET" title="서버 데이터와 화면 상태 분리">
        <Overview
          owned="뷰어를 감싼 화면의 상태 구조"
          problem="Mobx 스토어가 모듈 스코프 싱글턴으로 커지면서 여러 도메인의 상태가 한 인스턴스에 누적됐고, 스토어마다 같은 보일러플레이트가 반복됐습니다."
          did="서버 상태는 TanStack Query 단일 출처로, 화면 상태는 관심사 단위로 분리"
          result="서버 응답을 전역 스토어로 복사해 두던 중복 상태를 없애고, 화면 상태는 패널 단위로 독립시켰습니다."
        />
        <Bullets>
          <li>서버에서 받은 데이터는 TanStack Query에만 두고 전역 상태로 복사하지 않습니다.</li>
          <li>
            화면 상태는 관심사 단위로 쪼개, 뷰어와 사이드 패널이 각자 자기 상태만 들고 있게
            했습니다.
          </li>
          <li>
            Mobx 스토어는 모듈 스코프의 싱글턴 인스턴스라, 화면이 늘수록 서로 다른 도메인의 상태가
            한 인스턴스에 누적됩니다. 구독은 <code>observer</code> 컴포넌트가 렌더 중 읽은 필드에
            자동으로 걸리기 때문에, 어떤 필드의 변경이 어느 컴포넌트를 리렌더시키는지 호출부만
            봐서는 추적되지 않습니다.
          </li>
          <li>
            스토어끼리 참조를 주고받기 시작하면 의존이 양방향으로 얽혀 화면 단위로 떼어낼 수
            없습니다. 도메인 단위로 스토어를 쪼개고 각 화면이 자기 것만 들고 있게 하면 이 결합이
            애초에 생기지 않습니다.
          </li>
        </Bullets>

        <Figure
          index="그림 6"
          caption="상태를 어디에 두었는지 그린 도식입니다."
          note="서버에서 온 값은 한 곳에만 두고 화면이 들고 있는 값은 화면마다 따로 뒀습니다."
        >
          <StateBoundary />
        </Figure>
      </Item>
    </DocSection>
  );
}
