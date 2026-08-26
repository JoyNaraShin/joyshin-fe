import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 앵커를 눌러 이동하는 동안 주소를 붙잡아 두는 최대 시간(ms).
 * 목적지에 닿으면 그전에 풀린다. 사용자가 도중에 스크롤을 가로채 목적지에 영영
 * 닿지 않는 경우가 있어서, 이 시간이 지나면 그냥 푼다.
 */
const HOLD_MS = 1500;

/**
 * 지금 읽고 있는 구간을 돌려주고, 주소창의 해시를 거기에 맞춘다.
 *
 * 스크롤 이벤트를 듣지 않는다. 목록 케이스에서 스크롤 리스너를 IntersectionObserver로
 * 바꾼 이야기를 하는 지면이라, 여기서 다시 스크롤 위치를 재면 앞뒤가 맞지 않는다.
 *
 * 관측 영역은 뷰포트 위쪽의 좁은 띠(15~25%)다. 그 띠에 걸친 구간이 지금 읽는 구간이다.
 * 여럿이 걸리면 **문서 순서상 마지막**을 택한다 — 띠가 화면 위쪽에 있으므로, 두 구간이
 * 동시에 걸린다는 건 앞 구간이 끝나고 뒤 구간이 막 시작했다는 뜻이다. 앞선 것을 택하면
 * 마지막 구간(연락처)은 앞 구간과 경계를 공유해 영원히 켜지지 않는다.
 *
 * 주소는 라우터를 거치지 않고 history 에 직접 쓴다. 구간을 지날 때마다 라우터 내비게이션을
 * 일으키면 그때마다 트리 전체가 다시 렌더된다 — 읽고 있는 위치를 표시하려고 치를 값이 아니다.
 * 라우터가 스크롤에 관해 하는 일(`<ScrollRestoration>`)은 라우터 내비게이션에서만 도는데,
 * replaceState 는 그 경로를 타지 않으므로 서로 건드리지 않는다.
 */
export function useScrollSpy(ids: readonly string[], syncHash = true) {
  const [active, setActive] = useState<string | null>(null);
  const heldFor = useRef<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const list = key.split("|");
    const nodes = list
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const onScreen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onScreen.add(e.target.id);
          else onScreen.delete(e.target.id);
        }
        // 띠에 아무것도 없으면 켜 두지 않는다. 직전 값을 남기면 최상단으로 돌아온 뒤에도
        // 레일과 주소가 마지막으로 읽던 구간을 가리켜, 그 URL 을 공유하면 히어로를 건너뛴다.
        let next: string | null = null;
        for (const id of list) if (onScreen.has(id)) next = id;
        setActive(next);
      },
      { rootMargin: "-15% 0px -75% 0px" },
    );
    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, [key]);

  useEffect(() => {
    if (!syncHash) return;
    // 앵커를 누른 직후에는 스무스 스크롤이 중간 구간들을 훑고 지나간다. 그때마다 주소를
    // 고치면 이동 중인 주소가 목적지가 아닌 구간을 가리키고, 그 사이에 주소를 복사하면
    // 엉뚱한 구간이 나간다. 목적지에 닿을 때까지 주소는 클릭이 적어 둔 값 그대로 둔다.
    if (heldFor.current) {
      if (heldFor.current !== active) return;
      heldFor.current = null;
    }
    const want = active ? `#${active}` : "";
    if (window.location.hash === want) return;
    // pushState 가 아니라 replaceState — 스크롤할 때마다 이력이 쌓이면 뒤로 가기가 못 쓰게 된다.
    // 현재 state 를 그대로 넘긴다. null 로 덮으면 react-router 가 들고 있는 이동 인덱스가 사라진다.
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}${want}`,
    );
  }, [active, syncHash]);

  const holdUntil = useCallback((id: string) => {
    heldFor.current = id;
    setTimeout(() => {
      if (heldFor.current === id) heldFor.current = null;
    }, HOLD_MS);
  }, []);

  return { active, holdUntil };
}
