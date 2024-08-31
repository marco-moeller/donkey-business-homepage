import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NavbarItem from "../Navbar/NavbarItem";
import "./header.css";
import { FaTwitch } from "react-icons/fa";
import LoginButton from "../login/LoginButton";
import { useAuth } from "../../context/AuthContext";
import AdminMenu from "../login/AdminMenu";
import Admin from "../../admin/Admin";

const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header>
      {!isLoggedIn && <LoginButton />}
      <Admin>
        <AdminMenu />
      </Admin>

      <img src="logo.png" alt="logo" className="logo" />
      <p>
        <NavLink to="/">
          {" "}
          Donkey <span className="orange">Business</span>
        </NavLink>
      </p>
      <Navbar>
        <NavbarItem path="">Home</NavbarItem>
        <NavbarItem path="stream">Stream</NavbarItem>
        <NavbarItem path="team">Team</NavbarItem>
        <div>
          <li className="socials--head">Links</li>
          <li className="socials">
            <ul>
              <li>
                <a href="https://www.twitch.tv/donkeybusiness" target="_blank">
                  <FaTwitch />
                  Twitch
                </a>
              </li>
              <li>
                <a
                  href="https://warcraft3.info/league/clans/141/donkey-business"
                  target="_blank"
                >
                  W<span className="number">3</span>Info
                </a>
              </li>
              <li>
                <a
                  href="https://liquipedia.net/warcraft/Donkey_Business"
                  target="_blank"
                >
                  Liquipedia
                </a>
              </li>
              <li>
                <a href="https://discord.gg/mDHQRuxu" target="_blank">
                  Discord
                </a>
              </li>
            </ul>
          </li>
        </div>
        <NavbarItem path="about">About</NavbarItem>
      </Navbar>
    </header>
  );
};

export default Header;
