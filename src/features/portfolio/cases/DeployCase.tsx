import { Bullets } from "../components/Bullets";
import { SubHead } from "../components/SubHead";
import { Item } from "../layout/Item";

export function DeployCase() {
  return (
    <Item id="case-deploy" source="CLO-SET" title="프론트엔드 배포 분리">
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          2차 리뉴얼의 React SPA(Vite)는 별도 배포 경로가 없었음. 번들 청크는 스토리지에 올리고
          진입점 <code>index.html</code>은 기존 Next.js 서버의 Docker 이미지에 넣어 서빙
        </li>
        <li>
          파일 하나 때문에 프론트엔드만 바뀌어도 서버 이미지를 다시 빌드하고 배포. 배포 시간과 롤백
          단위도 Next.js 서버를 따라감
        </li>
      </Bullets>

      <SubHead>호스팅 선택</SubHead>
      <Bullets>
        <li>
          클라이언트 라우터의 경로는 서버에 대응하는 파일이 없음. 새로고침이나 공유 링크로 직접
          들어와도 <code>index.html</code>을 200으로 돌려주는 SPA 폴백이 필요
        </li>
        <li>
          스토리지 단독으로는 폴백이 안 돼 사내에서 쓰던 Cloudflare Pages 선택. 청크 보관과 버전
          관리는 스토리지, Pages는 <code>index.html</code> 서빙만 담당
        </li>
      </Bullets>

      <SubHead>파이프라인</SubHead>
      <Bullets>
        <li>
          GitHub Actions 파이프라인 설계. 청크는 스토리지에 버전별로 올리고 <code>index.html</code>
          만 Pages로 배포. Next.js 서버는 자기 이미지만 빌드
        </li>
        <li>
          배포는 새 버전을 올린 뒤 <code>index.html</code>이 가리키는 버전을 바꾸는 방식이라 기존
          파일을 덮어쓰지 않음. 롤백은 이전 버전 참조로 되돌리는 작업으로 단순화
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
