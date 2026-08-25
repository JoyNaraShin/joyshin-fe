import { type RefObject, useEffect, useRef } from "react";

const reduced = () =>
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * 화면에 들어올 때 한 번 `in` 을 붙이고 콜백을 부른다.
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
  const enter = useRef(onEnter);
  enter.current = onEnter;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      el.classList.add("in");
      enter.current?.();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.disconnect();
          el.classList.add("in");
          enter.current?.();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
}

export { reduced as prefersReducedMotion };
