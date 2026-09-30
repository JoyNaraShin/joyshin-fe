import { WorkSection } from "@/features/portfolio";
import { useEffect } from "react";

export function WorkPage() {
  useEffect(() => {
    document.title = "작업 — 신나라";
    return () => {
      document.title = "신나라 — 프론트엔드 개발자";
    };
  }, []);
  return <WorkSection />;
}
