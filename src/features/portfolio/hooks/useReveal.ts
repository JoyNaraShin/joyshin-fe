import { type RefObject, useEffect, useRef } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const mq = () => (typeof matchMedia === "function" ? matchMedia(QUERY) : null);
const reduced = () => mq()?.matches === true;

/**
 * 화면에 들어올 때 한 번 `data-in` 을 붙이고 콜백을 부른다.
 * 클래스가 아니라 데이터 속성인 것은 Tailwind 의 `revealed:` / `group-data-[in]:` 로 받기 위해서다.
 *
 * 이 사이트가 파는 이야기 중 하나가 IntersectionObserver라서, 지면 자체도 같은 것으로 만든다.
 * 스크롤 리스너를 달고 위치를 재는 방식이었다면 앞뒤가 맞지 않는다.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  onEnter?: () => void,
  margin = "-8% 0px",
) {
  // 콜백은 렌더마다 새로 만들어질 수 있다. ref 에 담아 두면 관찰을 한 번만 걸고도
  // 항상 최신 콜백을 부를 수 있다 — 의존성에 넣으면 관찰이 매 렌더 다시 걸린다.
  // 렌더 본문이 아니라 이펙트에서 담는다. 렌더 중에 ref 를 쓰는 것은 React 가 금지하는 패턴이다.
  const enter = useRef(onEnter);
  useEffect(() => {
    enter.current = onEnter;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 모션을 끈 상태면 관찰하지 않고 바로 보인다.
    const settle = () => {
      el.dataset.in = "";
      enter.current?.();
    };
    if (reduced()) {
      settle();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.disconnect();
          settle();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);

    // 설정은 보는 중에 바뀔 수 있다. 마운트 시점 한 번만 읽으면, 페이지를 열어 둔 채
    // 모션을 끈 사람에게는 아직 나타나지 않은 구간이 영영 감춰진 채로 남는다.
    const m = mq();
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      io.disconnect();
      settle();
    };
    m?.addEventListener("change", onChange);

    return () => {
      io.disconnect();
      m?.removeEventListener("change", onChange);
    };
  }, [ref, margin]);
}

export { reduced as prefersReducedMotion };
