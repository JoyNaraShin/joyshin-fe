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
    lead: "브랜드와 제조사가 기획부터 생산까지 3D 에셋을 한 곳에서 관리·공유하는 글로벌 3D 패션 협업 플랫폼입니다. 3D·2D·렌더 뷰어 기능 전체와 에셋 목록·검색, 버추얼 쇼룸, 어드민 등 서비스 화면 전반을 맡았습니다. 1차 서비스 리뉴얼에서는 모노레포 도구와 패키지 구조, 상태 관리 방식을 직접 정했습니다.",
    // 불릿은 한 줄만 둔다(2026-08-27). 앞 판은 세 줄이었는데 전부 "어떻게 일했나"였다 —
    // 기획 리뷰 참여, 모니터링 알림 대응, 절차 수행. 무엇을 했나는 아래 주요 작업 11건이
    // 이미 지고, 태도 서술이 그 자리를 대신하면 한 일이 가려진다.
    bullets: [
      "4년간 운영되는 프로덕션 서비스를 담당하며 Datadog RUM으로 배포 뒤 프론트엔드 오류를 모니터링하고 대응했습니다.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "Recoil",
      "Jotai",
      "styled-components",
      "SCSS",
      "MobX",
      "Yarn workspaces",
    ],
  },
  {
    when: "2021.07 – 2022.04",
    company: "쓰리아이",
    role: "Pivo · Beamo · 프론트엔드 개발자",
    lead: "미디어 클라우드와 3D 도면 투어 서비스 Pivo, 디지털트윈 3D 도면 솔루션 Beamo를 만들었습니다.",
    bullets: [
      "Vuex 기반 상태 관리 위에서 신규 기능을 개발하고 유지보수했습니다.",
      "lerna로 app · viewer · editor가 나뉜 MSA 구조 안에서 작업했고, vue-i18n으로 다국어를 지원했습니다.",
    ],
    stack: ["Vue 3", "TypeScript", "Tailwind CSS", "Vuex", "lerna"],
  },
  {
    when: "2019.05 – 2021.05",
    company: "노스스타컨설팅",
    role: "풀스택 개발자",
    lead: "풀스택 개발자로 화면 단위 개발을 담당했습니다. 오픈 이후에는 유지보수 담당자로 수정·신규 개발과 배포를 맡았습니다.",
    bullets: [
      "[선진] HMS — 개인별 퍼포먼스 관리를 위한 업무 관리 프로그램. Java·Spring 위에 Vue.js와 PostgreSQL을 썼습니다.",
      "[KT] GEPP — 사용자 위치를 기준으로 감염병 정보를 전달하고, 자가 진단부터 병원 전달·진단 예약까지 잇는 프로그램.",
      "로레알 통합 회원 사이트 — 구매 내용별로 스탬프를 적립하고 사은품 증정을 관리하는 시스템.",
      "AWS(EC2 · RDS · Route 53 · CloudFront)로 클라우드 환경을 구축해 프로젝트에 활용했습니다.",
    ],
    stack: ["Java", "Spring", "Vue.js", "JSP", "jQuery", "PostgreSQL", "MySQL", "AWS"],
  },
];
