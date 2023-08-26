import useDeviceDetect from "../../hooks/useDeviceDetect";
import DeskFooter from "./DeskFooter";
import MobFooter from "./MobFooter";

const Footer = () => {
    const device = useDeviceDetect();

    return (
        <footer className="footer">
            {device?.desk ? <DeskFooter /> : <MobFooter />}
        </footer>
    )
}

export default Footer