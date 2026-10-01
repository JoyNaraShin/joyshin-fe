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
          SI 회사에서 Java 풀스택 개발자로 일을 시작했고, Vue.js로 화면을 만들다 프론트엔드로
          넘어왔습니다. 쓰리아이를 거쳐 <span className="whitespace-nowrap">CLO-SET</span>에서 4년간
          일했습니다. 에셋 목록 성능과 상태 관리 구조를 주로 다뤘고, 버추얼 쇼룸은 처음 만들 때부터
          퇴사할 때까지 프론트엔드를 혼자 맡았습니다.
        </p>
        <p>
          같이 일하는 사람들을 많이 생각하는 편입니다. 기획 회의에서 구현이 까다로운 부분이 보이면
          미리 말하고, PO, 디자이너와 어디까지 만들지 같이 정합니다. 백엔드나 인프라 쪽에 부탁할
          일이 생기면 그쪽 사정을 먼저 물어봅니다. 다음 프로젝트에서도 다시 같이 일하고 싶은
          동료이고 싶습니다.
        </p>
        <p>
          한번 맡은 화면은 끝까지 책임지려고 합니다. 구조를 바꾸는 일이 생기면 팀원들이 같이 익히고
          유지할 수 있는지부터 봤고, 성능 개선은 직접 재 본 숫자를 들고 가서 제안했습니다. 여기에는
          그동안 한 작업과 그때 고민한 것들을 적어 두었습니다.
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
