import useDeviceDetect from "../../hooks/useDeviceDetect";
import DeskHeader from "./DeskHeader";
import MobHeader from "./MobHeader";

const Header = () => {
    const device = useDeviceDetect();

    console.log(device);

    return (
        <header className="header">
            {device?.isDesk ? <DeskHeader /> : <MobHeader />}
        </header>
    )
};

export default Header;
