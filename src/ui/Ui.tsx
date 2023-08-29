import { Outlet, createBrowserRouter } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from './header/Header';
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Account from "./pages/account/Account";
import Help from "./pages/help/Help";
import Instamart from "./pages/instamart/Instamart";
import Search from "./pages/search/Search";
import Offers from "./pages/offers/Offers";
import Cart from "./pages/cart/Cart";
import Near from "./pages/near/Near";
import { UserContextProvider } from "../context/UserContext";

const UI = () => {
  return (
    <UserContextProvider>
      <Header />
      <div className="page-content sa-container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </UserContextProvider>
  )
}

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <UI />,
    children: [
      {
        path: "/*",
        element: <NotFound />,
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/help",
        element: <Help />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/instamart",
        element: <Instamart />
      },
      {
        path: "/near/:name",
        element: <Near />,
      },
      {
        path: "/offers",
        element: <Offers />
      },
      {
        path: "/search",
        element: <Search />
      },
    ]
  },
]);

export default UI
