import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import Header from './Header';
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    <>
    <Header />
    <RouterProvider router={pageRoutes} />
    <Footer />
    </>
  )
}

const pageRoutes = createBrowserRouter([
  {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />
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
]);

export default App
