/**
 * 왼쪽 레일이 읽는 작업 인덱스.
 * 화면에 실제로 있는 앵커 id 와 1:1 이다 — 여기 없는 섹션은 레일에도 없다.
 */
export const NAV = [
  {
    id: "skill",
    label: "주요 작업",
    children: [
      { id: "case-loading", label: "로딩 속도" },
      { id: "case-list", label: "목록 렌더링" },
      { id: "case-state", label: "상태 분리" },
      { id: "case-showroom", label: "버추얼 쇼룸" },
      { id: "case-deploy", label: "배포 구조" },
    ],
  },
  { id: "ai", label: "AI 파이프라인", meta: "", children: [] },
  { id: "career", label: "경력", meta: "3곳", children: [] },
  { id: "contact", label: "연락처", meta: "", children: [] },
] as const;

/**
 * 스크롤로 추적할 대상 — 잎만 남긴다.
 * 부모 섹션은 자식 전부를 감싸므로 같이 관측하면 언제나 부모가 먼저 걸려 자식이 켜지지 않는다.
 * 부모의 활성 여부는 자식이 켜졌는지로 판단한다.
 */
export const NAV_IDS = NAV.flatMap((s) =>
  s.children.length > 0 ? s.children.map((c) => c.id) : [s.id],
);
