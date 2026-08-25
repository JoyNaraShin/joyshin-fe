import { type RefObject, useCallback, useRef, useState } from "react";
import { MODES, type ModeId } from "./modes";

export type BenchResult = {
  /** 목록을 처음 그리는 데 걸린 시간(렌더 + 커밋), ms */
  readonly firstRender: number;
  /** 주행이 끝난 시점에 DOM에 남아 있던 항목 수 */
  readonly items: number;
};

export const RUN_FRAMES = 200;
const RUN_STEP = 26;

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
const settle = async () => {
  for (let i = 0; i < 4; i++) await nextFrame();
};

function scrollRun(el: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    let frames = 0;
    const tick = () => {
      el.scrollTop += RUN_STEP;
      if (++frames >= RUN_FRAMES) {
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/**
 * 세 방식을 같은 조건에서 재는 자동 주행.
 *
 * 손으로 스크롤한 결과를 나란히 놓으면 비교가 안 된다. 스크롤 속도와 거리가 매번 다르고,
 * 방식을 바꾸는 순간 앞의 수치가 사라진다. 그래서 같은 거리를 같은 프레임 수로 지나가게 하고
 * 결과를 표에 남긴다.
 */
export function useBenchRun(
  scrollerRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLElement | null>,
  setMode: (m: ModeId) => void,
  setBlank: (b: boolean) => void,
  getFirstRender: () => number,
) {
  const [results, setResults] = useState<Partial<Record<ModeId, BenchResult>>>({});
  const [running, setRunning] = useState<ModeId | null>(null);
  const busy = useRef(false);

  const run = useCallback(async () => {
    const scroller = scrollerRef.current;
    if (busy.current || !scroller) return;
    busy.current = true;
    setResults({});
    for (const mode of MODES) {
      // 앞 방식의 노드를 먼저 걷어내고 커밋이 끝난 뒤에 다음 방식을 올린다.
      // 그래야 "첫 렌더"가 마운트 비용만 담는다.
      setBlank(true);
      await settle();
      setRunning(mode.id);
      // 두 호출은 같은 배치에서 처리돼 마운트가 한 번의 렌더로 끝난다.
      setMode(mode.id);
      setBlank(false);
      await settle();
      scroller.scrollTop = 0;
      await settle();
      await scrollRun(scroller);
      const items = gridRef.current?.childElementCount ?? 0;
      setResults((prev) => ({
        ...prev,
        [mode.id]: { firstRender: getFirstRender(), items },
      }));
      await settle();
    }
    setRunning(null);
    busy.current = false;
  }, [scrollerRef, gridRef, setMode, setBlank, getFirstRender]);

  return { results, running, run };
}
