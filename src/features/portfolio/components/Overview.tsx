import type { ReactNode } from "react";

/**
 * 사례 끝에 붙는 판단 칸. 결론과 맡은 일은 케이스 페이지 머리와 옆 칸이 이미 말하므로
 * 여기에는 본문 불릿이 답하지 않는 두 가지만 둔다 — 왜 그렇게 골랐나, 무엇이 아쉬웠나.
 * 답이 없는 칸은 넘긴다.
 */
function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-[18px] border-b border-rule py-3 max-card:grid-cols-1 max-card:gap-0.5 max-card:py-[9px]">
      <dt className="whitespace-nowrap text-t1 text-mute">{term}</dt>
      <dd className="text-t3 font-normal text-pretty leading-[1.7] text-ink-2 max-card:text-sm">
        {children}
      </dd>
    </div>
  );
}

export function Overview({ why, regret }: { why?: ReactNode; regret?: ReactNode }) {
  if (!why && !regret) return null;
  return (
    <dl className="mt-12 border-t border-ink">
      {why ? <Row term="고른 이유">{why}</Row> : null}
      {regret ? <Row term="아쉬운 점">{regret}</Row> : null}
    </dl>
  );
}
