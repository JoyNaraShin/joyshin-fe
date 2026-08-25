import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

export function RootLayout() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<div className="wrap" style={{ padding: "96px 0" }} />}>
        <Outlet />
      </Suspense>
      <SiteFooter />
      <ScrollRestoration />
    </>
  );
}
