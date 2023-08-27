import { Link } from "react-router-dom";
import Logo from "../../theme/Logo";
import useUserLoggedIn from "../../hooks/useUserLoggedIn";
// import useCart from "../../hooks/useCart";
import { IconChevronDown, IconDiscount2, IconProgressHelp, IconSearch, IconShoppingBag, IconUserHeart } from '@tabler/icons-react';

const DeskHeader = () => {
    // const cart = useCart();
    const userLoggedIn = useUserLoggedIn();

    return (
        <div className="sa-container mx-auto flex gap-10 items-center p-4">
            <Link to="/" className="logo">
                <Logo fill="gradient" />
            </Link>
            <div className="location flex gap-2 items-center justify-start cursor-pointer text-sm">
                <span className="font-bold">Kirti Nagar</span>
                <span className="text-zinc-500 dark:text-slate-400 w-56 overflow-hidden whitespace-nowrap text-ellipsis">G-80, Block G, Kirti Nagar, New Delhi, Delhi, 110015, India</span>
                <IconChevronDown className="text-primary" xmlns="http://www.w3.org/2000/svg" size={18} />
            </div>
            <nav className="flex grow items-center justify-end">
                <ul className="flex items-center gap-12">
                    <li>
                        <Link to="/search" className="group flex items-center gap-2 hover:text-primary">
                            <IconSearch className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={18} stroke={1.8}/>
                            <span>Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/offers" className="group flex items-center gap-2 hover:text-primary">
                            <IconDiscount2 className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={18} stroke={1.8}/>
                            <span>Offers</span>
                            <span className="text-orange-500 text-xs -mt-5 -ml-2 font-bold">NEW</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/help" className="group flex items-center gap-2 hover:text-primary">
                            <IconProgressHelp className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={18} stroke={1.8}/>
                            <span>Help</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account" className="group flex items-center gap-2 hover:text-primary">
                            <IconUserHeart className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={18} stroke={1.5}/>
                            <span>{userLoggedIn ? "Account" : "Sign In"}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="group flex items-center gap-2 hover:text-primary">
                            <div className="relative">
                                <IconShoppingBag className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={18} stroke={1.8}/>
                                {/* <span className="text-xm font-bold text-black dark:text-slate-300 group-hover:text-primary leading-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-1.5">{cart.count}</span> */}
                            </div>
                            <span>Cart</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default DeskHeader