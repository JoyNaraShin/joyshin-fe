import type { ReactNode } from "react";

/** 병렬로 놓이는 사실은 문단이 아니라 목록으로 둔다. */
export function Bullets({ children }: { children: ReactNode }) {
  return <ul className="blist">{children}</ul>;
}
