import useDeviceDetect from "../../hooks/useDeviceDetect";
import DeskHeader from "./DeskHeader";
import MobHeader from "./MobHeader";

const Header = () => {
    const device = useDeviceDetect();

    return (
        <header className="header z-50 relative">
            {device?.isDesk ? <DeskHeader /> : <MobHeader />}
        </header>
    )
};

export default Header;
