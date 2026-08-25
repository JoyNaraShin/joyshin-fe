import { URL, fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages 프로젝트 페이지는 /<repo>/ 아래로 서빙된다.
  // 에셋 경로가 루트 기준이면 전부 404 가 되므로 여기서 접두사를 박는다.
  base: "/joyshin-fe/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
