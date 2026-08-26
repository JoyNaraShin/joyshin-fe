import type { ReactNode } from "react";

/* 레일이 이 id 로 앵커를 건다. id 를 지우면 그 사례가 인덱스에서 사라진다. */
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
