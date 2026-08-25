import { useEffect, useRef } from "react";

/**
 * rAF 간격을 그대로 프레임 시간으로 읽는다.
 *
 * 측정값을 React 상태에 넣지 않는 것이 중요하다. 초당 60번 리렌더하면
 * 그 리렌더 비용이 측정 대상에 섞여서, 세 방식을 비교한 결과가 무의미해진다.
 * 그래서 sink는 ref/DOM에 직접 쓰는 용도로만 쓴다.
 */
export function useFrameMeter(active: boolean, sink: (dt: number) => void) {
  const sinkRef = useRef(sink);
  sinkRef.current = sink;

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      sinkRef.current(now - prev);
      prev = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}
