import { Bullets } from "../components/Bullets";
import { Overview } from "../components/Overview";
import { SubHead } from "../components/SubHead";
import { DeployTopology } from "../figures/DeployTopology";
import { Figure } from "../layout/Figure";
import { Item } from "../layout/Item";

export function DeployCase() {
  return (
    <Item index="05" id="case-deploy" source="CLO-SET" title="배포 구조 전환">
      <Overview
        lead="index.html 하나가 Next 서버 이미지에 남아 프론트 릴리스가 서버 재배포를 따라가던 구조를, 정적 호스팅으로 옮겨 배포 단위를 분리하는 작업을 진행했습니다."
        situation="서비스 리뉴얼 3차에서 각 앱을 React 로 경량화했습니다. 배포 경로는 새로 만들지 않고, 번들 청크는 클라우드에 올리되 index.html 하나는 2차 Next 서비스의 public/ 에 두고 그 서버 이미지에 실어 내보내고 있었습니다."
        task="React 앱의 배포 구조"
        action="SPA 폴백을 갖춘 정적 호스팅 선택 · 자기 배포 파이프라인 구성 · 버전 디렉터리 설계"
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
          3차에서 React 로 가볍게 가져간 이점이 배포 단계에서 사라집니다.
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
          파일을 덮지 않고, 롤백은 참조를 이전 버전으로 되돌리는 것으로 끝납니다. 버전마다 경로가
          달라 청크에는 장기 캐시를 걸 수 있고, 배포마다 바뀌는 것은 사실상 진입점 하나입니다.
          오래된 버전은 보관 기간이 지나면 정리합니다.
        </li>
      </Bullets>
      <Figure
        index="그림 5"
        caption="배포 구조 전과 제안한 구조입니다."
        note="오른쪽은 제안한 구조입니다. 재직 중 최종 반영까지 가지 않았습니다."
      >
        <DeployTopology />
      </Figure>
    </Item>
  );
}
