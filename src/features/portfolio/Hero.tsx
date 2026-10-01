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
          Java, Spring 풀스택 개발자로 시작해 프론트엔드로 전향했습니다. 만든 결과가 바로 눈에
          보이고 사용자의 반응이 가장 먼저 닿는 자리라는 점이 저와 잘 맞았습니다.
        </p>
        <p>
          사용자와 가까운 일을 좋아하는 만큼, 동료와의 소통에도 적극적입니다. 문제가 보이면 기획자,
          디자이너, 백엔드 개발자와 일찍 공유하고 함께 해결책을 찾습니다. 그리고 찾은 해결책이 한
          번으로 끝나지 않도록 구조로 정리하는 것까지가 제 일이라고 생각합니다. CLO-SET에서
          모노레포와 상태 관리 구조를 다시 설계하고, 목록마다 따로 구현돼 있던 가상화를 공통 훅
          하나로 묶은 일이 그 예입니다.
        </p>
        <p>
          다음 프로젝트에서도 다시 같이 일하고 싶은 동료이고 싶습니다. 이곳에는 그동안의 작업과 그
          과정에서 했던 고민을 정리해 두었습니다.
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
