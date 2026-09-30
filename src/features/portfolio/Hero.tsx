import { MAIL } from "./content/profile";

const img = (f: string) => `${import.meta.env.BASE_URL}work/${f}`;

/**
 * 히어로. 채용 담당자가 스크롤 없이 보는 구간이라 글보다 화면이 먼저 보이게 한다.
 * 왼쪽은 이력서 요약 문단, 오른쪽은 실제로 만든 쇼룸의 라이브 화면과 편집 화면을 겹쳐 둔다.
 * 수치는 칸을 따로 세우지 않고 캡처 위 배지 두 개로만 올린다 — 수치가 약한 칸을 늘어놓으면
 * 오히려 빈약해 보인다.
 */
export function Hero() {
  return (
    <section className="overflow-hidden bg-night text-night-ink">
      <div className="mx-auto grid w-[min(1200px,100%-48px)] grid-cols-12 items-center gap-x-12 gap-y-14 pt-20 pb-24 max-page:w-[min(1200px,100%-32px)] max-page:grid-cols-1 max-page:pt-12 max-page:pb-16">
        <div className="col-span-6 max-page:col-span-1">
          <p className="text-t2 font-medium text-mark-bright">
            프론트엔드 개발자 · 경력 6년 11개월
          </p>
          <h1 className="mt-5 text-[clamp(34px,4.6vw,60px)] font-bold text-balance leading-[1.12] tracking-[-0.045em]">
            대량 목록과 복잡한 상태를 다루는 <span className="text-mark-bright">신나라</span>입니다.
          </h1>
          <p className="mt-7 max-w-[54ch] text-[clamp(15px,1.3vw,17px)] text-pretty leading-[1.8] text-night-mute">
            글로벌 B2B 3D 협업 플랫폼 <span className="whitespace-nowrap">CLO-SET</span>에서 수만 건
            목록의 가상화, 워크룸 첫 화면 LCP 44% 단축, MobX 중심 상태 관리를 서버 상태와 클라이언트
            상태로 나누는 구조 전환을 주도했습니다. PO, 디자이너와 구현 범위를 함께 정하고 백엔드,
            인프라 담당자와 응답 필드와 배포 구조를 협의해 왔습니다.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              className="rounded-full bg-mark-bright px-6 py-3 text-t3 font-semibold text-night no-underline hover:brightness-110"
              href="#work"
            >
              대표 작업 보기
            </a>
            <a
              className="rounded-full border border-night-line px-6 py-3 text-t3 font-medium text-night-ink no-underline hover:border-night-mute"
              href="https://github.com/JoyNaraShin"
              rel="noreferrer"
              target="_blank"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              className="px-2 py-3 text-t3 text-night-mute no-underline hover:text-night-ink"
              href={`mailto:${MAIL}`}
            >
              {MAIL}
            </a>
          </div>
        </div>

        {/* 캡처 겹침. 뒤는 편집 화면, 앞은 바이어가 보는 라이브 화면. */}
        <div className="relative col-span-6 max-page:col-span-1">
          <img
            alt=""
            className="ml-auto block w-[82%] rounded-lg opacity-70 ring-1 ring-night-line"
            height={902}
            src={img("showroom-editor.webp")}
            width={1600}
          />
          <img
            alt="CLO-SET 버추얼 쇼룸 라이브 화면"
            className="relative -mt-[34%] block w-[84%] rounded-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-night-line"
            fetchPriority="high"
            height={1016}
            src={img("showroom-live.webp")}
            width={1600}
          />
          <div className="absolute right-0 bottom-[8%] rounded-xl border border-night-line bg-night-2/95 px-5 py-4 shadow-2xl backdrop-blur max-card:static max-card:mt-4">
            <p className="text-t1 text-night-mute">버추얼 쇼룸</p>
            <p className="mt-1 text-[22px] leading-none font-bold tracking-[-0.03em]">
              프론트엔드 단독{" "}
              <span className="text-t2 font-normal text-night-mute">2022 – 2026</span>
            </p>
          </div>
          <div className="absolute top-[4%] left-[-2%] rounded-xl border border-night-line bg-night-2/95 px-5 py-4 shadow-2xl backdrop-blur max-page:left-0 max-card:static max-card:mt-3">
            <p className="text-t1 text-night-mute">가상화한 에셋 목록</p>
            <p className="mt-1 text-[22px] leading-none font-bold tracking-[-0.03em]">
              수만 건{" "}
              <span className="text-t2 font-normal text-night-mute">DOM은 보이는 행만큼</span>
            </p>
          </div>
        </div>
      </div>
      <p className="mx-auto w-[min(1200px,100%-48px)] border-t border-night-line py-5 text-t2 text-night-mute max-page:w-[min(1200px,100%-32px)]">
        캡처 출처 CLO-SET 헬프센터 · CLO-SET 2022.04 – 2026.04
      </p>
    </section>
  );
}
