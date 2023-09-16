import { Link } from "react-router-dom";
import { headerDocPicture } from "../assets";

function Header({ text, dogp, btn }) {
  return (
    <section className="headerSection">
      <picture className="pictureHomeContainer">
        <div className="text-Header">
          <h1 className="header_Title">{text}</h1>
        </div>
        <button className="btnPictureHome" hidden={btn}>
          <Link className="link" to={"/explore"}>
            Explore more!
          </Link>
        </button>
        <img src={headerDocPicture} className="imgSource" />
      </picture>
    </section>
  );
}

export default Header;
