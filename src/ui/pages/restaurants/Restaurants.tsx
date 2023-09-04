import { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import CONSTANTS from "../../../constants";
import RestaurantsShimmer from "./RestaurantsShimmer";
import ErrorComp from "../../components/ErrorComp";
import Page from "../Page";
import TopHeader from "../../components/TopHeader";
import SwiggyNotPresent from "../../components/SwiggyNotPresent";
import TopRestaurant from "./TopRestaurant";

type Api_Card = {
    id: string,
    accessibility: {
        altText: "RESTAURANT" | "INSTAMART",
        altTextCta: string
    },
    imageId: string,
    cloudinaryImageId: string,
    name: string,
    avgRating: number,
    cuisines: string[],
    aggregatedDiscountInfoV3: {
        header: string,
        subHeader: string
    }
}

type PageData = {
    success: boolean,
    isSwiggyPresent: boolean,
    isSwiggyAvailable: boolean,
    banner: Api_Card[] | null,
    mind: Api_Card[] | null,
    topRestro: Api_Card[] | null,
    onlineRestroTitle: Api_Card[] | null,
    onlineRestroFilters: Api_Card[] | null,
}

const Restaurants = () => {
    const { userInfo } = useContext(UserContext);

    const device = useDeviceDetect();

    const API_URL = device.isDesk ? CONSTANTS.API_PAGE_RESTAURANTS.desk : CONSTANTS.API_PAGE_RESTAURANTS.mob;

    // Shimmer
    const [showShimmer, setShowShimmer] = useState<boolean>(true)

    // Error
    const [showError, setShowError] = useState<boolean>(false)

    // Page Data
    const [pageData, setPageData] = useState<PageData>({
        success: false,
        isSwiggyAvailable: true,
        isSwiggyPresent: true,
        banner: null,
        mind: null,
        topRestro: null,
        onlineRestroTitle: null,
        onlineRestroFilters: null
    });

    useEffect(() => {
        async function fetchData() {
            try {

                setShowShimmer(true)

                const url = `${API_URL}lat=${userInfo.location.cityInfo.latitude}&lng=${userInfo.location.cityInfo.longitude}`;
                const response = await fetch(url);
                const responseData = await response.json();

                if (responseData?.data?.cards) {
                    const data = responseData?.data?.cards?.map((card: { card: { card: [] } }) => card?.card?.card);

                    const findCard = (cardIds: string[]) => {
                        for (const cardId of cardIds) {
                            const card = data.find((card: { id: string }) => card.id === cardId);
                            if (card) {
                                return card.gridElements?.infoWithStyle || null;
                            }
                        }
                        return null;
                    };

                    setPageData({
                        success: true,
                        isSwiggyPresent: data.find((d: { id: string }) => d.id === "SwiggyNotPresent_Widget") ? false : true,
                        isSwiggyAvailable: data.find((d: { id: string }) => d.id === "swiggy_not_present") ? false : true,
                        banner: findCard(["topical_banner"])?.info || null,
                        mind: findCard(["whats_on_your_mind"])?.info || null,
                        topRestro: findCard(["top_brands_for_you"])?.restaurants?.map((restro: { info: [] }) => restro?.info) || null,
                        onlineRestroFilters: findCard(["topical_banner"])?.info || null,
                        onlineRestroTitle: findCard(["topical_banner"])?.info || null,
                    });

                    // Hide Shimmer
                    setShowShimmer(false);

                    // Hide Error
                    if (showShimmer) setShowError(false);

                } else {
                    throw new Error(responseData?.data?.statusMessage);
                }
            } catch (error) {
                setShowError(true);
                setShowShimmer(false);
            }
        }

        fetchData();
    }, [userInfo]);


    return (
        <Page pageName="restaurants">
            {/* Sticky Header */}
            <TopHeader className="sticky top-0" />

            <div className="flex flex-col px-4 pt-4">

                <button onClick={() => console.log(pageData)}>Load Page Data</button>

                {/* Shimmer */}
                {showShimmer && <RestaurantsShimmer />}

                {/* Error */}
                {showError && <ErrorComp />}

                {/* If Swiggy Not Present or Available */}
                {!pageData.isSwiggyPresent || !pageData.isSwiggyAvailable && <SwiggyNotPresent heading="Location Unserviceable" />}

                {/* Page Content */}
                {!showShimmer && !showError && pageData.isSwiggyPresent && pageData.isSwiggyAvailable && pageData.success && (
                    <div className="flex flex-col gap-12">

                        {/* Banner */}
                        {pageData.banner && (
                            <div className="flex gap-4 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                {pageData.banner?.map(slide => (
                                    <img key={slide.id} className="w-[80%] rounded-xl" src={CONSTANTS.IMG_CDN + slide.imageId} alt={slide.accessibility?.altText} />
                                ))}
                            </div>
                        )}

                        {/* What's on mind */}
                        {pageData.mind && (
                            <div className="">
                                <p className="font-bold text-lg pb-4">What's on your mind?</p>
                                <div className="grid grid-cols-[repeat(10,80px)] gap-2 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                    {pageData.mind?.map(option => (
                                        <img key={option.id} className="min-w-[80px] w-[22%] rounded-xl" src={CONSTANTS.IMG_CDN + option.imageId} alt={option.accessibility?.altText} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Top Restro */}
                        {pageData.mind && (
                            <div className="">
                                <p className="font-bold text-lg pb-4">Top restaurant chains in {userInfo.location.cityInfo.cityName}</p>
                                <div className="flex gap-2 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                    {pageData.topRestro?.map(restro => (
                                        <TopRestaurant
                                            name={restro.name}
                                            averageRating={restro.avgRating}
                                            cuisines={restro.cuisines}
                                            imageId={restro.cloudinaryImageId}
                                            offerHeader={restro.aggregatedDiscountInfoV3.header}
                                            offerSubHeader={restro.aggregatedDiscountInfoV3.subHeader}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="divider border-b border-zinc-300 dark:border-zinc-800"></div>

                    </div>
                )}
            </div>

        </Page>
    )
}

export default Restaurants