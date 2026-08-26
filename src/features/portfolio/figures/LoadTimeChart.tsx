import { prefersReducedMotion, useReveal } from "../hooks/useReveal";
import { useCallback, useRef } from "react";

type Row = {
  key: string;
  y: number;
  from: number;
  to: number;
  oldW: number;
  newW: number;
  ratio: number;
};

/** 눈금 0–3s 를 74–567px 에 맞춰 그린 값. 막대 길이는 실제 초 단위와 비례한다. */
const ROWS: Row[] = [
  { key: "DCL", y: 26, from: 2.47, to: 1.33, oldW: 406.0, newW: 218.6, ratio: 1.857 },
  { key: "LCP", y: 108, from: 2.91, to: 1.64, oldW: 478.3, newW: 269.6, ratio: 1.774 },
];

const DURATION = 900;

export function LoadTimeChart() {
  const ref = useRef<HTMLDivElement>(null);
  const outs = useRef<(SVGTextElement | null)[]>([]);

  const countUp = useCallback(() => {
    if (prefersReducedMotion()) return;
    let t0: number | null = null;
    const step = (t: number) => {
      if (t0 === null) t0 = t;
      const k = Math.min((t - t0) / DURATION, 1);
      const eased = 1 - (1 - k) ** 3;
      ROWS.forEach((row, i) => {
        const el = outs.current[i];
        if (el) el.textContent = `${(row.from + (row.to - row.from) * eased).toFixed(2)}s`;
      });
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useReveal(ref, countUp, "-14% 0px");

  return (
    <div className="frame chart" ref={ref}>
      <svg
        viewBox="0 0 620 196"
        role="img"
        aria-label="DCL은 2.47초에서 1.33초로, LCP는 2.91초에서 1.64초로 줄었습니다."
      >
        {[0, 1, 2, 3].map((s) => {
          const x = 74 + s * 164.33;
          return (
            <g key={s}>
              <line className="ax" x1={x} y1={16} x2={x} y2={166} />
              <text className="axt" x={x} y={10} textAnchor="middle">
                {s}s
              </text>
            </g>
          );
        })}

        {ROWS.map((row, i) => (
          <g key={row.key}>
            <text className="rk" x={0} y={row.y + 22}>
              {row.key}
            </text>
            <text className="rl" x={32} y={row.y + 13}>
              이전
            </text>
            <rect className="gbar b-old" x={74} y={row.y} width={row.oldW} height={17} rx={1} />
            <text className="vo" x={74 + row.oldW + 9} y={row.y + 13}>
              {row.from.toFixed(2)}s
            </text>
            <text className="rl" x={32} y={row.y + 43}>
              이후
            </text>
            {/*
              '이후' 막대는 0이 아니라 '이전' 길이에서 줄어든다.
              숫자가 2.47에서 1.33으로 내려가는데 막대만 0에서 자라면 둘이 다른 이야기를 한다.
            */}
            <rect
              className="gbar b-new"
              style={{ ["--from" as string]: row.ratio }}
              x={74}
              y={row.y + 30}
              width={row.newW}
              height={17}
              rx={1}
            />
            <text
              className="vn"
              x={74 + row.newW + 9}
              y={row.y + 43}
              ref={(el) => {
                outs.current[i] = el;
              }}
            >
              {row.to.toFixed(2)}s
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
