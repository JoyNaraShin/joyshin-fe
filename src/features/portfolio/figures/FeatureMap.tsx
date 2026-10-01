import { SHOWROOM_FEATURES } from "../content/showroom";

/** 쇼룸의 기능 범위. 칩 하나가 기능 하나다. */
export function FeatureMap() {
  return (
    <section
      aria-label="버추얼 쇼룸 기능 지도"
      className="mt-8 overflow-hidden rounded-lg bg-deep text-deep-ink"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-deep-2 px-6 py-5 max-card:px-4">
        <p className="text-t2 text-deep-mute">헬프센터 쇼룸 가이드 기준 기능 목록</p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-deep-2 max-card:grid-cols-1">
        {SHOWROOM_FEATURES.map((g, i) => (
          <div
            className={`bg-deep px-6 py-5 max-card:px-4 ${i === SHOWROOM_FEATURES.length - 1 && SHOWROOM_FEATURES.length % 2 === 1 ? "col-span-2 max-card:col-span-1" : ""}`}
            key={g.group}
          >
            <h3 className="text-t2 font-semibold text-deep-mute">{g.group}</h3>
            <ul className="mt-3 flex list-none flex-wrap gap-1.5">
              {g.items.map((f) => (
                <li
                  className="rounded-full border border-deep-mute/40 px-2.5 py-1 text-t2 text-deep-ink"
                  key={f}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
