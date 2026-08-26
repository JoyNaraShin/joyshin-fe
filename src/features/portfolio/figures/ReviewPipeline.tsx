const STAGES = [
  { label: "설계 리뷰", x: 0, w: 80 },
  { label: "구현", x: 104, w: 58 },
  { label: "코드 리뷰", x: 186, w: 80 },
  { label: "수정", x: 290, w: 58 },
  { label: "재검증", x: 372, w: 68, accent: true },
  { label: "통과", x: 464, w: 58 },
];

export function ReviewPipeline() {
  return (
    <div className="frame flow">
      <svg
        viewBox="0 0 560 132"
        role="img"
        aria-label="설계 리뷰, 구현, 코드 리뷰, 수정, 재검증, 통과 순서로 이어지는 파이프라인. 수정에서 재검증을 건너뛰고 통과로 가는 경로는 막혀 있습니다."
      >
        <defs>
          <marker
            id="ah"
            viewBox="0 0 8 8"
            refX={7}
            refY={4}
            markerWidth={7}
            markerHeight={7}
            orient="auto-start-reverse"
          >
            <path d="M0,1 L7,4 L0,7" fill="none" stroke="#C2C6CD" strokeWidth={1} />
          </marker>
        </defs>

        {STAGES.map((s) => (
          <g key={s.label}>
            <rect
              className={s.accent ? "nd-acc" : "nd"}
              x={s.x}
              y={10}
              width={s.w}
              height={30}
              rx={2}
            />
            <text
              className={s.accent ? "tx-acc" : "tx"}
              x={s.x + s.w / 2}
              y={30}
              textAnchor="middle"
            >
              {s.label}
            </text>
          </g>
        ))}

        {STAGES.slice(0, -1).map((s, i) => {
          const next = STAGES[i + 1];
          return (
            <line
              key={s.label}
              className="arrow"
              x1={s.x + s.w + 5}
              y1={25}
              x2={next.x - 3}
              y2={25}
              markerEnd="url(#ah)"
            />
          );
        })}

        {/* 수정 → 통과 직행 경로. 이 하나를 막아 둔 것이 구조의 핵심이라 유일하게 붉다. */}
        <path
          className="blocked"
          d="M319,44 L319,74 Q319,80 325,80 L487,80 Q493,80 493,74 L493,50"
        />
        <circle cx={406} cy={80} r={9} fill="#fff" />
        <line className="xmark" x1={401} y1={75} x2={411} y2={85} />
        <line className="xmark" x1={411} y1={75} x2={401} y2={85} />
        <text className="cap" x={406} y={112} textAnchor="middle">
          수정한 쪽은 자기 수정의 통과 판정을 낼 수 없습니다
        </text>
      </svg>
      <p className="flow-alt">
        설계 리뷰 → 구현 → 코드 리뷰 → 수정 → 재검증 → 통과. 수정한 쪽은 자기 수정의 통과 판정을 낼
        수 없습니다.
      </p>
    </div>
  );
}
