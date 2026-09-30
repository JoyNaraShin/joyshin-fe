/**
 * 경력 — 사실 층. 무엇을 어떻게 했는지는 주요 작업 섹션이 진다.
 * 여기 남는 것은 기간·회사·역할·한 줄 요약·일하는 방식·스택뿐이다.
 */
export const JOBS = [
  {
    when: "2022.04 – 2026.04",
    company: "클로버추얼패션",
    role: "CLO-SET · 프론트엔드 개발자",
    // 서비스 설명의 출처 = style.clo-set.com (aboutus · For Brands, 2026-08 확인).
    // 「Fashion Collaboration Platform」「from planning to production」「3D assets」가
    // 공식 표기라 한국어도 그 어휘를 따른다.
    // 서비스 규모 수치는 서비스의 것이지 개인 실적이 아니다 — 50개국 한 개만 둔다.
    // 뷰어 담당 범위 = 뷰어 기능 전체와 툴바, 뷰어 내부 상태. 주변 패널은 범위 밖이다.
    lead: "브랜드와 제조사가 3D 에셋을 관리하고 공유하는 글로벌 B2B 협업 플랫폼. 3D, 2D, 렌더 뷰어 전체와 에셋 목록, 검색, 버추얼 쇼룸, 어드민 등 서비스 화면 전반 담당",
    bullets: ["Datadog RUM으로 배포 후 프론트엔드 오류 모니터링과 대응"],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "TanStack Virtual",
      "react-virtuoso",
      "Recoil",
      "Jotai",
      "styled-components",
      "SCSS",
      "MobX",
      "Yarn workspaces",
      "Vite",
      "Datadog RUM",
    ],
  },
  {
    when: "2021.07 – 2022.04",
    company: "쓰리아이",
    role: "프론트엔드 개발자",
    lead: "디지털트윈과 3D 공간 기술 기업",
    bullets: [
      "Pivo(미디어 클라우드와 3D 도면 투어 웹 서비스) 신규 기능 개발, 유지보수, 다국어 대응",
      "Beamo(3D 도면 솔루션)에서 3D 공간에 스팟을 배치하는 기능 개발과 버그 수정 (Vue, lerna 멀티 패키지)",
    ],
    stack: ["Vue 3", "TypeScript", "Tailwind CSS", "Vuex", "lerna"],
  },
  {
    when: "2019.05 – 2021.05",
    company: "노스스타컨설팅",
    role: "풀스택 개발자",
    lead: "기업 고객 대상 SI 컨설팅 기업, 솔루션사업부",
    bullets: [
      "KT, 로레알 등 고객사 시스템을 Java, Spring 기반 풀스택으로 개발하며 JSP, jQuery 화면 담당",
      "선진 직원 성과 관리 시스템에서 Vue.js로 화면을 개발하고 오픈 후 유지보수 담당. 이 경험으로 프론트엔드로 전향",
      "AWS(EC2, RDS, Route 53, CloudFront)로 프로덕션 환경 구축",
    ],
    stack: ["Java", "Spring", "Vue.js", "JSP", "jQuery", "AWS"],
  },
];
