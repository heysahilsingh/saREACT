import { NavLink } from "react-router-dom";
import Logo from "../../theme/Logo";
import { IconChevronDown, IconDiscount2, IconProgressHelp, IconSearch, IconShoppingBag, IconUserHeart } from '@tabler/icons-react';
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { routePaths } from "../Ui";
import LightBox from "../components/LightBox";
import LocationSearch from "../components/LocationSearch/LocationSearch";

const DeskHeader = () => {
    const { userInfo } = useContext(UserContext);

    const [openLightBox, setOpenLightBox] = useState<boolean>(false);

    return (
        <>
            {openLightBox && (
                <LightBox 
                isOpen={openLightBox}
                onCLose={() => setOpenLightBox(false)}
                wrapperClasses="mr-auto ml-0 relative z-20 bg-white h-full w-full p-3 pt-16 lg:w-[700px] lg:p-10 dark:bg-neutral-900"
                closeBtnClasses ="top-3 right-3 lg:top-8 lg:right-8 text-black dark:text-zinc-400 lg:text-white"
                >
                    <LocationSearch onSelect={() => setOpenLightBox(false)} screen="desk" />
                </LightBox>
            )}

            <div className="desk shadow-[0_15px_40px_-20px_rgba(40,44,63,.3)] bg-white text-black dark:shadow-[0_15px_40px_-20px_rgba(0,0,0,1)] dark:bg-neutral-950 dark:text-slate-200 dark:border-b dark:border-neutral-800">
                <div className="sa-container mx-auto flex gap-10 items-center p-4">
                    <NavLink to={routePaths.home} className="logo">
                        <Logo fill="gradient" className="w-8" />
                    </NavLink>
                    <div onClick={() => setOpenLightBox(true)} className="location flex gap-2 items-center justify-start cursor-pointer text-sm">
                        <span className="font-bold max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">{userInfo.location?.cityInfo?.main_text || "Select Location"}</span>
                        {userInfo.location?.cityInfo?.secondary_text &&
                            <span className="text-zinc-500 dark:text-slate-400 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">{userInfo.location?.cityInfo?.secondary_text}</span>
                        }
                        <IconChevronDown className="text-primary" xmlns="http://www.w3.org/2000/svg" size={18} />
                    </div>
                    <nav className="flex grow items-center justify-end">
                        <ul className="flex items-center gap-12">
                            <li>
                                <NavLink to={routePaths.search} className="group flex items-center gap-2 hover:text-primary">
                                    <IconSearch className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={18} stroke={1.8} />
                                    <span>Search</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routePaths.offers} className="group flex items-center gap-2 hover:text-primary">
                                    <IconDiscount2 className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={18} stroke={1.8} />
                                    <span>Offers</span>
                                    <span className="text-orange-500 text-xs -mt-5 -ml-2 font-bold">NEW</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routePaths.help} className="group flex items-center gap-2 hover:text-primary">
                                    <IconProgressHelp className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={20} stroke={1.8} />
                                    <span>Help</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routePaths.account} className="group flex items-center gap-2 hover:text-primary">
                                    <IconUserHeart className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={20} stroke={1.8} />
                                    <span>{userInfo.isLoggedIn ? "Account" : "Sign In"}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routePaths.cart} className="group flex items-center gap-2 hover:text-primary">
                                    <div className="relative flex items-center">
                                        <IconShoppingBag className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={20} stroke={1.8} />
                                        <span className="text-xs text-white w-4 h-4 rounded-full flex items-center justify-center bg-red-500 border-r-[50%] leading-none -ml-3 -mt-2">{userInfo.cart?.cartItemsCount}</span>
                                    </div>
                                    <span>Cart</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default DeskHeader