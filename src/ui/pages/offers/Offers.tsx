import { useContext, useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import RestaurantSearch from "../../components/Search/RestaurantSearch/RestaurantSeacrh";
import TopHeader from "../../components/TopHeader";
import Page from "../Page";
import UserContext from "../../../context/UserContext";
import CONSTANTS from "../../../constants";
import NetworkError from "../../components/Errors/NetworkError";
import FilterableRestro from "../../components/FilterableRestro/FilterableRestro";
import OffersShimmer from "./OffersShimmer";

const Offers = () => {

    const device = useDeviceDetect();
    const { userInfo } = useContext(UserContext);

    const [showError, setShowError] = useState<boolean>(false)
    const [showShimmer, setShowShimmer] = useState<boolean>(true)

    const [restros, setRestros] = useState(undefined);
    const [filters, setFilters] = useState(undefined);

    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng) {
            const fetchAPIData = async () => {
                try {
                    if (!showShimmer) setShowShimmer(true)
                    if (showError) setShowError(false)

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
                        },
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

                    const responseNewFilters = responseData.data.success.cards.map((card: { card: { card: object } }) => card.card.card).find((card: { facetList: object }) => card.facetList);

                    const responseNewRestros = responseData.data.success.cards.map((card: { card: { card: object } }) => card.card.card).find((card: { id: string }) => card.id === "restaurant_grid_listing")?.gridElements?.infoWithStyle?.restaurants;

                    if (responseNewRestros && responseNewFilters) {
                        setRestros(responseNewRestros)
                        setFilters(responseNewFilters)

                        setShowShimmer(false)

                    } else {
                        throw new Error(responseData?.data?.statusMessage)
                    }

                } catch (error) {
                    if(showShimmer) setShowShimmer(false);
                    setShowError(true);
                }
            }

            fetchAPIData()
        }

    }, [userInfo, device]);


    return (
        <Page pageName="offers">
            {/* Error */}
            {(showError && !showShimmer) && <NetworkError />}

            {/* Shimmer */}
            {showShimmer && <OffersShimmer />}

            {/* Page Data */}
            {(!showError && !showShimmer) && (
                <>
                    {!device.isDesk && <TopHeader />}

                    {restros && filters && (
                        <div className="flex flex-col gap-6 px-4 pt-4">
                            <RestaurantSearch />
                            <h1 className="font-bold text-xl lg:text-2xl">Restaurants With Great Offers Near Me</h1>

                            <FilterableRestro
                                filters={filters}
                                restros={restros}
                                restrosListLoadType="ON_CLICK"
                                filtersClasses="sticky lg:top-0 top-[50px]"
                            />
                        </div>
                    )}
                </>
            )}
        </Page>
    )
}

export default Offers