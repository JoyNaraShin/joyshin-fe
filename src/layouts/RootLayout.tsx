import { SideRail, SiteFooter } from "@/features/portfolio";
import { Outlet, ScrollRestoration } from "react-router-dom";

/**
 * 셸 — 왼쪽 작업 인덱스 + 오른쪽 본문 한 단.
 * 상단 고정 바를 따로 두지 않는다. 같은 내비게이션을 두 군데 두면 둘 다 약해진다.
 *
 * `<ScrollRestoration>` 이 해시 착지와 스크롤 위치 복원을 맡는다. 직접 짠 훅이 있었는데
 * 라우터가 이미 하는 일이었다 — `location.hash` 로 엘리먼트를 찾아 scrollIntoView 한다.
 * 착지 위치 보정은 CSS 쪽 `[id]{scroll-margin-top}` 이 잡는다.
 */
export function RootLayout() {
  return (
    <div className="shell">
      <ScrollRestoration />
      <SideRail />
      <div className="col">
        <Outlet />
        <SiteFooter />
      </div>
    </div>
  );
}
