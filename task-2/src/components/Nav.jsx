import { GiHamburgerMenu } from "react-icons/gi";
import { navLogo } from "../assets";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Nav() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="navContainer">
      <picture>
        <Link to={"/"}>
          <img src={navLogo} className="navLogo" />
        </Link>
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
        <button className="btn-menu" onClick={handleOpen}>
          <GiHamburgerMenu />
        </button>
      </nav>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ul className="nav_list_links modal_links">
              <li className="nav__link modal_link" onClick={handleClose}>
                <Link className="link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav__link modal_link" onClick={handleClose}>
                <Link className="link" to={"/Explore"}>
                  Explore
                </Link>
              </li>
              <li className="nav__link modal_link" onClick={handleClose}>
                <Link className="link" to={"/dogsFrm"}>
                  Dogs
                </Link>
              </li>
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Nav;
