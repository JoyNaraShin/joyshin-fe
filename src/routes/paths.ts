/**
 * 네비게이션 단일 출처. 문자열 리터럴 대신 이 상수를 사용한다.
 * 라우트가 늘면 여기에 추가 — 동적 경로는 함수로:  detail: (id: string) => `/items/${id}`
 */
export const paths = {
  home: "/",
  about: "/about",
  contact: "/contact",
} as const;
