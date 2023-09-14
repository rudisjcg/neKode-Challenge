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
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/Explore"}>Explore</Link>
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
