import { Bullets } from "../components/Bullets";
import { SubHead } from "../components/SubHead";
import { Step, Thread } from "../components/Thread";
import { Item } from "../layout/Item";

export function StateCase() {
  return (
    <Item id="case-state" source="CLO-SET" title="1차 서비스 리뉴얼">
      <SubHead>범위</SubHead>
      <Bullets>
        <li>모노레포 구성과 상태 관리 구조 재설계 주도</li>
        <li>3D, 2D, 렌더 뷰어 전체 설계와 개발</li>
      </Bullets>

      <Thread title="모노레포">
        <Step label="결정">팀 학습 비용을 고려해 Turborepo, Nx 없이 Yarn workspaces로 구성</Step>
        <Step label="구성">
          <ul>
            <li>앱, 공유 UI, 뷰어, API 클라이언트, 빌드 설정을 패키지로 분리</li>
            <li>
              의존은 앱에서 뷰어, 공유 UI, API 클라이언트를 거쳐 빌드 설정 쪽으로만 향하게 하고,
              아래쪽 패키지가 위쪽 패키지를 의존성으로 두지 않도록 규칙으로 고정
            </li>
            <li>
              API 클라이언트는 axios 인스턴스를 한곳에 두고 API 버전별 factory로 나눈 뒤 TanStack
              Query용 query, mutation 훅과 함께 독립 패키지로 제공. API 버전을 옮길 때 패키지 내부만
              바꾸면 모든 앱에 반영되고, 사내 다른 서비스에서도 재사용
            </li>
          </ul>
        </Step>
      </Thread>

      <Thread title="상태 관리">
        <Step label="문제">
          <ul>
            <li>
              MobX 스토어가 모듈 스코프 싱글턴이라 화면 단위로 생성, 해제되지 않음. 화면이 늘수록
              여러 도메인의 상태가 한 인스턴스에 누적
            </li>
            <li>
              스토어 간 상호 참조로 순환 의존 발생. 화면 하나를 분리해도 무관한 스토어까지 의존성에
              포함
            </li>
            <li>
              서버 데이터를 스토어에도 복제해, 저장 후 캐시를 갱신해도 스토어 값은 그대로 남음.
              갱신마다 두 곳을 함께 수정해야 하는 구조
            </li>
            <li>
              <code>observer</code>의 자동 구독으로 어떤 필드가 어느 컴포넌트를 리렌더하는지
              호출부에서 파악하기 어려움
            </li>
          </ul>
        </Step>
        <Step label="해결">
          <ul>
            <li>
              서버 데이터는 TanStack Query 캐시를 단일 출처로 두고 스토어 복제 제거. 저장 후{" "}
              <code>invalidateQueries</code>로 재조회
            </li>
            <li>
              UI 상태는 Recoil atom 단위로 분리. 구독 대상이 호출부에 명시되고, 리렌더 범위는 해당
              atom을 읽는 컴포넌트로 한정
            </li>
            <li>파생 값은 selector로만 계산해 단방향 의존 유지</li>
          </ul>
        </Step>
        <Step label="이후">
          <ul>
            <li>
              2025년 Recoil 유지보수 중단에 따라 2차 리뉴얼에서 팀원 주도로 atom 기반 모델이 유사한
              Jotai로 이전
            </li>
            <li>MobX는 완전히 제거하지 못해 일부 화면에 잔존</li>
          </ul>
        </Step>
      </Thread>

      <Thread title="뷰어">
        <Step label="문제">
          <ul>
            <li>
              3D 엔진 팀이 제공한 API는 함수 목록 형태라 호출 순서(초기화, 데이터 로드, 뷰어 옵션
              적용)와 React 생명주기에 맞춘 사용법이 정해져 있지 않음. 그대로 쓰면 엔진 호출 코드가
              화면 곳곳에 흩어짐
            </li>
            <li>
              3D 파일, 2D 패턴, 이미지, 렌더 결과 등 콘텐츠 타입마다 초기화와 렌더 방식이 달라, 한
              컴포넌트에서 처리하면 분기가 겹겹이 쌓임
            </li>
          </ul>
        </Step>
        <Step label="해결">
          <ul>
            <li>
              엔진 API를 React 생명주기에 맞춘 훅 레이어로 감싸 뷰어 패키지로 분리. 엔진 초기화와
              canvas 마운트, 3D 파일 비동기 로드, 컨테이너 크기 동기화를 역할별 훅으로 나누고,
              화면에서는 조합 훅 하나만 호출
            </li>
            <li>
              뷰잉 옵션 훅(아바타 표시, Strain Map 등)이 모두 같은 형태(사용 가능 여부, 켜짐 여부,
              비활성화 여부, toggle, reset)를 반환하도록 통일. 툴바는 옵션 내부를 몰라도 같은
              방식으로 렌더
            </li>
            <li>
              최상위 뷰어는 콘텐츠 타입만 판별하고 렌더는 타입별 뷰어 컴포넌트에 위임. 타입별
              컴포넌트는 lazy로 나누고 각자 에러 경계로 감싸 오류 범위를 해당 타입 뷰어로 한정
            </li>
            <li>
              React unmount만으로는 엔진의 GPU 리소스가 풀리지 않아, 뷰어가 언마운트될 때 이펙트
              정리 함수에서 엔진 dispose를 호출하고 canvas를 직접 제거. 크기 변화는 window resize
              대신 ResizeObserver로 뷰어 컨테이너만 추적
            </li>
          </ul>
        </Step>
        <Step label="결과">
          화면 코드는 엔진 API를 직접 다루지 않고, 새 뷰잉 옵션이나 뷰어 타입은 정해진 인터페이스만
          맞추면 추가되는 구조
        </Step>
      </Thread>

      <Thread title="컴포넌트 구조">
        <Step label="문제">컨테이너 컴포넌트 비대화와 props drilling 증가</Step>
        <Step label="해결">
          <ul>
            <li>
              VAC 패턴으로 상태와 로직은 컨테이너와 훅에, 렌더링은 props만 받는 뷰 컴포넌트에 두는
              구조를 정하고 컨벤션 문서로 정리
            </li>
            <li>
              데이터 패칭이 필요한 부분은 별도 컴포넌트로 분리해 Suspense와 에러 경계를 컨테이너
              바깥에서 감쌈. 커스텀 훅은 도메인 하나의 로직만 담도록 분리
            </li>
          </ul>
        </Step>
      </Thread>
    </Item>
  );
}
