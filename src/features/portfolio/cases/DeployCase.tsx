import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { DeployTopology, deployTopologyFallback } from "../figures/DeployTopology";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function DeployCase() {
  return (
    <Item index="05" id="case-deploy" source="CLO-SET" title="배포 구조 전환">
      <Overview
        lead="index.html 하나가 Next 서버 이미지에 남아 프론트 릴리스가 서버 재배포를 따라가던 구조를 나누는 작업을, 설계부터 테스트 서버 검증까지 맡았습니다."
        situation="2차 서비스 리뉴얼에서 앱을 Vite 로 만든 React SPA 로 바꿨습니다. 배포 경로는 따로 만들지 않아, 번들 청크는 스토리지에 올리되 index.html 은 기존 Next.js 프로젝트의 public/ 에 두고 그 서버 이미지에 실어 내보내고 있었습니다."
        task="2026 상반기, 설계부터 테스트 서버 검증까지 리드. 운영 반영 전에 퇴사"
        action="index.html 만 Cloudflare Pages 로 옮기는 GitHub Actions 파이프라인 설계, 롤백은 index.html 이 가리키는 버전을 되돌리는 방식"
      />
      {/* 사례 공통 형식 — SubHead 로 문제와 해결을 가르고, 항목은 <b>라벨</b> — 문장. */}
      <SubHead>문제</SubHead>
      <Bullets>
        <li>
          <b>배포 경로 없음</b> — 번들 청크는 클라우드에 올렸지만 <code>index.html</code> 은 Next
          프로젝트의 <code>public/</code> 에 두고 서버 Docker 이미지에 함께 빌드해 넣었습니다. 파일
          하나 때문에 프론트 릴리스가 서버 이미지 재빌드와 재기동을 거쳐야 했습니다.
        </li>
        <li>
          <b>경량화 이점 상실</b> — 자산이 이미 클라우드에 있어 정적 호스팅만으로 끝나는 앱인데,
          릴리스 단위가 Next 서버에 묶여 배포 시간도 롤백 단위도 그 서버를 따라갑니다. 변경이 잦은
          2차에서 React SPA 로 가볍게 가져간 이점이 배포 단계에서 사라집니다.
        </li>
      </Bullets>

      <SubHead>해결</SubHead>
      <Bullets>
        <li>
          <b>호스팅 선택</b> — 클라이언트 라우터가 만드는 경로는 서버에 대응하는 파일이 없어,
          새로고침이나 링크 공유로 직접 들어오면 매칭되는 자산이 없습니다. 리다이렉트로 넘기면
          주소가 바뀌므로, 매칭되지 않는 경로에 <code>index.html</code> 을 200 으로 돌려주고
          라우팅은 클라이언트가 이어받는 폴백이 필요했습니다. 오브젝트 스토리지 단독으로는 이 일을
          못 해서, 사내가 이미 쓰던 Cloudflare 안에서 폴백을 제공하는 Pages 를 골랐습니다. 자산
          보관과 버전 관리는 스토리지에 두고, Pages 에는 서빙만 맡겼습니다.
        </li>
        <li>
          <b>배포 파이프라인</b> — GitHub Actions 가 빌드하고, 청크는 스토리지로 진입점은 호스팅으로
          올립니다. Next 서버는 자기 이미지만 빌드합니다. 프론트 릴리스가 서버 재배포를 타지 않는
          구성입니다.
        </li>
        <li>
          <b>버전 디렉터리</b> — 청크는 스토리지에 버전 디렉터리로 쌓고, <code>index.html</code> 이
          그중 한 버전을 참조하도록 했습니다. 배포는 새 디렉터리를 올린 뒤 참조를 바꾸는 것이라 기존
          파일을 덮지 않고, 롤백은 참조를 이전 버전으로 되돌리는 것으로 끝납니다. 오래된 버전은 보관
          기간이 지나면 정리합니다.
        </li>
        <li>
          <b>검증</b> — 구조도와 영향 범위를 정리한 제안서로 인프라 담당자와 리스크를 검토하고,
          테스트 서버에서 단계별로 검증했습니다.
        </li>
      </Bullets>
      <Figure
        index="그림 5"
        caption="배포 구조 전과 제안한 구조입니다."
        note="제안한 구조는 재직 중 최종 반영까지 가지 않았습니다."
        fallback={deployTopologyFallback}
      >
        <DeployTopology />
      </Figure>
    </Item>
  );
}
