import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { DeployTopology, deployTopologyFallback } from "../figures/DeployTopology";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function DeployCase() {
  return (
    <Item index="05" id="case-deploy" source="CLO-SET" title="프론트엔드 배포 분리">
      <Overview
        lead="프론트엔드만 바뀌어도 서버 이미지를 다시 빌드하고 배포해야 하던 구조를 분리하는 작업. 설계부터 테스트 서버 검증까지 리드"
        situation="2차 리뉴얼에서 Vite로 만든 React SPA의 진입점 index.html이 기존 Next.js 서버의 Docker 이미지에 함께 실려 배포됨"
        task="2026 상반기. 설계부터 테스트 서버 검증까지 리드, 운영 반영 전 퇴사"
        action="SPA 라우팅 폴백을 위해 Cloudflare Pages 선택. 번들 청크는 스토리지에 버전별로 올리고 index.html만 Pages로 배포하는 GitHub Actions 파이프라인 설계"
      />
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          번들 청크는 스토리지에 올렸지만 <code>index.html</code>은 Next.js 프로젝트의{" "}
          <code>public/</code>에 두고 서버 Docker 이미지에 포함
        </li>
        <li>
          프론트엔드 릴리스가 서버 이미지 재빌드와 재배포를 거쳐야 하고, 배포 시간과 롤백 단위도
          서버를 따라감
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          SPA 라우팅 폴백(매칭되지 않는 경로에 <code>index.html</code> 반환)이 필요해, 스토리지 단독
          대신 사내에서 쓰던 Cloudflare Pages 선택
        </li>
        <li>
          GitHub Actions가 빌드 후 청크는 스토리지에 버전 디렉터리로, <code>index.html</code>은
          Pages로 배포. Next.js 서버는 자기 이미지만 빌드
        </li>
        <li>
          배포는 새 버전을 올리고 <code>index.html</code>이 가리키는 버전을 바꾸는 방식. 롤백은 이전
          버전 참조로 되돌리는 작업으로 단순화
        </li>
        <li>
          구조도와 영향 범위를 정리한 제안서로 인프라 담당자와 리스크를 검토하고 테스트 서버에서
          단계별 검증
        </li>
      </Bullets>
      <Figure
        index="그림 5"
        caption="배포 구조, 기존과 제안"
        note="운영 반영 전 퇴사"
        fallback={deployTopologyFallback}
      >
        <DeployTopology />
      </Figure>
    </Item>
  );
}
