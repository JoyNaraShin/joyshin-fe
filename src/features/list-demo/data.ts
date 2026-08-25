/**
 * 데모용 가상 에셋. 실제 서비스의 데이터가 아니라 같은 모양의 문제를 다시 만든 것이다.
 * 시드 난수를 쓰는 이유: 렌더마다 값이 바뀌면 세 방식을 같은 조건에서 비교할 수 없다.
 */
export type Asset = {
  readonly id: number;
  readonly name: string;
  readonly hue: number;
  readonly tone: number;
};

const KINDS = ["Jacket", "Trouser", "Knit", "Shirt", "Coat", "Skirt", "Denim", "Dress"] as const;

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function createAssets(count: number): readonly Asset[] {
  const rand = seeded(20260824);
  const out: Asset[] = new Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = {
      id: i,
      name: `${KINDS[i % KINDS.length]}_${String(i + 1).padStart(4, "0")}`,
      hue: Math.floor(rand() * 360),
      tone: 0.18 + rand() * 0.22,
    };
  }
  return out;
}

export const ASSET_COUNT = 6000;
