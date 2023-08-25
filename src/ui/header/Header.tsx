import useDeviceDetection from "../../hooks/useDeviceDetection";
import DeskHeader from "./DeskHeader";
import MobHeader from "./MobHeader";

const Header = () => {
    const device = useDeviceDetection();

    return (device === "desk") ? <DeskHeader /> : <MobHeader />
};

export default Header;
