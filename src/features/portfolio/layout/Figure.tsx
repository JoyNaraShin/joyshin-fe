import type { ReactNode } from "react";

/* note 는 측정 조건·한계처럼 본문에 섞으면 흐름을 끊는 것만 받는다. 캡션과 다른 칸이다. */
export function Figure({
  index,
  caption,
  note,
  fallback,
  children,
}: {
  index: string;
  caption: string;
  note?: ReactNode;
  /*
   * 좁은 폭에서 도식 대신 읽히는 문단. 이 칸을 채운 도판만 fig 브레이크포인트 아래에서
   * 그림을 접는다 — 채우지 않은 도판(계측 막대)은 좁은 폭에서도 그대로 그린다.
   */
  fallback?: ReactNode;
  children: ReactNode;
}) {
  return (
    /*
     * 도판은 레이블 칼럼(112 + 간격 36)까지 당겨 **지면 폭 840 을 통째로** 쓴다.
     * 섹션 제목과 같은 선에서 시작하므로, 들여쓴 본문 692 보다 넓은 것이 눈에 보인다.
     *
     * 캡션을 레이블 칼럼에 매달았던 배치는 걷어냈다(실측) — 그 칼럼은 mono 인덱스
     * (`01` `CLO-SET` `2022.04 – 2026.04`)용 112px 이라 산문이 들어가면 한 줄 13자가 된다.
     * 그림 1 옆에 세로 10줄짜리 글 리본이 서서 도판보다 먼저 읽혔다.
     * 캡션은 도판 아래 한 줄로 내리고 폭은 본문과 같게 캡한다.
     *
     * 접는 판단은 여기 한 곳에서만 한다(실측) — 전에는 각 도판이 svg 만 숨기고 캡션은
     * `Figure` 에 남아, 좁은 폭에서 「그림 4 · … 나란히 그린 도식입니다」가 그림 없이 떴다.
     * 번호와 캡션은 그림을 가리키는 말이라 그림과 같이 접는다. note 는 측정 조건·한계라
     * 그림 유무와 무관하게 남는다.
     */
    <figure className="-ml-[148px] mt-12 max-page:mt-9 max-page:ml-0 print:break-inside-avoid">
      <div className={`min-w-0 ${fallback ? "max-fig:hidden" : ""}`}>{children}</div>
      {fallback ? (
        <p className="hidden border-l-2 border-rule pl-[13px] text-[13px] font-normal leading-[1.75] text-mute max-fig:block">
          {fallback}
        </p>
      ) : null}
      {/* 692 = 지면 840 − 레이블 칼럼 148. 캡션도 본문과 같은 자수로 흐른다. */}
      <figcaption
        className={`mt-4 max-w-[692px] text-t1 text-pretty leading-[1.65] text-mute max-page:mt-3 ${
          fallback && !note ? "max-fig:hidden" : ""
        }`}
      >
        <span className={fallback ? "max-fig:hidden" : ""}>
          <b className="font-normal text-mute">{index}</b>
          <span aria-hidden="true"> · </span>
          {caption}
        </span>
        {note ? (
          <span
            className={`mt-2 block border-t border-rule pt-2 text-[11.5px] leading-[1.6] ${
              fallback ? "max-fig:mt-0 max-fig:border-t-0 max-fig:pt-0" : ""
            }`}
          >
            {note}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
