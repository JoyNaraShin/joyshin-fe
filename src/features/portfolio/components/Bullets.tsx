import type { ReactNode } from "react";

/** 병렬로 놓이는 사실은 문단이 아니라 목록으로 둔다. */
export function Bullets({ children }: { children: ReactNode }) {
  return (
    /* 마커는 짧은 괘선 하나다. 점이나 숫자를 쓰면 순서가 있는 것처럼 읽힌다 — 여기 항목들은
       병렬이라 순서가 없다. */
    <ul
      className="mt-5 list-none text-ink-2
        [&>li]:relative [&>li]:mt-2.5 [&>li]:pl-5 [&>li]:text-t3 [&>li]:leading-[1.75] [&>li]:font-normal [&>li]:text-pretty
        [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.88em] [&>li]:before:h-px [&>li]:before:w-2.5 [&>li]:before:bg-rule-3 [&>li]:before:content-['']
        [&_b]:font-semibold [&_b]:text-ink
        [&_code]:bg-inset [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[13px]"
    >
      {children}
    </ul>
  );
}
