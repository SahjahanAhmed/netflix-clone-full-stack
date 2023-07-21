import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const active = JSON.parse(localStorage.getItem("active"));
  return active == true ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default ProtectedRoute;
