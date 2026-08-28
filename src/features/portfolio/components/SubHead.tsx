import type { ReactNode } from "react";

/*
 * 사례 안의 소제목. 키라인 없이 크기·굵기·색으로만 층을 만든다.
 * mono + 0.14em + uppercase 였는데 셋 다 한글에 안 맞았다 — 서체엔 한글이 없어 Sans KR 로
 * 떨어지고, 자간만 남아 벌어져 보이고, uppercase 는 아무 일도 하지 않는다.
 */
export function SubHead({ children }: { children: ReactNode }) {
  return <h4 className="mt-9 text-t2 font-semibold tracking-[0.01em] text-mark">{children}</h4>;
}
