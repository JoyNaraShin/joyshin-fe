import { Link, NavLink } from "react-router-dom";
import { Mark } from "./Mark";

/** 페이지 링크는 NavLink 로 현재 위치를 표시하고, 홈 안의 앵커는 Link 로 둔다. */
const PAGES = [
  { to: "/work", label: "작업" },
  { to: "/career", label: "경력" },
] as const;
const ANCHORS = [
  { to: "/#ai", label: "AI" },
  { to: "/#contact", label: "연락처" },
] as const;

const ITEM = "relative block rounded-sm px-3 py-2 text-t2 font-medium no-underline max-card:px-2";

/**
 * 상단 띠. 왼쪽은 표식과 이름, 직무. 오른쪽은 페이지 링크.
 * 지금 보는 페이지는 글자를 진하게 하고 아래에 강조색 막대를 둔다. 작업 글(/work/:slug)도 작업으로 친다.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper text-ink print:hidden">
      <div className="mx-auto flex h-16 w-[min(720px,100%-48px)] items-center justify-between gap-6 max-page:w-[min(720px,100%-32px)]">
        <Link aria-label="신나라, 홈으로" className="flex items-center gap-2.5 no-underline" to="/">
          <Mark />
          <span className="flex items-baseline gap-2">
            <span className="text-t3 font-bold tracking-[-0.02em] text-ink">신나라</span>
            <span className="text-t2 text-mute max-card:hidden">프론트엔드 개발자</span>
          </span>
        </Link>
        <nav aria-label="주 메뉴">
          <ul className="flex list-none gap-1">
            {PAGES.map((l) => (
              <li key={l.to}>
                <NavLink
                  className={({ isActive }) =>
                    `${ITEM} ${
                      isActive
                        ? "font-semibold text-ink after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:bg-mark after:content-[''] max-card:after:inset-x-2"
                        : "text-ink-3 hover:text-ink"
                    }`
                  }
                  to={l.to}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            {ANCHORS.map((l) => (
              <li key={l.to}>
                <Link className={`${ITEM} text-ink-3 hover:text-ink`} to={l.to}>
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
