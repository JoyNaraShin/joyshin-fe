import { Bullets } from "../components/Bullets";
import { SubHead } from "../components/SubHead";
import { LoadTimeChart } from "../figures/LoadTimeChart";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function LoadingCase() {
  return (
    <Item id="case-loading" source="CLO-SET" title="워크룸 초기 로딩 개선">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>에셋 목록이 있는 메인 작업 공간(워크룸)의 첫 화면이 느림</li>
        <li>첫 화면에서 쓰지 않는 코드와 모듈이 초기 번들과 앱 초기화에 포함</li>
        <li>첫 렌더에 필요 없는 API 호출과 중복 호출. 응답에는 목록이 쓰지 않는 필드도 포함</li>
        <li>백엔드 응답의 원본 이미지 URL을 그대로 써서 작은 썸네일 자리에도 큰 원본을 받음</li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>Performance 패널과 Lighthouse로 계측해 과제로 제안</li>
        <li>번들 분석기와 네트워크 탭으로 큰 청크와 호출 수 확인</li>
        <li>큰 청크는 라우트와 컴포넌트 단위로 코드 스플리팅</li>
        <li>첫 화면에 필요 없는 모듈은 쓰는 시점에 초기화</li>
        <li>Next.js Image 커스텀 로더를 만들어 Cloudflare 이미지 리사이징을 공통 적용</li>
        <li>
          첫 렌더에 필요 없는 호출은 뒤로 미루고 중복 호출 제거. 목록에서 쓰지 않는 응답 필드는
          프론트엔드 참조처를 전수 조사해 추리고 백엔드와 협의해 제거
        </li>
      </Bullets>

      <SubHead>결과</SubHead>
      <Bullets>
        <li>DOMContentLoaded 2.47s에서 1.33s로 46% 단축</li>
        <li>LCP 2.91s에서 1.64s로 44% 단축</li>
      </Bullets>
      <Figure
        caption="개선 전후 계측값. 막대 길이는 실제 초 단위"
        note="DCL은 DOMContentLoaded. Performance 패널과 Lighthouse로 측정"
      >
        <LoadTimeChart />
      </Figure>
    </Item>
  );
}
