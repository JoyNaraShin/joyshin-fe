const KEYS = [
  { x: 70, label: "c" },
  { x: 150, label: "cl" },
  { x: 230, label: "clo" },
  { x: 310, label: "clot" },
  { x: 390, label: "cloth" },
];

/** 그림 4 — 입력마다 요청을 보내면 다섯 번, 디바운스를 걸고 앞선 요청을 취소하면 한 번. */
export function DebounceTimeline() {
  return (
    <div className="frame keys">
      <svg
        viewBox="0 0 560 176"
        role="img"
        aria-label="입력할 때마다 요청을 보내면 다섯 번, 디바운스를 걸고 앞선 요청을 취소하면 한 번입니다."
      >
        <text className="tl" x={0} y={20}>
          입력
        </text>
        {KEYS.map((k) => (
          <text className="ki" key={k.label} x={k.x} y={20} textAnchor="middle">
            {k.label}
          </text>
        ))}

        <line className="sep" x1={0} y1={34} x2={560} y2={34} />
        <text className="tl" x={0} y={76}>
          이전
        </text>
        {KEYS.map((k) => (
          <g key={k.label}>
            <circle className="dot-on" cx={k.x} cy={62} r={5.5} />
            <line className="drop" x1={k.x} y1={70} x2={k.x} y2={88} markerEnd="url(#sa)" />
          </g>
        ))}
        <text className="cnt cnt-bad" x={450} y={76}>
          요청 5회
        </text>

        <line className="sep" x1={0} y1={104} x2={560} y2={104} />
        <text className="tl" x={0} y={146}>
          이후
        </text>
        {KEYS.slice(0, 4).map((k) => (
          <circle className="dot-off" key={k.label} cx={k.x} cy={132} r={5.5} />
        ))}
        <circle className="dot-on hit" cx={390} cy={132} r={5.5} />
        <line className="drop hit" x1={390} y1={140} x2={390} y2={158} markerEnd="url(#sb)" />
        <text className="cnt cnt-good" x={450} y={146}>
          요청 1회
        </text>

        <defs>
          {/*
            orient="auto" 는 선의 각도만큼 마커를 돌린다. 그래서 마커 자체의 삼각형은
            오른쪽(+x)을 보게 그려야 아래로 향한다. 위/아래로 그리면 갈고리처럼 꺾여 보인다.
          */}
          {[
            { id: "sa", fill: "#C0554A" },
            { id: "sb", fill: "#0A5C5C" },
          ].map((m) => (
            <marker
              key={m.id}
              id={m.id}
              viewBox="0 0 8 8"
              refX={6.5}
              refY={4}
              markerWidth={7}
              markerHeight={7}
              orient="auto"
            >
              <path d="M1,1 L6.5,4 L1,7 Z" fill={m.fill} stroke="none" />
            </marker>
          ))}
        </defs>
      </svg>
    </div>
  );
}
