import type { ReactNode } from "react";

/**
 * 케이스 요약 — STAR 를 두괄식으로 뒤집은 배치다.
 *
 * lead 가 Result 다. 제목 바로 밑에 큰 글씨 한 줄로 두어 결론이 먼저 읽히게 하고,
 * 그 아래 박스가 문제(S) · 맡은 범위(T) · 해결(A) 순으로 근거를 댄다.
 * 맡은 범위 칸에는 내 담당 경계를 적는다 — "우리 팀이"로 뭉뚱그리지 않기 위한 칸이다.
 *
 * 라벨은 「문제 / 맡은 범위 / 해결」이다. 본문 소제목이 「문제 / 해결」이라 같은 것을 두 어휘로
 * 부르면 요약 박스가 본문과 따로 논다.
 *
 * 고른 이유 · 다시 한다면은 STAR 밖이지만 면접에서 사례마다 따라오는 질문이라 같은 박스에 둔다.
 * 답이 없는 칸은 넘긴다 — 지어내지 않는다.
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

export function Overview({
  lead,
  situation,
  task,
  action,
  why,
  again,
}: {
  lead: ReactNode;
  situation: string;
  task: string;
  action: ReactNode;
  why?: ReactNode;
  again?: ReactNode;
}) {
  return (
    <>
      <p className="mt-4 text-t4 font-medium text-balance leading-[1.55] tracking-[-0.028em] text-ink [&_.num]:text-t3 [&_.num]:tracking-[-0.01em]">
        {lead}
      </p>
      <dl className="mt-7 border-t border-ink">
        <Row term="문제">{situation}</Row>
        <Row term="맡은 범위">{task}</Row>
        <Row term="해결">{action}</Row>
        {why ? <Row term="고른 이유">{why}</Row> : null}
        {again ? <Row term="다시 한다면">{again}</Row> : null}
      </dl>
    </>
  );
}
