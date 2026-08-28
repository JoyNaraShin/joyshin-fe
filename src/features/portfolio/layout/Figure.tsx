import type { ReactNode } from "react";

/* note 는 측정 조건·한계처럼 본문에 섞으면 흐름을 끊는 것만 받는다. 캡션과 다른 칸이다. */
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
    /*
     * 도판은 레이블 칼럼(112 + 간격 36)까지 당겨 **지면 폭 840 을 통째로** 쓴다.
     * 섹션 제목과 같은 선에서 시작하므로, 들여쓴 본문 692 보다 넓은 것이 눈에 보인다.
     *
     * 캡션을 레이블 칼럼에 매달았던 배치는 걷어냈다(실측) — 그 칼럼은 mono 인덱스
     * (`01` `CLO-SET` `2022.04 – 2026.04`)용 112px 이라 산문이 들어가면 한 줄 13자가 된다.
     * 그림 1 옆에 세로 10줄짜리 글 리본이 서서 도판보다 먼저 읽혔다.
     * 캡션은 도판 아래 한 줄로 내리고 폭은 본문과 같게 캡한다.
     */
    <figure className="-ml-[148px] mt-12 max-page:mt-9 max-page:ml-0 print:break-inside-avoid">
      <div className="min-w-0">{children}</div>
      {/* 692 = 지면 840 − 레이블 칼럼 148. 캡션도 본문과 같은 자수로 흐른다. */}
      <figcaption className="mt-4 max-w-[692px] text-t1 text-pretty leading-[1.65] text-mute max-page:mt-3">
        <b className="font-normal text-mute">{index}</b>
        <span aria-hidden="true"> · </span>
        {caption}
        {note ? (
          <span className="mt-2 block border-t border-rule pt-2 text-[11.5px] leading-[1.6]">
            {note}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
