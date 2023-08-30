import useDeviceDetect from "../../hooks/useDeviceDetect";
import DeskHeader from "./DeskHeader";
import MobHeader from "./MobHeader";

const Header = () => {
    const device = useDeviceDetect();

    return (
        <header className="header">
            {device?.isDesk ? <DeskHeader /> : <MobHeader />}
        </header>
    )
};

export default Header;
