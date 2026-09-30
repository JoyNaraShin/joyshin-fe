# joyshin-fe

프론트엔드 개발자 포트폴리오. 홈은 대표 작업 세 건을 실제 서비스 캡처와 함께 크게 보여 주고,
작업마다 `/work/:slug` 케이스 페이지에서 맡은 일, 문제와 해결, 결과, 도판을 편다.

<https://joynarashin.github.io/joyshin-fe/>

## 스택

React 19 · TypeScript 5.7 · Vite 6 · Tailwind v4 · React Router 7 · Biome

읽는 것이 전부인 한 장짜리 사이트라 런타임에 얹는 것을 늘리지 않았다. `dependencies` 는
`react` · `react-dom` · `react-router-dom` 셋뿐이고 UI 킷도, 차트도, 애니메이션 라이브러리도 없다.
디자인 토큰은 `src/styles/theme.css` 의 `@theme` 한 곳에 모으고 나머지는 전부 그 변수를 읽는다.

## 실행

```bash
pnpm install
pnpm dev              # 개발 서버
pnpm check            # Biome + tsc
pnpm build && pnpm preview
```

`pnpm build` 는 `dist/index.html` 을 `404.html` 로도 복사한다. GitHub Pages 가 SPA 폴백을
주지 않아서, 해시 없는 경로로 직접 들어와도 앱이 라우팅을 이어받게 하려는 것이다.

## 구조

화면은 홈과 케이스 페이지 둘이다. 포트폴리오 지면은 `features/portfolio/` 안에서 닫히고,
그 바깥은 라우팅·레이아웃·공용 조각만 진다.

```
src/
  routes/                 라우터 · 경로 상수 · 에러 화면
  layouts/RootLayout.tsx  상단 띠 · 스크롤 복원
  pages/                  HomePage(섹션 순서) · CasePage · NotFoundPage
  components/ui/          Button — 404·에러 화면이 쓴다
  styles/                 theme(토큰) · base(기본 규칙) · fonts(@font-face)

  features/portfolio/
    Hero · WorkSection · CasePage · AiSection · CareerSection · ContactSection
    cases/                케이스 페이지 본문 여섯 건
    content/              화면에 나가는 문장 — projects · hero · moreWork · jobs · profile
    figures/              본문 도판 5개. 전부 좌표를 직접 잡은 SVG
    layout/               지면 배치 — DocSection · Item · Figure · Frame
    components/           내용 조각 — Bullets · Overview · Prose · SubHead · Shot · Cover · SiteHeader
    hooks/                useReveal
```

`content/` 를 따로 둔 것은 문장이 코드보다 자주 바뀌기 때문이다. 문구만 고칠 때 컴포넌트를
열지 않아도 된다. `layout/` 과 `components/` 를 가른 기준은 **지면 위 자리를 정하느냐,
내용을 그리느냐** 다 — `Figure` 는 도판이 앉을 칸을 잡고, `Bullets` 는 항목을 그린다.

## 직접 만든 것

외부 UI 라이브러리를 쓰지 않은 자리들. 아래는 전부 이 저장소 안에 있다.

| | |
|---|---|
| 도판 5개 | `features/portfolio/figures/`. 좌표를 직접 잡은 SVG 다. 좁은 폭에서 형체가 남지 않는 네 개는 접고 같은 내용의 문단으로 바꾼다. 막대 하나짜리 계측 도판은 접지 않는다 |
| 스크롤 리빌 | `IntersectionObserver` 한 곳 (`hooks/useReveal.ts`). `prefers-reduced-motion` 존중 |
| 레이아웃 | Grid·Flex 와 CSS 변수만 |
| 스크롤 위치·해시 착지 | 직접 만들지 않고 React Router 의 `<ScrollRestoration>` |

## 서비스 캡처

`public/work/` 의 이미지는 CLO-SET 헬프센터(support.clo-set.com)에 공개된 캡처를 줄여 WebP 로
바꾼 것이다. 헬프센터가 그어 둔 강조 상자는 잘라 냈고, 캡션마다 출처를 붙인다.

## 폰트

Google Fonts CDN 대신 자체 호스팅한다. 한글은 CDN 에서 `unicode-range` 로 100 조각 넘게
쪼개져 오기 때문에 서드파티 요청이 63건이었고, 스타일시트 요청 자체가 렌더를 막았다.
성능을 이야기하는 지면에서 그건 반례였다.

지금은 KS X 1001 완성형 2350자 + 라틴 + 문장부호로 미리 자른 woff2 를 같은 출처에서 준다.
서드파티 요청 63건 → 0건, 폰트 494KB → 381KB. 본문 굵기(400)만 `preload` 하고 나머지는
`font-display: swap` 으로 뒤따라온다. 다시 자르는 명령은 `src/styles/fonts.css` 주석에 있다.

IBM Plex — SIL Open Font License 1.1 (`public/fonts/OFL.txt`).

## 접근성

키보드로 전 구간을 이동할 수 있고, `prefers-reduced-motion` 에서는 모션이 멈춘다.
도판은 `role="img"` 와 `aria-label` 을 갖고, 좁은 폭에서 접힐 때는 같은 내용의 문단이 대신 뜬다.
