import { NAV, NAV_IDS } from "../content/nav";
import { MAIL } from "../content/profile";
import { useScrollSpy } from "../hooks/useScrollSpy";

/**
 * 왼쪽 작업 인덱스. 데스크톱에서는 화면 높이만큼 붙어 있고, 좁은 폭에서는 상단 가로 띠가 된다.
 *
 * 읽고 있는 구간을 표시하고 주소창의 해시를 거기에 맞춘다. 검색 케이스가 검색 조건을
 * URL 단일 출처로 뒀다고 말하는 지면이라, 이 화면도 지금 위치를 주소에 둔다.
 */
export function SideRail() {
  const { active, holdUntil } = useScrollSpy(NAV_IDS);

  return (
    <aside className="rail">
      <a className="rail-me" href="#main">
        <span className="rail-name">신나라</span>
        <span className="rail-role">프론트엔드 개발자</span>
      </a>

      <nav className="rail-nav" aria-label="작업 인덱스">
        <ul>
          {NAV.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => holdUntil(s.id)}
                data-on={active === s.id || s.children.some((c) => c.id === active)}
                aria-current={
                  active === s.id || s.children.some((c) => c.id === active) ? "true" : undefined
                }
                className="rail-top"
              >
                <span>{s.label}</span>
                {s.meta ? <span className="rail-meta">{s.meta}</span> : null}
              </a>
              {s.children.length > 0 ? (
                <ul className="rail-sub">
                  {s.children.map((c) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        onClick={() => holdUntil(c.id)}
                        data-on={active === c.id}
                        aria-current={active === c.id ? "true" : undefined}
                      >
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div className="rail-foot">
        <a className="rail-mail" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </div>
    </aside>
  );
}
