import { Link, NavLink, useLocation } from "react-router-dom";
import { useSectionInView } from "../hooks/useSectionInView";

/** 페이지 링크는 NavLink 로 현재 위치를 표시하고, 홈 안의 앵커는 Link 로 둔다. */
const PAGES = [
  { to: "/work", label: "작업" },
  { to: "/career", label: "경력" },
] as const;
const ANCHORS = [
  { id: "ai", to: "/#ai", label: "AI" },
  { id: "contact", to: "/#contact", label: "연락처" },
] as const;
const ANCHOR_IDS = ANCHORS.map((a) => a.id);

const ITEM = "relative block rounded-sm px-3 py-2 text-t2 font-medium no-underline max-card:px-1.5";
const ON =
  "font-semibold text-ink after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:bg-mark after:content-[''] max-card:after:inset-x-1.5";
const OFF = "text-ink-3 hover:text-ink";

/**
 * 상단 띠. 왼쪽은 영문 이름 JoyNara(링크 아이디와 같은 표기), 한글 이름. 오른쪽은 페이지 링크.
 * 지금 보는 페이지(홈에서는 읽고 있는 섹션)는 글자를 진하게 하고 아래에 강조색 막대를 둔다. 작업 글(/work/:slug)도 작업으로 친다.
 */
export function SiteHeader() {
  /* AI, 연락처는 홈 안의 섹션이라 경로가 아니라 스크롤 위치로 현재 위치를 판단한다 */
  const section = useSectionInView(ANCHOR_IDS, useLocation().pathname === "/");
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper text-ink print:hidden">
      <div className="mx-auto flex h-16 w-[min(720px,100%-48px)] items-center justify-between gap-6 max-page:w-[min(720px,100%-32px)]">
        <Link
          aria-label="신나라, 홈으로"
          className="-mx-2 flex items-baseline gap-2 rounded-md px-2 py-1.5 no-underline focus-visible:outline-offset-0"
          to="/"
        >
          <span className="flex items-baseline gap-2">
            <span className="text-t3 font-bold tracking-[-0.02em] text-ink">JoyNara</span>
            <span className="text-t3 text-ink-3">신나라</span>
          </span>
        </Link>
        <nav aria-label="주 메뉴">
          <ul className="flex list-none gap-1 max-card:gap-0.5">
            {PAGES.map((l) => (
              <li key={l.to}>
                <NavLink className={({ isActive }) => `${ITEM} ${isActive ? ON : OFF}`} to={l.to}>
                  {l.label}
                </NavLink>
              </li>
            ))}
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
