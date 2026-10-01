import { Link, useLocation } from "react-router-dom";
import { useSectionInView } from "../hooks/useSectionInView";

/** 페이지 링크는 NavLink 로 현재 위치를 표시하고, 홈 안의 앵커는 Link 로 둔다. */
const PAGES = [
  { to: "/work", label: "작업", section: "home-work" },
  { to: "/career", label: "경력", section: "home-career" },
] as const;
const ANCHORS = [
  { id: "ai", to: "/#ai", label: "AI" },
  { id: "contact", to: "/#contact", label: "연락처" },
] as const;
/* 홈에서는 대표 작업과 경력 요약 구간도 같은 규칙으로 해당 메뉴를 켠다 */
const SECTION_IDS = [...PAGES.map((p) => p.section), ...ANCHORS.map((a) => a.id)];

const ITEM = "relative block rounded-sm px-3 py-2 text-t2 font-medium no-underline max-card:px-1.5";
const ON =
  "font-semibold text-ink after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:bg-mark after:content-[''] max-card:after:inset-x-1.5";
const OFF = "text-ink-3 hover:text-ink";

/**
 * 상단 띠. 왼쪽은 영문 이름 JoyNara(링크 아이디와 같은 표기)와 직무. 좁은 폭에서는 직무를 숨긴다. 한글 이름은 홈 소개 제목이 맡는다. 오른쪽은 페이지 링크.
 * 지금 보는 페이지(홈에서는 읽고 있는 섹션)는 글자를 진하게 하고 아래에 강조색 막대를 둔다. 작업 글(/work/:slug)도 작업으로 친다.
 */
export function SiteHeader() {
  /* AI, 연락처는 홈 안의 섹션이라 경로가 아니라 스크롤 위치로 현재 위치를 판단한다 */
  const { pathname } = useLocation();
  const section = useSectionInView(SECTION_IDS, pathname === "/");
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper text-ink print:hidden">
      <div className="mx-auto flex h-16 w-[min(720px,100%-48px)] items-center justify-between gap-6 max-page:w-[min(720px,100%-32px)]">
        <Link
          aria-label="JoyNara 신나라, 홈으로"
          className="-mx-2 flex items-baseline gap-2 rounded-md px-2 py-1.5 no-underline focus-visible:outline-offset-0"
          to="/"
        >
          <span className="text-t3 font-bold tracking-[-0.02em] text-ink">JoyNara</span>
          <span className="text-t2 text-mute max-card:hidden">Frontend Developer</span>
        </Link>
        <nav aria-label="주 메뉴">
          <ul className="flex list-none gap-1 max-card:gap-0.5">
            {PAGES.map((l) => {
              /* NavLink 는 경로가 활성일 때만 aria-current 를 남기므로, 홈 구간 강조까지 직접 계산한다 */
              const onPage = pathname === l.to || pathname.startsWith(`${l.to}/`);
              const current = onPage ? "page" : section === l.section ? "location" : undefined;
              return (
                <li key={l.to}>
                  <Link
                    aria-current={current}
                    className={`${ITEM} ${current ? ON : OFF}`}
                    to={l.to}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            {ANCHORS.map((l) => (
              <li key={l.to}>
                <Link
                  aria-current={section === l.id ? "location" : undefined}
                  className={`${ITEM} ${section === l.id ? ON : OFF}`}
                  to={l.to}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
