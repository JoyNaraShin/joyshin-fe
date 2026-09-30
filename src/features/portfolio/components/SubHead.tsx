import type { ReactNode } from "react";

/* 사례 안의 소제목. 본문보다 커야 문제, 해결, 결과로 훑을 수 있다. */
export function SubHead({ children }: { children: ReactNode }) {
  return (
    <h4 className="mt-14 border-t border-rule pt-6 text-t4 font-bold tracking-[-0.02em] text-ink first:mt-0">
      {children}
    </h4>
  );
}
