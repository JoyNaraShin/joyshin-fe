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
          리소스 단위 엔드포인트 없이 공간과 스팟 전체가 JSON 문서 하나로 오가는 API. 중첩 엔티티의
          추가, 수정, 삭제와 정합을 클라이언트가 처리하고 저장은 항상 문서 전체 단위
        </li>
        <li>
          선택, 호버, 드래그 같은 인터랙션 상태가 도메인 상태와 같은 트리에 있어 동작 하나가 여러
          상태를 동시에 갱신
        </li>
        <li>
          초기에 빠른 진행을 위해 편집과 라이브의 공통 UI를 한 컴포넌트에서 mode prop으로 분기.
          요구사항이 늘 때마다 조건문이 쌓여 유지보수가 어려워짐
        </li>
        <li>
          고해상도 360° 배경을 한 번에 받는 구조. 중국에서 로딩이 10분 넘게 걸린다는 사용자 리포트
        </li>
      </Bullets>

      <SubHead>상태 설계</SubHead>
      <Bullets>
        <li>MobX만 쓰던 코드베이스에 Recoil을 처음 도입</li>
        <li>
          진입 시 받은 문서를 엔티티 단위 atom으로 정규화. 저장할 때 같은 스키마로 되돌려야 해서
          atom 경계를 화면이 아니라 문서 구조에 맞추고, 저장 시 원래 스키마로 직렬화
        </li>
        <li>
          화면이 쓰는 조합은 selector로 계산하고 selector에는 상태를 두지 않음. 여러 atom을 함께
          바꾸는 동작은 액션 함수로 묶어 호출부가 갱신 대상과 순서를 알 필요가 없게 함
        </li>
      </Bullets>

      <SubHead>편집과 라이브 분리</SubHead>
      <Bullets>
        <li>편집 페이지와 라이브 페이지를 별도 컴포넌트로 분리</li>
        <li>
          공유 코드는 도메인 모델과 순수 함수로 한정. 재사용은 렌더 결과가 같은 경우로만 제한하고
          조건이 하나라도 다르면 분리
        </li>
      </Bullets>
      <Figure caption="컴포넌트 재사용 범위, 분리 전과 후" fallback={reuseBoundaryFallback}>
        <ReuseBoundary />
      </Figure>

      <SubHead>배경 업로드 흐름</SubHead>
      <Bullets>
        <li>
          배경 이미지의 타일 분할 로딩(tiledMap) 전환에 맞춰 프론트엔드의 업로드와 수정 흐름 구현
        </li>
        <li>서버의 타일 변환이 끝날 때까지 썸네일을 노출하고, 완료 후 타일 배경으로 교체</li>
      </Bullets>
      <Shot
        alt="360° 배경 이미지를 끌어 놓거나 파일을 골라 올리는 창. 아래에 이미 올린 배경 두 개의 썸네일이 있다"
        caption="쇼룸 배경 이미지 업로드 창"
        height={950}
        src="showroom-upload.webp"
        width={1440}
      />

      <SubHead>결과</SubHead>
      <Bullets>
        <li>타일 분할 로딩 전환 후 로컬 테스트 기준 배경 로딩 시간 약 80% 단축</li>
        <li>초기 개발부터 퇴사 시점까지 쇼룸의 기능 추가와 개선을 프론트엔드 단독으로 담당</li>
      </Bullets>
    </Item>
  );
}
