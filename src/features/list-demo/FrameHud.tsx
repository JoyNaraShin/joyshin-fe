import { type RefObject, useCallback, useEffect, useRef } from "react";
import { fmtCount, fmtMs } from "./format";
import { FRAME_BUDGET_MS } from "./frameBudget";
import { useFrameMeter } from "./useFrameMeter";
import { useSparkline } from "./useSparkline";

/** 방식을 바꾼 직후 몇 백 ms는 전환 비용이라 최댓값 집계에서 뺀다. */
const QUIET_MS = 420;

/**
 * 지금 화면이 어떤 상태인지 실시간으로 보여 주는 계기판.
 *
 * 값은 전부 ref와 DOM에 직접 쓴다. 상태로 올리면 초당 60번 리렌더가 일어나
 * 그 비용이 측정 대상에 섞인다.
 */
export function FrameHud({
  gridRef,
  active,
  resetKey,
}: {
  gridRef: RefObject<HTMLElement | null>;
  active: boolean;
  /** 이 값이 바뀌면 최댓값을 새로 잡는다. 방식이 바뀌는 시점을 가리킨다. */
  resetKey: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameOutRef = useRef<HTMLElement>(null);
  const itemsOutRef = useRef<HTMLElement>(null);
  const peak = useRef(0);
  const quietUntil = useRef(0);
  const shown = useRef("");
  const { push, clear, slots } = useSparkline(canvasRef);

  const onFrame = useCallback(
    (dt: number) => {
      if (performance.now() > quietUntil.current && dt > peak.current) peak.current = dt;
      const text = fmtMs(peak.current);
      if (text !== shown.current) {
        shown.current = text;
        const el = frameOutRef.current;
        if (el) {
          el.textContent = text;
          el.classList.toggle("over", peak.current > FRAME_BUDGET_MS);
        }
      }
      const out = itemsOutRef.current;
      if (out) {
        const s = fmtCount(gridRef.current?.childElementCount ?? 0);
        if (out.textContent !== s) out.textContent = s;
      }
      push(dt);
    },
    [gridRef, push],
  );
  useFrameMeter(active, onFrame);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 본문이 resetKey 를 읽지 않는다. 방식이 바뀌는 시점을 잡는 신호로만 쓴다.
  useEffect(() => {
    peak.current = 0;
    shown.current = "";
    clear();
    quietUntil.current = performance.now() + QUIET_MS;
    const el = frameOutRef.current;
    if (el) {
      el.textContent = "—";
      el.classList.remove("over");
    }
  }, [resetKey, clear]);

  return (
    <div className="demo-top">
      <dl className="demo-hud">
        <div>
          <dt>DOM에 남은 항목</dt>
          <dd ref={itemsOutRef as React.Ref<HTMLElement>}>—</dd>
        </div>
        <div>
          <dt>가장 느린 프레임</dt>
          <dd>
            <b ref={frameOutRef as React.Ref<HTMLElement>}>—</b>
            <small>ms</small>
          </dd>
        </div>
      </dl>
      <div className="demo-graph">
        <canvas ref={canvasRef} className="demo-spark" tabIndex={-1} aria-hidden="true" />
        <span className="demo-graph-cap">
          최근 {slots}프레임 · 눈금은 {FRAME_BUDGET_MS}ms
        </span>
      </div>
    </div>
  );
}
