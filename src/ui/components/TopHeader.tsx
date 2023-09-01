import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { routePaths } from "../Ui";
import { Link } from "react-router-dom";
import { IconDiscount2 } from "@tabler/icons-react";
import LightBox from "../components/LightBox";
import LocationSearch from "../components/LocationSearch/LocationSearch";

interface TopHeaderProps {
    className?: string
}


const TopHeader = (props: TopHeaderProps) => {
    const { userInfo } = useContext(UserContext);

    const [openLightBox, setOpenLightBox] = useState<boolean>(false);


    return (
        <>
            {openLightBox && (
                <LightBox isOpen={openLightBox} onCLose={() => setOpenLightBox(false)}>
                    <LocationSearch onSelect={() => setOpenLightBox(false)} screen="mob" />
                </LightBox>
            )}

            <div className={props?.className + " z-50 bg-white text-black dark:bg-neutral-950 dark:text-slate-200 border-b dark:border-neutral-800 flex items-center justify-between gap-4 px-4 py-2"}>
                <div onClick={() => setOpenLightBox(true)} className="location flex flex-col justify-start items-start gap-0 cursor-pointer text-sm">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            <path d="M11.87 21.48a1.992 1.992 0 0 1 -1.283 -.58l-4.244 -4.243a8 8 0 1 1 13.355 -3.474" />
                            <path d="M15 19l2 2l4 -4" className="stroke-primary" />
                        </svg>
                        <span className="font-bold text-lg max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">{userInfo.location?.cityInfo?.main_text || "Select Location"}</span>
                    </div>
                    {userInfo.location?.cityInfo?.secondary_text &&
                        <span className="text-zinc-500 dark:text-slate-400 max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">{userInfo.location?.cityInfo?.secondary_text}</span>
                    }
                </div>
                <Link to={routePaths.offers} className="font-semibold group flex items-center gap-2 hover:text-primary">
                    <IconDiscount2 className="text-zinc-600 dark:text-slate-300 group-hover:text-primary" size={25} stroke={1} />
                    <span className="dark:text-slate-300">Offers</span>
                </Link>
            </div>
        </>
    )
}

export default TopHeader