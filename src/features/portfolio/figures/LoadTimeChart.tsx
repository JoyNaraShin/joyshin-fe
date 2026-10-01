import { useCallback, useEffect, useRef } from "react";
import { prefersReducedMotion, useReveal } from "../hooks/useReveal";
import { Frame } from "../layout/Frame";

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
  { key: "LCP", y: 26, from: 2.91, to: 1.64, oldW: 478.3, newW: 269.6, ratio: 1.774 },
  { key: "DCL", y: 108, from: 2.47, to: 1.33, oldW: 406.0, newW: 218.6, ratio: 1.857 },
];

const DURATION = 900;

export function LoadTimeChart() {
  const ref = useRef<HTMLDivElement>(null);
  const outs = useRef<(SVGTextElement | null)[]>([]);

  // 언마운트 뒤에도 루프가 남지 않도록 프레임 번호를 들고 있다가 정리에서 끊는다.
  const raf = useRef(0);
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
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useReveal(ref, countUp, "-14% 0px");

  return (
    /* group + data-in 으로 막대 애니메이션을 건다. 기본 상태(애니메이션 없음)가 곧 정답이라
       스크롤 없이 렌더되는 경로에서도 '이후' 막대가 정확한 길이로 그려진다. */
    <Frame className="group [&_svg]:block [&_svg]:h-auto [&_svg]:w-full" ref={ref}>
      <svg
        viewBox="0 0 620 196"
        role="img"
        aria-label="LCP는 2.91초에서 1.64초로, DCL은 2.47초에서 1.33초로 단축."
      >
        {[0, 1, 2, 3].map((s) => {
          const x = 74 + s * 164.33;
          return (
            <g key={s}>
              <line className="stroke-rule [stroke-width:1]" x1={x} y1={16} x2={x} y2={166} />
              <text className="fill-mute font-mono text-t1" x={x} y={10} textAnchor="middle">
                {s}s
              </text>
            </g>
          );
        })}

        {ROWS.map((row, i) => (
          <g key={row.key}>
            <text className="fill-ink font-mono text-t2 font-medium" x={0} y={row.y + 22}>
              {row.key}
            </text>
            <text className="fill-mute text-t1 font-normal" x={32} y={row.y + 13}>
              이전
            </text>
            <rect className="fill-rule-2" x={74} y={row.y} width={row.oldW} height={17} rx={1} />
            <text
              className="fill-mute stroke-paper font-mono text-t2 [paint-order:stroke] [stroke-width:5px]"
              x={74 + row.oldW + 9}
              y={row.y + 13}
            >
              {row.from.toFixed(2)}s
            </text>
            <text className="fill-mute text-t1 font-normal" x={32} y={row.y + 43}>
              이후
            </text>
            {/*
              '이후' 막대는 0이 아니라 '이전' 길이에서 줄어든다.
              숫자가 2.47에서 1.33으로 내려가는데 막대만 0에서 자라면 둘이 다른 이야기를 한다.
            */}
            <rect
              className="fill-mark [transform-box:fill-box] [transform-origin:left_center] group-data-[in]:animate-gbar motion-reduce:group-data-[in]:animate-none"
              style={{ ["--from" as string]: row.ratio }}
              x={74}
              y={row.y + 30}
              width={row.newW}
              height={17}
              rx={1}
            />
            <text
              className="fill-mark font-mono text-[13px] font-medium"
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
    </Frame>
  );
}
