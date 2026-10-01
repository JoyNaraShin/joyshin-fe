import { SiteHeader } from "@/features/portfolio";
import { useLayoutEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigationType } from "react-router-dom";

/**
 * 셸 — 상단 띠 하나와 본문.
 *
 * `<ScrollRestoration>` 이 해시 착지와 스크롤 위치 복원을 맡는다. 다른 페이지에서
 * 「AI」, 「연락처」를 눌러 `/#ai`, `/#contact` 로 올 때도 같은 장치가 섹션을 찾아 내려 준다.
 * 착지 위치 보정은 `base.css` 의 `[id]{scroll-margin-top}` 이 잡는다.
 *
 * 링크를 눌러 다른 페이지로 갈 때(해시 없는 PUSH, REPLACE)는 새 페이지를 맨 위에서 즉시 시작한다.
 * html 의 smooth scroll 이 끼어들면 페이지가 열린 뒤 화면이 미끄러지듯 올라가 거슬리기 때문이다.
 * 뒤로 가기(POP)는 이전 위치 복원을 그대로 둔다. 작업 글은 CasePage 가 뒤로 가기에도 맨 위로 보낸다.
 */
export function RootLayout() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  // biome-ignore lint/correctness/useExhaustiveDependencies: 경로가 바뀔 때마다 다시 맨 위로 보내야 해서 pathname 이 필요하다
  useLayoutEffect(() => {
    if (hash || navType === "POP") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navType]);

  return (
    <div className="min-h-screen">
      <ScrollRestoration />
      <SiteHeader />
      <Outlet />
      <footer className="mx-auto mt-16 flex w-[min(720px,100%-48px)] flex-wrap justify-between gap-2 border-t border-rule py-8 text-t2 text-mute max-page:w-[min(720px,100%-32px)] print:hidden">
        <span>© 2026 신나라 JoyNara</span>
        <span>서비스 화면 캡처 출처 CLO-SET 헬프센터</span>
      </footer>
    </div>
  );
}
