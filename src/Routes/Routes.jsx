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
  {
    path: "/add-recipe",
    Component: AddRecipe,
  },
]);

export default router;
