import { useContext, useEffect, useState } from "react";
import RestroFIlters from "../../components/RestroFilters/RestroFilters"
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import CONSTANTS from "../../../constants";
import UserContext from "../../../context/UserContext";

const Instamart = () => {

    const [data, setData] = useState(null);

    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();
    const API_URL = device.isMob ? CONSTANTS.API_PAGE_RESTAURANTS.mob : CONSTANTS.API_PAGE_RESTAURANTS.desk;

    useEffect(() => {
        async function fetchData() {
            try {

                const url = `${API_URL}lat=${userInfo.location.cityInfo.latitude}&lng=${userInfo.location.cityInfo.longitude}`;
                const response = await fetch(url);
                const responseData = await response.json();

                if (responseData?.data?.cards) {
                    const data = responseData?.data?.cards?.map((card: { card: { card: [] } }) => card?.card?.card);

                    setData(data.find(d => d.facetList))

                } else {
                    throw new Error(responseData?.data?.statusMessage);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [userInfo]);


    return (
        <div>
            <RestroFIlters data={data} />
        </div>
    )
}

export default Instamart