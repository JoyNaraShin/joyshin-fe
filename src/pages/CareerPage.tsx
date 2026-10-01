import { CareerSection } from "@/features/portfolio";
import { useEffect } from "react";

export function CareerPage() {
  useEffect(() => {
    document.title = "경력 — 신나라";
    return () => {
      document.title = "신나라 JoyNara — 프론트엔드 개발자";
    };
  }, []);
  return <CareerSection />;
}
