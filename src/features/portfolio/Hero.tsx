import { LINKS, MAIL } from "./content/profile";
import { COLUMN } from "./layout/DocSection";

export function Hero() {
  return (
    <section className={`${COLUMN} pt-20 max-page:pt-12`}>
      {/*
        이력서 요약은 업무 성과로 쓰고, 이 첫 화면은 블로그의 소개 글처럼 쓴다.
        어떤 사람이고 무엇을 중요하게 여기는지. 성과 수치는 바로 아래 수치 띠와 작업 글이 맡는다.
      */}
      <p className="text-t2 font-medium text-mark tabular-nums">
        프론트엔드 개발자 · 경력 6년 11개월
      </p>
      <h1 className="mt-3 text-[clamp(26px,4.2vw,34px)] font-bold text-balance leading-[1.35] tracking-[-0.035em]">
        안녕하세요, 나라입니다
      </h1>
      <div className="mt-6 space-y-4 text-t3 text-pretty leading-[1.85] text-ink-2">
        <p>
          브랜드와 제조사가 3D 에셋을 함께 다루는 <span className="whitespace-nowrap">CLO-SET</span>
          에서 4년 동안 일했습니다. 수만 건이 넘는 에셋 목록을 끊김 없이 보여 주는 일, 얽혀 있던
          화면 상태를 정리하는 일을 주로 했고, 버추얼 쇼룸은 처음 만들 때부터 퇴사할 때까지 제가
          맡았습니다.
        </p>
        <p>
          일하면서 가장 중요하게 생각하는 건 같이 일하는 사람들입니다. 기획 회의에서는 어려운 부분을
          미리 꺼내 PO, 디자이너와 범위를 같이 정하고, 백엔드나 인프라 쪽과 무언가를 바꿔야 할 때는
          그쪽 사정부터 들어 보려고 합니다. 다음 프로젝트에서도 다시 같이 일하고 싶은 동료가 되는 게
          목표입니다.
        </p>
        <p>
          만든 화면은 오래 책임지려고 합니다. 구조를 바꿀 때는 팀이 같이 익히고 유지할 수 있는지를
          먼저 따지고, 개선을 제안할 때는 직접 재 본 숫자를 가져갑니다. 이곳에는 그동안 해 온 작업과
          그 과정에서 고민한 것들을 정리해 두었습니다.
        </p>
      </div>
      <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-t3">
        <a
          className="text-mark underline underline-offset-4 hover:text-mark-deep"
          href={`mailto:${MAIL}`}
        >
          {MAIL}
        </a>
        {LINKS.slice(0, 2).map((l) => (
          <a
            className="text-mark underline underline-offset-4 hover:text-mark-deep"
            href={l.href}
            key={l.href}
            rel="noreferrer"
            target="_blank"
          >
            {l.label}
          </a>
        ))}
      </p>
    </section>
  );
}
