import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/LogIn" replace />;
};
