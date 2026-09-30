import { Bullets } from "../components/Bullets";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { ReuseBoundary, reuseBoundaryFallback } from "../figures/ReuseBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ShowroomCase() {
  return (
    <Item id="case-showroom" source="CLO-SET" title="버추얼 쇼룸">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          고해상도 360° 배경을 한 번에 받는 구조. 중국에서 로딩이 10분 넘게 걸린다는 사용자 리포트
        </li>
        <li>
          공간과 스팟 전체가 JSON 문서 하나로 오가는 API. 중첩 엔티티의 추가, 수정, 삭제를
          클라이언트가 처리하고 저장은 항상 문서 전체 단위
        </li>
        <li>
          선택, 호버, 드래그 상태가 도메인 상태와 섞여 있어 동작 하나에 여러 상태를 같이 고쳐야 했음
        </li>
        <li>편집과 라이브를 mode prop 하나로 분기하던 컴포넌트에 기능이 늘며 조건문이 쌓임</li>
      </Bullets>

      <Shot
        alt="왼쪽에 공간 목록, 가운데에 360° 매장 공간, 위에 Preview와 Save, Publish to Live 버튼이 있는 쇼룸 편집 페이지"
        caption="편집 페이지. 공간을 추가하고 스팟을 배치한 뒤 라이브로 발행"
        height={902}
        src="showroom-editor.webp"
        width={1600}
      />
      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          MobX만 쓰던 코드베이스에 Recoil을 처음 도입. 문서를 엔티티 단위 atom으로 정규화하고 저장
          시 원래 스키마로 직렬화
        </li>
        <li>
          화면에 필요한 조합은 selector로 계산하고, 여러 atom을 바꾸는 동작은 액션 함수 하나로 묶음
        </li>
        <li>
          편집 페이지와 라이브 페이지를 별도 컴포넌트로 분리. 공유 코드는 도메인 모델과 순수 함수로
          한정
        </li>
      </Bullets>
      <SubHead>배경 타일 전환</SubHead>
      <Bullets>
        <li>배경을 타일 분할 로딩(tiledMap)으로 전환하며 업로드와 수정 흐름 구현</li>
        <li>서버의 타일 변환이 끝날 때까지 썸네일을 노출하고, 완료 후 타일 배경으로 교체</li>
      </Bullets>
      <Shot
        alt="360° 이미지를 올리는 중 진행률이 표시되고, 아래에 이미 올린 배경의 썸네일이 놓인 업로드 화면"
        caption="배경 업로드 화면"
        height={744}
        src="showroom-upload.webp"
        width={1200}
      />
      <Figure caption="컴포넌트 재사용 범위, 분리 전과 후" fallback={reuseBoundaryFallback}>
        <ReuseBoundary />
      </Figure>
    </Item>
  );
}
