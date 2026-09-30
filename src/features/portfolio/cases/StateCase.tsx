import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { StateBoundary, stateBoundaryFallback } from "../figures/StateBoundary";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function StateCase() {
  return (
    <Item index="03" id="case-state" source="CLO-SET" title="서버 데이터와 화면 상태 분리">
      <Overview
        lead="1차 서비스 리뉴얼에서 서버 상태는 TanStack Query 캐시로, UI 상태는 Recoil 로 나눴습니다."
        situation="MobX 스토어가 커지면서 여러 도메인의 상태가 한 인스턴스에 누적됐습니다. 스토어마다 같은 보일러플레이트도 반복됐습니다."
        task="1차 서비스 리뉴얼(2023 하반기부터 2024 상반기). 프론트엔드 세 명이 함께 주도했고, 저는 뷰어 전체를 설계하고 개발"
        action="서버 상태는 TanStack Query 캐시 한 곳에, UI 상태는 atom 단위로 분리. 컨테이너 컴포넌트의 로직은 VAC 패턴과 커스텀 훅으로 분리"
        why="서버 데이터를 스토어에도 복제해 두면 갱신할 때마다 두 곳을 같이 고쳐야 했습니다. 캐시를 한 곳으로 두면 남는 것은 화면이 스스로 가진 상태뿐입니다."
        again="MobX 를 전부 걷어내지는 못했습니다."
      />
      {/* 사례 공통 형식 — SubHead 로 문제와 해결을 가르고, 항목은 <b>라벨</b> — 문장. */}
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          <b>스토어 수명</b> — MobX 스토어가 모듈 스코프 싱글턴이라 인스턴스가 화면 단위로
          생성·폐기되지 않고, 화면이 늘수록 서로 다른 도메인의 상태가 한 인스턴스에 누적됐습니다.
        </li>
        <li>
          <b>암묵 구독</b> — <code>observer</code> 는 렌더 중 읽은 필드에 구독을 자동으로 겁니다.
          구독을 손으로 관리하지 않아도 되는 대신, 어떤 필드가 어느 컴포넌트를 리렌더시키는지가
          호출부에 드러나지 않습니다.
        </li>
        <li>
          <b>양방향 결합</b> — 스토어가 서로를 참조하면 순환 의존이 생기고, 의존이 전이돼 한 화면만
          떼어내도 관련 없는 스토어까지 함께 끌려옵니다. 화면 단위로 모듈 경계가 서지 않습니다.
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          <b>서버 상태</b> — TanStack Query 캐시 하나만 서버 데이터의 출처로 뒀습니다. 같은 데이터를
          전역 스토어에도 담아 두면, 저장 뒤 <code>invalidateQueries</code> 로 캐시를 새로 받아와도
          스토어 값은 그대로입니다. 갱신할 때마다 두 곳을 같이 고쳐야 하고, 한 곳을 빠뜨리면 그
          데이터를 스토어에서 읽는 화면만 옛 값을 그립니다.
        </li>
        <li>
          <b>화면 상태</b> — 남은 것은 Recoil atom 단위로 쪼갰습니다.{" "}
          <code>useRecoilValue(atom)</code> 으로 무엇을 읽는지 호출부에 적히고, 리렌더는 그 atom 을
          읽는 컴포넌트로만 갑니다. 파생 상태가 원본을 읽는 한 방향으로만 의존이 생깁니다.
        </li>
        <li>
          <b>이후</b> — 2025년 Recoil 유지보수가 끊기면서, 2차 리뉴얼에서 다른 팀원이 주도해 Recoil
          코드를 같은 atom 기반 모델인 Jotai 로 옮겼습니다.
        </li>
      </Bullets>
      <Figure
        index="그림 3"
        caption="상태를 어디에 두었는지 그린 도식입니다."
        fallback={stateBoundaryFallback}
      >
        <StateBoundary />
      </Figure>
    </Item>
  );
}
