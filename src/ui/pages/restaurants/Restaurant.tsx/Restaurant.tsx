import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import UserContext from "../../../../context/UserContext";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import CONSTANTS from "../../../../constants";
import Page from "../../Page";
import RestaurantShimmer from "./RestaurantShimmer";
import ErrorComp from "../../../components/NetworkError";

const Restaurant = () => {
    const { userInfo } = useContext(UserContext);

    const device = useDeviceDetect();

    const slug = useParams()
    const restroId = slug?.restaurantSlug?.split("-").slice(-1)[0];

    const userGeoLocation = "lat=" + userInfo?.location?.cityInfo?.latitude + "&lng=" + userInfo?.location?.cityInfo?.longitude;

    const API_URL = device.isDesk ? CONSTANTS.API_PAGE_RESTAURANT.desk : CONSTANTS.API_PAGE_RESTAURANT.mob;

    // Shimmer
    const [showShimmer, setShowShimmer] = useState<boolean>(true)

    // Error
    const [showError, setShowError] = useState<boolean>(false)

    // Page Data
    const [pageData, setPageData] = useState<[]>([]);

    // API Call
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(API_URL + userGeoLocation + "&restaurantId=" + restroId);
                const responseData = await response.json();

                if (responseData?.data?.cards) {
                    // Set Data
                    setPageData(responseData?.data?.cards)

                    // Hide Shimmer
                    setShowShimmer(false)

                    // Hide Error
                    if (showShimmer) setShowError(false)

                } else {
                    throw new Error(responseData?.statusMessage);
                }

            } catch (error) {
                setShowError(true)
                setShowShimmer(false)
            }
        }

        fetchData();
    }, [userInfo]);


    return (
        <Page pageName="restaurant">
            <div className="flex flex-col px-4 pt-4">
                {/* Shimmer */}
                {showShimmer && <RestaurantShimmer />}

                {/* Error */}
                {showError && <ErrorComp />}

                {/* Page Content */}
                {!showShimmer && !showError && pageData.length > 0 && (
                    <div>Data has been loaded successfully.</div>
                )}
            </div>
        </Page>
    )
}

export default Restaurant