import type { ReactNode } from "react";

/** 블로그 본문 폭. 모든 섹션과 글이 같은 한 단을 쓴다. */
export const COLUMN = "mx-auto w-[min(720px,100%-48px)] max-page:w-[min(720px,100%-32px)]";

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
  return (
    <section aria-labelledby={`${id}-title`} className={`${COLUMN} pt-20 max-page:pt-16`} id={id}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-t5 font-bold tracking-[-0.03em]" id={`${id}-title`}>
          {title}
        </h2>
        {meta ? <p className="text-t2 text-mute">{meta}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** 왼쪽에 날짜 같은 짧은 레이블을 매다는 두 칸. 레이블이 없으면 한 단이다. */
export function Hang({
  label,
  children,
  className = "",
}: {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  if (!label) return <div className={className}>{children}</div>;
  return (
    <div
      className={`grid grid-cols-[120px_minmax(0,1fr)] gap-x-6 max-card:grid-cols-1 max-card:gap-y-1 ${className}`}
    >
      <div className="pt-0.5 text-t2 text-mute">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
