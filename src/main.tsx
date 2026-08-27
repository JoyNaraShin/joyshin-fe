import { App } from "@/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root element not found");

// 등장 애니메이션은 JS 가 실제로 뜬 뒤에만 건다 — site.css 의 `:root.js .rise` 참고.
// 이 표식이 없으면 본문은 처음부터 보이는 상태로 남는다(인쇄·JS 비활성 대비).
document.documentElement.classList.add("js");

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
