import { createBrowserRouter } from "react-router";

import Error from "../Pages/Error";
import Home from "../Home";

const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: Error,
    Component: Home,
  },
]);

export default router;
