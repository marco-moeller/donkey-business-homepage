import { NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        © Marco Moeller {new Date().getFullYear()}
        {" ● "}
        <NavLink to="/impressum">Impressum</NavLink>
      </p>
    </footer>
  );
};

export default Footer;
