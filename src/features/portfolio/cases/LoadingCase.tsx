import { LoadTimeChart } from "../figures/LoadTimeChart";
import { Bullets } from "../layout/Bullets";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";
import { Overview } from "../layout/Overview";

/** 메인 화면 로딩 속도 개선. */
export function LoadingCase() {
  return (
    <Item id="case-loading" source="CLO-SET" title="메인 화면 로딩 속도 개선">
      <Overview
        owned="메인 작업 공간의 웹 화면"
        problem="에셋 목록을 한 번에 다 보여주는 화면이 처음 뜰 때 느렸습니다."
        did="번들 · API · 모듈 초기화 · 이미지, 네 축을 함께"
        result={
          <>
            <b className="n">DCL 2.47s → 1.33s</b> · <b className="n">LCP 2.91s → 1.64s</b>
          </>
        }
      />
      <Bullets>
        <li>
          <b>번들</b> — 번들 분석기로 큰 청크를 찾아 라우트·컴포넌트 단위로 다이나믹 임포트를
          걸었습니다. 폴리필과 브라우저 타깃(browserslist)도 실제 지원 범위로 낮췄습니다.
        </li>
        <li>
          <b>API</b> — 첫 화면에 필요 없는 호출을 지연시키고 중복 호출을 제거했습니다. 응답
          페이로드는 백엔드와 협의해 필드를 줄였습니다.
        </li>
        <li>
          <b>무거운 모듈</b> — 당장 쓰지 않는 모듈의 초기화를 지연시켰습니다.
        </li>
        <li>
          <b>이미지</b> — 목록 표시 크기로 리사이즈하고 webp로 바꿔, 뷰포트에 들어올 때 lazy
          로딩했습니다.
        </li>
      </Bullets>

      <Figure
        index="그림 1"
        caption="개선 전후의 로딩 계측값입니다. 막대는 실제 초 단위에 맞춰 그렸습니다."
        note="팀원 각자 PC에서 DevTools Performance 패널과 Lighthouse로 잰 값의 평균입니다. 랩 기준이고 실사용자 데이터가 아닙니다."
      >
        <LoadTimeChart />
      </Figure>
    </Item>
  );
}
