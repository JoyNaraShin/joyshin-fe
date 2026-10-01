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
        <li>
          에셋 목록이 있는 메인 작업 공간(워크룸)의 첫 화면 로딩 지연. 개선 전 LCP 2.91s,
          DOMContentLoaded 2.47s
        </li>
        <li>
          Performance 패널로 병목 구간 특정. 번들 분석기와 네트워크 탭으로 대형 청크와 호출 수 확인
        </li>
        <li>Performance 패널과 Lighthouse 계측 결과를 근거로 개선 과제 제안</li>
      </Bullets>

      <Thread title="번들과 초기화">
        <Step label="문제">
          첫 화면에 쓰지 않는 코드가 초기 번들에 포함되고, 해당 모듈이 앱 시작 시점에 초기화됨
        </Step>
        <Step label="해결">
          <ul>
            <li>대형 청크를 라우트와 컴포넌트 단위로 dynamic import</li>
            <li>첫 화면에 불필요한 모듈은 실제 사용 시점에 초기화</li>
          </ul>
        </Step>
      </Thread>

      <Thread title="API 호출">
        <Step label="문제">
          <ul>
            <li>첫 렌더에 불필요한 API 호출과 중복 호출. 응답에 목록에서 쓰지 않는 필드 포함</li>
            <li>Next.js SSR 단계에서 관행적으로 처리하던 API 호출</li>
          </ul>
        </Step>
        <Step label="해결">
          <ul>
            <li>첫 렌더에 불필요한 호출은 지연하고 중복 호출 제거</li>
            <li>
              인증, 권한 검증 등 서버에서 처리해야 하는 호출만 SSR에 남기고 나머지는 클라이언트
              페칭으로 이전
            </li>
            <li>프론트엔드 참조처 전수 조사로 미사용 응답 필드를 추려 백엔드와 협의해 제거</li>
          </ul>
        </Step>
      </Thread>

      <Thread title="이미지">
        <Step label="문제">
          백엔드 응답의 원본 이미지 URL을 그대로 사용해 작은 썸네일 영역에도 원본 크기 이미지를
          다운로드
        </Step>
        <Step label="해결">
          Next.js Image 커스텀 로더로 Cloudflare 이미지 리사이징 공통 적용. 표시 크기에 맞는
          이미지만 요청
        </Step>
      </Thread>

      <SubHead>결과</SubHead>
      {/* 세 갈래를 함께 적용한 뒤 잰 값이라 결과는 따로 둔다 */}
      <p className="mt-4 text-t2 text-mute">세 가지 개선을 함께 적용한 뒤 측정</p>
      <Bullets>
        <li>LCP 2.91s에서 1.64s로 44% 단축</li>
        <li>DOMContentLoaded 2.47s에서 1.33s로 46% 단축</li>
        <li>팀원 PC 여러 대에서 측정한 랩 수치의 평균</li>
      </Bullets>
      <Figure
        narrow="hide"
        caption="개선 전후 계측값"
        note="DCL은 DOMContentLoaded. Performance 패널과 Lighthouse로 측정"
      >
        <LoadTimeChart />
      </Figure>
    </Item>
  );
}
