import { RootLayout } from "@/layouts/RootLayout";
import { CasePage } from "@/pages/CasePage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RouteError } from "@/routes/RouteError";
import type { RouteObject } from "react-router-dom";

/**
 * 라우트 트리. 홈과 케이스 페이지 둘뿐이고 둘 다 가벼워 코드 스플리팅을 두지 않는다.
 *
 * 홈을 lazy 로 두면 첫 방문자가 반드시 받는 청크를 굳이 한 왕복 뒤로 미루게 된다.
 * 그리고 `<ScrollRestoration>` 은 useLayoutEffect 한 번만 돌기 때문에, 그 시점에
 * 청크가 아직 안 와 있으면 `#career` 같은 딥링크가 최상단으로 떨어진다.
 * 즉 스플리팅이 벌어 주는 것은 없고 잃는 것만 둘이었다.
 *
 * errorElement: 루트에 단 1개. 자식 렌더 예외는 여기로 버블링된다.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "work/:slug", element: <CasePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
