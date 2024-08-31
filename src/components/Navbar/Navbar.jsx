import { useState } from "react";
import "./navbar.css";

function Navbar({ children, hamburgerColor = "black", exitColor = "black" }) {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const openNav = () => {
    setNavIsOpen(true);
  };

  const closeNav = () => {
    setNavIsOpen(false);
  };

  return (
    <div className="navbar">
      <svg
        height="32px"
        id="menu-btn"
        className={navIsOpen ? "open nav-hidden" : "open nav-unhidden"}
        viewBox="0 0 32 32"
        onClick={openNav}
      >
        <path
          fill={hamburgerColor}
          d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
        />
      </svg>
      <nav className={navIsOpen ? "nav-unhidden" : ""}>
        <svg
          viewBox="0 0 24 24"
          id="exit-btn"
          className="exit"
          height="40px"
          onClick={closeNav}
        >
          <path
            id="exit"
            fill={exitColor}
            d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
          />
        </svg>
        <ul className="navbar--ul">{children}</ul>
      </nav>
    </div>
  );
}

export default Navbar;
