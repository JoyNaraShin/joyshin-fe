import type { ComponentType } from "react";

/** Adapts a `{ Named }` dynamic import into React Router's `lazy` route loader. */
export function lazyComponent<M>(
  load: () => Promise<M>,
  pick: (mod: M) => ComponentType,
): () => Promise<{ Component: ComponentType }> {
  return async () => ({ Component: pick(await load()) });
}
