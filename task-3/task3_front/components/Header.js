import { headerDocPicture } from "@/assets";
import Image from "next/image";

function Header({ text, dogp, btn }) {
  return (
    <section className="headerSection">
      <picture className="pictureHomeContainer">
        <div className="text-Header">
          <h1 className="header_Title">{text}</h1>
        </div>
        <Image
          src={headerDocPicture}
          alt="Picture of the Header"
          className="imgSource"
        />
      </picture>
    </section>
  );
}

export default Header;
