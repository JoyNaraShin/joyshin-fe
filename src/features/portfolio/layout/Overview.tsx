import type { ReactNode } from "react";

/**
 * 케이스 요약 — STAR 를 두괄식으로 뒤집은 배치다.
 *
 * lead 가 Result 다. 제목 바로 밑에 큰 글씨 한 줄로 두어 결론이 먼저 읽히게 하고,
 * 그 아래 박스가 상황(S) · 과제(T) · 한 것(A) 순으로 근거를 댄다.
 * 과제 칸에는 내 담당 경계를 적는다 — "우리 팀이"로 뭉뚱그리지 않기 위한 칸이다.
 *
 * 고른 이유 · 다시 한다면은 STAR 밖이지만 면접에서 사례마다 따라오는 질문이라 같은 박스에 둔다.
 * 답이 없는 칸은 넘긴다 — 지어내지 않는다.
 */
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
      <p className="ovlead">{lead}</p>
      <dl className="ov">
        <div>
          <dt>상황</dt>
          <dd>{situation}</dd>
        </div>
        <div>
          <dt>과제</dt>
          <dd>{task}</dd>
        </div>
        <div>
          <dt>한 것</dt>
          <dd>{action}</dd>
        </div>
        {why ? (
          <div>
            <dt>고른 이유</dt>
            <dd>{why}</dd>
          </div>
        ) : null}
        {again ? (
          <div>
            <dt>다시 한다면</dt>
            <dd>{again}</dd>
          </div>
        ) : null}
      </dl>
    </>
  );
}
