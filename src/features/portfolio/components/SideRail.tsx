import { NAV, NAV_IDS } from "../content/nav";
import { MAIL } from "../content/profile";
import { useScrollSpy } from "../hooks/useScrollSpy";

/**
 * 왼쪽 칼럼. 데스크톱에서는 화면 높이만큼 붙어 있고, 좁은 폭에서는 상단 가로 띠가 된다.
 *
 * 데스크톱에서는 **테두리도 배경도 두지 않는다.** 전에는 오른쪽에 세로 괘선을 긋고 흰 판을
 * 깔았는데, 그러면 본문과 남남으로 읽힌다. 실측한 두 사례
 * (brittanychiang.com · leerob.com) 모두 왼쪽 칼럼에 테두리도 배경도 없다 —
 * 내비게이션 띠가 아니라 같은 지면의 한 단으로 둔다. 이름을 제 크기로 세우는 것도 같은 이유다.
 * 좁은 폭에서는 본문 위에 떠서 겹치므로 그때만 아래 괘선과 반투명 지면을 준다.
 *
 * 읽고 있는 구간을 표시하고 주소창의 해시를 거기에 맞춘다. 검색 케이스가 검색 조건을
 * URL 단일 출처로 뒀다고 말하는 지면이라, 이 화면도 지금 위치를 주소에 둔다.
 *
 * 좁은 폭에서 상위 항목과 그 하위 항목이 한 줄에 이어지도록 감싸는 li 까지 가로 flex 로 편다.
 * display:contents 로 박스를 지우는 방법은 한 겹만 벗겨서(li 가 남는다) 세로로 쌓였다.
 */

/*
 * 지금 읽고 있는 구간.
 *
 * 칠하지도 띄우지도 않는다. 두 번 실패해서 남긴다 —
 *  ① 옅은 청록 칠 + 왼쪽 2px 색 막대: 신호를 셋 겹쳐 촌스러웠다.
 *  ② 흰 표면 + 그림자: 레일도 지면도 흰색이라 흰 칩이 뜰 곳이 없었다. 눈에 안 들어왔다.
 * 실측한 답(tailwindcss.com 도큐먼트 레일)은 상자를 아예 없애는 것이다 —
 * 상자가 있으면 그것이 글자 변화를 잡아먹는다.
 *
 * 지금은 **굵기와 잉크 농도**가 신호다. 비활성을 한 단 흐리게 내려 폭을 벌린다:
 * mute(5.3:1) → ink(15.8:1), 400 → 600. 굵기는 색이 아니므로 색만으로 알리지 않는다는
 * 조건도 같이 만족한다. 강제 색상 모드에는 윤곽선을 따로 그린다.
 */
const LINK =
  "flex items-baseline justify-between gap-2.5 rounded-sm no-underline transition-colors duration-150 " +
  "data-[on=true]:font-semibold data-[on=true]:text-ink " +
  "data-[on=true]:forced-colors:outline data-[on=true]:forced-colors:outline-1 " +
  "max-rail:min-h-11 max-rail:items-center max-rail:whitespace-nowrap max-rail:px-2.5 max-rail:py-3";

export function SideRail() {
  const { active, holdUntil } = useScrollSpy(NAV_IDS);

  return (
    <aside
      className="sticky top-0 flex h-screen flex-col gap-9 overflow-y-auto overscroll-contain px-5 pt-28 pb-6
        max-rail:z-30 max-rail:h-auto max-rail:min-w-0 max-rail:flex-row max-rail:items-center max-rail:gap-3.5 max-rail:overflow-visible
        max-rail:border-b max-rail:border-rule max-rail:bg-surface-veil max-rail:px-4 max-rail:py-[9px] max-rail:pt-[9px] max-rail:backdrop-blur-[10px]
        print:hidden"
    >
      <a
        className="block pl-3 no-underline active:opacity-70 max-rail:flex-none max-rail:pl-0"
        href="#main"
      >
        <span className="block text-t6 font-bold tracking-[-0.04em] max-rail:text-t3">신나라</span>
        <span className="mt-1.5 block text-t2 text-mute max-rail:hidden">프론트엔드 개발자</span>
      </a>

      {/* 연락처가 가로 스크롤 뒤에 숨는다. 스크롤이 가능하다는 신호를 오른쪽 끝에 둔다.
          여기 #000 은 색이 아니라 마스크의 알파(불투명)라 토큰으로 바꾸지 않는다. */}
      <nav
        className="max-rail:relative max-rail:min-w-0 max-rail:flex-1 max-rail:overflow-x-auto max-rail:[scrollbar-width:none]
          max-rail:[mask-image:linear-gradient(90deg,#000_calc(100%-24px),transparent)]
          [&::-webkit-scrollbar]:hidden"
        aria-label="작업 인덱스"
      >
        <ul className="list-none max-rail:flex max-rail:items-center max-rail:gap-1">
          {NAV.map((s) => {
            const on = active === s.id || s.children.some((c) => c.id === active);
            return (
              <li className="max-rail:flex max-rail:items-center max-rail:gap-1" key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => holdUntil(s.id)}
                  data-on={on}
                  aria-current={on ? "true" : undefined}
                  className={`${LINK} px-2.5 py-[7px] text-sm font-normal text-mute hover:text-ink max-rail:text-[13px]`}
                >
                  <span>{s.label}</span>
                  {/* meta 는 섹션마다 있을 수도 없을 수도 있다 — 없는 수를 만들지 않는다. */}
                  {"meta" in s && s.meta ? (
                    <span className="flex-none text-t1 text-mute max-rail:hidden">{s.meta}</span>
                  ) : null}
                </a>
                {/* 하위 내비를 숨기면 사례 5건이 탭 순서에서까지 사라진다. 같은 줄에 펴서 남긴다. */}
                {s.children.length > 0 ? (
                  <ul className="mt-px mb-1.5 border-l border-rule pl-[11px] max-rail:m-0 max-rail:flex max-rail:items-center max-rail:gap-1 max-rail:border-l-0 max-rail:pl-0">
                    {s.children.map((c) => (
                      <li key={c.id}>
                        <a
                          href={`#${c.id}`}
                          onClick={() => holdUntil(c.id)}
                          data-on={active === c.id}
                          aria-current={active === c.id ? "true" : undefined}
                          className={`${LINK} px-2.5 py-[5px] text-[13px] font-normal text-mute hover:text-ink max-rail:text-[12.5px]`}
                        >
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 좁은 폭에서는 이메일을 상단 띠에서 뺀다. 둘이 폭을 나눠 가지면 목적지 9개 중 2개만 보인다.
          이메일은 연락처 섹션에 32px 로 따로 있고, 왼쪽 이름이 맨 위로 돌아가는 링크다. */}
      <div className="mt-auto flex flex-col gap-4 pl-[11px] max-rail:hidden">
        <a
          className="self-start border-b border-mark-line pb-0.5 font-mono text-[11.5px] break-all text-mark no-underline hover:border-mark active:border-mark-deep active:text-mark-deep"
          href={`mailto:${MAIL}`}
        >
          {MAIL}
        </a>
      </div>
    </aside>
  );
}
