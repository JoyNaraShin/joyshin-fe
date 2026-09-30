import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { LoadTimeChart } from "../figures/LoadTimeChart";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function LoadingCase() {
  return (
    <Item index="01" id="case-loading" source="CLO-SET" title="워크룸 초기 로딩 개선">
      <Overview
        lead={
          <>
            <b className="num">DOMContentLoaded 2.47s → 1.33s</b>(46%),{" "}
            <b className="num">LCP 2.91s → 1.64s</b>(44%) 단축
          </>
        }
        situation="에셋 목록이 있는 메인 작업 공간(워크룸)의 첫 화면이 느림"
        task="2024 하반기. Performance 패널과 Lighthouse로 계측해 과제로 제안하고 개발"
        action="코드 스플리팅과 모듈 초기화 지연, 이미지 리사이징 공통 적용, 쓰지 않는 응답 필드 제거"
      />
      <Shot
        alt="필터와 정렬 도구 아래로 에셋 카드가 격자로 늘어선 워크룸 화면"
        caption="워크룸 화면"
        height={1241}
        src="workroom-list.webp"
        width={1600}
      />
      <SubHead>문제</SubHead>
      <Bullets>
        <li>첫 화면에서 쓰지 않는 코드와 모듈이 초기 번들과 앱 초기화에 포함</li>
        <li>첫 렌더에 필요 없는 API 호출과 중복 호출. 응답에 목록이 쓰지 않는 필드 포함</li>
        <li>백엔드 응답의 원본 이미지 URL을 그대로 써서 작은 썸네일 영역에도 큰 원본을 받음</li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>Performance 패널, 번들 분석기, 네트워크 탭으로 큰 청크와 호출 수 확인</li>
        <li>큰 청크를 라우트와 컴포넌트 단위로 코드 스플리팅</li>
        <li>첫 화면에 필요 없는 모듈의 초기화를 사용 시점으로 지연</li>
        <li>Next.js Image 커스텀 로더로 Cloudflare 이미지 리사이징을 공통 적용</li>
        <li>
          불필요한 호출은 지연하고 중복 호출 제거. 목록에서 쓰지 않는 응답 필드는 프론트엔드 참조처
          전수 조사로 추려 백엔드와 협의해 제거
        </li>
      </Bullets>
      <Figure
        index="그림 1"
        caption="개선 전후 로딩 계측값. 막대 길이는 실제 초 단위"
        note="Performance 패널과 Lighthouse로 측정"
      >
        <LoadTimeChart />
      </Figure>
    </Item>
  );
}
