import { NavLink } from "react-router-dom";
import Logo from "../../theme/Logo";
import { IconSoup, IconBasket, IconSearch, IconUserHeart } from '@tabler/icons-react';
import { routePaths } from "../Ui";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const MobHeader = () => {

    const { userInfo } = useContext(UserContext);

    return (
        <div className="mob fixed bottom-0 left-0 z-50 px-5 pt-3 pb-2 w-full max-w-full bg-white text-zinc-500 border-t dark:bg-neutral-950 dark:border-neutral-800">
            <nav>
                <ul className="uppercase font-semibold text-[10px] flex items-center justify-between gap-4">
                    <li>
                        <NavLink to={routePaths.home} className="group hover:text-primary flex flex-col items-center justify-center gap-1">
                            <Logo className="w-4 text-transparent stroke-zinc-500 dark:stroke-slate-400 group-hover:stroke-primary stroke-[2.8px] group-hover:stroke-[4px]" />
                            <span>Swiggy</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routePaths.restaurants} className="group hover:text-primary flex flex-col items-center justify-center gap-[2px]">
                            <IconSoup size={24} className="stroke-[1.5px] group-hover:stroke-[2.5px]" />
                            <span>Food</span>
                        </NavLink>
                    </li>
                    {userInfo.location.isInstamartEnabled && (
                        <li>
                            <NavLink to={routePaths.Instamart} className="group hover:text-primary flex flex-col items-center justify-center gap-[2px]">
                                <IconBasket size={24} className="stroke-[1.5px] group-hover:stroke-[2.5px]" />
                                <span>Instamart</span>
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to={routePaths.search} className="group hover:text-primary flex flex-col items-center justify-center gap-[2px]">
                            <IconSearch size={24} className="stroke-[1.5px] group-hover:stroke-[2.5px]" />
                            <span>Search</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routePaths.account} className="group hover:text-primary flex flex-col items-center justify-center gap-[2px]">
                            <IconUserHeart size={24} className="stroke-[1.5px] group-hover:stroke-[2.5px]" />
                            <span>Account</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MobHeader