import { CasePage as Case, PROJECTS } from "@/features/portfolio";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { useParams } from "react-router-dom";

export function CasePage() {
  const { slug = "" } = useParams();
  return PROJECTS.some((p) => p.slug === slug) ? <Case /> : <NotFoundPage />;
}
