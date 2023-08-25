import useDeviceDetection from "../../hooks/useDeviceDetection";
import DeskFooter from "./DeskFooter";
import MobFooter from "./MobFooter";

const Footer = () => {
    const device = useDeviceDetection();

    return (device === "desk") ? <DeskFooter /> : <MobFooter />
}

export default Footer