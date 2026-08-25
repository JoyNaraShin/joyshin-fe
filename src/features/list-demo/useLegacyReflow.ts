import { type RefObject, useEffect } from "react";

/**
 * 걷어낸 라이브러리가 하던 일을 그대로 다시 만든 것: 스크롤이 움직일 때마다
 * 항목 전체의 위치를 다시 잰다.
 *
 * 읽기만 반복하면 브라우저가 첫 계산을 캐시해서 비싸지지 않는다. 실제로 비쌌던 이유는
 * 읽기 사이사이에 레이아웃을 무효로 만드는 쓰기가 끼어 있었기 때문이라, 여기서도 같이 끼운다.
 * 흉내가 아니라 같은 비용을 실제로 치른다.
 */
export function useLegacyReflow(
  scrollerRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLElement | null>,
  probeRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!enabled || !scroller) return;
    const onScroll = () => {
      const grid = gridRef.current;
      const probe = probeRef.current;
      if (!grid || !probe) return;
      const tiles = grid.children;
      for (let i = 0; i < tiles.length; i++) {
        tiles[i].getBoundingClientRect();
        probe.style.height = `${i & 1}px`;
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollerRef, gridRef, probeRef, enabled]);
}
