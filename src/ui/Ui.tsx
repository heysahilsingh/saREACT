import { Outlet, createBrowserRouter } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from './header/Header';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const UI = () => {
  return (
    <>
      <Header />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <UI />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
    ]
  },
]);

export default UI
