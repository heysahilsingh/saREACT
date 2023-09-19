import { useContext, useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import RestaurantSearch from "../../components/Search/RestaurantSearch/RestaurantSeacrh";
import TopHeader from "../../components/TopHeader";
import Page from "../Page";
import UserContext from "../../../context/UserContext";
import CONSTANTS from "../../../constants";
import NetworkError from "../../components/Errors/NetworkError";

const Offers = () => {

    const device = useDeviceDetect();

    const [showError, setShowError] = useState<boolean>(false)
    const [showShimmer, setShowShimmer] = useState<boolean>(false)

    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng) {
            const fetchAPIData = async () => {
                try {
                    if(!showShimmer) setShowShimmer(true)
                    if(showError) setShowError(false)

                    const URL = CONSTANTS.API_GET_RESTROS.getUrl(userLat, userLng)

                    const requestBody = {
                        "facets": {
                            "isVeg": [
                                {
                                    "value": "isVegfacetquery3"
                                }
                            ]
                        },
                        "sortAttribute": "relevance",
                        "isFiltered": true,
                        "queryId": "seo-data-9d6953e8-8f01-4cf8-abe5-6fc83f97b037",
                        "seoParams": {
                            "apiName": "CityPage",
                            "brandId": "",
                            "seoUrl": "www.swiggy.com/offers-near-me",
                            "pageType": "NEAR_ME_OFFERS_PAGE"
                        },
                        "widgetOffset": {
                            "Restaurant_Group_WebView_PB_Theme": "",
                            "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": "13",
                            "inlineFacetFilter": "",
                            "restaurantCountWidget": ""
                        },
                        "nextOffset": "CKFAELQ4KICox+bAnKx3MNMQOAQ="
                    }

                    // Request options
                    const requestOptions = {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(requestBody)
                    };

                    // Send the request
                    const response = await fetch(URL, requestOptions);
                    const responseData = await response.json();

                    const responseNewRestros = responseData?.data?.cards?.find((value: { card: { card: { id: string } } }) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: { info: object }) => restro?.info);

                    const responseNewFilters = responseData?.data?.cards?.find((value: { card: { card: { facetList: [] } } }) => value.card?.card?.facetList)?.card?.card;


                    if (responseNewRestros && responseNewFilters) {
                        // Update restros state
                        console.log(responseData);

                        setShowShimmer(false)

                    } else {
                        throw new Error(responseData?.data?.statusMessage)
                    }

                } catch (error) {
                    setShowError(true);
                    console.warn("Error:", error);
                }
            }

            fetchAPIData()
        }

    }, [userInfo, device]);


    return (
        <Page pageName="offers">
            {/* Error */}
            {showError && <NetworkError />}

            {/* Page Data */}
            {!showError && (
                <>
                    {!device.isDesk && <TopHeader className="sticky top-0" />}

                    <div className="flex flex-col gap-2 px-4 pt-4">
                        <RestaurantSearch />
                        <h1 className="font-bold text-lg">Restaurants With Great Offers Near Me</h1>
                    </div>
                </>
            )}
        </Page>
    )
}

export default Offers