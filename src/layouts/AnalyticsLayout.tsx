import { createAnalytics } from "@/lib/analytics";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const analytics = createAnalytics(
  window,
  document,
  import.meta.env.VITE_GA_MEASUREMENT_ID,
  import.meta.env.PROD,
);

/** Wrap all routes, including the standalone application portfolios. */
export function AnalyticsLayout() {
  const { pathname, search } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: track completed route changes, not hash navigation
  useEffect(() => {
    // Let page effects finish updating document.title before recording the view.
    const timer = window.setTimeout(() => analytics.pageView(), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return <Outlet />;
}
