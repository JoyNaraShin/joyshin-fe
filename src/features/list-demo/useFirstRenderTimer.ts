import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * 목록을 처음 그리는 데 걸린 시간(렌더 + 커밋)을 잰다.
 *
 * 렌더가 시작된 시각을 매 렌더마다 찍어 두고, 커밋 직후 useLayoutEffect 에서 뺀다.
 * 페인트 전에 실행되는 훅이라야 브라우저의 다음 그리기가 값에 섞이지 않는다.
 */
export function useFirstRenderTimer(ready: boolean) {
  const renderAt = useRef(0);
  const pending = useRef(true);
  const elapsed = useRef(0);
  renderAt.current = performance.now();

  useLayoutEffect(() => {
    if (!pending.current || !ready) return;
    elapsed.current = performance.now() - renderAt.current;
    pending.current = false;
  });

  /** 다음 커밋을 새로운 "첫 렌더"로 친다. 방식을 바꾸는 쪽에서 부른다. */
  const restart = useCallback(() => {
    pending.current = true;
  }, []);
  const get = useCallback(() => elapsed.current, []);

  return { restart, get };
}
