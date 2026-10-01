import { Step, Thread } from "../components/Thread";
import { Item } from "../layout/Item";

export function DeployCase() {
  return (
    <Item id="case-deploy" source="CLO-SET" title="프론트엔드 배포 분리">
      <Thread title="index.html 배포 분리">
        <Step label="문제">
          <ul>
            <li>
              Vite로 만든 React SPA에 별도 배포 경로가 없어, 번들 청크는 스토리지에 올리고 진입점{" "}
              <code>index.html</code>은 기존 Next.js 서버 Docker 이미지에 포함해 서빙
            </li>
            <li>
              프론트엔드만 변경돼도 서버 이미지 재빌드와 재배포 필요. 배포 시간과 롤백 단위가
              Next.js 서버에 종속
            </li>
          </ul>
        </Step>
        <Step label="선택">
          <ul>
            <li>
              클라이언트 라우팅 경로는 서버에 대응 파일이 없어, 직접 접근이나 새로고침 시{" "}
              <code>index.html</code>을 200으로 응답하는 SPA 폴백 필요
            </li>
            <li>
              스토리지 단독으로는 폴백이 불가해 사내에서 쓰던 Cloudflare Pages 선택. 청크 보관과
              버전 관리는 스토리지, <code>index.html</code> 서빙은 Pages가 담당
            </li>
          </ul>
        </Step>
        <Step label="배포">
          <ul>
            <li>
              GitHub Actions 파이프라인 설계. 청크는 스토리지에 버전별 업로드,{" "}
              <code>index.html</code>만 Pages로 배포. Next.js 서버는 독립 배포
            </li>
            <li>
              새 버전 업로드 후 <code>index.html</code>의 버전 참조만 교체하는 방식으로 기존 파일
              덮어쓰기 없음. 롤백은 이전 버전 참조로 되돌리는 작업으로 단순화
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
