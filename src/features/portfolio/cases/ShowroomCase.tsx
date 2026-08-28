import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { ReuseBoundary, reuseBoundaryFallback } from "../figures/ReuseBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ShowroomCase() {
  return (
    <Item index="04" id="case-showroom" source="CLO-SET" title="버추얼 쇼룸">
      <Overview
        lead="편집·라이브 페이지를 모드 prop 으로 분기하던 단일 컴포넌트를 렌더링 단위로 분리하고, 공통 레이어에는 도메인 데이터와 순수 함수만 남겼습니다."
        situation="360° 공간에 spot을 배치해 쇼룸을 만들고 발행하는 화면입니다. 다양한 기능을 담고 있어 복잡한 상태가 많았는데, 초기 설계 이슈로 쇼룸 전체 데이터가 JSON 응답 하나였습니다."
        task="쇼룸 편집 및 라이브 페이지의 클라이언트 구현"
        action="상태 설계 · 렌더링 단위 분리 · 배경 타일링"
      />
      {/* 사례 공통 형식 — SubHead 로 문제와 해결을 가르고, 항목은 <b>라벨</b> — 문장. */}
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          <b>상태 관리</b> — API 가 리소스 단위 엔드포인트 없이 쇼룸 문서 하나만 주고받습니다. 목록
          조회도 부분 수정도 없어 중첩된 엔티티의 추가·수정·삭제와 정합을 클라이언트가 전부 지고,
          저장은 항상 문서 전체 단위입니다. 선택·호버·드래그 같은 인터랙션 상태도 도메인 상태와 같은
          트리에 있어, 한 동작이 여러 상태를 동시에 갱신합니다.
        </li>
        <li>
          <b>단일 컴포넌트 내 분기</b> — 프로젝트 초기에는 빠른 진행을 위해 편집기·라이브 내 공통 UI
          렌더링을 단일 컴포넌트에 조건부 분기하는 형태로 구성했습니다. 요구사항이 추가될 때마다
          조건 분기가 내부에 누적됐고, 유지보수에 어려움이 있었습니다..
        </li>
        <li>
          <b>무거운 배경</b> — 360° 파노라마 원본을 단일 요청으로 전부 받는 구조라, 고해상도 배경을
          쓴 쇼룸은 첫 렌더까지의 지연이 컸습니다. 사용자 비중이 높은 중국 네트워크 환경에서는
          실사용이 어려운 수준이었습니다.
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          <b>상태 설계</b> — 진입 시 받은 문서를 통째로 들지 않고 엔티티 단위 atom 으로 나눴습니다.
          경계를 화면 기준이 아니라 문서 구조에 맞춘 이유는, 저장할 때 같은 문서 형태로 되돌려야
          하기 때문입니다. 화면이 쓰는 조합은 selector 가 atom 을 읽어 만들고, selector 자체는
          상태를 갖지 않습니다. 여러 atom 을 함께 바꾸는 동작은 액션 단위로 캡슐화해, 갱신 대상과
          순서에 대한 의존을 호출부에서 걷어냈습니다.
        </li>
        <li>
          <b>렌더링 분리</b> — 편집·라이브 페이지용 컴포넌트를 분리하고, 공통 레이어에는 도메인
          데이터와 순수 함수만 남겼습니다. 재사용은 렌더 결과가 동일한 경우로 한정했습니다. 그
          밖에는 조건 하나만 달라져도 분리했습니다. 공통 로직은 최소 단위로 두고 필요할 때만
          확장했으며, 뷰는 완전히 분리했습니다.
        </li>
        <li>
          <b>배경 타일링</b> — 파노라마를 타일로 분할해 뷰포트에 들어오는 타일부터 요청하는 tiledMap
          방식으로 교체했습니다. 첫 렌더에 필요한 전송량이 원본 해상도가 아니라 뷰포트 크기에
          비례합니다.
        </li>
      </Bullets>
      <Figure
        index="그림 4"
        caption="재사용 경계를 어디에 뒀는지, 처음과 바꾼 뒤를 나란히 그린 도식입니다."
        fallback={reuseBoundaryFallback}
      >
        <ReuseBoundary />
      </Figure>
    </Item>
  );
}
