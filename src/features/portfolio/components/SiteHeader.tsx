import { Link } from "react-router-dom";

const LINKS = [
  { to: "/#work", label: "작업" },
  { to: "/#career", label: "경력" },
  { to: "/#ai", label: "AI" },
  { to: "/#contact", label: "연락처" },
] as const;

/**
 * 상단 띠 하나. 케이스 페이지가 생기면서 왼쪽 레일(한 페이지 안의 앵커 목차)은 할 일을 잃었다 —
 * 이제 필요한 것은 목차가 아니라 "어느 페이지에서든 목록으로 돌아가는 길"이다.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-surface-veil backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 w-[min(1120px,100%-48px)] items-center justify-between gap-6 max-page:w-[min(1120px,100%-32px)]">
        <Link className="text-t3 font-bold tracking-[-0.02em] no-underline" to="/">
          신나라
          <span className="ml-2 text-t2 font-normal text-mute max-card:hidden">
            프론트엔드 개발자
          </span>
        </Link>
        <nav aria-label="주 메뉴">
          <ul className="flex list-none gap-1">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  className="rounded-sm px-3 py-2 text-t2 font-medium text-ink-3 no-underline hover:bg-inset hover:text-ink max-card:px-2"
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
