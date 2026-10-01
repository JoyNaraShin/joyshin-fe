import type { ReactNode } from "react";
import { SubHead } from "./SubHead";

/**
 * 한 갈래의 이야기. 문제와 해결, 결과를 같은 제목 아래 붙여 둔다.
 * 문제를 한곳에 모으고 해결을 따로 늘어놓으면 어떤 해결이 어떤 문제의 답인지 끊긴다.
 */
export function Thread({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <SubHead>{title}</SubHead>
      <dl className="mt-5 border-t border-rule">{children}</dl>
    </section>
  );
}

/** 갈래 안의 한 단계. 라벨은 문제, 해결, 결과처럼 짧게. */
export function Step({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-5 border-b border-rule py-4 max-card:grid-cols-1 max-card:gap-y-1">
      <dt className="pt-0.5 text-t2 font-semibold text-mark">{label}</dt>
      <dd
        className="min-w-0 text-t3 leading-[1.75] text-ink-2
          [&>ul]:list-none [&>ul>li]:relative [&>ul>li]:pl-4 [&>ul>li+li]:mt-1.5 [&>ul>li]:text-pretty
          [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[0.88em] [&>ul>li]:before:h-px [&>ul>li]:before:w-2 [&>ul>li]:before:bg-rule-3 [&>ul>li]:before:content-['']
          [&_code]:font-mono [&_code]:text-[13px]"
      >
        {children}
      </dd>
    </div>
  );
}
