import { GiDonkey } from "react-icons/gi";
import { logoutUser } from "../../database/auth";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminMenu() {
  const { isShowing, toggle } = useVisibilityToggle();
  const { isSuperAdmin } = useAuth();

  const getBackgroundColor = () => {
    return isShowing ? "bg-orange" : "bg-transparent";
  };

  return (
    <div className={"admin--btn " + getBackgroundColor()}>
      <button onClick={toggle}>
        <GiDonkey />
      </button>
      {isShowing && (
        <ul>
          {isSuperAdmin() && (
            <li>
              <NavLink to="./archive">Archive</NavLink>
            </li>
          )}
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AdminMenu;
