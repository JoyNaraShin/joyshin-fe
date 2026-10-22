# 방문 통계 (Google Analytics 4)

## 연결

1. 나라 소유의 [Google Analytics](https://analytics.google.com/) 계정에서 GA4 속성과 웹 데이터 스트림을 만든다.
   - 사이트 URL: `https://joynarashin.github.io/joyshin-fe/`
   - 시간대: 대한민국 (서울)
2. 웹 스트림의 측정 ID (`G-...`)를 복사한다.
3. **중복 집계 방지 필수 설정:** 데이터 스트림 → 향상된 측정 → 페이지 조회의 고급 설정에서
   **브라우저 방문 기록 이벤트를 기반으로 한 페이지 변경**을 끈다.
   이 앱은 첫 접속과 SPA 이동 모두 `page_view`를 직접 보낸다.
   코드의 `send_page_view: false`만으로 향상된 측정의 방문 기록 기반 수집까지 꺼지지는 않는다.
4. 운영 배포 기본 측정 ID는 `G-VBHQ0LRQ7G`로 연결되어 있다. 측정 ID는 공개 식별자이며 비밀 키가 아니다.
   다른 스트림으로 변경하려면 GitHub 저장소 Settings → Secrets and variables → Actions → Variables에
   `VITE_GA_MEASUREMENT_ID`를 설정한다. 이 값이 배포 기본값보다 우선한다.
   수집을 끄려면 이 변수에 `disabled`를 설정하고 재배포한다(유효한 측정 ID가 아니므로 태그가 로드되지 않음).
   Google에서 제공하는 설치 스크립트를 HTML에 별도로 추가하지 않는다. 앱이 태그를 로드하므로 중복될 수 있다.
5. 변경사항을 main에 병합한 뒤 배포한다. 이미 병합했다면 Actions → Deploy to GitHub Pages → Run workflow로 다시 빌드한다.
   GitHub 변수 변경만으로는 기존 배포가 바뀌지 않는다.

## 확인할 통계

- **참여도 → 페이지 및 화면:** 페이지별 조회수와 평균 참여 시간.
- **획득 → 트래픽 획득:** 검색, 외부 링크, 직접 접속 등 유입 경로.
- **유지 또는 탐색:** 신규/재방문 사용자, 사용자별 세션 수와 방문 패턴.
- **탐색 → 사용자 개별화 탐색(User explorer):** 익명 식별자별 활동 확인. 보고서 메뉴는 속성의 보고서 모음 설정에 따라 다를 수 있다.

참여 시간은 페이지가 포커스된 시간이며 읽기 여부를 보장하지 않는다.
GA4 쿠키로 같은 브라우저의 재방문을 구분한다. 쿠키 삭제, 시크릿 모드,
기기/브라우저 변경은 동일인 판별을 끊을 수 있다. 이름·회사 식별 기능은 없다.
광고 차단 등으로 일부 방문은 수집되지 않을 수 있다.

## 구현과 검증

- 운영 빌드에서 유효한 ID가 있을 때만 비동기로 Google 태그를 로드한다.
- 개발 서버, localhost 및 ID 미설정 상태에서는 태그를 로드하지 않는다.
- 홈페이지, 작업 상세, 경력, `/apply/...` 페이지 이동과 뒤로 가기를 측정한다.
- 같은 URL의 재렌더 및 해시(`#contact` 등) 이동은 추가 조회로 세지 않는다.
- 새로고침은 새 문서이므로 조회가 추가된다. GA4가 쿠키로 재방문/세션을 구분한다.
- GA4 기본 참여 시간·세션 측정을 사용하며, 임의의 체류 시간 타이머를 추가하지 않는다.
- Google Signals와 광고 개인화 신호는 끈다.
- GA4 기본 태그는 URL과 유입 URL을 수집하므로 링크 쿼리에 이메일 등 개인정보를 넣지 않는다.

`pnpm check`, `pnpm test`, `pnpm build`로 코드 검증을 수행한다.
실제 ID 연결 후 운영 사이트에서 홈 → 작업 → 상세 → 뒤로 가기를 실행하고,
GA4 실시간 보고서 및 Tag Assistant/DebugView에서 각 이동당 `page_view` 1건인지 확인한다.
다른 탭으로 전환했다 돌아오는 동작을 포함해 참여 시간 이벤트도 확인한다.
설정 전의 과거 방문 기록은 복원되지 않는다.

이 변경은 `joyshin-fe` 원본 저장소용이다. 별도 저장소 `joyshin-fe-no-contact`는
ZIP 소스로 독립 배포되므로 자동으로 적용되지 않는다.

공식 문서:
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
- https://support.google.com/analytics/answer/11109416
- https://support.google.com/analytics/answer/11397207
- https://support.google.com/analytics/answer/9283607
