import { SiteHeader } from "@/features/portfolio";
import { Outlet, ScrollRestoration } from "react-router-dom";

/**
 * 셸 — 상단 띠 하나와 본문.
 *
 * `<ScrollRestoration>` 이 해시 착지와 스크롤 위치 복원을 맡는다. 다른 페이지에서
 * 「AI」, 「연락처」를 눌러 `/#ai`, `/#contact` 로 올 때도 같은 장치가 섹션을 찾아 내려 준다.
 * 착지 위치 보정은 `base.css` 의 `[id]{scroll-margin-top}` 이 잡는다.
 */
export function RootLayout() {
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
