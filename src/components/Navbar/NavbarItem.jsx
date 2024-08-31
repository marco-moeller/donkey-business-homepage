import { NavLink } from "react-router-dom";

function NavbarItem({ path, children }) {
  return (
    <li>
      {" "}
      <NavLink to={`/${path}`}>{children}</NavLink>{" "}
    </li>
  );
}

export default NavbarItem;
