import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = use(AuthContext);
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (user !== null) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
