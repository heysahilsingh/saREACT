import useDeviceDetect from "../../hooks/useDeviceDetect";
import DeskHeader from "./DeskHeader";
import MobHeader from "./MobHeader";

const Header = () => {
    const device = useDeviceDetect();

    return (
        <header className="header shadow-[0_15px_40px_-20px_rgba(40,44,63,.3)] bg-white text-black dark:shadow-[0_15px_40px_-20px_rgba(0,0,0,1)] dark:bg-neutral-950 dark:text-slate-200 dark:border-b dark:border-neutral-800">
            {device?.isDesk ? <DeskHeader /> : <MobHeader />}
        </header>
    )
};

export default Header;
