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
 * 표지에서 도판의 어느 구간을 채울지 — [viewBox 시작 x, 보여 줄 폭] (도판 폭 620 기준).
 * 배포 도식은 오른쪽 「제안한 구조」가, 상태 도식은 캐시에서 화면으로 가는 가운데가 요지다.
 */
const FOCUS = {
  load: [0, 620],
  list: [0, 560],
  state: [80, 445],
  deploy: [302, 318],
} as const;

/**
 * 카드와 케이스 머리의 대표 이미지.
 * 캡처가 없는 작업은 본문 도판의 요지만 확대해 쓰고, 계측 작업은 수치를 그대로 크게 쓴다.
 * 도판을 줄여 표지로 쓰면 글자가 7px 까지 떨어진다(실측).
 */
export function Cover({
  cover,
  eager = false,
  natural = false,
}: {
  cover: CoverData;
  eager?: boolean;
  /** 케이스 머리에서는 여백 많은 캡처를 16:10 에 가두지 않고 원래 비율로 둔다. */
  natural?: boolean;
}) {
  if (cover.kind === "shot") {
    const contain = cover.fit === "contain";
    return (
      <img
        alt={cover.alt}
        className={`block h-auto w-full ${
          natural && contain
            ? "bg-surface"
            : `aspect-[16/10] ${contain ? "bg-surface object-contain object-center px-[4%]" : "object-cover object-top"}`
        }`}
        decoding="async"
        height={1000}
        loading={eager ? "eager" : "lazy"}
        src={cover.src}
        width={1600}
      />
    );
  }
  if (cover.kind === "metric") {
    return (
      <div className="flex aspect-[16/10] w-full flex-col justify-center gap-[6%] bg-inset px-[9%]">
        {cover.items.map((m) => (
          <div
            className="flex items-baseline justify-between gap-4 border-b border-rule-2 pb-[3%]"
            key={m.label}
          >
            <div className="min-w-0">
              <p className="text-[clamp(12px,1.3vw,15px)] text-mute">{m.label}</p>
              <p className="mt-1 font-mono text-[clamp(12px,1.3vw,15px)] text-ink-3">{m.detail}</p>
            </div>
            <p className="num text-[clamp(34px,5vw,64px)] leading-none">{m.value}</p>
          </div>
        ))}
      </div>
    );
  }
  const Figure = FIGURES[cover.figure];
  const [x, w] = FOCUS[cover.figure];
  return (
    <div className="flex aspect-[16/10] w-full items-center bg-inset px-[5%]">
      {/* 잘라 내는 상자를 여백 안쪽에 따로 둔다. 바깥에서 자르면 왼쪽으로 당긴 부분이 여백에 비친다. */}
      <div className="w-full overflow-hidden">
        <div
          className="shrink-0"
          style={{ width: `${(620 / w) * 100}%`, marginLeft: `${(-x / w) * 100}%` }}
        >
          <Figure />
        </div>
      </div>
    </div>
  );
}
