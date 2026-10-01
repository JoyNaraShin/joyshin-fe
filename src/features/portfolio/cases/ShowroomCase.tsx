import { Bullets } from "../components/Bullets";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { ReuseBoundary, reuseBoundaryFallback } from "../figures/ReuseBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function ShowroomCase() {
  return (
    <Item id="case-showroom" source="CLO-SET" title="버추얼 쇼룸">
      <SubHead>개발 범위</SubHead>
      <Bullets>
        <li>
          360° 이미지나 2D 이미지 배경 위에 3D 콘텐츠를 배치해 바이어에게 공개하는 쇼룸. 쇼룸
          생성부터 편집, 미리보기, 라이브 공개까지 프론트엔드를 단독으로 개발
        </li>
        <li>초기 개발 이후 퇴사 시점까지 이어진 기능 추가와 개선 담당</li>
      </Bullets>

      <SubHead>편집 페이지</SubHead>
      <Bullets>
        <li>쇼룸 생성 시 이름, 배경 유형(360° 이미지 또는 2D 이미지), 로고 지정</li>
        <li>공간 추가와 배경 이미지 교체. 공간 사이를 오가는 Navigation 마크 배치</li>
        <li>
          3D 콘텐츠는 패널에서 공간으로 끌어 놓아 스팟 생성. 2D와 기타 콘텐츠는 파일 업로드로 추가.
          스팟마다 이름, 색, 모양 편집
        </li>
        <li>배치한 콘텐츠를 모아 보고 편집, 삭제하는 콘텐츠 목록</li>
        <li>
          라이브 뷰어의 카메라를 제한하는 시점 설정. 가로 회전 범위, 세로 회전 범위, 기본 FOV 지정
        </li>
        <li>링크 공유, 셀렉션 담기, 이메일 문의 기능을 쇼룸별로 켜고 끄는 설정</li>
        <li>
          저장, 미리보기, 라이브 공개를 분리. 저장한 편집본은 공개 전까지 라이브에 반영되지 않음
        </li>
      </Bullets>
      <Shot
        alt="쇼룸 편집 화면. 오른쪽 3D 콘텐츠 패널에서 원피스를 골라 왼쪽 공간의 행거 위치로 끌어 놓는 모습"
        caption="편집 페이지에서 3D 콘텐츠를 끌어 놓아 스팟을 만드는 화면"
        height={1223}
        src="showroom-add-content.webp"
        width={1440}
      />

      <SubHead>라이브 페이지</SubHead>
      <Bullets>
        <li>스팟을 누르면 3D 뷰어와 콘텐츠 정보(설명, 가격, 태그)를 함께 표시</li>
        <li>바이어가 제품을 셀렉션에 담고, 담은 목록을 모아 이메일로 문의</li>
        <li>공간 이동과 공유 링크</li>
      </Bullets>
      <Shot
        alt="라이브 쇼룸에서 코트 스팟을 눌러 열린 상세 창. 왼쪽에 3D 뷰어, 오른쪽에 설명과 Add to Selection 버튼"
        caption="라이브 페이지의 콘텐츠 상세"
        height={810}
        src="showroom-live-detail.webp"
        width={1440}
      />
      <Shot
        alt="라이브 쇼룸 오른쪽에 열린 My Selection List. 담은 코트, 니트, 바지와 문의 버튼"
        caption="셀렉션에 담은 제품 목록과 문의 버튼"
        height={810}
        src="showroom-selection.webp"
        width={1440}
      />

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
      </Bullets>
    </Item>
  );
}
