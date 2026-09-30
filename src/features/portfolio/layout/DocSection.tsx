import { type ReactNode, useRef } from "react";
import { useReveal } from "../hooks/useReveal";

/**
 * 섹션 공통 골격.
 *
 * 지면은 두 칼럼이다 — 왼쪽은 **매달린 레이블**(번호·출처·기간·그림 번호), 오른쪽은 본문.
 * 레이블이 본문 밖으로 나가 있어 본문 칼럼은 한 가지 폭만 유지하고, 도판은 레이블 칼럼까지
 * 먹어 본문보다 넓어진다. 위계를 색이나 테두리가 아니라 **폭 차이**가 진다.
 *
 * 카드는 쓰지 않는다. 흰 카드를 회색 지면 위에 띄우던 방식은 무엇이 중요한지를 말해 주지
 * 않는다 — 열다섯 장이 전부 같은 테두리, 같은 반경이면 그건 위계가 아니라 목록이다.
 *
 * 등장에 opacity 를 쓰지 않는다. 감추면 스크롤 없이 지면 전체를 렌더하는 경로
 * (링크 언펄·썸네일·자동 캡처)에서 관찰자가 영영 발화하지 않아 통째로 백지가 된다.
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
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      ref={ref}
      className="relative pt-30 last-of-type:pb-20 max-page:pt-20
        js:translate-y-3.5 js:transition-transform js:duration-600 js:ease-out js:revealed:translate-y-0
        motion-reduce:!translate-y-0 motion-reduce:!transition-none
        print:!translate-y-0 print:!transition-none print:pt-8"
    >
      <div className="mx-auto w-[min(1200px,100%-48px)] max-page:w-[min(1200px,100%-32px)] print:w-full">
        {/* 섹션 머리는 지면 폭을 다 쓴다. 본문 칼럼보다 넓은 것이 섹션임을 알린다. */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-ink/15 pb-5 print:break-after-avoid">
          <h2
            id={`${id}-title`}
            className="text-[clamp(32px,3.6vw,48px)] font-bold text-balance leading-[1.2] tracking-[-0.05em]"
          >
            {title}
          </h2>
          {/* 한글이 섞이므로 mono 를 쓰지 않는다 — 서체에 한글이 없어 자간이 벌어진다. */}
          {meta ? <p className="text-t2 font-normal tracking-[0.02em] text-mute">{meta}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

/**
 * 레이블이 매달리는 2칼럼. 사례·도판·경력이 전부 이 격자를 쓴다.
 * 좁은 폭에서는 레이블이 본문 위로 올라가 한 줄이 된다.
 */
export function Hang({
  label,
  children,
  className = "",
}: {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-[132px_minmax(0,1fr)] gap-x-9 max-page:grid-cols-1 max-page:gap-x-0 ${className}`}
    >
      {/* 인쇄에서 레이블이 쪽 경계에 걸리면 「03」만 앞 쪽에 남고 「CLO-SET」이 다음 쪽으로 갔다(실측).
          `article` 에 걸면 사례가 한 쪽보다 커서 빈 쪽이 생기므로 레이블 칸에만 건다. */}
      <div className="pt-1 text-t1 leading-[1.6] text-mute max-page:mb-2 max-page:pt-0 print:break-inside-avoid">
        {label}
      </div>
      <div className="min-w-0 max-w-[760px]">{children}</div>
    </div>
  );
}
