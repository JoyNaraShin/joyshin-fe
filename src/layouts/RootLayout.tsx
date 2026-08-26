import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RouteFallback } from "@/routes/RouteFallback";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

export function RootLayout() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
      <SiteFooter />
      <ScrollRestoration />
    </>
  );
}
