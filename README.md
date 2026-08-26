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
  components/                 헤더 · 푸터
  styles/                     토큰과 레이아웃
```

## 외부 라이브러리를 쓰지 않은 곳

UI 킷, 차트, 애니메이션 라이브러리를 넣지 않았다. 아래는 전부 이 저장소 안에 있다.

| | |
|---|---|
| 도판 6개 | 손으로 좌표를 잡은 SVG (`features/portfolio/figures/`) |
| 스크롤 리빌 | `IntersectionObserver` 한 곳 (`lib/useReveal.ts`), `prefers-reduced-motion` 존중 |
| 레이아웃 | Grid·Flex와 CSS 변수만 |

## 접근성

키보드로 전 구간 이동, 스크롤 영역은 초점을 받고 이름을 가진다, `prefers-reduced-motion`에서 모션 정지.
