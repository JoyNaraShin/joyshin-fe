/** 로딩 작업의 표지. 수치가 곧 그림이다. */
export function Metrics() {
  return (
    <dl className="grid w-full max-w-[460px] gap-6">
      {[
        ["LCP", "2.91s", "1.64s", "−44%"],
        ["DOMContentLoaded", "2.47s", "1.33s", "−46%"],
      ].map(([k, from, to, pct]) => (
        <div className="border-t border-ink/15 pt-4" key={k}>
          <dt className="flex justify-between text-t2 text-mute">
            <span>{k}</span>
            <span className="font-semibold text-ink">{pct}</span>
          </dt>
          <dd className="mt-2 text-[clamp(36px,4.6vw,60px)] leading-none font-bold tabular-nums tracking-[-0.04em] text-deep">
            {to}
            <span className="ml-3 align-middle text-t3 text-mute line-through decoration-1">
              {from}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
