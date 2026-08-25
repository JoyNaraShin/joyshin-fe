import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  );
}
