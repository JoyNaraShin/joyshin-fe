import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { StateBoundary, stateBoundaryFallback } from "../figures/StateBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function StateCase() {
  return (
    <Item id="case-state" source="CLO-SET" title="1차 서비스 리뉴얼">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          MobX 싱글턴 스토어에 여러 화면의 상태가 한 인스턴스로 쌓임. 화면 단위로 만들고 버리는
          구조가 아님
        </li>
        <li>스토어끼리 서로 참조해 화면 하나만 떼어내도 관련 없는 스토어까지 따라옴</li>
        <li>
          <code>observer</code>가 렌더 중 읽은 필드를 자동 구독해, 어떤 값이 어느 컴포넌트를
          리렌더하는지 코드에서 보이지 않음
        </li>
        <li>컨테이너 컴포넌트가 비대해지고 props drilling이 늘어남</li>
      </Bullets>

      <SubHead>모노레포</SubHead>
      <Bullets>
        <li>팀의 학습 비용을 고려해 Turborepo나 Nx 없이 Yarn workspaces만으로 구성</li>
        <li>
          앱, 공유 UI, API 클라이언트, 빌드 설정을 패키지로 분리. API 클라이언트는 사내 다른
          서비스에서도 쓰도록 독립 패키지화
        </li>
        <li>3D, 2D, 렌더 뷰어 전체를 설계하고 개발</li>
      </Bullets>

      <SubHead>상태 관리</SubHead>
      <Bullets>
        <li>
          서버 데이터는 TanStack Query 캐시에만 둠. 저장 후 <code>invalidateQueries</code>로 다시
          받으면 모든 화면이 같은 값을 읽음
        </li>
        <li>UI 상태는 Recoil atom 단위로 분리. 파생 값은 selector로만 계산</li>
        <li>VAC 패턴과 커스텀 훅으로 컨테이너 컴포넌트의 로직을 분리</li>
        <li>2025년 Recoil 유지보수 중단 후, 2차 리뉴얼에서 atom 모델이 유사한 Jotai로 이전</li>
      </Bullets>
      <Figure caption="서버 상태와 UI 상태를 두는 위치" fallback={stateBoundaryFallback}>
        <StateBoundary />
      </Figure>
      <Overview
        why="서버 데이터를 스토어에도 복제하면 저장할 때마다 캐시와 스토어를 같이 고쳐야 했음"
        regret="MobX를 전부 걷어내지는 못함"
      />
    </Item>
  );
}
