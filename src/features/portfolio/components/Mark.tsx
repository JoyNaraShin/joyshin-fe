/** 사이트 표식. 파비콘(public/favicon.svg)과 같은 그림이다. 영문 이름 Joy 의 J. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 32 32" width={size}>
      <rect fill="var(--color-deep)" height="32" rx="7" width="32" />
      <path
        d="M14.5 9.5h6v8.5a5 5 0 0 1-10 0"
        fill="none"
        stroke="var(--color-sun)"
        strokeLinecap="square"
        strokeWidth="3.2"
      />
    </svg>
  );
}
