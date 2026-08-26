import { MAIL } from "@/content/profile";

export function SiteHeader() {
  return (
    <header>
      <div className="wrap bar">
        <p className="who">
          신나라 <span>프론트엔드 개발자</span>
        </p>
        <nav>
          <a href="#strength">강점</a>
          <a href="#skill">작업</a>
          <a href="#ai">AI 파이프라인</a>
          <a href="#career">경력</a>
          {/* 연락처는 스크롤 없이 닿는 자리에도 둔다 — 조사한 포폴 3곳 중 2곳이 상단에도 뒀다 */}
          <a className="navmail" href={`mailto:${MAIL}`}>
            {MAIL}
          </a>
        </nav>
      </div>
    </header>
  );
}
