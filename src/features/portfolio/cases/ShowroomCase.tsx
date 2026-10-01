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
    caption: "편집. 3D 콘텐츠를 드래그 앤 드롭으로 배치해 스팟 생성",
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
    src: "showroom-live-detail.webp",
    w: 1440,
    h: 810,
    caption: "라이브. 스팟 클릭 시 3D 뷰어와 콘텐츠 상세",
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
          생성부터 공간과 콘텐츠 편집, 공개 설정, 라이브 화면까지 프론트엔드 단독 개발
        </li>
        <li>2022 하반기 초기 개발부터 2026 상반기 퇴사까지 기능 추가, 개선, 유지보수 담당</li>
      </Bullets>
      <Thread title="쇼룸 데이터와 상태">
        <Step label="문제">
          <ul>
            <li>
              리소스 단위 엔드포인트 없이 공간과 스팟 전체를 JSON 문서 하나로 주고받는 API. 중첩
              엔티티의 추가, 수정, 삭제와 정합성 처리를 클라이언트가 담당하고, 저장은 항상 문서 전체
              단위
            </li>
            <li>
              선택, 호버, 드래그 등 인터랙션 상태가 도메인 상태와 같은 트리에 있어 동작 하나에 여러
              상태가 동시에 갱신
            </li>
          </ul>
        </Step>
        <Step label="해결">
          <ul>
            <li>MobX만 쓰던 코드베이스에 Recoil을 처음 도입</li>
            <li>
              진입 시 받은 문서를 엔티티 단위 atom으로 정규화. 저장 시 원래 스키마로 직렬화해야
              하므로 atom 경계를 문서 구조에 맞춤
            </li>
            <li>
              화면용 파생 데이터는 상태 없는 selector로 계산. 여러 atom을 함께 갱신하는 동작은 액션
              함수로 묶어 호출부가 갱신 대상과 순서를 다루지 않도록 정리
            </li>
          </ul>
        </Step>
      </Thread>

      <Thread title="편집과 라이브 분리">
        <Step label="문제">
          초기 개발 속도를 위해 편집과 라이브의 공통 UI를 단일 컴포넌트에서 mode prop으로 분기.
          요구사항 추가마다 조건 분기가 누적되어 유지보수 비용 증가
        </Step>
        <Step label="해결">
          <ul>
            <li>편집 페이지와 라이브 페이지 컴포넌트 분리</li>
            <li>
              공유 코드는 도메인 모델과 순수 함수로 한정. 컴포넌트는 렌더 결과가 같은 경우에만 공유
            </li>
          </ul>
        </Step>
      </Thread>
      <Figure caption="컴포넌트 재사용 범위, 분리 전과 후" fallback={reuseBoundaryFallback}>
        <ReuseBoundary />
      </Figure>

      <Thread title="배경 로딩">
        <Step label="문제">
          고해상도 360° 배경 원본을 단일 요청으로 받는 구조. 중국 사용자에게서 배경 로딩이 10분 이상
          걸린다는 리포트 접수
        </Step>
        <Step label="해결">
          <ul>
            <li>배경 타일 분할 로딩(tiledMap) 전환에 맞춰 업로드와 수정 흐름 구현</li>
            <li>서버 타일 변환 완료 전까지 썸네일 노출, 완료 후 타일 배경으로 교체</li>
          </ul>
        </Step>
        <Step label="결과">타일 분할 로딩 전환 후 로컬 테스트 기준 배경 로딩 시간 약 80% 단축</Step>
      </Thread>

      <SubHead>주요 화면</SubHead>
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

      <SubHead>기능 범위</SubHead>
      <FeatureMap />
    </Item>
  );
}
