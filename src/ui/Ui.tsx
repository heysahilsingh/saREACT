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
import Restaurants from "./pages/restaurants/Restaurants";

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

export const routePaths = {
  home: "/",
  account: "/account",
  cart: "/cart",
  help: "/help",
  Instamart: "/instamart",
  near: "/near/:name",
  offers: "/offers",
  search: "/search",
  restaurants: "/restaurants"
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
        path: "/",
        element: <Home />
      },
      {
        path: routePaths.account,
        element: <Account />
      },
      {
        path: routePaths.cart,
        element: <Cart />
      },
      {
        path: routePaths.help,
        element: <Help />
      },
      {
        path: routePaths.Instamart,
        element: <Instamart />
      },
      {
        path: routePaths.near,
        element: <Near />,
      },
      {
        path: routePaths.offers,
        element: <Offers />
      },
      {
        path: routePaths.search,
        element: <Search />
      },
      {
        path: routePaths.restaurants,
        element: <Restaurants />
      }
    ]
  },
]);

export default UI
