import { LINKS, MAIL } from "./content/profile";

const img = (f: string) => `${import.meta.env.BASE_URL}work/${f}`;

/**
 * 히어로. 큰 글씨 한 문장과 실제 화면 한 장만 둔다.
 * 캡처는 짙은 청록 판 위에 액자처럼 앉힌다 — 흰 배경 캡처가 지면과 섞이지 않고,
 * 그라데이션이나 배지를 얹지 않아도 화면이 먼저 읽힌다.
 */
export function Hero() {
  return (
    <section className="mx-auto w-[min(1200px,100%-48px)] pt-20 pb-6 max-page:w-[min(1200px,100%-32px)] max-page:pt-12">
      <p className="text-t2 font-semibold text-deep">프론트엔드 개발자 · 경력 6년 11개월</p>
      <h1 className="mt-6 max-w-[17ch] text-[clamp(38px,6.2vw,84px)] font-bold text-balance leading-[1.08] tracking-[-0.055em] text-ink">
        대량 목록과 복잡한 상태를 다루는{" "}
        <span className="bg-[linear-gradient(transparent_62%,var(--color-sun)_62%,var(--color-sun)_92%,transparent_92%)] px-1">
          신나라
        </span>
        입니다.
      </h1>

      <div className="mt-10 grid grid-cols-12 gap-x-10 gap-y-6 max-page:grid-cols-1">
        <p className="col-span-7 max-w-[58ch] text-[clamp(15px,1.3vw,18px)] text-pretty leading-[1.8] text-ink-2 max-page:col-span-1">
          글로벌 B2B 3D 협업 플랫폼 <span className="whitespace-nowrap">CLO-SET</span>에서 수만 건
          목록의 가상화, 워크룸 첫 화면 LCP 44% 단축, MobX 중심 상태 관리를 서버 상태와 클라이언트
          상태로 나누는 구조 전환을 주도했습니다.
        </p>
        <ul className="col-span-5 flex list-none flex-wrap content-start items-center gap-x-6 gap-y-2 justify-self-end max-page:col-span-1 max-page:justify-self-start">
          <li>
            <a
              className="rounded-full bg-deep px-5 py-2.5 text-t3 font-semibold text-deep-ink no-underline hover:bg-deep-2"
              href={`mailto:${MAIL}`}
            >
              연락하기
            </a>
          </li>
          {LINKS.slice(0, 2).map((l) => (
            <li key={l.href}>
              <a
                className="border-b border-ink/30 pb-0.5 text-t3 font-medium text-ink no-underline hover:border-ink"
                href={l.href}
                rel="noreferrer"
                target="_blank"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <figure className="mt-14 rounded-[28px] bg-deep p-[clamp(16px,4vw,56px)] max-page:mt-10">
        <img
          alt="CLO-SET 버추얼 쇼룸 라이브 화면"
          className="block h-auto w-full rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
          fetchPriority="high"
          height={1016}
          src={img("showroom-live.webp")}
          width={1600}
        />
        <figcaption className="mt-5 flex flex-wrap justify-between gap-x-6 gap-y-1 text-t2 text-deep-mute">
          <span>
            <b className="font-semibold text-deep-ink">버추얼 쇼룸</b> 라이브 화면. 2022 하반기부터
            2026 상반기까지 프론트엔드 단독 담당
          </span>
          <span>출처 CLO-SET 헬프센터</span>
        </figcaption>
      </figure>
    </section>
  );
}
