import { KEYWORDS, STATS } from "./content/hero";

/**
 * 히어로 — 채용 담당자가 스크롤 없이 3~15초 안에 보는 구간.
 * 소개는 전 경력을 걸치고, 아래 네 칸은 대표 작업 네 개를 이름으로 세운다.
 */
export function Hero() {
  return (
    <section className="hero">
      <h1>
        프론트엔드 개발자 <b>신나라</b>
      </h1>
      <p className="lede">
        2019년 Java 풀스택으로 시작해 프론트엔드로 전향했습니다. 주력 스택은 TypeScript · React ·
        Next.js이며, 3D를 다루는 서비스 두 곳에서 뷰어를 감싼 웹 화면과 서비스 전체 검색, 디자인
        시스템을 담당했습니다.
      </p>
      <ul className="chips">
        {KEYWORDS.map((k) => (
          <li className="chip" key={k}>
            {k}
          </li>
        ))}
      </ul>
      <dl className="stats">
        {STATS.map((s) => (
          <div key={s.k}>
            <dt>{s.k}</dt>
            <dd className={s.ko ? "n ko" : "n"}>{s.n}</dd>
            <dd className="d">{s.d}</dd>
          </div>
        ))}
      </dl>
      <p className="statnote">성능 수치는 팀원 각자 PC에서 잰 랩 기준 평균입니다.</p>
    </section>
  );
}
