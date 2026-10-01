import { Bullets } from "../components/Bullets";
import { SubHead } from "../components/SubHead";
import { Step, Thread } from "../components/Thread";
import { FeatureMap } from "../figures/FeatureMap";
import { ReuseBoundary, reuseBoundaryFallback } from "../figures/ReuseBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

const SCREENS = [
  {
    src: "showroom-add-content.webp",
    w: 1440,
    h: 1223,
    wide: true,
    caption: "편집. 3D 콘텐츠 패널에서 공간으로 끌어 놓아 스팟 생성",
    alt: "쇼룸 편집 화면. 오른쪽 3D 콘텐츠 패널에서 원피스를 골라 왼쪽 공간의 행거 위치로 끌어 놓는 모습",
  },
  {
    src: "showroom-settings.webp",
    w: 1440,
    h: 810,
    caption: "편집. 로고, 공유, 셀렉션, 문의 메일 설정",
    alt: "쇼룸 편집 화면 오른쪽에 열린 환경 설정 패널. 이름, 로고, 링크 공유, 셀렉션, 이메일 문의 토글과 회사 정보 입력란",
  },
  {
    src: "showroom-content-list.webp",
    w: 1000,
    h: 670,
    caption: "편집. 3D, 2D, 기타, Navigation 유형별 콘텐츠 목록",
    alt: "콘텐츠 목록 패널. 3D, 2D, Other, Navigation 탭과 배치된 콘텐츠별 Edit 버튼",
  },
  {
    src: "showroom-upload.webp",
    w: 1440,
    h: 950,
    caption: "편집. 공간 배경 이미지 업로드",
    alt: "360° 배경 이미지를 끌어 놓거나 파일을 골라 올리는 창. 아래에 이미 올린 배경 두 개의 썸네일",
  },
  {
    src: "showroom-live-detail.webp",
    w: 1440,
    h: 810,
    caption: "라이브. 스팟을 누르면 3D 뷰어와 콘텐츠 정보",
    alt: "라이브 쇼룸에서 코트 스팟을 눌러 열린 상세 창. 왼쪽에 3D 뷰어, 오른쪽에 설명과 Add to Selection 버튼",
  },
  {
    src: "showroom-selection.webp",
    w: 1440,
    h: 810,
    wide: true,
    caption: "라이브. 셀렉션 목록과 선택 제품 문의",
    alt: "라이브 쇼룸 오른쪽에 열린 My Selection List. 담은 코트, 니트, 바지와 문의 버튼",
  },
];

export function ShowroomCase() {
  return (
    <Item id="case-showroom" source="CLO-SET" title="버추얼 쇼룸">
      <SubHead>개발 범위</SubHead>
      <Bullets>
        <li>
          360° 이미지나 2D 이미지 배경 위에 3D 콘텐츠를 배치해 바이어에게 공개하는 쇼룸. 쇼룸
          생성부터 공간과 콘텐츠 편집, 공개 설정, 라이브 화면까지 프론트엔드 전체를 단독 개발
        </li>
        <li>
          2022 하반기 초기 개발부터 2026 상반기 퇴사 시점까지 기능 추가와 개선, 유지보수를 혼자
          담당. 2D 배경과 업로드 진행률처럼 서비스 중에 붙은 기능까지 포함
        </li>
      </Bullets>
      <FeatureMap />

      <SubHead>화면</SubHead>
      <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6 max-card:grid-cols-1">
        {SCREENS.map((sc) => (
          <figure className={sc.wide ? "col-span-2 max-card:col-span-1" : ""} key={sc.src}>
            <img
              alt={sc.alt}
              className="block h-auto w-full rounded-md border border-rule"
              decoding="async"
              height={sc.h}
              loading="lazy"
              src={`${import.meta.env.BASE_URL}work/${sc.src}`}
              width={sc.w}
            />
            <figcaption className="mt-2 text-t2 text-mute">{sc.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-t1 text-faint">캡처 출처 CLO-SET 헬프센터</p>

      <Thread title="쇼룸 데이터와 상태">
        <Step label="문제">
          <ul>
            <li>
              리소스 단위 엔드포인트 없이 공간과 스팟 전체가 JSON 문서 하나로 오가는 API. 중첩
              엔티티의 추가, 수정, 삭제와 정합을 클라이언트가 처리하고 저장은 항상 문서 전체 단위
            </li>
            <li>
              선택, 호버, 드래그 같은 인터랙션 상태가 도메인 상태와 같은 트리에 있어 동작 하나가
              여러 상태를 동시에 갱신
            </li>
          </ul>
        </Step>
        <Step label="해결">
          <ul>
            <li>MobX만 쓰던 코드베이스에 Recoil을 처음 도입</li>
            <li>
              진입 시 받은 문서를 엔티티 단위 atom으로 정규화. 저장할 때 같은 스키마로 되돌려야 해서
              atom 경계를 화면이 아니라 문서 구조에 맞추고, 저장 시 원래 스키마로 직렬화
            </li>
            <li>
              화면이 쓰는 조합은 selector로 계산하고 selector에는 상태를 두지 않음. 여러 atom을 함께
              바꾸는 동작은 액션 함수로 묶어 호출부가 갱신 대상과 순서를 알 필요가 없게 함
            </li>
          </ul>
        </Step>
      </Thread>

      <Thread title="편집과 라이브 분리">
        <Step label="문제">
          초기에 빠른 진행을 위해 편집과 라이브의 공통 UI를 한 컴포넌트에서 mode prop으로 분기.
          요구사항이 늘 때마다 조건문이 쌓여 유지보수가 어려워짐
        </Step>
        <Step label="해결">
          <ul>
            <li>편집 페이지와 라이브 페이지를 별도 컴포넌트로 분리</li>
            <li>
              공유 코드는 도메인 모델과 순수 함수로 한정. 재사용은 렌더 결과가 같은 경우로만
              제한하고 조건이 하나라도 다르면 분리
            </li>
          </ul>
        </Step>
      </Thread>
      <Figure caption="컴포넌트 재사용 범위, 분리 전과 후" fallback={reuseBoundaryFallback}>
        <ReuseBoundary />
      </Figure>

      <Thread title="배경 로딩">
        <Step label="문제">
          고해상도 360° 배경을 한 번에 받는 구조. 중국에서 로딩이 10분 넘게 걸린다는 사용자 리포트
        </Step>
        <Step label="해결">
          <ul>
            <li>
              배경 이미지의 타일 분할 로딩(tiledMap) 전환에 맞춰 프론트엔드의 업로드와 수정 흐름
              구현
            </li>
            <li>서버의 타일 변환이 끝날 때까지 썸네일을 노출하고, 완료 후 타일 배경으로 교체</li>
          </ul>
        </Step>
        <Step label="결과">로컬 테스트 기준 배경 로딩 시간 약 80% 단축</Step>
      </Thread>
    </Item>
  );
}
