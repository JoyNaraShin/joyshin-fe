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
        lead="편집 페이지와 라이브 페이지를 페이지별 컴포넌트로 분리하고, 공유 코드는 도메인 모델과 순수 함수로 한정"
        situation="360° 공간에 3D 콘텐츠를 배치해 바이어에게 공개하는 쇼룸. 공간과 스팟 전체가 JSON 문서 하나로 오가는 API"
        task="2022 하반기부터 2026 상반기까지 초기 개발과 기능 추가를 프론트엔드 단독으로 담당"
        action="Recoil 도입과 엔티티 단위 atom 정규화, 페이지별 컴포넌트 분리, 배경 업로드 흐름 구현"
      />
      <Shot
        alt="왼쪽에 공간 목록, 가운데에 360° 매장 공간, 위에 Preview와 Save, Publish to Live 버튼이 있는 쇼룸 편집 페이지"
        caption="편집 페이지. 공간을 추가하고 스팟을 배치한 뒤 라이브로 발행"
        height={902}
        src="showroom-editor.webp"
        width={1600}
      />
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          MobX만 쓰던 코드베이스. API에 리소스 단위 엔드포인트가 없어 중첩 엔티티의 추가, 수정,
          삭제와 정합성을 클라이언트가 처리하고, 저장은 항상 문서 전체 단위
        </li>
        <li>
          선택, 호버, 드래그 같은 인터랙션 상태가 도메인 상태와 같은 트리에 있어 한 동작이 여러
          상태를 함께 갱신
        </li>
        <li>
          편집과 라이브의 공통 UI를 mode prop 하나로 분기하던 컴포넌트에 기능이 늘며 조건문이 쌓임
        </li>
        <li>
          360° 배경 원본을 한 번에 받는 구조라 고해상도 배경의 첫 렌더가 느림. 중국에서는 로딩이
          10분 넘게 걸린다는 사용자 리포트
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          Recoil을 처음 도입해 문서를 엔티티 단위 atom으로 정규화하고, 저장 시 원래 스키마로 직렬화
        </li>
        <li>
          화면에 필요한 조합은 selector로 만들고, 여러 atom을 함께 바꾸는 동작은 액션 단위로 묶어
          호출부가 갱신 순서를 알 필요가 없게 함
        </li>
        <li>
          편집 페이지와 라이브 페이지를 별도 컴포넌트로 분리. 렌더 결과가 같은 경우에만 재사용하고
          공유 코드는 도메인 모델과 순수 함수로 한정
        </li>
        <li>
          배경 타일 분할 로딩(tiledMap) 전환에 맞춰 업로드와 수정 흐름 구현. 서버의 타일 변환이 끝날
          때까지 썸네일을 노출하고 완료 후 교체
        </li>
      </Bullets>
      <Shot
        alt="360° 이미지를 올리는 중 진행률이 표시되고, 아래에 이미 올린 배경의 썸네일이 놓인 업로드 화면"
        caption="배경 업로드 화면"
        height={744}
        src="showroom-upload.webp"
        width={1200}
      />
      <Figure
        index="그림 4"
        caption="컴포넌트 재사용 범위, 분리 전과 후"
        fallback={reuseBoundaryFallback}
      >
        <ReuseBoundary />
      </Figure>
    </Item>
  );
}
