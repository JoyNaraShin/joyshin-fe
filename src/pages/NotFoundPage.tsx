import { paths } from "@/routes/paths";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">페이지를 찾을 수 없습니다.</h1>
      <Link to={paths.home} className="mt-6 inline-block text-brand hover:underline">
        홈으로 돌아가기 →
      </Link>
    </section>
  );
}
