import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <div className="layoutContainer">
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
