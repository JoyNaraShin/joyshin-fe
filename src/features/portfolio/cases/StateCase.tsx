import { Bullets } from "../components/Bullets";
import { SubHead } from "../components/SubHead";
import { Step, Thread } from "../components/Thread";
import { Item } from "../layout/Item";

export function StateCase() {
  return (
    <Item id="case-state" source="CLO-SET" title="1차 서비스 리뉴얼">
      <SubHead>범위</SubHead>
      <Bullets>
        <li>
          서비스 확장에 맞춘 프론트엔드 구조 재설계. 모노레포 도구, 패키지 구조, 상태 관리 방식을
          직접 결정
        </li>
        <li>리뉴얼한 앱에서 3D, 2D, 렌더 뷰어 전체를 설계하고 개발</li>
      </Bullets>

      <Thread title="모노레포">
        <Step label="결정">
          팀의 학습 비용을 고려해 Turborepo나 Nx 없이 Yarn workspaces만으로 구성
        </Step>
        <Step label="구성">
          <ul>
            <li>앱, 공유 UI, API 클라이언트, 빌드 설정을 패키지로 분리</li>
            <li>API 클라이언트는 사내 다른 서비스에서도 쓰도록 독립 패키지화</li>
          </ul>
        </Step>
      </Thread>

      <Thread title="상태 관리">
        <Step label="문제">
          <ul>
            <li>
              MobX 스토어가 모듈 스코프 싱글턴이라 화면 단위로 만들어지고 사라지지 않음. 화면이
              늘수록 여러 도메인의 상태가 한 인스턴스에 누적
            </li>
            <li>
              스토어끼리 서로 참조해 순환 의존이 생기고, 화면 하나만 떼어내도 관련 없는 스토어까지
              따라옴
            </li>
            <li>
              서버 데이터를 스토어에도 복제해 두어, 저장 후 캐시를 다시 받아도 스토어 값은 그대로.
              갱신할 때마다 두 곳을 함께 고쳐야 했음
            </li>
            <li>
              <code>observer</code>가 렌더 중 읽은 필드를 자동으로 구독해, 어떤 필드가 어느
              컴포넌트를 리렌더하는지 호출부에 드러나지 않음
            </li>
          </ul>
        </Step>
        <Step label="해결">
          <ul>
            <li>
              서버 데이터는 TanStack Query 캐시 하나에만 두고 스토어에 복제하지 않음. 저장 후에는{" "}
              <code>invalidateQueries</code>로 재조회
            </li>
            <li>
              UI 상태는 Recoil atom 단위로 분리. 컴포넌트가 무엇을 읽는지 호출부에 드러나고,
              리렌더는 그 atom을 읽는 컴포넌트로만 감
            </li>
            <li>파생 값은 selector로만 계산해 원본 atom을 읽는 한 방향 의존으로 정리</li>
          </ul>
        </Step>
        <Step label="이후">
          <ul>
            <li>
              2025년 Recoil 유지보수 중단에 따라 2차 리뉴얼에서 팀원 주도로 atom 모델이 유사한
              Jotai로 이전
            </li>
            <li>MobX는 전부 걷어내지 못하고 일부 화면에 남음</li>
          </ul>
        </Step>
      </Thread>

      <Thread title="컴포넌트 구조">
        <Step label="문제">컨테이너 컴포넌트가 비대해지고 props drilling이 늘어남</Step>
        <Step label="해결">VAC 패턴과 커스텀 훅 기반 로직 분리를 조사하고 도입</Step>
      </Thread>
    </Item>
  );
}
