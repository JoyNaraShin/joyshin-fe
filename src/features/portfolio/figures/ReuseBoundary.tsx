import { Frame } from "../layout/Frame";

/*
 * 재사용 경계를 어디에 뒀는지 — 처음 / 바꾼 뒤.
 * 처음에는 데이터가 같다는 이유로 한 컴포넌트가 모드 분기로 전부 떠안았고, 바꾼 뒤에는 뷰를
 * 갈라 두고 공통에는 데이터와 계산 로직만 남겼다.
 *
 * 이 지면의 before/after 관례 = x≈300 점선 divider (DeployTopology 와 같은 축).
 */
export function ReuseBoundary() {
  const CHIPS = ["편집", "라이브", "프리뷰", "툴팁"];

  return (
    <Frame className="[&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full max-fig:[&_svg]:hidden">
      <svg
        viewBox="0 0 620 196"
        role="img"
        aria-label="처음에는 편집·라이브·프리뷰·툴팁을 한 컴포넌트가 모드 분기로 처리했고, 요구가 늘 때마다 안에 분기가 쌓였습니다. 바꾼 뒤에는 편집 뷰와 라이브 뷰를 따로 두고, 공통에는 데이터와 계산 로직만 남겼습니다."
      >
        <defs>
          <marker
            id="rb-arrow"
            markerHeight={7}
            markerWidth={7}
            orient="auto"
            refX={6}
            refY={4}
            viewBox="0 0 8 8"
          >
            <path className="stroke-rule-2" d="M0,1 L7,4 L0,7" fill="none" strokeWidth={1} />
          </marker>
        </defs>

        <line
          className="stroke-rule-2 [stroke-dasharray:3_4] [stroke-width:1]"
          x1={306}
          y1={8}
          x2={306}
          y2={188}
        />

        <text className="fill-mute text-t1" x={8} y={16}>
          처음
        </text>
        <text className="fill-mark text-t1" x={340} y={16}>
          바꾼 뒤
        </text>

        {/* 처음 — 한 컴포넌트가 전부 떠안는다 */}
        <rect
          className="fill-none stroke-rule-2 [stroke-width:1.2]"
          height={104}
          rx={3}
          width={276}
          x={8}
          y={30}
        />
        <text className="fill-ink text-t2 font-medium" x={24} y={52}>
          한 컴포넌트 · 모드 분기
        </text>
        {CHIPS.map((c, i) => (
          <g key={c}>
            <rect
              className="fill-none stroke-rule-2 [stroke-dasharray:2_3] [stroke-width:1]"
              height={26}
              rx={2}
              width={116}
              x={24 + (i % 2) * 128}
              y={66 + Math.floor(i / 2) * 34}
            />
            <text
              className="fill-mute text-t1"
              x={82 + (i % 2) * 128}
              y={83 + Math.floor(i / 2) * 34}
              textAnchor="middle"
            >
              {c}
            </text>
          </g>
        ))}
        <text className="fill-mute text-t1" x={8} y={156}>
          요구가 늘 때마다 안에 분기가 쌓인다
        </text>

        {/* 바꾼 뒤 — 뷰를 갈라 두고 공통은 최소 */}
        {[
          { x: 340, t: "편집 뷰" },
          { x: 480, t: "라이브 뷰" },
        ].map((b) => (
          <g key={b.t}>
            <rect
              className="fill-none stroke-mark [stroke-width:1.2]"
              height={40}
              rx={3}
              width={132}
              x={b.x}
              y={30}
            />
            <text className="fill-ink text-t2 font-medium" x={b.x + 66} y={55} textAnchor="middle">
              {b.t}
            </text>
            <line
              className="stroke-rule-2 [stroke-width:1]"
              markerEnd="url(#rb-arrow)"
              x1={b.x + 66}
              y1={70}
              x2={b.x + 66}
              y2={96}
            />
          </g>
        ))}
        <rect
          className="fill-none stroke-rule-2 [stroke-width:1.2]"
          height={36}
          rx={3}
          width={272}
          x={340}
          y={98}
        />
        <text className="fill-ink text-t2 font-medium" x={356} y={114}>
          공통
        </text>
        <text className="fill-mute text-t1" x={356} y={128}>
          데이터 · 계산 로직
        </text>
        <text className="fill-mute text-t1" x={340} y={156}>
          중복이 반복될 때만 공통으로 올린다
        </text>
      </svg>

      <p className="hidden border-l-2 border-rule pl-[13px] text-[13px] font-normal leading-[1.75] text-mute max-fig:block">
        처음에는 편집·라이브·프리뷰·툴팁을 한 컴포넌트가 모드 분기로 처리했고, 요구가 늘 때마다 안에
        분기가 쌓였습니다. 바꾼 뒤에는 편집 뷰와 라이브 뷰를 따로 두고, 공통에는 데이터와 계산
        로직만 남겼습니다.
      </p>
    </Frame>
  );
}
