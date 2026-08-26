import type { ReactNode } from "react";

/**
 * 케이스 요약 — 역할 / 문제 / 한 것 / 결과 네 줄.
 * 조사한 채용 포폴이 공통으로 두는 자리다. 본문을 읽지 않아도 여기서 끝나야 한다.
 */
export function Overview({
  owned,
  problem,
  did,
  result,
}: {
  owned: string;
  problem: string;
  did: ReactNode;
  result: ReactNode;
}) {
  return (
    <dl className="ov">
      <div>
        <dt>역할</dt>
        <dd>{owned}</dd>
      </div>
      <div>
        <dt>문제</dt>
        <dd>{problem}</dd>
      </div>
      <div>
        <dt>한 것</dt>
        <dd>{did}</dd>
      </div>
      <div>
        <dt>결과</dt>
        <dd>{result}</dd>
      </div>
    </dl>
  );
}
