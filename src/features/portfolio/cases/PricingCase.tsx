import { Bullets } from "../components/Bullets";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { Step, Thread } from "../components/Thread";
import { Item } from "../layout/Item";

export function PricingCase() {
  return (
    <Item id="case-pricing" source="CLO-SET" title="요금제 개편과 사용량 제한">
      <SubHead>화면</SubHead>
      <Bullets>
        <li>요금제별 기능과 가격을 비교하는 Pricing 페이지</li>
        <li>플랜 한도 대비 사용량과 초과량을 표시하는 Admin Console 사용량 화면</li>
      </Bullets>

      <Shot
        alt="User, Company, Workroom, File Upload, Rendering, Embed View, API Call 사용량과 초과량이 표로 정리된 Admin Console 화면"
        caption="Admin Console 사용량 화면"
        height={537}
        src="usage-console.webp"
        width={995}
      />

      <Thread title="플랜별 사용량 제한">
        <Step label="문제">
          파일 업로드와 임베드 뷰에 플랜별 한도 적용 필요. 판정의 근거가 될 현재 사용량 정보가 먼저
          필요
        </Step>
        <Step label="해결">
          <ul>
            <li>
              사용량 조회 API로 클라이언트에서 한도 초과를 1차 판정해 업로드 같은 UI 동작을 미리
              차단. 서버에서도 요청 시점에 한도를 다시 검증
            </li>
            <li>
              임베드 페이지는 렌더 전에 보여 줄 화면이 정해져야 해서 서버 렌더링(SSR) 단계에서
              사용량을 판정하고, 임베드 뷰어 또는 한도 초과 안내 페이지로 분기
            </li>
            <li>
              한도 초과 시 공통 안내 페이지에서 권한별로 업그레이드 또는 관리자 요청 버튼 노출
            </li>
          </ul>
        </Step>
      </Thread>

      <Thread title="BD 팀 백오피스">
        <Step label="문제">BD 팀이 고객사 크레딧과 플랜을 스프레드시트로 관리</Step>
        <Step label="해결">
          고객사 크레딧과 플랜을 관리하는 백오피스 개발. 요금 계산, 플랜 변경(추가, 취소,
          업그레이드, 다운그레이드), 메모 기능 구현
        </Step>
      </Thread>
    </Item>
  );
}
