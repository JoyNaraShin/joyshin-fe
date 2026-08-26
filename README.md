# joyshin-fe

프론트엔드 개발자 포트폴리오. 경력과 맡았던 작업 네 건을 정리한 한 장짜리 사이트다.

## 스택

React 19 · TypeScript 5.7 · Vite 6 · Tailwind v4 · react-router 7 · Biome

런타임 의존성은 react · react-dom · react-router-dom 셋뿐이다. 디자인 토큰은
`index.css` 의 `@theme` 한 곳에 있고, 화면 조각은 외부 UI 라이브러리 없이
`components/ui/` 에 직접 만든다.

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

## 폰트

Google Fonts CDN 을 걷어내고 자체 호스팅한다. 한글 폰트는 CDN 에서 `unicode-range` 로
100 조각 넘게 쪼개져 오기 때문에 서드파티 요청이 63건이었고, 스타일시트 요청 자체가 렌더를 막았다.

지금은 KS X 1001 완성형 2350자 + 라틴 + 문장부호로 미리 자른 woff2 를 같은 출처에서 준다.

| | 전 | 후 |
|---|---|---|
| 서드파티 요청 | 63건 | 0건 |
| 폰트 요청 | 63건 | 5건 |
| 폰트 전송량 | 494KB | 381KB |

본문 굵기(400)만 `preload`, 나머지는 `font-display: swap`. 굵기는 sans 400·600·700,
mono 400·500 다섯 개다. 전에는 sans 300 을 캡션·주석에 썼는데, 한글 굵기 하나가 통째로
120KB 라 자체 호스팅하면서 400 으로 합쳤다. 그 자리들은 대비도 미달이던 곳이라 같이 정리됐다.

`--mono` 스택에는 `IBM Plex Sans KR` 을 끼워 뒀다. mono 서체에 한글이 없어서, 스택이 없으면
mono 칸에 섞인 한글(실측 77자)이 OS 기본 고정폭으로 떨어져 혼자 다른 글꼴이 된다.

다시 만들려면 [fonttools](https://github.com/fonttools/fonttools) 로. `ksx1001.txt` 는
EUC-KR 한글 영역(`0xB0A1`~`0xC8FE`)을 디코딩해 만든다:

```python
ks = []
for hi in range(0xB0, 0xC9):
    for lo in range(0xA1, 0xFF):
        try:
            ks.append(bytes([hi, lo]).decode("euc_kr"))
        except UnicodeDecodeError:
            pass
open("ksx1001.txt", "w").write("".join(c for c in ks if "가" <= c <= "힣"))  # 2350자
```

```
pyftsubset IBMPlexSansKR-Regular.ttf --output-file=public/fonts/sans-400.woff2 \
  --flavor=woff2 --unicodes="U+0000-00FF,U+2000-206F,U+20A0-20BF,U+2190-21FF,U+2212,U+2215,U+25A0-25FF,U+2713,U+2715,U+3000-303F,U+3130-318F,U+FEFF,U+FFFD" \
  --text-file=ksx1001.txt --layout-features='kern,liga,calt,ccmp,locl' --no-hinting --desubroutinize
```

IBM Plex — SIL Open Font License 1.1 (`public/fonts/OFL.txt`).

## 접근성

키보드로 전 구간 이동, `prefers-reduced-motion`에서 모션 정지.
