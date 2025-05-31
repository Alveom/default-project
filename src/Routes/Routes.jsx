import { createBrowserRouter } from "react-router";

import Error from "../Pages/Error";
import Home from "../Pages/Home";
import AddRecipe from "../Pages/AddRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: Error,
    Component: Home,
  },
]);

export default router;
