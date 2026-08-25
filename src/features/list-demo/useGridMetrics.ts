import { type RefObject, useEffect, useState } from "react";

export type GridMetrics = {
  readonly width: number;
  readonly cols: number;
  readonly tileW: number;
  readonly tileH: number;
};

export const GAP = 8;
export const PAD = 12;
const MIN_TILE = 104;
const LABEL_H = 20;

/**
 * 컨테이너 폭에서 한 줄 개수와 타일 크기를 함께 계산한다.
 *
 * 실제 화면들은 한 줄에 몇 개가 들어가는지가 페이지마다 달랐고 정해진 규격이 없었다.
 * 그래서 개수를 상수로 박지 않고 폭에서 끌어낸다 — 창을 줄이면 개수와 크기가 같이 바뀐다.
 */
export function useGridMetrics(ref: RefObject<HTMLElement | null>): GridMetrics {
  const [m, setM] = useState<GridMetrics>({ width: 0, cols: 4, tileW: MIN_TILE, tileH: MIN_TILE });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width <= 0) return;
      const inner = width - PAD * 2;
      const cols = Math.max(2, Math.floor((inner + GAP) / (MIN_TILE + GAP)));
      const tileW = (inner - GAP * (cols - 1)) / cols;
      const tileH = Math.round(tileW * 0.74) + LABEL_H;
      setM((p) =>
        p.cols === cols && Math.abs(p.tileW - tileW) < 0.5 ? p : { width, cols, tileW, tileH },
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return m;
}
