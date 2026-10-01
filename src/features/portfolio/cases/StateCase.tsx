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
        <li>리뉴얼 앱의 3D, 2D, 렌더 뷰어 전체 설계와 개발</li>
      </Bullets>

      <Thread title="모노레포">
        <Step label="결정">팀 학습 비용을 고려해 Turborepo, Nx 없이 Yarn workspaces로 구성</Step>
        <Step label="구성">
          <ul>
            <li>앱, 공유 UI, API 클라이언트, 빌드 설정을 패키지로 분리</li>
            <li>API 클라이언트를 독립 패키지로 분리해 사내 다른 서비스에서 재사용</li>
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

      <Thread title="컴포넌트 구조">
        <Step label="문제">컨테이너 컴포넌트 비대화와 props drilling 증가</Step>
        <Step label="해결">VAC 패턴과 커스텀 훅으로 뷰와 로직 분리</Step>
      </Thread>
    </Item>
  );
}
