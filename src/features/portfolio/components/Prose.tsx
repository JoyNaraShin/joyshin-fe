import type { ReactNode } from "react";

/** 목록으로 쪼갤 수 없는 설명 문단. 병렬 사실은 `Bullets` 가 받는다. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 text-t3 leading-[1.75] font-normal text-pretty text-ink-2 [&>p+p]:mt-3.5 [&_b]:font-semibold [&_b]:text-ink">
      {children}
    </div>
  );
}
