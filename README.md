# joyshin-fe

프론트엔드 개발자 포트폴리오. 경력과 맡았던 작업 네 건을 정리한 한 장짜리 사이트다.

## 스택

React 19 · TypeScript 5.7 · Vite 6 · react-router · Biome

## 실행

```bash
pnpm install
pnpm dev              # 개발 서버
pnpm check            # Biome + tsc
pnpm build && pnpm preview
```

## 구조

```
src/
  pages/HomePage.tsx          섹션 순서
  features/portfolio/         히어로 · 강점 · 작업 · 그 외 · AI · 경력 · 연락처
    figures/                  본문 도판 (전부 손으로 그린 SVG)
  features/list-demo/         목록 렌더링 재현 데모
  components/                 헤더 · 푸터
  styles/                     토큰과 레이아웃
```

## 외부 라이브러리를 쓰지 않은 곳

UI 킷, 차트, 애니메이션 라이브러리를 넣지 않았다. 아래는 전부 이 저장소 안에 있다.

| | |
|---|---|
| 도판 6개 | 손으로 좌표를 잡은 SVG (`features/portfolio/figures/`). 나머지 하나는 아래 데모 |
| 스크롤 리빌 | `IntersectionObserver` 한 곳 (`lib/useReveal.ts`), `prefers-reduced-motion` 존중 |
| 레이아웃 | Grid·Flex와 CSS 변수만 |

## 목록 렌더링 데모

작업 두 번째 케이스에 실제로 도는 데모가 있다. 6,000건을 세 가지 방식으로 그려 놓고 버튼을 누르면
같은 거리를 같은 프레임 수로 주행하며 첫 렌더 시간과 DOM 항목 수를 잰다.

| 파일 | 하는 일 |
|---|---|
| `useLegacyReflow.ts` | 걷어낸 라이브러리의 비용 재현 — 스크롤마다 전체 위치를 다시 재고 그 사이에 레이아웃을 무효로 만드는 쓰기를 끼운다 |
| `useIntersectionReveal.ts` | 1차 — 위치 계산을 관찰자로 대체. DOM은 줄지 않는다 |
| `useListWindow.ts` | 2차 — 윈도잉을 직접 계산. 무엇이 줄어드는지 보여주는 게 목적이라 라이브러리를 쓰지 않았다 |
| `useBenchRun.ts` | 측정. 앞 방식을 언마운트한 뒤에 다음 방식을 올려 전환 비용이 첫 렌더에 섞이지 않게 한다 |
| `useFrameMeter.ts` | 프레임 간격. 측정값을 React 상태에 넣지 않는다 — 초당 60번 리렌더하면 그 비용이 측정에 섞인다 |

브라우저와 기기에 따라 값이 달라지고, 실제 서비스에서 나온 개선치가 아니다. 같은 모양의 문제를
가상 데이터로 다시 만든 것이다.

## 접근성

키보드로 전 구간 이동, 스크롤 영역은 초점을 받고 이름을 가진다, `prefers-reduced-motion`에서 모션 정지.
