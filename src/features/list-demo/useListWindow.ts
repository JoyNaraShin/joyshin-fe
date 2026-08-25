import { type RefObject, useEffect, useState } from "react";

export type ListWindow = {
  readonly firstRow: number;
  readonly lastRow: number;
  readonly offsetTop: number;
  readonly totalHeight: number;
};

const OVERSCAN = 2;

/**
 * 손으로 짠 윈도잉. 스크롤 위치에서 보이는 줄 범위만 계산한다.
 *
 * 라이브러리를 쓰지 않은 이유는 이 데모가 "무엇이 줄어드는가"를 보여주는 물건이기 때문이다.
 * 계산이 상자 안에 숨으면 DOM 수가 왜 고정되는지가 안 보인다.
 */
export function useListWindow(
  ref: RefObject<HTMLElement | null>,
  rowCount: number,
  rowHeight: number,
  enabled: boolean,
): ListWindow {
  const [scrollTop, setScrollTop] = useState(0);
  const [viewport, setViewport] = useState(0);

  useEffect(() => {
    const el = ref.current;
    // 가상화가 아닐 때는 아예 붙이지 않는다. 스크롤마다 setState가 돌면
    // 그 리렌더 비용이 다른 두 방식의 측정에 섞여 비교가 무너진다.
    if (!enabled || !el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      setScrollTop(el.scrollTop);
      setViewport(el.clientHeight);
    };
    // 스크롤 이벤트마다 setState 하면 프레임을 넘겨 밀린다. rAF로 프레임당 한 번으로 모은다.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);

  const totalHeight = rowCount * rowHeight;
  if (!enabled || rowHeight <= 0) {
    return { firstRow: 0, lastRow: rowCount - 1, offsetTop: 0, totalHeight };
  }
  const first = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN);
  const visible = Math.ceil((viewport || 320) / rowHeight) + OVERSCAN * 2;
  const last = Math.min(rowCount - 1, first + visible);
  return { firstRow: first, lastRow: last, offsetTop: first * rowHeight, totalHeight };
}
