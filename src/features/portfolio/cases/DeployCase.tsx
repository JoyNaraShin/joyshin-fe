import { Bullets } from "../components/Bullets";
import { SubHead } from "../components/SubHead";
import { Item } from "../layout/Item";

export function DeployCase() {
  return (
    <Item id="case-deploy" source="CLO-SET" title="프론트엔드 배포 분리">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          2차 리뉴얼의 React SPA(Vite)는 별도 배포 경로가 없어, 진입점 <code>index.html</code>을
          기존 Next.js 서버의 Docker 이미지에 넣어 서빙
        </li>
        <li>프론트엔드만 바뀌어도 서버 이미지를 다시 빌드하고 배포해야 했음</li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>SPA 라우팅 폴백이 필요해 스토리지 단독 대신 사내에서 쓰던 Cloudflare Pages 선택</li>
        <li>
          GitHub Actions 파이프라인 설계. 번들 청크는 스토리지에 버전별로 올리고{" "}
          <code>index.html</code>만 Pages로 배포. Next.js 서버는 별도 배포
        </li>
        <li>
          배포는 <code>index.html</code>이 가리키는 버전을 바꾸는 방식. 롤백은 이전 버전 참조로
          되돌리는 작업으로 단순화
        </li>
        <li>
          구조도와 영향 범위를 정리한 제안서로 인프라 담당자와 리스크를 검토하고 테스트 서버에서
          단계별 검증
        </li>
      </Bullets>

      <SubHead>현황</SubHead>
      <Bullets>
        <li>테스트 서버 단계별 검증까지 완료, 운영 반영 전 퇴사</li>
      </Bullets>
    </Item>
  );
}
