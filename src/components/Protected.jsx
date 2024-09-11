import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Protected({}) {
  const { isSuperAdmin } = useAuth();

  return isSuperAdmin() ? <Outlet /> : <Navigate to="/" />;
}

export default Protected;
