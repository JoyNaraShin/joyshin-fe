import { Bullets } from "../components/Bullets";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { Item } from "../layout/Item";

export function PricingCase() {
  return (
    <Item id="case-pricing" source="CLO-SET" title="요금제 개편과 사용량 제한">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          Free, Standard, Premium 요금제 도입으로 파일 업로드와 임베드 뷰에 플랜별 한도가 필요
        </li>
        <li>BD 팀은 고객사 크레딧과 플랜을 스프레드시트로 관리</li>
      </Bullets>

      <SubHead>만든 화면</SubHead>
      <Bullets>
        <li>요금제별 기능과 가격을 보여 주는 Pricing 페이지</li>
        <li>플랜 한도 대비 사용량과 초과량을 보여 주는 Admin Console 사용량 화면</li>
      </Bullets>

      <SubHead>플랜별 사용량 제한</SubHead>
      <Bullets>
        <li>사용량 조회 API로 한도 초과를 미리 판단해 업로드 같은 UI 동작을 막음</li>
        <li>임베드 페이지는 서버의 차단 응답에 따라 분기</li>
        <li>초과 시 공통 안내 페이지에서 권한별로 업그레이드 버튼 또는 관리자 요청 버튼 노출</li>
      </Bullets>
      <Shot
        alt="User, Company, Workroom, File Upload, Rendering, Embed View, API Call 사용량과 초과량이 표로 정리된 Admin Console 화면"
        caption="Admin Console 사용량 화면"
        height={537}
        src="usage-console.webp"
        width={995}
      />

      <SubHead>BD 팀 백오피스</SubHead>
      <Bullets>
        <li>고객사 크레딧과 플랜 관리 화면 개발</li>
        <li>요금 계산, 플랜 변경(추가, 취소, 업그레이드, 다운그레이드), 메모 기능 구현</li>
      </Bullets>

      <SubHead>결과</SubHead>
      <Bullets>
        <li>BD 팀의 고객사 크레딧과 플랜 관리를 스프레드시트에서 백오피스로 이관</li>
      </Bullets>
    </Item>
  );
}
