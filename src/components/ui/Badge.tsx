import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-elevated px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
