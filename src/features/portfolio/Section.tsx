import { useReveal } from "@/lib/useReveal";
import { type ReactNode, useRef } from "react";

/**
 * 섹션 공통 골격 — 왼쪽 라벨(sticky) + 본문 2단.
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
  meta?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id={id} className="doc rise" ref={ref}>
      <div className="sec">
        <div className="head">
          <h2>{title}</h2>
          {meta ? <p>{meta}</p> : null}
        </div>
        <div className="secbody">{children}</div>
      </div>
    </section>
  );
}

export function Item({
  id,
  source,
  title,
  children,
}: {
  id?: string;
  source?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="item" id={id}>
      {source ? <p className="src">{source}</p> : null}
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export function Figure({
  index,
  caption,
  note,
  children,
}: {
  index: string;
  caption: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure>
      <figcaption>
        <b>{index}</b>
        {caption}
      </figcaption>
      {children}
      {note ? <p className="fignote">{note}</p> : null}
    </figure>
  );
}
