import { router } from "@/routes/router";
import { RouterProvider } from "react-router-dom";

export function App() {
  return <RouterProvider router={router} />;
}
