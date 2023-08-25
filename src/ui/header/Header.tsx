import useDeviceDetect from "../../hooks/useDeviceDetect";
import DeskHeader from "./DeskHeader";
import MobHeader from "./MobHeader";

const Header = () => {
    const device = useDeviceDetect();

    return (
        <header className="header shadow-[0_15px_40px_-20px_rgba(40,44,63,.3)] bg-white">
            {(device === "desk") ? <DeskHeader /> : <MobHeader />}
        </header>
    )
};

export default Header;
