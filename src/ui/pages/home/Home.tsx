import useDeviceDetect from "../../../hooks/useDeviceDetect";
import TopHeader from "../../components/TopHeader"

const Home = () => {
    const device = useDeviceDetect();

    return (
        <>
            {!device?.isDesk && <TopHeader className="sticky top-0" />}
        </>
    )
}

export default Home