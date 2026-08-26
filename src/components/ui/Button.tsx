import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "ghost";

/**
 * 자체 버튼 프리미티브. 외부 UI 라이브러리를 쓰지 않으므로 이 파일이 버튼의 정본이다.
 * 색·반경은 index.css 의 `@theme` 토큰에서 온다 — 여기에 값을 적지 않는다.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-mark text-white border-mark hover:bg-mark-deep hover:border-mark-deep active:bg-mark-press active:border-mark-press",
  ghost:
    "border-rule text-ink hover:border-mark hover:text-mark active:bg-mark-soft active:text-mark-deep",
};

// 최소 높이 44px — 손가락 탭 타깃 기준.
const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-5 text-t3 font-semibold no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mark disabled:cursor-not-allowed disabled:opacity-50";

type Props = {
  variant?: Variant;
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  to,
  href,
  children,
  className = "",
  ...rest
}: Props) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
