import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Crud from "../pages/Crud";

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
      {
        path: "/dogsFrm",
        element: <Crud />,
      },
    ],
  },
]);

export default router;
