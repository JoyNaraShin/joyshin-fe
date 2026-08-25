/** 실제로 거쳐 온 세 단계. 순서가 곧 마이그레이션 순서다. */
export const MODES = [
  {
    id: "legacy",
    label: "무한 스크롤 라이브러리",
    step: "이전",
    note: "항목 전체가 DOM에 남고 스크롤할 때마다 전체 위치를 다시 계산한다.",
  },
  {
    id: "io",
    label: "IntersectionObserver",
    step: "1차",
    note: "위치를 다시 계산하는 일은 없앴다. 보이지 않는 항목도 DOM에 그대로 남는다.",
  },
  {
    id: "virtual",
    label: "가상화",
    step: "2차",
    note: "보이는 줄만 그린다. DOM에 남는 수가 화면 크기로 고정돼, 항목이 몇 만 건이어도 같다.",
  },
] as const;

export type ModeId = (typeof MODES)[number]["id"];
