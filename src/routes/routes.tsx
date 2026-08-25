import { RootLayout } from "@/layouts/RootLayout";
import { RouteError } from "@/routes/RouteError";
import type { RouteObject } from "react-router-dom";
import { lazyComponent } from "./lazyComponent";

/**
 * 라우트 트리. 페이지는 lazyComponent로 코드 스플리팅한다.
 * 신규 페이지: children에 { path, lazy: lazyComponent(() => import("@/pages/Foo"), (m) => m.FooPage) } 추가.
 * errorElement: 루트에 단 1개. 자식 렌더/로더 예외는 여기로 버블링되어 복구 UI를 보여준다.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        lazy: lazyComponent(
          () => import("@/pages/HomePage"),
          (m) => m.HomePage,
        ),
      },
      {
        path: "*",
        lazy: lazyComponent(
          () => import("@/pages/NotFoundPage"),
          (m) => m.NotFoundPage,
        ),
      },
    ],
  },
];
