import { LINKS, MAIL } from "./content/profile";
import { COLUMN } from "./layout/DocSection";

export function Hero() {
  return (
    <section className={`${COLUMN} pt-20 max-page:pt-12`}>
      {/*
        이력서 요약은 업무 성과로 쓰고, 이 첫 화면은 블로그의 소개 글처럼 쓴다.
        어떤 사람이고 무엇을 중요하게 여기는지. 성과 수치는 바로 아래 수치 띠와 작업 글이 맡는다.
      */}
      <h1 className="sr-only">신나라, 프론트엔드 개발자</h1>
      <p className="text-t2 font-medium text-mark tabular-nums">
        프론트엔드 개발자 · 경력 6년 11개월
      </p>
      <div className="mt-4 space-y-4 text-t3 text-pretty leading-[1.85] text-ink-2">
        <p>
          Java, Spring 풀스택 개발자로 시작해 프론트엔드로 전향했습니다. 기획한 기능이 사용자에게
          어떻게 전달될지는 화면에서 정해집니다. 같은 기능이라도 화면을 어떻게 설계하느냐에 따라
          사용자가 느끼는 품질이 달라지고, 그 차이를 가장 가까이에서 확인하고 책임질 수 있다는 점에
          끌렸습니다.
        </p>
        <p>
          협업은 제가 가장 자신 있는 부분입니다. 좋은 제품은 여러 직군이 같은 그림을 보고 있을 때
          만들어진다고 생각합니다. 그래서 문제가 보이면 일찍 공유하고, 상대의 상황을 먼저 이해한 뒤
          함께 답을 찾습니다. 다음 프로젝트에서도 다시 같이 일하고 싶은 동료이고 싶습니다.
        </p>
        <p>
          문제를 풀 때는 같은 문제가 다시 생기지 않는 구조를 함께 고민합니다. CLO-SET에서는 서버
          상태와 UI 상태가 한 스토어에 섞여 있던 상태 관리를 다시 설계했고, 목록마다 따로 구현돼
          있던 가상화를 공통 훅으로 묶어 전체 목록에 적용했습니다.
        </p>
        <p>이곳에는 그동안의 작업과 그 과정에서 했던 고민을 정리해 두었습니다.</p>
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
