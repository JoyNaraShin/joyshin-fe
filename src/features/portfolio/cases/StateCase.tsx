import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { StateBoundary, stateBoundaryFallback } from "../figures/StateBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function StateCase() {
  return (
    <Item index="03" id="case-state" source="CLO-SET" title="1차 서비스 리뉴얼">
      <Overview
        lead="서비스 확장에 맞춘 프론트엔드 구조 재설계. 모노레포 도구, 패키지 구조, 상태 관리 방식을 직접 결정하고 뷰어 전체를 설계, 개발"
        situation="MobX 싱글턴 스토어에 여러 화면의 상태가 한 인스턴스로 쌓이고, 스토어끼리 서로 참조"
        task="2023 하반기부터 2024 상반기. 리뉴얼 주도, 뷰어 설계와 개발"
        action="Yarn workspaces 모노레포, 관심사별 패키지 분리, 서버 상태와 UI 상태 분리, VAC 패턴 도입"
        why="서버 데이터를 스토어에 복제하면 갱신 때마다 캐시와 스토어를 함께 고쳐야 함. 서버 데이터의 출처를 TanStack Query 캐시 하나로 통일"
        again="MobX를 전부 걷어내지는 못함"
      />
      <SubHead>모노레포</SubHead>
      <Bullets>
        <li>팀의 학습 비용을 고려해 Turborepo나 Nx 없이 Yarn workspaces만으로 구성</li>
        <li>
          앱, 공유 UI, API 클라이언트, 빌드 설정을 패키지로 분리. API 클라이언트는 사내 다른
          서비스에서도 쓰도록 독립 패키지화
        </li>
        <li>3D, 2D, 렌더 뷰어 전체를 설계하고 개발</li>
      </Bullets>

      <SubHead>상태 관리의 문제</SubHead>
      <Bullets>
        <li>
          모듈 스코프 싱글턴 스토어라 화면 단위로 생성, 폐기되지 않고 여러 도메인의 상태가 한
          인스턴스에 누적
        </li>
        <li>
          <code>observer</code>의 자동 구독 때문에 어떤 필드가 어느 컴포넌트를 리렌더하는지
          호출부에서 보이지 않음
        </li>
        <li>스토어 간 상호 참조로 한 화면만 떼어내도 관련 없는 스토어까지 딸려 옴</li>
      </Bullets>

      <SubHead>상태 관리의 해결</SubHead>
      <Bullets>
        <li>
          서버 상태는 TanStack Query 캐시로 일원화. 저장 후 <code>invalidateQueries</code>로 다시
          받으면 모든 화면이 같은 값을 읽음
        </li>
        <li>
          UI 상태는 Recoil atom 단위로 분리. 컴포넌트는 읽는 atom이 바뀔 때만 리렌더되고, 파생
          상태는 원본을 읽는 한 방향으로만 의존
        </li>
        <li>
          컨테이너 컴포넌트 비대화와 props drilling을 줄이기 위해 VAC 패턴과 커스텀 훅 기반 로직
          분리 도입
        </li>
        <li>
          2025년 Recoil 유지보수 중단에 따라 2차 리뉴얼에서 팀원 주도로 atom 모델이 유사한 Jotai로
          이전
        </li>
      </Bullets>
      <Figure index="그림 3" caption="서버 상태와 UI 상태의 위치" fallback={stateBoundaryFallback}>
        <StateBoundary />
      </Figure>
    </Item>
  );
}
