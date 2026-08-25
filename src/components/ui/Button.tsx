import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-brand-fg hover:bg-brand-strong",
  ghost: "border border-border text-ink hover:border-brand hover:text-brand",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50";

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
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
