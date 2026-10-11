import { Suspense, lazy, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import content from "./content.json";
import "./applications.css";

const VideoEditor = lazy(() => import("../samples/VideoEditor"));
const CanvasEditor = lazy(() => import("../samples/CanvasEditor"));
export type Employer = keyof typeof content.profiles;
export type CaseId = keyof typeof content.cases;
export function ApplicationPage() {
  const { employer = "", section } = useParams();
  const profile = content.profiles[employer as Employer];
  const caseStudy = content.cases[section as CaseId];
  const base = `/apply/${employer}`;
  useEffect(() => {
    if (profile)
      document.title = `신나라 | ${profile.company} | ${section === "demo" ? profile.demoTitle : (caseStudy?.title ?? profile.label)}`;
    window.scrollTo(0, 0);
  }, [profile, caseStudy, section]);
  if (!profile || (section && section !== "demo" && !caseStudy)) {
    return (
      <main className="application">
        <h1>페이지를 찾을 수 없습니다.</h1>
        <Link to="/">포트폴리오 홈</Link>
      </main>
    );
  }
  return (
    <div className="application">
      <a className="skip-link" href="#application-main">
        본문으로 이동
      </a>
      <header className="application-header">
        <Link to={base} aria-label={`${profile.company} 포트폴리오 첫 화면`}>
          <strong>신나라</strong>
          <span>Frontend Developer</span>
        </Link>
        <nav aria-label="지원 포트폴리오">
          <Link to={`${base}#work`}>주요 작업</Link>
          <Link to={`${base}/demo`}>구현 샘플</Link>
          <a href="mailto:joyshin.dev@gmail.com">연락</a>
        </nav>
      </header>
      <main id="application-main">
        {section === "demo" ? (
          <>
            <Link className="back-link" to={base}>
              ← 포트폴리오
            </Link>
            <p className="eyebrow">지원 준비 프로젝트 · 2026.10 · AI 보조 구현</p>
            <h1>{profile.demoTitle}</h1>
            <p className="lede">{profile.demoIntro}</p>
            <p className="scope-note">{profile.demoLimits}</p>
            <Suspense fallback={<output>편집기 불러오는 중…</output>}>
              {employer === "clipy" ? <VideoEditor /> : <CanvasEditor />}
            </Suspense>
            <section className="app-section">
              <h2>구현을 검토하려면</h2>
              <p>
                편집 결과는 문서 데이터로 저장하고, 선택·확대·재생 위치처럼 일시적인 화면 상태는
                실행 취소 이력에서 분리했습니다. 같은 문서 모델을 기준으로 수정과 복원을 처리합니다.
              </p>
              <p>
                <a
                  href="https://github.com/JoyNaraShin/joyshin-fe/tree/main/src/features/samples"
                  target="_blank"
                  rel="noreferrer"
                >
                  소스 코드와 데이터 모델
                </a>{" "}
                ·{" "}
                <a
                  href="https://github.com/JoyNaraShin/joyshin-fe/tree/main/tests"
                  target="_blank"
                  rel="noreferrer"
                >
                  상태 전이 테스트
                </a>
              </p>
            </section>
          </>
        ) : caseStudy ? (
          <>
            <Link className="back-link" to={`${base}#work`}>
              ← 주요 작업
            </Link>
            <article>
              <p className="eyebrow">{caseStudy.when}</p>
              <h1>{caseStudy.title}</h1>
              <p className="lede">{caseStudy.intro}</p>
              <dl className="case-meta">
                <dt>담당</dt>
                <dd>{caseStudy.role}</dd>
                <dt>기술</dt>
                <dd>{caseStudy.stack}</dd>
              </dl>
              {"image" in caseStudy && (
                <figure className="case-figure">
                  <img
                    src={`${import.meta.env.BASE_URL}work/${caseStudy.image}`}
                    alt={caseStudy.caption}
                  />
                  <figcaption>{caseStudy.caption}</figcaption>
                </figure>
              )}
              {caseStudy.sections.map(([title, paragraph]) => (
                <section className="app-section" key={title}>
                  <h2>{title}</h2>
                  <p>{paragraph}</p>
                </section>
              ))}
            </article>
            <nav className="case-next" aria-label="다른 사례">
              {profile.cases
                .filter((id) => id !== section)
                .map((id) => (
                  <Link to={`${base}/${id}`} key={id}>
                    {content.cases[id as CaseId].title} →
                  </Link>
                ))}
            </nav>
          </>
        ) : (
          <>
            <section className="application-hero">
              <p className="eyebrow">
                {profile.company} · {profile.label}
              </p>
              <h1>{profile.headline}</h1>
              <p className="lede">{profile.summary}</p>
              <p className="experience-line">
                신나라 · 총 경력 6년 11개월 · 프론트엔드 및 풀스택 개발
              </p>
              <div className="focus-list">
                {profile.focus.map((text) => (
                  <span key={text}>{text}</span>
                ))}
              </div>
              <div className="action-row">
                <a className="primary-link" href="#work">
                  주요 작업 보기 ↓
                </a>
                <Link to={`${base}/demo`}>구현 샘플 열기 →</Link>
              </div>
            </section>
            <section id="work" className="app-section">
              <div className="section-heading">
                <p className="eyebrow">SELECTED WORK</p>
                <h2>직접 맡은 일과 구현 판단</h2>
              </div>
              <div className="case-list">
                {profile.cases.map((id, i) => {
                  const item = content.cases[id as CaseId];
                  return (
                    <Link className="case-row" to={`${base}/${id}`} key={id}>
                      <span className="case-number">0{i + 1}</span>
                      <div>
                        <p className="eyebrow">{item.when}</p>
                        <h3>
                          {item.title}
                          <span aria-hidden="true"> ↗</span>
                        </h3>
                        <p>{item.intro}</p>
                        <small>{item.role}</small>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
            <section className="app-section sample-teaser">
              <p className="eyebrow">별도 구현 샘플 · 2026.10</p>
              <h2>{profile.demoTitle}</h2>
              <p>{profile.demoIntro}</p>
              <Link to={`${base}/demo`}>직접 실행하고 코드 보기 →</Link>
              <p className="scope-note">
                AI 보조로 제작한 지원 준비 프로젝트이며, 기존 회사의 상용 실무 경력과 구분합니다.
              </p>
            </section>
            <section id="career" className="app-section">
              <p className="eyebrow">EXPERIENCE</p>
              <h2>경력</h2>
              <div className="career-entry">
                <div>
                  <h3>클로버추얼패션</h3>
                  <p>2022.04 - 2026.04</p>
                </div>
                <p>
                  CLO-SET 프론트엔드 개발. 쇼룸 편집기 단독 담당, 3D·2D·렌더 뷰어 설계, 목록 가상화,
                  로딩 개선, 요금제·백오피스 개발.
                </p>
              </div>
              <div className="career-entry">
                <div>
                  <h3>쓰리아이</h3>
                  <p>2021.07 - 2022.04</p>
                </div>
                <p>
                  Vue 3·TypeScript 기반 Pivo 미디어 클라우드·3D 투어와 Beamo 공간 스팟 배치 기능
                  개발 및 유지보수.
                </p>
              </div>
              <div className="career-entry">
                <div>
                  <h3>노스스타컨설팅</h3>
                  <p>2019.05 - 2021.05</p>
                </div>
                <p>
                  KT·로레알 고객사 SI의 Java/Spring 풀스택 개발. 선진 성과 관리 시스템 Vue.js 화면
                  개발·운영 유지보수.
                </p>
              </div>
            </section>
            <section className="app-section">
              <h2>협업과 개발 도구</h2>
              <p>
                기획 단계에서 PO·디자이너와 구현 제약과 범위를 합의하고, 백엔드와 API 변경의 영향
                범위를 확인했습니다. 배포 구조 변경은 제안서와 테스트 서버 검증을 통해 인프라
                담당자와 검토했습니다.
              </p>
              <p>
                Claude Code에서 설계·코드 리뷰 역할을 분리하고, 타입 검사·린트·테스트를 연결한 개발
                흐름으로 프로토타입을 제작했습니다.
              </p>
              <a href="https://joyshin-proto-lab.vercel.app/" target="_blank" rel="noreferrer">
                기존 프로토타입 모음 →
              </a>
            </section>
          </>
        )}
      </main>
      <footer className="application-footer">
        <div>
          <strong>신나라</strong>
          <a href="mailto:joyshin.dev@gmail.com">joyshin.dev@gmail.com</a>
        </div>
        <a href="https://github.com/JoyNaraShin" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </footer>
    </div>
  );
}
