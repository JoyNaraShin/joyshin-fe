import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { ReuseBoundary, reuseBoundaryFallback } from "../figures/ReuseBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ShowroomCase() {
  return (
    <Item index="04" id="case-showroom" source="CLO-SET" title="버추얼 쇼룸">
      <Overview
        lead="편집 페이지와 라이브 페이지를 mode prop 으로 분기하던 컴포넌트를 페이지별로 나누고, 공유 코드는 도메인 모델과 순수 함수로 한정했습니다."
        situation="360° 공간에 3D 콘텐츠를 배치해 바이어에게 공개하는 쇼룸입니다. 기능이 많아 상태가 복잡했는데, API 는 공간과 스팟 전체를 JSON 문서 하나로 주고받았습니다."
        task="2022 하반기부터 2026 상반기까지 초기 개발과 이후 기능 추가를 프론트엔드 단독으로 담당"
        action="Recoil 도입과 엔티티 단위 atom 정규화, 페이지별 컴포넌트 분리, 타일 변환 대기 상태 처리"
      />
      <Shot
        alt="왼쪽에 공간 목록, 가운데에 360° 매장 공간, 위에 Preview와 Save, Publish to Live 버튼이 있는 쇼룸 편집 페이지"
        caption="편집 페이지. 공간을 추가하고 그 안에 스팟을 배치한 뒤 라이브로 발행합니다."
        height={902}
        src="showroom-editor.webp"
        width={1600}
      />
      {/* 사례 공통 형식 — SubHead 로 문제와 해결을 가르고, 항목은 <b>라벨</b> — 문장. */}
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          <b>상태 관리</b> — 코드베이스는 MobX 만 쓰고 있었고, API 는 리소스 단위 엔드포인트 없이
          쇼룸 문서 하나만 주고받습니다. 목록 조회도 부분 수정도 없어 중첩된 엔티티의
          추가·수정·삭제와 정합을 클라이언트가 전부 지고, 저장은 항상 문서 전체 단위입니다.
          선택·호버·드래그 같은 인터랙션 상태도 도메인 상태와 같은 트리에 있어, 한 동작이 여러
          상태를 동시에 갱신합니다.
        </li>
        <li>
          <b>단일 컴포넌트 내 분기</b> — 프로젝트 초기에는 빠른 진행을 위해 편집기·라이브 내 공통 UI
          렌더링을 단일 컴포넌트에 조건부 분기하는 형태로 구성했습니다. 요구사항이 추가될 때마다
          조건 분기가 내부에 누적됐고, 유지보수에 어려움이 있었습니다.
        </li>
        <li>
          <b>무거운 배경</b> — 360° 파노라마 원본을 단일 요청으로 전부 받는 구조라, 고해상도 배경을
          쓴 쇼룸은 첫 렌더까지의 지연이 컸습니다. 중국에서는 로딩이 10분 넘게 걸린다는 사용자
          리포트가 있었습니다.
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          <b>상태 설계</b> — 이 코드베이스에 Recoil 을 처음 들여와, 진입 시 받은 문서를 통째로 들지
          않고 엔티티 단위 atom 으로 정규화했습니다. 경계를 화면 기준이 아니라 문서 구조에 맞춘
          이유는, 저장할 때 원래 스키마로 직렬화해 되돌려야 하기 때문입니다. 화면이 쓰는 조합은
          selector 가 atom 을 읽어 만들고, selector 자체는 상태를 갖지 않습니다. 여러 atom 을 함께
          바꾸는 동작은 액션 단위로 캡슐화해, 갱신 대상과 순서에 대한 의존을 호출부에서
          걷어냈습니다.
        </li>
        <li>
          <b>렌더링 분리</b> — 편집·라이브 페이지용 컴포넌트를 분리하고, 공통 레이어에는 도메인
          데이터와 순수 함수만 남겼습니다. 재사용은 렌더 결과가 동일한 경우로 한정했습니다. 그
          밖에는 조건 하나만 달라져도 분리했습니다. 공통 로직은 최소 단위로 두고 필요할 때만
          확장했으며, 뷰는 완전히 분리했습니다.
        </li>
        <li>
          <b>배경 타일 전환</b> — 배경을 타일로 나눠 불러오는 tiledMap 방식이 들어오면서 업로드와
          수정 흐름을 새로 만들었습니다. 서버의 타일 변환이 끝날 때까지 썸네일을 보여 주고, 변환이
          끝나면 타일 배경으로 교체하도록 상태를 처리했습니다.
        </li>
      </Bullets>
      <Shot
        alt="360° 이미지를 올리는 중 진행률이 표시되고, 아래에 이미 올린 배경의 썸네일이 놓인 업로드 화면"
        caption="배경 업로드 화면. 서버의 타일 변환이 끝나기 전에는 썸네일로 먼저 보여 줍니다."
        height={744}
        src="showroom-upload.webp"
        width={1200}
      />
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
