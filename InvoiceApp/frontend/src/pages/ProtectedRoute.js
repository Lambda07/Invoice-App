import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [token, setToken] = useState(localStorage.getItem("user"));
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
