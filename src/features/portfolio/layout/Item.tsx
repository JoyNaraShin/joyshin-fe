import type { ReactNode } from "react";

/** 섹션 안의 사례 하나. 앵커로 링크되므로 id를 받는다. */
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
