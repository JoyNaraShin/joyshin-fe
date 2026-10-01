import { Frame } from "../layout/Frame";

/*
 * 상태를 어디에 두었는지 그린 경계도.
 * 세로 파선 왼쪽이 서버에서 온 값, 오른쪽이 화면이다. 화면은 서버 데이터를 Query 에서 바로 읽고,
 * UI 상태만 화면 옆의 Recoil atom 에 따로 둔다. Query 에서 atom 으로 가는 선은 없다.
 * 전역 스토어로 내려가는 화살표에는 ✕ 를 얹는다 — "복사하지 않는다"를 글이 아니라 선으로
 * 말하는 자리다.
 *
 * 앞선 판은 상자 세 개에 문장을 적은 나열이었고, 그 문장이 바로 위 불릿의 반복이었다.
 * 그림이 글을 되풀이하면 지면에서 두 번 읽히기만 한다.
 */
const SCREENS = [
  { name: "뷰어", y: 40 },
  { name: "사이드 패널", y: 106 },
] as const;

/** 좁은 폭에서 이 도식 대신 읽히는 문단. `Figure` 의 `fallback` 으로 넘긴다. */
export const stateBoundaryFallback =
  "서버 데이터는 TanStack Query 캐시에만 두고 전역 스토어에 복제하지 않음. 뷰어와 사이드 패널은 서버 데이터를 Query에서 바로 읽고, 각자의 UI 상태만 Recoil atom으로 가짐.";

export function StateBoundary() {
  return (
    <Frame className="[&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">
      <svg
        viewBox="0 0 620 186"
        role="img"
        aria-label="서버 데이터는 TanStack Query 캐시에만 두고 전역 스토어에 복제하지 않음. 뷰어와 사이드 패널은 서버 데이터를 Query에서 바로 읽고, 각자의 UI 상태만 Recoil atom으로 가짐."
      >
        <defs>
          <marker
            id="sb-arrow"
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

        {/* 경계 */}
        <line
          className="stroke-rule-2 [stroke-dasharray:3_4] [stroke-width:1]"
          x1={300}
          y1={12}
          x2={300}
          y2={180}
        />
        <text className="fill-mute text-t1" x={292} y={22} textAnchor="end">
          서버 상태
        </text>
        <text className="fill-mute text-t1" x={308} y={22}>
          화면
        </text>

        {/* 서버 → 단일 출처 */}
        <text className="fill-mute text-t2" x={0} y={82}>
          서버
        </text>
        <line
          className="stroke-rule-2 [stroke-width:1]"
          markerEnd="url(#sb-arrow)"
          x1={42}
          y1={78}
          x2={80}
          y2={78}
        />
        <rect
          className="fill-none stroke-mark [stroke-width:1.2]"
          height={46}
          rx={3}
          width={152}
          x={88}
          y={56}
        />
        <text className="fill-ink font-mono text-t2 font-medium" x={102} y={76}>
          TanStack Query
        </text>
        <text className="fill-mark text-t1" x={102} y={92}>
          서버 데이터 캐시
        </text>

        {/* 복사해 두지 않는 자리 */}
        <line className="stroke-rule-2 [stroke-width:1]" x1={164} y1={102} x2={164} y2={128} />
        <circle className="fill-surface" cx={164} cy={115} r={9} />
        <line className="stroke-warn [stroke-width:1.6]" x1={159} y1={110} x2={169} y2={120} />
        <line className="stroke-warn [stroke-width:1.6]" x1={169} y1={110} x2={159} y2={120} />
        <rect
          className="fill-none stroke-rule-2 [stroke-dasharray:3_3] [stroke-width:1]"
          height={30}
          rx={3}
          width={152}
          x={88}
          y={130}
        />
        <text className="fill-faint text-t1" x={102} y={149}>
          전역 스토어
        </text>

        {/* 경계 오른쪽 — 화면마다 따로 */}
        {SCREENS.map((s) => (
          <g key={s.name}>
            <line
              className="stroke-rule-2 [stroke-width:1]"
              markerEnd="url(#sb-arrow)"
              x1={240}
              y1={79}
              x2={352}
              y2={s.y + 22}
            />
            <rect
              className="fill-none stroke-rule-2 [stroke-width:1]"
              height={44}
              rx={3}
              width={130}
              x={360}
              y={s.y}
            />
            <text className="fill-ink text-t2 font-medium" x={374} y={s.y + 20}>
              {s.name}
            </text>
            <text className="fill-mute text-t1" x={374} y={s.y + 35}>
              컴포넌트
            </text>
            {/* UI 상태는 서버 데이터와 별개로 화면마다 따로 둔다 */}
            <line
              className="stroke-rule-2 [stroke-width:1]"
              x1={490}
              y1={s.y + 22}
              x2={506}
              y2={s.y + 22}
            />
            <rect
              className="fill-none stroke-mark [stroke-width:1.2]"
              height={44}
              rx={3}
              width={108}
              x={506}
              y={s.y}
            />
            <text className="fill-mark text-t1" x={518} y={s.y + 19}>
              UI 상태
            </text>
            <text className="fill-ink font-mono text-t1 font-medium" x={518} y={s.y + 34}>
              Recoil atom
            </text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}
