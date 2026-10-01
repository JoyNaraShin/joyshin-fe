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
          Java, Spring 기반 풀스택 개발로 시작해 프론트엔드로 전향했습니다. 결과가 눈에 바로 보이고,
          사용자와 가장 가까운 자리에서 피드백을 가장 먼저 받는 일이라는 점이 저와 잘 맞았습니다.
        </p>
        <p>
          사용자의 반응을 살피는 만큼 동료와도 적극적으로 소통합니다. 문제가 생기면 기획, 디자인,
          백엔드 쪽에 먼저 이야기를 꺼내고 같이 답을 찾습니다. 그렇게 찾은 답은 구조로 남기려고
          합니다. CLO-SET에서 모노레포와 상태 관리 구조를 다시 설계하고, 목록마다 흩어져 있던
          가상화를 공통 훅 하나로 정리한 것도 그런 작업이었습니다.
        </p>
        <p>
          다음 프로젝트에서도 다시 같이 일하고 싶은 동료이고 싶습니다. 이곳에는 그동안 해 온 작업과
          그 과정에서 고민한 것들을 적어 두었습니다.
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
