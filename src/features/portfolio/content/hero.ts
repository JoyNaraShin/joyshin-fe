export const KEYWORDS = ["유연한 대응", "합의로 만드는 협업", "능동적 책임"] as const;

/** ko = 값에 한글이 섞인 칸. 모노 서체에 한글이 없어 자간이 벌어지므로 본문 서체로 둔다. */
export const STATS = [
  { k: "로딩 성능 개선", n: "−46%", d: "DCL 2.47s → 1.33s · LCP −44%", ko: false },
  { k: "목록·검색 렌더링", n: "수만 건", d: "가상화로 DOM 상주 수 고정", ko: true },
  { k: "디자인 시스템", n: "3버전", d: "서비스 3버전과 병행 유지보수", ko: true },
  { k: "배포 구조 전환", n: "정적 배포", d: "GitHub Actions · Cloudflare Pages", ko: true },
] as const;
