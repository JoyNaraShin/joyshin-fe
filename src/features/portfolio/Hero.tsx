import { KEYWORDS, STATS } from "./content/hero";

/**
 * 히어로 — 채용 담당자가 스크롤 없이 3~15초 안에 보는 구간.
 * 소개는 전 경력을 걸치고, 아래 네 칸은 대표 작업 네 개를 이름으로 세운다.
 */
export function Hero() {
  return (
    <section className="ml-14 w-[min(840px,100%-56px)] max-page:mx-auto max-page:w-[min(840px,100%-32px)] pt-28 pb-4 max-page:pt-16 print:w-full print:ml-0 print:pt-0">
      <h1 className="text-t7 font-bold leading-[1.06] tracking-tighter">
        <span className="block">프론트엔드 개발자</span>
        <span className="block">
          <b className="font-bold shadow-[inset_0_-0.1em_0_var(--color-mark-line)]">신나라</b>
          입니다.
        </span>
      </h1>
      <p className="mt-8 max-w-[60ch] text-[clamp(16px,1.5vw,18px)] font-normal text-balance leading-[1.8] tracking-[-0.005em] text-ink-2">
        2019년 Java 풀스택으로 시작해 프론트엔드로 전향했습니다. 주력 스택은 TypeScript · React ·
        Next.js입니다. 3D를 다루는 서비스 두 곳에서 뷰어를 감싼 웹 화면과 서비스 전체 검색, 디자인
        시스템 등 다양한 작업들을 담당했습니다.
      </p>
      <p className="mt-5 text-t1 text-mute">{KEYWORDS.join("  ·  ")}</p>
      <dl className="mt-14 grid grid-cols-4 border-t border-ink max-page:grid-cols-2">
        {STATS.map((s) => (
          <div
            className="border-r border-rule px-5 pt-4 pb-6 first:pl-0 last:border-r-0 max-page:border-b max-page:nth-2:border-r-0 max-page:nth-3:pl-0 print:break-inside-avoid"
            key={s.k}
          >
            <dt className="text-t1 text-mute">{s.k}</dt>
            <dd
              className={`mt-3 text-[clamp(24px,2.8vw,34px)] leading-none ${s.ko ? "num num-ko" : "num"}`}
            >
              {s.n}
            </dd>
            <dd className="mt-2.5 text-t2 font-normal leading-[1.6] text-mute">{s.d}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-t2 font-normal text-mute">
        성능 수치는 팀원 각자 PC에서 잰 랩 기준 평균입니다.
      </p>
    </section>
  );
}
