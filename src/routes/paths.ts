/**
 * 네비게이션 단일 출처. 문자열 리터럴 대신 이 상수를 사용한다.
 * 지금 존재하는 라우트만 둔다. 없는 경로를 미리 적어 두면 죽은 링크가 된다.
 */
export const paths = {
  home: "/",
  work: (slug: string) => `/work/${slug}`,
} as const;
