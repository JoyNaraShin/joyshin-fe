import { fmtCount } from "./format";
import { MODES, type ModeId } from "./modes";
import type { BenchResult } from "./useBenchRun";

/** 자동 주행의 결과판. 재는 일은 useBenchRun 이 하고 여기는 보여 주기만 한다. */
export function BenchTable({
  results,
  running,
  onRun,
}: {
  results: Partial<Record<ModeId, BenchResult>>;
  running: ModeId | null;
  onRun: () => void;
}) {
  return (
    <div className="demo-bench">
      <div className="demo-bench-head">
        <button type="button" onClick={onRun} disabled={running !== null}>
          {running ? `${MODES.find((m) => m.id === running)?.label} 측정 중…` : "세 방식 자동 측정"}
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
  );
}
