import { STATS } from "./content/hero";

/**
 * 히어로 — 채용 담당자가 스크롤 없이 몇 초 안에 보는 구간.
 * 이력서 첫 문단과 같은 주장을 하되, 바로 아래 대표 작업 캡처가 그 근거가 된다.
 */
export function Hero() {
  return (
    <section className="mx-auto grid w-[min(1120px,100%-48px)] grid-cols-12 items-end gap-x-12 pt-24 pb-6 max-page:w-[min(1120px,100%-32px)] max-page:grid-cols-1 max-page:pt-14">
      <div className="col-span-7 max-page:col-span-1">
        <p className="text-t2 font-medium tracking-[0.02em] text-mark">경력 6년 11개월</p>
        <h1 className="mt-4 max-w-[18ch] text-t7 font-bold text-balance leading-[1.12] tracking-[-0.045em]">
          프론트엔드 개발자 <span className="text-mark">신나라</span>입니다.
        </h1>
        <p className="mt-7 max-w-[60ch] text-[clamp(16px,1.5vw,18px)] font-normal text-pretty leading-[1.8] text-ink-2">
          대량 목록 렌더링과 복잡한 클라이언트 상태 관리에 강점이 있습니다. 글로벌 B2B 3D 협업
          플랫폼 <span className="whitespace-nowrap">CLO-SET</span>에서 수만 건 목록의 가상화,
          워크룸 첫 화면 LCP 44% 단축, MobX 중심 상태 관리를 서버 상태와 클라이언트 상태로 나누는
          구조 전환을 주도했습니다.
        </p>
        <p className="mt-4 max-w-[60ch] text-[clamp(16px,1.5vw,18px)] font-normal text-pretty leading-[1.8] text-ink-2">
          기획 회의에 참여해 PO, 디자이너에게 구현 제약을 설명하고 범위를 함께 정해 왔습니다.
          백엔드와는 응답 필드 축소를, 인프라 담당자와는 배포 구조 변경을 협의했습니다.
        </p>
      </div>
      <dl className="col-span-5 grid grid-cols-2 border-t border-ink max-page:col-span-1 max-page:mt-12">
        {STATS.map((s) => (
          <div className="border-b border-rule px-5 pt-4 pb-5 odd:border-r odd:pl-0" key={s.k}>
            <dt className="text-t1 text-mute">{s.k}</dt>
            <dd
              className={`mt-3 text-[clamp(22px,2.6vw,30px)] leading-none ${s.ko ? "num num-ko" : "num"}`}
            >
              {s.n}
            </dd>
            <dd className="mt-2.5 text-t2 font-normal text-pretty leading-[1.6] text-mute">
              {s.d}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
