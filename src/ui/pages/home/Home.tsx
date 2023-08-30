import useDeviceDetect from "../../../hooks/useDeviceDetect";
import LocationSearch from "../../components/LocationSearch/LocationSearch"
import TopHeader from "../../components/TopHeader"

const Home = () => {
    const device = useDeviceDetect();

    return (
        <>
            {!device?.isDesk && <TopHeader className="sticky top-0" />}
            <div>Home Pagdsdsdse</div>
            <LocationSearch screen="mob" />
            {/* <LocationSearch screen="desk" /> */}
        </>
    )
}

export default Home