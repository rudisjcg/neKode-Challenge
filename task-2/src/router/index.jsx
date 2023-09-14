import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import Explore from "../pages/Explore";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
]);

export default router;
