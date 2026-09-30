import { Frame } from "../layout/Frame";

/*
 * 가상화 전후를 같은 트랙 위에 겹쳐 그린다 — 차이가 막대 길이로 바로 보인다.
 * VirtuosoGrid 와 TanStack Virtual 은 노드 수로는 같아서 한 줄로 둔다.
 *
 * 수치는 그리지 않는다. 이 그림이 말하는 것은 측정값이 아니라 구조다.
 */
const VIEW = { x: 104, w: 92 }; // 화면 안에 남는 구간
const TRACK = { x: 104, w: 330 }; // 스크롤을 끝까지 내렸을 때의 전체 구간
const PITCH = 9;

const ROWS = [
  { key: "이전", to: "track", note: "스크롤마다 전체 항목 위치 재계산", y: 52 },
  { key: "가상화", to: "view", note: "보이는 행만큼만 남음", y: 104 },
] as const;

function ticks(width: number) {
  const n = Math.floor(width / PITCH);
  return Array.from({ length: n }, (_, i) => TRACK.x + i * PITCH);
}

/** 좁은 폭에서 이 도식 대신 읽히는 문단. `Figure` 의 `fallback` 으로 넘긴다. */
export const listDomGrowthFallback =
  "이전에는 스크롤한 만큼 DOM 노드가 쌓입니다. 가상화한 뒤에는 화면에 보이는 행만큼만 노드가 남습니다.";

export function ListDomGrowth() {
  return (
    <Frame className="[&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">
      <svg
        viewBox="0 0 620 128"
        role="img"
        aria-label="이전에는 스크롤한 만큼 DOM 노드가 쌓이고, 가상화한 뒤에는 화면에 보이는 행만큼만 남습니다."
      >
        {/* 화면에 실제로 보이는 구간 */}
        <line
          className="stroke-rule [stroke-width:1]"
          x1={VIEW.x}
          y1={26}
          x2={VIEW.x + VIEW.w}
          y2={26}
        />
        <line className="stroke-rule [stroke-width:1]" x1={VIEW.x} y1={26} x2={VIEW.x} y2={32} />
        <line
          className="stroke-rule [stroke-width:1]"
          x1={VIEW.x + VIEW.w}
          y1={26}
          x2={VIEW.x + VIEW.w}
          y2={32}
        />
        <text className="fill-mute text-t1" x={VIEW.x + VIEW.w / 2} y={20} textAnchor="middle">
          화면
        </text>
        <text className="fill-mute text-t1" x={VIEW.x + VIEW.w + 14} y={20}>
          스크롤한 만큼 지나간 구간
        </text>

        {ROWS.map((row) => {
          const width = row.to === "view" ? VIEW.w : TRACK.w;
          return (
            <g key={row.key}>
              <text className="fill-ink text-t2 font-medium" x={0} y={row.y + 12}>
                {row.key}
              </text>
              {ticks(width).map((x) => (
                <rect
                  className={x < VIEW.x + VIEW.w ? "fill-mark" : "fill-rule-2"}
                  height={17}
                  key={x}
                  rx={0.5}
                  width={3}
                  x={x}
                  y={row.y}
                />
              ))}
              <text className="fill-mute text-t1" x={TRACK.x + TRACK.w + 16} y={row.y + 12}>
                {row.note}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 좁은 폭에서는 트랙이 뭉개진다. 같은 내용을 글로 둔다. */}
    </Frame>
  );
}
