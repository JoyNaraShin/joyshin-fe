import { SideRail } from "@/features/portfolio";
import { Outlet, ScrollRestoration } from "react-router-dom";

/**
 * 셸 — 왼쪽 작업 인덱스 + 오른쪽 본문 한 단.
 * 상단 고정 바를 따로 두지 않는다. 같은 내비게이션을 두 군데 두면 둘 다 약해진다.
 *
 * `<ScrollRestoration>` 이 해시 착지와 스크롤 위치 복원을 맡는다. 직접 짠 훅이 있었는데
 * 라우터가 이미 하는 일이었다 — `location.hash` 로 엘리먼트를 찾아 scrollIntoView 한다.
 * 착지 위치 보정은 `base.css` 의 `[id]{scroll-margin-top}` 이 잡는다.
 *
 * 레일과 본문은 **한 덩어리로 묶어** 통째로 가운데 둔다(max-w-[1148px] = 레일 252 + 간격 56
 * + 지면 840). 레일만 화면 왼쪽 끝에 붙이고 본문을 따로 가운데 두면 둘 사이가 174px 벌어져
 * 남남으로 읽힌다. 1148 보다 좁은 화면에서는 예전처럼 화면에 꽉 찬다.
 *
 * grid item 의 기본 min-width 는 auto 라, 가로 스크롤 띠가 되는 레일이 내용 최소폭만큼
 * 칸을 벌려 지면 전체를 화면 밖으로 밀어낸다. 두 칸 모두 0 까지 줄어들 수 있게 둔다.
 */
export function RootLayout() {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1148px] grid-cols-[var(--rail-w)_minmax(0,1fr)] max-rail:max-w-none max-rail:grid-cols-[minmax(0,1fr)] print:block">
      <ScrollRestoration />
      <SideRail />
      {/* 1148 이상에서는 바깥 여백을 컨테이너의 mx-auto 가 준다. 그보다 좁으면 컨테이너가
          화면에 꽉 차므로 오른쪽 여백이 사라진다 — 그 구간에서만 안쪽에서 준다. */}
      <div className="flex min-w-0 flex-col max-[1148px]:pr-14 max-rail:pr-0">
        <Outlet />
      </div>
    </div>
  );
}
