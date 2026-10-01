/**
 * 경력. 회사마다 기간, 역할, 한 줄 소개, 한 일, 스택.
 * CLO-SET 은 작업 글이 따로 있어 `projects` 로 글 목록을 잇는다.
 * 문장은 확정 이력서와 기존 포트폴리오에 본인이 쓴 내용에서만 가져온다.
 */
export type Job = {
  when: string;
  span: string;
  company: string;
  role: string;
  lead: string;
  /** 케이스 글로 이어지는 작업. slug 는 projects.ts 의 것 */
  projects?: string[];
  bullets: string[];
  stack: string[];
};

export const JOBS: Job[] = [
  {
    when: "2022.04 – 2026.04",
    span: "4년 1개월",
    company: "클로버추얼패션",
    role: "CLO-SET · 프론트엔드 개발자",
    lead: "브랜드와 제조사가 3D 에셋을 관리하고 공유하는 글로벌 B2B 협업 플랫폼. 3D, 2D, 렌더 뷰어와 에셋 목록, 버추얼 쇼룸 개발",
    projects: ["showroom", "list-rendering", "loading", "renewal", "pricing", "deploy"],
    bullets: [
      "통합 검색 페이지와 검색어 자동완성 개발. 검색 조건은 URL 쿼리스트링으로 관리하고, 자동완성은 디바운스와 이전 요청 취소로 race condition 방지",
      "2차 리뉴얼(Vite, Jotai, Tailwind CSS)에서 임베드 뷰어 개발",
      "디자인 시스템 v1부터 v3까지 세 버전을 병행 유지보수하며 v2와 v3 컴포넌트 개발",
      "Datadog RUM으로 배포 후 프론트엔드 오류 모니터링과 대응",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "TanStack Virtual",
      "react-virtuoso",
      "Recoil",
      "Jotai",
      "MobX",
      "Tailwind CSS",
      "styled-components",
      "Emotion",
      "SCSS",
      "Yarn workspaces",
      "Vite",
      "GitHub Actions",
      "Cloudflare",
      "Datadog RUM",
    ],
  },
  {
    when: "2021.07 – 2022.04",
    span: "10개월",
    company: "쓰리아이",
    role: "프론트엔드 개발자",
    lead: "디지털트윈과 3D 공간 기술 기업",
    bullets: [
      "Pivo(미디어 클라우드와 3D 도면 투어 웹 서비스) 신규 기능 개발과 유지보수. Vuex 상태 관리, vue-i18n 기반 다국어 대응",
      "Beamo(3D 도면 솔루션)의 3D 공간 스팟 배치 기능 개발과 버그 수정. lerna 기반 멀티 패키지 구조(app, viewer, editor)",
    ],
    stack: ["Vue 3", "TypeScript", "Tailwind CSS", "Vuex", "lerna"],
  },
  {
    when: "2019.05 – 2021.05",
    span: "2년 1개월",
    company: "노스스타컨설팅",
    role: "풀스택 개발자",
    lead: "기업 고객 대상 SI 컨설팅 기업, 솔루션사업부",
    bullets: [
      "KT, 로레알 등 고객사 시스템을 Java, Spring 기반 풀스택으로 개발하며 JSP, jQuery 화면 담당",
      "KT GEPP 개발. 사용자 위치 기반 감염병 정보 제공, 자가 진단부터 병원 연계와 진단 예약까지 지원",
      "로레알 통합 회원 사이트 개발. 구매 내역별 스탬프 적립과 사은품 증정 관리",
      "선진 직원 성과 관리 시스템(HMS)에서 Vue.js로 화면을 개발하고 오픈 후 유지보수 담당. 이 경험으로 프론트엔드로 전향",
      "AWS(EC2, RDS, Route 53, CloudFront)로 프로덕션 환경 구축",
    ],
    stack: ["Java", "Spring", "Vue.js", "JSP", "jQuery", "PostgreSQL", "AWS"],
  },
];
