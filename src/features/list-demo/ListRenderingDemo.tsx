import { useCallback, useMemo, useRef, useState } from "react";
import { AssetGrid } from "./AssetGrid";
import { BenchTable } from "./BenchTable";
import { FrameHud } from "./FrameHud";
import { ModeSwitch } from "./ModeSwitch";
import { ASSET_COUNT, createAssets } from "./data";
import { MODES, type ModeId } from "./modes";
import { useBenchRun } from "./useBenchRun";
import { useFirstRenderTimer } from "./useFirstRenderTimer";
import { GAP, useGridMetrics } from "./useGridMetrics";
import { useIntersectionReveal } from "./useIntersectionReveal";
import { useLegacyReflow } from "./useLegacyReflow";
import { useListWindow } from "./useListWindow";

const assets = createAssets(ASSET_COUNT);

/**
 * 세 가지 렌더링 방식을 같은 데이터로 나란히 돌려 보는 재현물.
 * 여기는 상태와 배치만 진다 — 계측·표·토글·타일 배치는 각자 자기 파일에 있다.
 */
export function ListRenderingDemo() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  const [mode, setModeState] = useState<ModeId>("legacy");
  // 방식을 고를 때마다 올린다. 같은 방식을 다시 골라도 목록이 반드시 새로 마운트되게 하는 값이다.
  // 이게 없으면 자동 측정의 첫 단계(이미 선택돼 있던 방식)에서 React가 리렌더를 건너뛰고,
  // "첫 렌더" 칸에 직전 값이 그대로 남는다.
  const [epoch, setEpoch] = useState(0);
  // 측정 직전에 목록을 비워 둔다. 이전 방식의 노드를 언마운트하는 비용이 다음 방식의
  // "첫 렌더" 커밋에 섞이면, 표가 마운트 비용이 아니라 전환 비용을 적게 된다.
  const [blank, setBlank] = useState(false);

  const metrics = useGridMetrics(scrollerRef);
  const ready = metrics.width > 0;
  const timer = useFirstRenderTimer(ready);

  const setMode = useCallback(
    (m: ModeId) => {
      timer.restart();
      setModeState(m);
      setEpoch((e) => e + 1);
    },
    [timer],
  );

  const rowH = metrics.tileH + GAP;
  const rowCount = Math.ceil(ASSET_COUNT / metrics.cols);
  const isVirtual = mode === "virtual";
  const win = useListWindow(scrollerRef, rowCount, rowH, isVirtual);

  const first = isVirtual ? win.firstRow * metrics.cols : 0;
  const last = isVirtual ? Math.min(ASSET_COUNT, (win.lastRow + 1) * metrics.cols) : ASSET_COUNT;
  const slice = useMemo(
    () => (blank || !ready ? [] : assets.slice(first, last)),
    [first, last, blank, ready],
  );

  useLegacyReflow(scrollerRef, gridRef, probeRef, ready && mode === "legacy");
  useIntersectionReveal(scrollerRef, gridRef, ready && mode === "io", epoch + metrics.cols * 1000);

  const { results, running, run } = useBenchRun(scrollerRef, gridRef, setMode, setBlank, timer.get);

  const current = MODES.find((m) => m.id === mode) ?? MODES[0];

  return (
    <div className="demo">
      <FrameHud gridRef={gridRef} active={ready} resetKey={`${mode}-${epoch}`} />
      <ModeSwitch mode={mode} onChange={setMode} disabled={running !== null} />
      <AssetGrid
        scrollerRef={scrollerRef}
        gridRef={gridRef}
        probeRef={probeRef}
        renderKey={`${mode}-${epoch}`}
        assets={slice}
        metrics={metrics}
        rowH={rowH}
        totalHeight={win.totalHeight}
        lazy={mode === "io"}
      />
      <p className="demo-note">{current.note}</p>
      <BenchTable results={results} running={running} onRun={run} />
    </div>
  );
}
