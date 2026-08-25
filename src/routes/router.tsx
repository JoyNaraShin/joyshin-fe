import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

// vite 의 base 와 같은 값. 여기가 비면 서브패스에서 모든 경로가 어긋난다.
export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
