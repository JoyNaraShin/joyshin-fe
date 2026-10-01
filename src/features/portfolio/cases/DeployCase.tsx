import { Step, Thread } from "../components/Thread";
import { Item } from "../layout/Item";

export function DeployCase() {
  return (
    <Item id="case-deploy" source="CLO-SET" title="프론트엔드 배포 분리">
      <Thread title="배포 구조">
        <Step label="문제">
          <ul>
            <li>
              2차 리뉴얼 앱(Vite, React SPA)에 독립된 배포 파이프라인이 없어, 번들 청크는 Azure
              Storage에 올리고 진입점 <code>index.html</code>은 기존 Next.js 서버 Docker 이미지에
              포함해 서빙
            </li>
            <li>
              프론트엔드만 변경돼도 서버 이미지 재빌드와 재배포 필요. 배포 시간과 롤백 단위가
              Next.js 서버에 종속
            </li>
          </ul>
        </Step>
        <Step label="요구사항">
          클라이언트 라우팅 경로는 서버에 대응하는 파일이 없어, 직접 접근이나 새로고침 시{" "}
          <code>index.html</code>을 200으로 응답하는 SPA 폴백 필요
        </Step>
        <Step label="선택">
          Azure Storage 정적 웹사이트는 대체 응답을 오류 문서로만 지정할 수 있어 SPA 폴백이 404
          상태로 응답됨. 이미 사내에서 쓰던 Cloudflare Pages로 <code>index.html</code>을 서빙하고,
          청크 보관과 버전 관리는 Azure Storage에 유지
        </Step>
        <Step label="설계">
          <ul>
            <li>
              GitHub Actions 파이프라인 설계. 청크는 Azure Storage에 버전별 업로드,{" "}
              <code>index.html</code>만 Pages로 배포. Next.js 서버는 독립 배포
            </li>
            <li>
              버전별 청크를 덮어쓰지 않고 새 버전을 올린 뒤 <code>index.html</code>의 버전 참조만
              교체. 롤백은 이전 버전 참조로 되돌리는 작업으로 단순화
            </li>
            <li>
              구조도와 영향 범위를 정리한 제안서로 인프라 담당자와 리스크를 검토하고 테스트 서버에서
              단계별 검증
            </li>
          </ul>
        </Step>
        <Step label="현황">
          <ul>
            <li>테스트 서버 단계별 검증까지 완료. 운영 반영 전 퇴사</li>
          </ul>
        </Step>
      </Thread>
    </Item>
  );
}
