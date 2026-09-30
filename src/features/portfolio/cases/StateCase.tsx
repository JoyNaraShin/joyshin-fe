import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { StateBoundary } from "../figures/StateBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function StateCase() {
  return (
    <Item id="case-state" source="CLO-SET" title="1차 서비스 리뉴얼">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          MobX 싱글턴 스토어에 여러 화면의 상태가 한 인스턴스로 쌓이고, 화면을 벗어나도 상태가 남음
        </li>
        <li>스토어끼리 서로 참조해 화면 하나만 떼어내도 관련 없는 스토어까지 따라옴</li>
        <li>observer 자동 구독 때문에 리렌더 원인 추적이 어려움</li>
        <li>컨테이너 컴포넌트가 비대해지고 props drilling이 늘어남</li>
      </Bullets>

      <SubHead>모노레포</SubHead>
      <Bullets>
        <li>팀의 학습 비용을 고려해 Turborepo나 Nx 없이 Yarn workspaces만으로 구성</li>
        <li>
          앱, 공유 UI, API 클라이언트, 빌드 설정을 패키지로 분리. API 클라이언트는 사내 다른
          서비스에서도 쓰도록 독립 패키지화
        </li>
      </Bullets>

      <SubHead>상태 관리</SubHead>
      <Bullets>
        <li>
          서버 데이터는 TanStack Query 캐시에만 두고, 저장 후 <code>invalidateQueries</code>로
          재조회
        </li>
        <li>UI 상태는 Recoil atom 단위로 분리. 파생 값은 selector로만 계산</li>
        <li>VAC 패턴과 커스텀 훅으로 컨테이너 컴포넌트의 로직을 분리</li>
        <li>
          2025년 Recoil 유지보수 중단에 따라 2차 리뉴얼에서 팀원 주도로 atom 모델이 유사한 Jotai로
          이전
        </li>
      </Bullets>
      <Figure caption="서버 상태와 UI 상태를 두는 위치" narrow="hide">
        <StateBoundary />
      </Figure>

      <SubHead>뷰어</SubHead>
      <Bullets>
        <li>3D, 2D, 렌더 뷰어 전체를 설계하고 개발</li>
      </Bullets>

      <SubHead>결과</SubHead>
      <Bullets>
        <li>서버 상태는 TanStack Query 캐시, UI 상태는 Recoil로 나뉜 구조로 전환</li>
        <li>MobX는 전부 걷어내지 못하고 일부 화면에 남음</li>
      </Bullets>
      <Overview why="서버 데이터가 스토어에도 복제돼 저장할 때마다 캐시와 스토어를 함께 수정해야 했음" />
    </Item>
  );
}
