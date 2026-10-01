import { Button } from "@/components/ui/Button";
import { paths } from "@/routes/paths";
import { useEffect } from "react";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "페이지를 찾을 수 없음 — 신나라";
    return () => {
      document.title = "신나라 JoyNara — 프론트엔드 개발자";
    };
  }, []);
  return (
    <main
      id="main"
      className="mx-auto w-[min(720px,100%-48px)] py-24 max-page:w-[min(720px,100%-32px)]"
    >
      <p className="font-mono text-t2 tracking-[0.08em] text-mark">404</p>
      <h1 className="mt-2 text-t6 font-bold tracking-[-0.035em]">페이지를 찾을 수 없습니다.</h1>
      <p className="mt-3 max-w-[46ch] text-t3 text-mute">주소를 다시 확인해 주세요.</p>
      <div className="mt-7">
        <Button variant="ghost" to={paths.home}>
          홈으로 돌아가기 →
        </Button>
      </div>
    </main>
  );
}
