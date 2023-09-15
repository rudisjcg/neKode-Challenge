import { GiHamburgerMenu } from "react-icons/gi";
import { navLogo } from "../assets";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navContainer">
      <picture>
        <img src={navLogo} className="navLogo" />
      </picture>
      <nav className="navLinks">
        <ul className="nav_list_links">
          <li className="nav__link">
            <Link className="link" to={"/"}>
              Home
            </Link>
          </li>
          <li className="nav__link">
            <Link className="link" to={"/Explore"}>
              Explore
            </Link>
          </li>
          <li className="nav__link">
            <Link className="link" to={"/dogsFrm"}>
              Dogs
            </Link>
          </li>
        </ul>
        <button className="btn-menu">
          <GiHamburgerMenu />
        </button>
      </nav>
    </div>
  );
}

export default Nav;
