/** 표와 HUD가 같은 표기를 쓰도록 포맷터는 한 곳에 둔다. */
export const fmtMs = (v: number) => (v > 0 ? v.toFixed(1) : "—");
export const fmtCount = (v: number) => v.toLocaleString("ko-KR");
