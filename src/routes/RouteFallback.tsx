/**
 * 페이지 청크를 가져오는 동안의 자리. 라우터가 초기 하이드레이션에 쓰고,
 * 이후 전환에서는 RootLayout 의 Suspense 가 같은 것을 쓴다.
 * 높이만 잡아 둔다 — 스피너를 넣으면 대부분의 경우 깜빡임만 남는다.
 */
export function RouteFallback() {
  return <div className="wrap" style={{ padding: "96px 0" }} />;
}
