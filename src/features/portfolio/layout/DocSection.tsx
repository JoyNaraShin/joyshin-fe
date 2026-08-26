import { type ReactNode, useRef } from "react";
import { useReveal } from "../hooks/useReveal";

/**
 * 섹션 공통 골격 — 지면 폭을 쓰는 머리(제목 + 오른쪽 사실) + 본문 1단.
 * 왼쪽 sticky 라벨 칸을 쓰던 구조였는데, 섹션 제목이 그 안의 사례 제목보다 작아
 * 위계가 뒤집혀 있었다. 제목을 지면 폭으로 올려 층을 만든다.
 * 화면에 들어올 때 나타나는 것도 여기서 한 번만 처리한다.
 */
export function DocSection({
  id,
  title,
  meta,
  children,
}: {
  id: string;
  title: string;
  /** 오른쪽에 붙는 사실 한 줄 — 출처·건수·기간. 문장이 아니라 표시다. */
  meta?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id={id} className="doc rise" aria-labelledby={`${id}-title`} ref={ref}>
      <div className="sec">
        <div className="shead">
          <h2 id={`${id}-title`}>{title}</h2>
          {meta ? <p className="smeta">{meta}</p> : null}
        </div>
        <div className="secbody">{children}</div>
      </div>
    </section>
  );
}
