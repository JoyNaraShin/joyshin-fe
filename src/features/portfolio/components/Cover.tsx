import type { Cover as CoverData } from "../content/projects";
import { DeployTopology } from "../figures/DeployTopology";
import { ListDomGrowth } from "../figures/ListDomGrowth";
import { LoadTimeChart } from "../figures/LoadTimeChart";
import { StateBoundary } from "../figures/StateBoundary";

const FIGURES = {
  load: LoadTimeChart,
  list: ListDomGrowth,
  state: StateBoundary,
  deploy: DeployTopology,
} as const;

/*
 * 좁은 카드에서 도판의 어느 구간을 채울지 — [viewBox 시작 x, 보여 줄 폭] (도판 폭 620 기준).
 * 배포 도식은 오른쪽 「제안한 구조」가, 상태 도식은 왼쪽 두 칸이 이 작업의 요지다.
 */
const FOCUS = {
  load: [0, 620],
  list: [0, 560],
  state: [0, 530],
  deploy: [290, 330],
} as const;

/**
 * 카드와 케이스 머리의 대표 이미지.
 * 캡처가 없는 작업(배포, 상태 구조, 계측)은 본문 도판을 그대로 표지로 쓴다 —
 * 화면이 없는 일을 억지로 화면처럼 보이게 하지 않는다.
 */
export function Cover({
  cover,
  eager = false,
  zoom = false,
}: {
  cover: CoverData;
  eager?: boolean;
  /** 좁은 카드에서는 도판 글자가 6px 까지 줄어든다. 요지가 되는 구간만 확대해 보여 준다. */
  zoom?: boolean;
}) {
  if (cover.kind === "shot") {
    return (
      <img
        alt={cover.alt}
        className={`block aspect-[16/10] h-auto w-full ${cover.fit === "contain" ? "bg-surface object-contain object-center px-[4%]" : "object-cover object-top"}`}
        decoding="async"
        height={1000}
        loading={eager ? "eager" : "lazy"}
        src={cover.src}
        width={1600}
      />
    );
  }
  const Figure = FIGURES[cover.figure];
  return (
    <div
      className={`flex aspect-[16/10] w-full items-center overflow-hidden bg-inset ${zoom ? "px-[4%]" : "px-[7%]"}`}
    >
      <div
        className="w-full shrink-0"
        style={
          zoom
            ? {
                width: `${(620 / FOCUS[cover.figure][1]) * 100}%`,
                marginLeft: `${(-FOCUS[cover.figure][0] / FOCUS[cover.figure][1]) * 100}%`,
              }
            : undefined
        }
      >
        <Figure />
      </div>
    </div>
  );
}
