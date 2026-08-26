import { StateBoundary } from "../figures/StateBoundary";
import { Bullets } from "../layout/Bullets";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";
import { Overview } from "../layout/Overview";

/** 서버 데이터와 화면 상태 분리. */
export function StateCase() {
  return (
    <Item id="case-state" source="CLO-SET" title="서버 데이터와 화면 상태 분리">
      <Overview
        owned="뷰어를 감싼 화면의 상태 구조"
        problem="Mobx 스토어가 모듈 스코프 싱글턴으로 커지면서 여러 도메인의 상태가 한 인스턴스에 누적됐고, 스토어마다 같은 보일러플레이트가 반복됐습니다."
        did="서버 상태는 TanStack Query 단일 출처로, 화면 상태는 관심사 단위로 분리"
        result="서버 응답을 전역 스토어로 복사해 두던 중복 상태를 없애고, 화면 상태는 패널 단위로 독립시켰습니다."
      />
      <Bullets>
        <li>서버에서 받은 데이터는 TanStack Query에만 두고 전역 상태로 복사하지 않습니다.</li>
        <li>
          화면 상태는 관심사 단위로 쪼개, 뷰어와 사이드 패널이 각자 자기 상태만 들고 있게 했습니다.
        </li>
        <li>
          Mobx 스토어는 모듈 스코프의 싱글턴 인스턴스라, 화면이 늘수록 서로 다른 도메인의 상태가 한
          인스턴스에 누적됩니다. 구독은 <code>observer</code> 컴포넌트가 렌더 중 읽은 필드에
          자동으로 걸리기 때문에, 어떤 필드의 변경이 어느 컴포넌트를 리렌더시키는지 호출부만 봐서는
          추적되지 않습니다.
        </li>
        <li>
          스토어끼리 참조를 주고받기 시작하면 의존이 양방향으로 얽혀 화면 단위로 떼어낼 수 없습니다.
          도메인 단위로 스토어를 쪼개고 각 화면이 자기 것만 들고 있게 하면 이 결합이 애초에 생기지
          않습니다.
        </li>
      </Bullets>

      <Figure
        index="그림 6"
        caption="상태를 어디에 두었는지 그린 도식입니다."
        note="서버에서 온 값은 한 곳에만 두고 화면이 들고 있는 값은 화면마다 따로 뒀습니다."
      >
        <StateBoundary />
      </Figure>
    </Item>
  );
}
