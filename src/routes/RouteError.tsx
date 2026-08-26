import { Button } from "@/components/ui/Button";
import { paths } from "@/routes/paths";
import { useEffect } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

/**
 * 라우트 트리 최상단 errorElement — 렌더/로더에서 던져진 예외를 잡아
 * 백스크린(WSOD) 대신 복구 UI를 보여준다. 원본 에러는 콘솔에 남긴다.
 */
export function RouteError() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : undefined;

  // 렌더 본문에서 부르면 StrictMode 에서 두 번 찍히고 리렌더마다 다시 찍힌다.
  // 로그는 부수효과라 이펙트에서 한 번만 남긴다.
  useEffect(() => {
    console.error("RouteError:", error);
  }, [error]);

  return (
    <main id="main" className="mx-auto w-[min(860px,100%-48px)] py-24">
      <p className="font-mono text-t2 tracking-[0.08em] text-mark">{status ?? "오류"}</p>
      <h1 className="mt-2 text-t6 font-bold tracking-[-0.035em]">문제가 발생했습니다.</h1>
      <p className="mt-3 max-w-[46ch] text-t3 text-mute">
        예기치 못한 오류로 화면을 표시하지 못했습니다. 다시 시도하거나 홈으로 이동해 주세요.
      </p>
      <div className="mt-7 flex flex-wrap gap-2.5">
        <Button onClick={() => window.location.reload()}>다시 시도</Button>
        <Button variant="ghost" to={paths.home}>
          홈으로
        </Button>
      </div>
    </main>
  );
}
