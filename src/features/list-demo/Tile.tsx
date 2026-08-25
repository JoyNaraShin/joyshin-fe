import { memo } from "react";
import type { Asset } from "./data";

/**
 * 항목 하나. 뷰는 로직을 모른다 — 어느 방식으로 그려지고 있는지도, 몇 번째 줄인지도.
 * 위치는 전부 style로 받는다. 페이지마다 UI가 달라도 같은 훅을 쓰려면 이 경계가 필요하다.
 *
 * data-seen: 1차(IntersectionObserver) 모드는 0으로 시작해 관찰자가 1로 바꾼다.
 * 나머지 모드는 처음부터 1이다 — 그쪽엔 지연 로딩이 없었으니까.
 *
 * 지연 로딩이 걸린 만큼 1차 모드는 6,000장을 다 칠하지 않으므로, 첫 렌더 비용에
 * 그 차이가 섞인다. 재현물을 재는 것이지 실제 서비스의 개선치가 아니라는 점은
 * 그림 2 캡션에 적어 둔다.
 */
export const Tile = memo(function Tile({
  asset,
  style,
  lazy,
}: { asset: Asset; style: React.CSSProperties; lazy: boolean }) {
  return (
    <div className="demo-tile absolute" style={style} data-seen={lazy ? "0" : "1"}>
      <div
        className="demo-thumb"
        style={
          {
            "--tile": `hsl(${asset.hue} 32% ${Math.round(asset.tone * 100)}%)`,
          } as React.CSSProperties
        }
      />
      <p className="demo-name">{asset.name}</p>
    </div>
  );
});
