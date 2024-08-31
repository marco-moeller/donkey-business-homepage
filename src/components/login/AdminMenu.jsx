import { GiDonkey } from "react-icons/gi";
import { logoutUser } from "../../database/auth";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

function AdminMenu() {
  const { isShowing, toggle } = useVisibilityToggle();

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
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AdminMenu;
