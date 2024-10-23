import { useAuth } from "../context/AuthContext";

function SuperAdmin({ children }) {
  const { isSuperAdmin } = useAuth();

  if (!isSuperAdmin()) {
    return;
  }

  return <>{children}</>;
}

export default SuperAdmin;
