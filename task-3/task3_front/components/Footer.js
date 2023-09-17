import { footerLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <div className="footer__row">
        <Link href="/" className="footer_anchor">
          <figure className="footer__logo">
            <Image
              src={footerLogo}
              alt="footer_logo"
              className="footer__logo--img"
            />
          </figure>
          <span className="footer__logo--popper">
            Top👻
            <i className="lni lni-arrow-up-circle"></i>
          </span>
        </Link>

        <div className="footer_social--list-wrapper">
          <div className="footer__social--list click">
            <Link
              href="/"
              className="
                footer__social--link
                link__hover-effect
                link__hover-effect--white"
            >
              {" "}
              Instagran{" "}
            </Link>
          </div>
          <div className="footer__social--list  click">
            <Link
              href="https://www.linkedin.com/in/rudis-cordones-bab332210/"
              className="
                footer__social--link
                link__hover-effect
                link__hover-effect--white"
            >
              Facebook{" "}
            </Link>
          </div>
          <div className="footer__social--list  click">
            <Link
              href="/"
              className=" 
                footer__social--link
                link__hover-effect
                link__hover-effect--white"
            >
              Twitter
            </Link>
          </div>
          <div className="footer__copyright">
            {" "}
            Copyright © 2022 Rudis Cordones
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
