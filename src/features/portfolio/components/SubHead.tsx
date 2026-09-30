import type { ReactNode } from "react";

export function SubHead({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 text-t4 font-bold tracking-[-0.02em] text-ink">{children}</h2>;
}
