import { useContext, useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import CONSTANTS from "../../../constants";
import UserContext from "../../../context/UserContext";
import FilterableRestro from "../../components/FilterableRestro/FilterableRestro"

const Instamart = () => {

    const [restroFilter, setRestroFilter] = useState(null);
    const [restrosList, setRestrosList] = useState(null);
    const [nextOffset, setNextOffset] = useState("10");

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

                    setRestroFilter(data.find((d: { facetList: object, id: string }) => d.facetList))
                    setRestrosList(data.find((d: { facetList: object, id: string }) => d.id === "restaurant_grid_listing")?.gridElements?.infoWithStyle?.restaurants)
                    setNextOffset(data.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo)

                } else {
                    throw new Error(responseData?.data?.statusMessage);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [userInfo]);


    if (restroFilter && restrosList) {
        return (
            <div>
                <FilterableRestro
                    filters={restroFilter}
                    restros={restrosList}
                    restrosListLoadType="ON_CLICK"
                />
            </div>
        )
    }
}

export default Instamart