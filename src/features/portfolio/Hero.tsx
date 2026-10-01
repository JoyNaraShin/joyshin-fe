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
          Java, Spring 기반 풀스택 개발로 시작해 프론트엔드로 전향했습니다. 요구사항이 사용자가 보는
          화면에서 바로 검증된다는 점, 생태계가 빠르게 바뀌어 계속 배워야 한다는 점이 저와 잘
          맞았습니다. 새로운 기술을 받아들이는 데 거부감이 없고, 도입할 때는 직접 써 본 뒤 팀이
          유지할 수 있는지를 함께 따집니다.
        </p>
        <p>
          같이 일하는 사람들을 소중하게 생각합니다. 동료들과 자주 이야기하면서 서로 무리하지 않는
          방법을 함께 찾아 가는 과정을 좋아합니다. 다음 프로젝트에서도 다시 같이 일하고 싶은
          동료이고 싶습니다.
        </p>
        <p>이곳에는 그동안 해 온 작업과 그 과정에서 고민한 것들을 적어 두었습니다.</p>
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
