import { Frame } from "../layout/Frame";

/*
 * 재사용 경계를 어디에 뒀는지 — 처음 / 바꾼 뒤.
 * 처음에는 데이터가 같다는 이유로 한 컴포넌트가 모드 분기로 전부 떠안았고, 바꾼 뒤에는 뷰를
 * 갈라 두고 공통에는 데이터와 계산 로직만 남겼다.
 *
 * 이 지면의 before/after 관례 = x≈300 점선 divider (DeployTopology 와 같은 축).
 */
/** 좁은 폭에서 이 도식 대신 읽히는 문단. `Figure` 의 `fallback` 으로 넘긴다. */
export const reuseBoundaryFallback =
  "분리 전에는 편집과 라이브를 한 컴포넌트가 mode 분기로 처리해 기능이 늘 때마다 조건문이 쌓임. 분리 후에는 편집 페이지와 라이브 페이지를 별도 컴포넌트로 두고, 공유 코드는 도메인 모델과 순수 함수로 한정.";

export function ReuseBoundary() {
  const CHIPS = ["편집", "라이브"];

  return (
    <Frame className="[&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">
      <svg
        viewBox="0 0 620 166"
        role="img"
        aria-label="분리 전에는 편집과 라이브를 한 컴포넌트가 mode 분기로 처리해 기능이 늘 때마다 조건문이 쌓임. 분리 후에는 편집 페이지와 라이브 페이지를 별도 컴포넌트로 두고, 공유 코드는 도메인 모델과 순수 함수로 한정."
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
          y2={158}
        />

        <text className="fill-mute text-t1" x={8} y={16}>
          분리 전
        </text>
        <text className="fill-mark text-t1" x={340} y={16}>
          분리 후
        </text>

        {/* 처음 — 한 컴포넌트가 전부 떠안는다 */}
        <rect
          className="fill-none stroke-rule-2 [stroke-width:1.2]"
          height={86}
          rx={3}
          width={276}
          x={8}
          y={30}
        />
        <text className="fill-ink text-t2 font-medium" x={24} y={52}>
          한 컴포넌트, mode 분기
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
        <text className="fill-mute text-t1" x={8} y={150}>
          기능이 늘 때마다 조건문이 쌓임
        </text>

        {/* 바꾼 뒤 — 뷰를 갈라 두고 공통은 최소 */}
        {[
          { x: 340, t: "편집 페이지" },
          { x: 480, t: "라이브 페이지" },
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
          도메인 모델, 순수 함수
        </text>
        <text className="fill-mute text-t1" x={340} y={150}>
          렌더 결과가 같을 때만 공유
        </text>
      </svg>
    </Frame>
  );
}
