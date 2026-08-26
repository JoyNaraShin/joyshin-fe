import { SideRail, SiteFooter } from "@/features/portfolio";
import { RouteFallback } from "@/routes/RouteFallback";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="shell">
      <SideRail />
      <div className="col">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
        <SiteFooter />
      </div>
    </div>
  );
}
