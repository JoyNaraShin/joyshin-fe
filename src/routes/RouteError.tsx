import { Button } from "@/components/ui/Button";
import { paths } from "@/routes/paths";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

/**
 * 라우트 트리 최상단 errorElement — 렌더/로더에서 던져진 예외를 잡아
 * 백스크린(WSOD) 대신 복구 UI를 보여준다. 원본 에러는 콘솔에 남긴다.
 */
export function RouteError() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : undefined;

  // 관측 가능성 훅이 붙기 전까지 최소한 콘솔에는 원본을 남긴다.
  console.error("RouteError:", error);

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-brand">{status ?? "오류"}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">문제가 발생했습니다.</h1>
      <p className="mt-3 text-muted">
        예기치 못한 오류로 화면을 표시하지 못했습니다. 다시 시도하거나 홈으로 이동해 주세요.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => window.location.reload()}>다시 시도</Button>
        <Button variant="ghost" to={paths.home}>
          홈으로
        </Button>
      </div>
    </section>
  );
}
