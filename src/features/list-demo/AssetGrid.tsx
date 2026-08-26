import type { RefObject } from "react";
import { Tile } from "./Tile";
import type { Asset } from "./data";
import { GAP, type GridMetrics, PAD } from "./useGridMetrics";

/**
 * 스크롤 영역과 타일 배치. 어느 방식으로 재고 있는지는 모른다 —
 * 무엇을 몇 개 그릴지는 전부 props 로 받는다.
 */
export function AssetGrid({
  scrollerRef,
  gridRef,
  probeRef,
  renderKey,
  assets,
  metrics,
  rowH,
  totalHeight,
  lazy,
}: {
  scrollerRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  probeRef: RefObject<HTMLDivElement | null>;
  /** 이 값이 바뀌면 목록을 통째로 다시 마운트한다. */
  renderKey: string;
  assets: readonly Asset[];
  metrics: GridMetrics;
  rowH: number;
  totalHeight: number;
  lazy: boolean;
}) {
  return (
    // 스크롤 영역은 키보드로도 스크롤할 수 있어야 해서 초점을 받는다(WCAG 2.1.1).
    // 그래서 section 으로 두고 이름을 붙인다 — 이름 없는 초점은 스크린리더에서 미아가 된다.
    // 규칙은 "상호작용하지 않는 요소에 tabIndex 금지"만 보고 스크롤 가능 영역을 모른다.
    <section
      ref={scrollerRef}
      className="demo-scroller"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: 스크롤되는 영역은 키보드 초점을 받아야 한다(WCAG 2.1.1).
      tabIndex={0}
      aria-label="에셋 목록 재현 — 스크롤할 수 있습니다"
    >
      <div key={renderKey} ref={gridRef} className="demo-grid" style={{ height: totalHeight }}>
        {assets.map((a) => (
          <Tile
            key={a.id}
            asset={a}
            lazy={lazy}
            style={{
              left: PAD + (a.id % metrics.cols) * (metrics.tileW + GAP),
              top: Math.floor(a.id / metrics.cols) * rowH,
              width: metrics.tileW,
              height: metrics.tileH,
            }}
          />
        ))}
      </div>
      <div ref={probeRef} className="demo-probe" aria-hidden="true" />
    </section>
  );
}
