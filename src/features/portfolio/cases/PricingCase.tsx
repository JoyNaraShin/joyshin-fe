import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { Shot } from "../components/Shot";
import { SubHead } from "../components/SubHead";
import { Item } from "../layout/Item";

export function PricingCase() {
  return (
    <Item id="case-pricing" source="CLO-SET" title="요금제 개편과 사용량 제한">
      <Overview
        lead="Free, Standard, Premium 요금제 도입에 맞춰 Pricing 페이지와 사용량 화면, 플랜별 한도, BD 팀 백오피스를 만들었습니다."
        situation="요금제가 생기면서 파일 업로드와 임베드 뷰에 플랜별 한도가 필요해졌습니다. BD 팀은 고객사 크레딧과 플랜을 스프레드시트로 관리하고 있었습니다."
        task="2024 하반기부터 2025 상반기까지 Pricing 페이지, Admin Console 사용량 화면, 플랜별 사용량 제한, BD 팀용 백오피스 개발"
        action="사용량 조회 API로 한도 초과를 미리 판단, 서버 차단 응답에 따른 임베드 분기, 권한별 공통 안내 페이지, 백오피스 이관"
      />
      <SubHead>플랜별 한도</SubHead>
      <Bullets>
        <li>
          <b>미리 막기</b> — 파일 업로드처럼 사용자가 시작하는 동작은 사용량 조회 API로 한도 초과를
          먼저 판단해, 요청을 보내기 전에 UI에서 막았습니다.
        </li>
        <li>
          <b>서버 응답에 따르기</b> — 임베드 페이지는 밖에서 열리는 화면이라 서버의 차단 응답을
          기준으로 분기했습니다.
        </li>
        <li>
          <b>공통 안내 페이지</b> — 한도를 넘으면 공통 안내 페이지로 보내고, 보는 사람의 권한에 따라
          업그레이드 버튼이나 관리자 요청 버튼을 보여 줍니다.
        </li>
      </Bullets>
      <Shot
        alt="User, Company, Workroom, File Upload, Rendering, Embed View, API Call 사용량과 초과량이 표로 정리된 Admin Console 화면"
        caption="Admin Console 사용량 화면. 한도를 넘은 항목은 초과량을 붉게 표시합니다."
        height={537}
        src="usage-console.webp"
        width={995}
      />

      <SubHead>BD 팀 백오피스</SubHead>
      <Bullets>
        <li>
          <b>스프레드시트 이관</b> — BD 팀이 스프레드시트로 관리하던 고객사 크레딧과 플랜 관리를
          백오피스로 옮겼습니다.
        </li>
        <li>
          <b>기능</b> — 요금 계산, 플랜 변경(추가, 취소, 업그레이드, 다운그레이드), 메모를
          구현했습니다.
        </li>
      </Bullets>
    </Item>
  );
}
