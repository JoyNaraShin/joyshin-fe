/**
 * 작업 목록 — 홈의 카드와 케이스 페이지 머리가 같은 값을 읽는다.
 *
 * `mine` 은 케이스 페이지 옆 칸에 고정되는 "맡은 일"이다. 팀 구성과 분담 경계는
 * 면접에서 풀 이야기라 여기 적지 않는다.
 *
 * 문장은 확정 이력서(2026-09)에 있는 사실만 쓴다.
 */
export type Cover =
  | { kind: "shot"; src: string; alt: string; fit?: "contain" }
  | { kind: "figure"; figure: "load" | "list" | "state" | "deploy" };

export type Project = {
  slug: string;
  title: string;
  when: string;
  /** 이력서의 역할 표현 그대로 — 단독 담당 / 교체 주도 / 리드 */
  role: string;
  /** 카드와 케이스 머리에 붙는 결과 한 줄 */
  result: string;
  summary: string;
  stack: string[];
  cover: Cover;
  mine: string[];
};

const shot = (file: string, alt: string, fit?: "contain"): Cover => ({
  kind: "shot",
  src: `${import.meta.env.BASE_URL}work/${file}`,
  alt,
  fit,
});

export const FEATURED: Project[] = [
  {
    slug: "showroom",
    title: "버추얼 쇼룸",
    when: "2022 하반기 – 2026 상반기",
    role: "프론트엔드 단독 담당",
    result: "초기 개발부터 퇴사까지 3년 반, 편집과 라이브 페이지를 혼자 맡았습니다",
    summary:
      "360° 공간에 3D 콘텐츠를 배치해 바이어에게 공개하는 쇼룸입니다. 공간과 스팟 전체가 JSON 문서 하나로 오가는 API 위에서 복잡한 편집 상태를 다뤘습니다.",
    stack: ["React", "Recoil", "MobX", "TypeScript"],
    cover: shot("showroom-live.webp", "바이어에게 공개된 버추얼 쇼룸 라이브 페이지"),
    mine: [
      "편집 페이지와 라이브 페이지의 프론트엔드 전체",
      "MobX만 쓰던 코드베이스에 Recoil 도입, 문서를 엔티티 단위 atom으로 정규화",
      "mode prop 분기를 페이지별 컴포넌트로 분리",
      "배경 업로드 흐름에서 타일 변환이 끝날 때까지 썸네일을 보여 주는 상태 처리",
    ],
  },
  {
    slug: "list-rendering",
    title: "목록 렌더링 성능 개선",
    when: "2023 하반기, 2025",
    role: "두 차례 교체 주도",
    result: "수만 건 목록에서도 DOM은 화면에 보이는 행만큼만 남깁니다",
    summary:
      "오래된 무한 스크롤 라이브러리가 스크롤마다 위치를 다시 계산해 프레임이 끊겼습니다. VirtuosoGrid를 거쳐 TanStack Virtual 공통 훅으로 옮겼습니다.",
    stack: ["TanStack Virtual", "react-virtuoso", "React"],
    cover: shot("workroom-list.webp", "에셋 카드가 격자로 늘어선 CLO-SET 워크룸 목록"),
    mine: [
      "1차 VirtuosoGrid 도입과 2차 TanStack Virtual 교체",
      "열 수와 행 높이를 계산하는 행 단위 가상화 공통 훅",
      "데스크톱 앱 내장 웹뷰에 먼저 적용하고 전체 목록으로 확장",
    ],
  },
  {
    slug: "loading",
    title: "워크룸 초기 로딩 개선",
    when: "2024 하반기",
    role: "계측, 제안, 개발",
    result: "LCP 2.91s → 1.64s, DOMContentLoaded 2.47s → 1.33s",
    summary:
      "에셋 목록이 있는 메인 작업 공간의 첫 화면을 Performance 패널과 Lighthouse로 계측해 과제로 제안했습니다.",
    stack: ["Next.js", "Cloudflare Images", "Lighthouse"],
    cover: { kind: "figure", figure: "load" },
    mine: [
      "계측과 과제 제안",
      "코드 스플리팅과 첫 화면에 필요 없는 모듈의 초기화 지연",
      "Next.js Image 커스텀 로더로 Cloudflare 이미지 리사이징 공통 적용",
      "목록이 읽지 않는 응답 필드를 참조처 전수 조사로 추림",
    ],
  },
];

export const MORE: Project[] = [
  {
    slug: "pricing",
    title: "요금제 개편과 사용량 제한",
    when: "2024 하반기 – 2025 상반기",
    role: "개발",
    result: "Free, Standard, Premium 요금제에 맞춘 화면과 한도, 백오피스",
    summary:
      "Pricing 페이지와 Admin Console 사용량 화면, 파일 업로드와 임베드 뷰의 플랜별 한도, BD 팀용 백오피스를 만들었습니다.",
    stack: ["Next.js", "TanStack Query"],
    cover: shot(
      "pricing-plans.webp",
      "Free, Standard, Premium 세 요금제 카드가 놓인 Pricing 페이지",
      "contain",
    ),
    mine: [
      "Pricing 페이지와 Admin Console 사용량 화면",
      "파일 업로드와 임베드 뷰의 플랜별 한도 적용",
      "한도 초과 시 권한별로 버튼이 달라지는 공통 안내 페이지",
      "BD 팀 백오피스의 요금 계산, 플랜 변경, 메모 기능",
    ],
  },
  {
    slug: "deploy",
    title: "프론트엔드 배포 분리",
    when: "2026 상반기",
    role: "설계와 검증 리드",
    result: "테스트 서버 검증까지 마쳤고, 운영 반영 전에 퇴사했습니다",
    summary:
      "React SPA의 index.html이 Next.js 서버 이미지에 실려, 프론트만 바뀌어도 서버를 다시 빌드하던 구조를 나누는 작업입니다.",
    stack: ["GitHub Actions", "Cloudflare Pages"],
    cover: { kind: "figure", figure: "deploy" },
    mine: [
      "Cloudflare Pages 선택과 GitHub Actions 파이프라인 설계",
      "index.html이 가리키는 버전을 되돌리는 롤백 방식",
      "제안서로 인프라 담당자와 리스크 검토, 테스트 서버 단계별 검증",
    ],
  },
  {
    slug: "renewal",
    title: "1차 서비스 리뉴얼",
    when: "2023 하반기 – 2024 상반기",
    role: "모노레포 초기 설계, 뷰어 설계와 개발",
    result: "모노레포를 초기 설계하고, 그 위에서 모든 뷰어를 설계하고 개발했습니다",
    summary:
      "MobX 싱글턴 스토어에 쌓이던 상태를 서버 상태와 UI 상태로 나누고, Yarn workspaces로 패키지를 갈랐습니다.",
    stack: ["Yarn workspaces", "TanStack Query", "Recoil"],
    cover: { kind: "figure", figure: "state" },
    mine: [
      "Yarn workspaces 기반 모노레포 초기 설계와 관심사별 패키지 분리",
      "API 클라이언트를 사내 다른 서비스도 쓰는 독립 패키지로 분리",
      "서버 상태는 TanStack Query 캐시로, UI 상태는 Recoil로 분리",
      "모든 뷰어의 설계와 개발",
    ],
  },
];

export const PROJECTS = [...FEATURED, ...MORE];
