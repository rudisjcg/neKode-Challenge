import { footerLogo } from "../assets";

function Footer() {
  return (
    <footer>
      <div className="row footer__row">
        <a href="/" className="footer_anchor">
          <figure className="footer__logo">
            <img src={footerLogo} className="footer__logo--img" />
          </figure>
          <span className="footer__logo--popper">
            Top👻
            <i className="lni lni-arrow-up-circle"></i>
          </span>
        </a>

        <div className="footer_social--list-wrapper">
          <div className="footer__social--list click">
            <a
              href="/"
              className="
                footer__social--link
                link__hover-effect
                link__hover-effect--white"
            >
              {" "}
              Instagran{" "}
            </a>
          </div>
          <div className="footer__social--list  click">
            <a
              href="https://www.linkedin.com/in/rudis-cordones-bab332210/"
              className="
                footer__social--link
                link__hover-effect
                link__hover-effect--white"
            >
              Facebook{" "}
            </a>
          </div>
          <div className="footer__social--list  click">
            <a
              href="/"
              className=" 
                footer__social--link
                link__hover-effect
                link__hover-effect--white"
            >
              Twitter
            </a>
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
