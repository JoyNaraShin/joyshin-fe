import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Tile } from "./Tile";
import { ASSET_COUNT, createAssets } from "./data";
import { MODES, type ModeId } from "./modes";
import { useBenchRun } from "./useBenchRun";
import { useFrameMeter } from "./useFrameMeter";
import { GAP, PAD, useGridMetrics } from "./useGridMetrics";
import { useIntersectionReveal } from "./useIntersectionReveal";
import { useLegacyReflow } from "./useLegacyReflow";
import { useListWindow } from "./useListWindow";

const assets = createAssets(ASSET_COUNT);

const SPARK = 32;
/** 프레임 예산, ms. 60Hz 기준 한 프레임이 약 16.7ms이므로 32ms면 프레임 드랍 2회다. */
const BUDGET = 32;
const SPARK_TOP = 56;
const RESET_QUIET = 420;
const COLOR_OK = "#5FB0AC";
const COLOR_OVER = "#E4756A";
const COLOR_RULE = "#3A3D44";

const fmtMs = (v: number) => (v > 0 ? v.toFixed(1) : "—");
const fmtCount = (v: number) => v.toLocaleString("ko-KR");

export function ListRenderingDemo() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const frameOutRef = useRef<HTMLElement>(null);
  const itemsOutRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setModeState] = useState<ModeId>("legacy");
  // 방식을 고를 때마다 올린다. 같은 방식을 다시 골라도 목록이 반드시 새로 마운트되게 하는 값이다.
  // 이게 없으면 자동 측정의 첫 단계(이미 선택돼 있던 방식)에서 React가 리렌더를 건너뛰고,
  // "첫 렌더" 칸에 직전 값이 그대로 남는다.
  const [epoch, setEpoch] = useState(0);
  // 측정 직전에 목록을 비워 둔다. 이전 방식의 노드를 언마운트하는 비용이 다음 방식의
  // "첫 렌더" 커밋에 섞이면, 표가 마운트 비용이 아니라 전환 비용을 적게 된다.
  const [blank, setBlank] = useState(false);

  // ── 첫 렌더 시간: 렌더 시작 시각을 찍어 두고 커밋 직후 뺀다.
  const renderAt = useRef(0);
  const pending = useRef(true);
  const firstRender = useRef(0);
  renderAt.current = performance.now();

  const setMode = useCallback((m: ModeId) => {
    pending.current = true;
    setModeState(m);
    setEpoch((e) => e + 1);
  }, []);

  const metrics = useGridMetrics(scrollerRef);
  const ready = metrics.width > 0;
  const rowH = metrics.tileH + GAP;
  const rowCount = Math.ceil(ASSET_COUNT / metrics.cols);
  const isVirtual = mode === "virtual";
  const win = useListWindow(scrollerRef, rowCount, rowH, isVirtual);

  useLayoutEffect(() => {
    if (!pending.current || !ready) return;
    firstRender.current = performance.now() - renderAt.current;
    pending.current = false;
  });

  const first = isVirtual ? win.firstRow * metrics.cols : 0;
  const last = isVirtual ? Math.min(ASSET_COUNT, (win.lastRow + 1) * metrics.cols) : ASSET_COUNT;
  const slice = useMemo(() => (blank ? [] : assets.slice(first, last)), [first, last, blank]);

  useLegacyReflow(scrollerRef, gridRef, probeRef, ready && mode === "legacy");
  useIntersectionReveal(scrollerRef, gridRef, ready && mode === "io", epoch + metrics.cols * 1000);

  // ── 계측기. 값은 전부 ref/DOM에 직접 쓴다. 초당 60번 리렌더하면 그 비용이 측정에 섞인다.
  const peak = useRef(0);
  const quietUntil = useRef(0);
  const buf = useRef(new Float32Array(SPARK));
  const cursor = useRef(0);
  const shown = useRef("");

  const draw = useCallback(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const w = c.width;
    const h = c.height;
    const scale = h / SPARK_TOP;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = COLOR_RULE;
    ctx.fillRect(0, Math.round(h - BUDGET * scale), w, 1);
    const bw = w / SPARK;
    for (let k = 0; k < SPARK; k++) {
      const v = buf.current[(cursor.current + k) % SPARK];
      if (!v) continue;
      const bh = Math.min(h, v * scale);
      ctx.fillStyle = v > BUDGET ? COLOR_OVER : COLOR_OK;
      ctx.fillRect(k * bw, h - bh, Math.max(1, bw - 1), bh);
    }
  }, []);

  const onFrame = useCallback(
    (dt: number) => {
      buf.current[cursor.current % SPARK] = dt;
      cursor.current++;
      if (performance.now() > quietUntil.current && dt > peak.current) peak.current = dt;
      const text = fmtMs(peak.current);
      if (text !== shown.current) {
        shown.current = text;
        const el = frameOutRef.current;
        if (el) {
          el.textContent = text;
          el.classList.toggle("over", peak.current > BUDGET);
        }
      }
      const n = gridRef.current?.childElementCount ?? 0;
      const out = itemsOutRef.current;
      if (out) {
        const s = fmtCount(n);
        if (out.textContent !== s) out.textContent = s;
      }
      draw();
    },
    [draw],
  );
  useFrameMeter(ready, onFrame);

  // 방식을 바꾸면 최댓값을 새로 잡는다. 전환 직후 몇 백 ms는 전환 비용이라 빼고 센다.
  // mode 에 걸어야 한다 — 자동 측정은 버튼을 거치지 않고 방식을 바꾸므로,
  // 버튼 핸들러에서만 초기화하면 앞 방식의 최댓값이 화면에 남아 표와 어긋난다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: 본문이 mode/epoch 를 읽지 않는다. 방식이 바뀌는 시점을 잡는 신호로만 쓴다.
  useEffect(() => {
    peak.current = 0;
    shown.current = "";
    buf.current.fill(0);
    quietUntil.current = performance.now() + RESET_QUIET;
    const el = frameOutRef.current;
    if (el) {
      el.textContent = "—";
      el.classList.remove("over");
    }
  }, [mode, epoch]);

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
  }, []);

  const getFirstRender = useCallback(() => firstRender.current, []);
  const { results, running, run } = useBenchRun(
    scrollerRef,
    gridRef,
    setMode,
    setBlank,
    getFirstRender,
  );

  // 스크롤만 하는 사람의 화면을 가로채지 않는다. 측정은 버튼을 누른 사람만 돌린다.

  const current = MODES.find((m) => m.id === mode) ?? MODES[0];

  return (
    <div className="demo">
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
            최근 {SPARK}프레임 · 눈금은 {BUDGET}ms
          </span>
        </div>
      </div>

      {/* biome-ignore lint/a11y/useSemanticElements: fieldset 은 폼 의미와 legend 를 끌고 온다.
            여기는 폼이 아니라 서로 배타적인 토글 묶음이라 role="group" 이 맞다. */}
      <div className="demo-modes" role="group" aria-label="렌더링 방식">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            data-on={m.id === mode}
            aria-pressed={m.id === mode}
            disabled={running !== null}
            onClick={() => setMode(m.id)}
          >
            <span className="demo-step">{m.step}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* 스크롤 영역은 키보드로도 스크롤할 수 있어야 해서 초점을 받는다(WCAG 2.1.1).
          그래서 section 으로 두고 이름을 붙인다 — 이름 없는 초점은 스크린리더에서 미아가 된다.
          규칙은 "상호작용하지 않는 요소에 tabIndex 금지"만 보고 스크롤 가능 영역을 모른다. */}
      <section
        ref={scrollerRef}
        className="demo-scroller"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: 스크롤되는 영역은 키보드 초점을 받아야 한다(WCAG 2.1.1).
        tabIndex={0}
        aria-label="에셋 목록 재현 — 스크롤할 수 있습니다"
      >
        {/*
          key에 방식을 넣어 방식을 바꿀 때 목록을 통째로 다시 마운트한다.
          이것만으로는 부족해서 측정 직전에 blank 로 한 번 비운다 — 같은 커밋 안에서
          언마운트와 마운트가 겹치면 "첫 렌더" 칸에 전환 비용이 섞인다.
        */}
        <div
          key={`${mode}-${epoch}`}
          ref={gridRef}
          className="demo-grid"
          style={{ height: win.totalHeight }}
        >
          {ready &&
            slice.map((a) => (
              <Tile
                key={a.id}
                asset={a}
                lazy={mode === "io"}
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

      <p className="demo-note">{current.note}</p>

      <div className="demo-bench">
        <div className="demo-bench-head">
          <button type="button" onClick={run} disabled={running !== null}>
            {running
              ? `${MODES.find((m) => m.id === running)?.label} 측정 중…`
              : "세 방식 자동 측정"}
          </button>
        </div>
        <div className="demo-table-wrap">
          <table className="demo-table">
            <thead>
              <tr>
                <th scope="col">방식</th>
                <th scope="col">첫 렌더</th>
                <th scope="col">DOM 항목</th>
              </tr>
            </thead>
            <tbody>
              {MODES.map((m) => {
                const r = results[m.id];
                return (
                  <tr key={m.id} data-running={running === m.id}>
                    <th scope="row">
                      <span className="demo-step">{m.step}</span>
                      {m.label}
                    </th>
                    <td>{r ? `${Math.round(r.firstRender)} ms` : "—"}</td>
                    <td>{r ? fmtCount(r.items) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="demo-foot">세 방식을 같은 거리로 주행해 이 브라우저에서 잰 값입니다.</p>
      </div>
    </div>
  );
}
