import { type RefObject, useCallback, useEffect, useRef } from "react";
import { FRAME_BUDGET_MS } from "./frameBudget";

const SLOTS = 32;
/** 세로 축 상한, ms. 이보다 느린 프레임은 막대가 잘린다. */
const TOP = 56;
const COLOR_OK = "#5FB0AC";
const COLOR_OVER = "#E4756A";
const COLOR_RULE = "#3A3D44";

/**
 * 최근 프레임 간격을 캔버스 막대로 그린다.
 *
 * React 상태를 쓰지 않는다 — 초당 60번 리렌더하면 그 비용이 측정 대상에 섞인다.
 * 링 버퍼에 넣고 캔버스에 직접 칠하는 것까지가 이 훅의 책임이고,
 * 무엇을 잰 값인지는 호출부가 안다.
 */
export function useSparkline(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const buf = useRef(new Float32Array(SLOTS));
  const cursor = useRef(0);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const { width: w, height: h } = c;
    const scale = h / TOP;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = COLOR_RULE;
    ctx.fillRect(0, Math.round(h - FRAME_BUDGET_MS * scale), w, 1);
    const bw = w / SLOTS;
    for (let k = 0; k < SLOTS; k++) {
      const v = buf.current[(cursor.current + k) % SLOTS];
      if (!v) continue;
      ctx.fillStyle = v > FRAME_BUDGET_MS ? COLOR_OVER : COLOR_OK;
      ctx.fillRect(k * bw, h - Math.min(h, v * scale), Math.max(1, bw - 1), Math.min(h, v * scale));
    }
  }, [canvasRef]);

  const push = useCallback(
    (dt: number) => {
      buf.current[cursor.current % SLOTS] = dt;
      cursor.current++;
      draw();
    },
    [draw],
  );

  const clear = useCallback(() => buf.current.fill(0), []);

  // 캔버스 비트맵은 CSS 크기와 별개라, 레이아웃이 바뀌면 직접 맞춰 줘야 흐려지지 않는다.
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const ro = new ResizeObserver(() => {
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    });
    ro.observe(c);
    return () => ro.disconnect();
  }, [canvasRef]);

  return { push, clear, slots: SLOTS };
}
