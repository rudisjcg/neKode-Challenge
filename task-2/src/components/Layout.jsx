import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <main className="layoutContainer">
        <Nav />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default Layout;
