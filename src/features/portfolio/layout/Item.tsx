import { type ReactNode, createContext, use } from "react";
import { Hang } from "./DocSection";

/**
 * 케이스 페이지 안에서는 제목과 레이블을 페이지 머리가 이미 그린다.
 * 그 안에 놓인 사례 컴포넌트는 본문만 내놓는다.
 */
export const BareItem = createContext(false);

/* 레일이 이 id 로 앵커를 건다. id 를 지우면 그 사례가 인덱스에서 사라진다. */
export function Item({
  id,
  index,
  source,
  title,
  children,
}: {
  id?: string;
  /** 사례 순번. 사례는 실제로 순서가 있는 목록이라 번호가 정보를 진다. */
  index?: string;
  source?: string;
  title: string;
  children: ReactNode;
}) {
  if (use(BareItem)) return <div id={id}>{children}</div>;
  return (
    /* 카드가 아니다. 사례 사이는 여백이 가르고, 레이블만 본문 밖에 매달린다. */
    <article className="mt-18 first:mt-14 max-page:mt-14" id={id}>
      <Hang
        label={
          <>
            {index ? (
              <span className="block font-mono text-t2 font-medium tracking-[0.08em] text-mark">
                {index}
              </span>
            ) : null}
            {source ? (
              <span className="mt-1 block font-mono text-t1 tracking-[0.09em]">{source}</span>
            ) : null}
          </>
        }
      >
        <h3 className="text-t5 font-semibold text-balance leading-[1.32] tracking-[-0.03em] text-ink">
          {title}
        </h3>
        {children}
      </Hang>
    </article>
  );
}
