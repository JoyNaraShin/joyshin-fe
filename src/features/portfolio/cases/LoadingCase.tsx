import { Bullets } from "../components/Bullets";
import { SubHead } from "../components/SubHead";
import { Step, Thread } from "../components/Thread";
import { LoadTimeChart } from "../figures/LoadTimeChart";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function LoadingCase() {
  return (
    <Item id="case-loading" source="CLO-SET" title="워크룸 초기 로딩 개선">
      <SubHead>계측과 제안</SubHead>
      <Bullets>
        <li>에셋 목록이 있는 메인 작업 공간(워크룸)의 첫 화면이 느림</li>
        <li>
          Performance 패널의 waterfall로 오래 걸리는 구간을 좁히고, 번들 분석기와 네트워크 탭으로 큰
          청크와 호출 수 확인
        </li>
        <li>Performance 패널과 Lighthouse 계측 결과를 정리해 과제로 제안</li>
      </Bullets>

      <Thread title="번들과 초기화">
        <Step label="문제">
          첫 화면에서 쓰지 않는 코드가 초기 번들에 포함. 당장 쓰지 않는 모듈도 앱 초기화 때 함께
          로드
        </Step>
        <Step label="해결">
          <ul>
            <li>큰 청크는 라우트와 컴포넌트 단위로 다이나믹 임포트</li>
            <li>첫 화면에 필요 없는 모듈은 실제로 쓰는 시점에 초기화</li>
          </ul>
        </Step>
      </Thread>

      <Thread title="API 호출">
        <Step label="문제">
          첫 렌더에 필요 없는 API 호출과 중복 호출. 응답에는 목록이 읽지 않는 필드도 포함
        </Step>
        <Step label="해결">
          <ul>
            <li>첫 렌더에 필요 없는 호출은 뒤로 미루고 중복 호출 제거</li>
            <li>
              목록에서 쓰지 않는 응답 필드는 프론트엔드 참조처를 전수 조사해 추리고 백엔드와 협의해
              제거
            </li>
          </ul>
        </Step>
      </Thread>

      <Thread title="이미지">
        <Step label="문제">
          백엔드 응답의 원본 이미지 URL을 그대로 써서 작은 썸네일 영역에도 큰 원본이 내려옴
        </Step>
        <Step label="해결">
          Next.js Image 커스텀 로더를 만들어 Cloudflare 이미지 리사이징을 공통 적용. 썸네일 영역에는
          표시 크기에 맞는 이미지만 요청
        </Step>
      </Thread>

      <SubHead>결과</SubHead>
      {/* 세 갈래를 함께 적용한 뒤 잰 값이라 결과는 따로 둔다 */}
      <Bullets>
        <li>DOMContentLoaded 2.47s에서 1.33s로 46% 단축</li>
        <li>LCP 2.91s에서 1.64s로 44% 단축</li>
        <li>수치는 팀원 각자 PC에서 잰 랩 측정의 평균</li>
      </Bullets>
      <Figure
        narrow="hide"
        caption="개선 전후 계측값. 막대 길이는 실제 초 단위"
        note="DCL은 DOMContentLoaded. Performance 패널과 Lighthouse로 측정"
      >
        <LoadTimeChart />
      </Figure>
    </Item>
  );
}
