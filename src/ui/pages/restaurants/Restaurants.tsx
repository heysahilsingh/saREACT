import { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import CONSTANTS, { TypeRestroCard } from "../../../constants";
import RestaurantsShimmer from "./RestaurantsShimmer";
import NetworkError from "../../components/Errors/NetworkError";
import Page from "../Page";
import TopHeader from "../../components/TopHeader";
import SwiggyError from "../../components/Errors/SwiggyError";
import { routePaths } from "../../Ui";
import FilterableRestro from "../../components/FilterableRestro/FilterableRestro";
import RestroCard from "../../components/RestroCard";
import { Link } from "react-router-dom";

type PageBanner = {
    id: string,
    entityId: string,
    accessibility: {
        altText: "RESTAURANT" | "INSTAMART",
        altTextCta: string
    },
    imageId: string,
}

type PageData = {
    success: boolean,
    isSwiggyPresent: boolean,
    isSwiggyAvailable: boolean,
    banner: PageBanner[] | undefined,
    mind: PageBanner[] | undefined,
    topRestro: TypeRestroCard[] | undefined,
    onlineRestroTitle: string | undefined,
    onlineRestroFilters: { sortConfigs: [], facetList: [] } | undefined,
    onlineRestroLists: { info: TypeRestroCard }[] | undefined,
}

const Restaurants = () => {
    const { userInfo } = useContext(UserContext);

    const device = useDeviceDetect();

    const API_URL = device.isMob ? CONSTANTS.API_PAGE_RESTAURANTS.mob : CONSTANTS.API_PAGE_RESTAURANTS.desk;

    // Shimmer
    const [showShimmer, setShowShimmer] = useState<boolean>(true)

    // Error
    const [showError, setShowError] = useState<boolean>(false)

    // Page Data
    const [pageData, setPageData] = useState<PageData>({
        success: false,
        isSwiggyAvailable: true,
        isSwiggyPresent: true,
        banner: undefined,
        mind: undefined,
        topRestro: undefined,
        onlineRestroLists: undefined,
        onlineRestroTitle: undefined,
        onlineRestroFilters: undefined
    });

    useEffect(() => {
        const fetchData = async () => {
            try {

                setShowShimmer(true)
                if (showError) setShowError(false)

                const url = `${API_URL}lat=${userInfo.location.cityInfo.latitude}&lng=${userInfo.location.cityInfo.longitude}`;
                const response = await fetch(url);
                const responseData = await response.json();

                if (responseData?.data?.cards) {
                    const data = responseData?.data?.cards?.map((card: { card: { card: [] } }) => card?.card?.card);

                    const findCard = (cardIds: string[]) => {
                        for (const cardId of cardIds) {
                            const card = data.find((card: { id: string }) => card.id === cardId);
                            if (card) {
                                return card.gridElements?.infoWithStyle || undefined;
                            }
                        }
                        return undefined;
                    };

                    // Populate pageData state
                    setPageData({
                        success: true,
                        isSwiggyPresent: data.find((card: { id: string }) => card.id === "SwiggyNotPresent_Widget") ? false : true,
                        isSwiggyAvailable: data.find((card: { id: string }) => card.id === "swiggy_not_present") ? false : true,
                        banner: findCard(["topical_banner"])?.info || undefined,
                        mind: findCard(["whats_on_your_mind"])?.info || undefined,
                        topRestro: findCard(["top_brands_for_you"])?.restaurants?.map((restro: { info: [] }) => restro?.info) || undefined,
                        onlineRestroLists: findCard(["restaurant_grid_listing"])?.restaurants || undefined,
                        onlineRestroFilters: data.find((card: { facetList: [] }) => card.facetList) || undefined,
                        onlineRestroTitle: data.find((card: { id: string }) => card.id === "popular_restaurants_title")?.title || undefined,
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
            {!device.isDesk && <TopHeader className="sticky top-0" />}

            <div className="flex flex-col px-4 pt-4">

                {/* Shimmer */}
                {showShimmer && <RestaurantsShimmer />}

                {/* Error */}
                {showError && <NetworkError />}

                {/* If Swiggy Not Present or Available */}
                {(!pageData.isSwiggyPresent || !pageData.isSwiggyAvailable) && (
                    <SwiggyError
                        heading="Location unserviceable"
                        caption="We don't have any services here till now. Try changing the location."
                        showButton={true}
                        buttonText="Change Location"
                        buttonOnClick={() => console.log("object")}
                    />
                )}

                {/* Page Content */}
                {(!showShimmer && !showError && pageData.isSwiggyPresent && pageData.isSwiggyAvailable && pageData.success) && (
                    <div className="flex flex-col gap-10 lg:gap-14">
                        {/* Banner */}
                        {pageData.banner && (
                            <div className="flex gap-4 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                {pageData.banner?.map(slide => {
                                    const link = `${routePaths.collections}?collection_id=${slide.entityId}`;

                                    return (
                                        <div key={slide?.id} className="min-w-[80%] lg:min-w-[40%] rounded-[25px]">
                                            <Link to={link}>
                                                <img className="bg-zinc-200 dark:bg-zinc-900" src={CONSTANTS.IMG_CDN + slide?.imageId} alt={slide?.accessibility?.altText} />
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {/* What's on mind */}
                        {pageData.mind && (
                            <div>
                                <p className="font-bold text-lg pb-4 lg:pb-8 lg:text-2xl">What's on your mind?</p>
                                <div className={`grid grid-cols-[repeat(${pageData.mind.length / 2 < 5 ? "5" : pageData.mind.length / 2},80px)] gap-2 items-center lg:flex no-scrollbar overflow-x-scroll overflow-y-hidden`}>
                                    {pageData.mind?.map(option => {
                                        const link = `${routePaths.collections}?collection_id=${option.id}`;

                                        return (
                                            <div key={option?.id} className="min-w-[80px] w-[22%] lg:w-[14.5%] lg:min-w-[14.5%] rounded-xl">
                                                <Link to={link}>
                                                    <img className="bg-zinc-200 dark:bg-zinc-900" src={CONSTANTS.IMG_CDN + option?.imageId} alt={option?.accessibility?.altText} />
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Top Restro */}
                        {pageData.topRestro && (
                            <>
                                <div className="divider -mt-[10px] border-b border-zinc-300 dark:border-zinc-800"></div>
                                <div>
                                    <p className="font-bold text-lg pb-4 lg:pb-8 lg:text-2xl">Top restaurant chains in {userInfo.location.cityInfo.cityName}</p>
                                    <div className="flex gap-[16px] items-start no-scrollbar overflow-x-scroll overflow-y-hidden">
                                        {pageData.topRestro?.map(restro => {

                                            const link = routePaths.restaurants + "/" + [restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

                                            return (
                                                <RestroCard
                                                    key={restro.id}
                                                    name={restro?.name}
                                                    link={link}
                                                    avgRating={restro?.avgRating}
                                                    cuisines={restro?.cuisines}
                                                    areaName={restro?.areaName}
                                                    imageId={restro?.cloudinaryImageId}
                                                    offerHeader={restro?.aggregatedDiscountInfoV3?.header}
                                                    offerSubHeader={restro?.aggregatedDiscountInfoV3?.subHeader}
                                                    className="min-w-[35%] lg:min-w-[27%] "
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Restaurants in Your City */}
                        {(pageData.onlineRestroTitle && pageData.onlineRestroFilters && pageData.onlineRestroLists) && (
                            <>
                                <div className="divider -mt-[10px] border-b border-zinc-300 dark:border-zinc-800"></div>
                                <div>
                                    {/* Heading */}
                                    <p className="leading-[120%] title font-bold text-lg lg:text-2xl">{pageData?.onlineRestroTitle}</p>

                                    <FilterableRestro
                                        filters={pageData.onlineRestroFilters}
                                        restros={pageData.onlineRestroLists}
                                        filtersClasses="filters sticky lg:top-0 top-[64px]"
                                        restrosListLoadType="INFINITE"
                                    />
                                </div>
                            </>
                        )}

                    </div>
                )}
            </div>

        </Page>
    )
}

export default Restaurants