import { useAuth } from "../context/AuthContext";

function Admin({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return;
  }

  return <>{children}</>;
}

export default Admin;
