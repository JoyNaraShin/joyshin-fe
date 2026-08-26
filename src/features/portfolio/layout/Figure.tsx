import type { ReactNode } from "react";

/** 도판. note는 캡션이 아니라 측정 조건·한계처럼 본문에 섞으면 흐름을 끊는 것만 받는다. */
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
