import Footer from "./Footer";
import Nav from "./Nav";

function Layout({ children }) {
  return (
    <>
      <main className="layoutContainer">
        <Nav />
        {children}
        <Footer />
      </main>
    </>
  );
}

export default Layout;
