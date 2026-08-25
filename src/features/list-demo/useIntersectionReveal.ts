import { type RefObject, useEffect } from "react";

/**
 * 1차에서 실제로 한 일: 위치를 재는 대신 IntersectionObserver에게 무엇이 보이는지 묻는다.
 *
 * 보이는 항목에만 data-seen을 달아 썸네일을 채운다. React 상태를 쓰지 않는 이유는
 * 6,000개 항목의 가시성을 상태로 올리면 리렌더 폭풍이 나서, 1차가 실제로 얻은
 * 프레임 개선이 측정에서 가려지기 때문이다.
 */
export function useIntersectionReveal(
  scrollerRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  /** 목록이 다시 마운트될 때마다 바뀌는 값. 값을 읽지는 않고, 재관찰 시점을 잡는 데만 쓴다. */
  remountToken: number,
) {
  // 목록이 새로 마운트되면 관찰 대상 노드가 통째로 바뀌므로 그때 다시 관찰해야 한다.
  // gridRef 는 같은 ref 객체라, 노드가 갈렸다는 사실을 의존성만으로는 알 수 없다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: remountToken 은 재관찰 시점 신호이고 본문에서 읽지 않는다.
  useEffect(() => {
    const root = scrollerRef.current;
    const grid = gridRef.current;
    if (!enabled || !root || !grid) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.seen = "1";
            io.unobserve(e.target);
          }
        }
      },
      { root, rootMargin: "200px 0px" },
    );
    for (const tile of Array.from(grid.children)) io.observe(tile);
    return () => io.disconnect();
  }, [scrollerRef, gridRef, enabled, remountToken]);
}
