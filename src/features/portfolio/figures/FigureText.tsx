import type { ReactNode } from "react";

/*
 * 도판 안의 칸 이름. 표시라 mono 로 두되 **자간은 주지 않는다** —
 * mono 서체에 한글이 없어 Sans KR 로 떨어지는데 letter-spacing 만 남으면 자간이 벌어져 보인다.
 * 색은 지면과 같은 토큰 계열(`text-mute`)을 쓴다. 도판만 surface contract 를 쓰던 것을 맞췄다.
 */
export function FigLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-t1 text-mute">{children}</p>;
}

/** 도판 아래 한 줄 — 그림이 말하지 못하는 단서만 받는다. */
export function FigNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2.5 max-w-[60ch] text-t2 font-normal leading-[1.65] text-mute">{children}</p>
  );
}
