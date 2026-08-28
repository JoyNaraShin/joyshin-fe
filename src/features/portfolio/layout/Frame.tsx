import type { ReactNode, Ref } from "react";

/**
 * 도판이 앉는 자리. 테두리도 배경도 없다.
 *
 * 전에는 회색 인셋 + 테두리 상자였다. 그러면 도판이 본문 카드 안의 또 다른 카드가 되어
 * 지면에서 가장 강한 자산이 두 겹 안에 갇힌다 — 축소하면 형체가 남지 않았다(실측).
 * 지금은 지면에 직접 앉는다. 왼쪽으로 당기는 것은 `Figure` 하나뿐이다 —
 * 둘 다 당기면 도판이 캡션 칼럼 위로 겹쳐 올라간다(실측으로 한 번 겪었다).
 */
export function Frame({
  children,
  className = "",
  ref,
}: {
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
