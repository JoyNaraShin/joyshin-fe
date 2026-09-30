import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { LoadTimeChart } from "../figures/LoadTimeChart";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function LoadingCase() {
  return (
    <Item index="01" id="case-loading" source="CLO-SET" title="메인 화면 로딩 속도 개선">
      <Overview
        lead={
          <>
            첫 화면이 뜨기까지 <b className="num">DCL 2.47s → 1.33s</b>,{" "}
            <b className="num">LCP 2.91s → 1.64s</b> 로 줄었습니다.
          </>
        }
        situation="에셋 목록을 한 번에 다 보여주는 화면이 처음 뜰 때 느렸습니다."
        task="워크룸(에셋 목록이 있는 메인 작업 공간)의 첫 화면. 2024 하반기, Performance 패널과 Lighthouse 로 계측해 과제로 제안"
        action="코드 스플리팅과 모듈 초기화 지연, 이미지 리사이징 공통 적용, 쓰지 않는 응답 필드 제거"
      />
      <Shot
        alt="필터와 정렬 도구 아래로 에셋 카드가 격자로 늘어선 워크룸 화면"
        caption="대상 화면인 워크룸. 에셋 카드가 격자로 늘어선 메인 작업 공간입니다."
        height={1241}
        src="workroom-list.webp"
        width={1600}
      />
      {/* 사례 공통 형식 — SubHead 로 문제와 해결을 가르고, 항목은 <b>라벨</b> — 문장. */}
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          <b>초기 번들</b> — 첫 화면에서 쓰지 않는 코드가 초기 번들에 함께 실려 있었습니다.
        </li>
        <li>
          <b>초기 호출</b> — 첫 렌더에 필요 없는 API 호출이 함께 나가고 중복 호출도 있었습니다.
          응답에는 목록이 읽지 않는 필드도 들어 있었습니다.
        </li>
        <li>
          <b>부팅 시점</b> — 당장 쓰지 않는 모듈이 앱 초기화 때 함께 올라왔습니다.
        </li>
        <li>
          <b>원본 이미지</b> — 백엔드 응답의 원본 이미지 URL 을 그대로 써서, 작은 썸네일 영역에도 큰
          원본이 내려왔습니다.
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          <b>병목 특정</b> — Performance 패널 waterfall로 오래 걸리는 구간을 좁히고, 번들 분석기와
          네트워크 탭으로 큰 청크와 호출 수를 확인했습니다.
        </li>
        <li>
          <b>코드 분할</b> — 큰 청크를 라우트·컴포넌트 단위로 다이나믹 임포트했습니다.
        </li>
        <li>
          <b>호출 정리</b> — 필요 없는 호출을 지연시키고 중복을 없앴으며, 응답 필드는 프론트 코드의
          참조처를 전수 조사해 목록이 읽지 않는 것을 추려 백엔드와 줄였습니다.
        </li>
        <li>
          <b>지연 초기화</b> — 첫 화면에 필요 없는 모듈의 초기화를 실제 쓰는 시점으로 미뤘습니다.
        </li>
        <li>
          <b>이미지 리사이징</b> — Next.js Image 커스텀 로더를 만들어 Cloudflare 이미지 리사이징을
          공통으로 적용했습니다. 표시 영역에 맞는 크기의 이미지가 내려옵니다.
        </li>
      </Bullets>
      <Figure
        index="그림 1"
        caption="개선 전후의 로딩 계측값입니다. 막대는 실제 초 단위에 맞춰 그렸습니다."
        note="Performance 패널과 Lighthouse로 측정했습니다."
      >
        <LoadTimeChart />
      </Figure>
    </Item>
  );
}
