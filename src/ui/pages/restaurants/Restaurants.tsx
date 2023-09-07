import { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import CONSTANTS from "../../../constants";
import RestaurantsShimmer from "./RestaurantsShimmer";
import ErrorComp from "../../components/ErrorComp";
import Page from "../Page";
import TopHeader from "../../components/TopHeader";
import TopRestaurant from "./TopRestaurant";
import SwiggyError from "../../components/SwiggyError";
import { routePaths } from "../../Ui";
import FiltersButton from "./FiltersButton";
import { IconAdjustmentsHorizontal, IconChevronDown } from '@tabler/icons-react';

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
    areaName: string,
    locality: string,
    aggregatedDiscountInfoV3: {
        header: string,
        subHeader: string
    },
    info: Api_Card,
    facetInfo: [{
        openFilter: boolean,
        label: string,
        id: string
    }]
}

type PageData = {
    success: boolean,
    isSwiggyPresent: boolean,
    isSwiggyAvailable: boolean,
    banner: Api_Card[] | null,
    mind: Api_Card[] | null,
    topRestro: Api_Card[] | null,
    onlineRestroLists: Api_Card[] | null,
    onlineRestroTitle: string | null,
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
        onlineRestroLists: null,
        onlineRestroTitle: null,
        onlineRestroFilters: null
    });

    // Filters
    const [activeFilters, setActiveFilters] = useState<number>(0);
    const [sortFilterSelected, setSortFilterSelected] = useState<string>("Sort by");
    const [showSortFilterOptions, setShowSortFilterOptions] = useState<boolean>(false);
    const filterClickHandle = (status: number) => setActiveFilters(prev => prev + status)

    useEffect(() => {
        async function fetchData() {
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
                                return card.gridElements?.infoWithStyle || null;
                            }
                        }
                        return null;
                    };

                    setPageData({
                        success: true,
                        isSwiggyPresent: data.find((card: { id: string }) => card.id === "SwiggyNotPresent_Widget") ? false : true,
                        isSwiggyAvailable: data.find((card: { id: string }) => card.id === "swiggy_not_present") ? false : true,
                        banner: findCard(["topical_banner"])?.info || null,
                        mind: findCard(["whats_on_your_mind"])?.info || null,
                        topRestro: findCard(["top_brands_for_you"])?.restaurants?.map((restro: { info: [] }) => restro?.info) || null,
                        onlineRestroLists: findCard(["restaurant_grid_listing"])?.restaurants || null,
                        onlineRestroFilters: data.find((card: { facetList: [] }) => card.facetList)?.facetList || null,
                        onlineRestroTitle: data.find((card: { id: string }) => card.id === "popular_restaurants_title")?.title || null,
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
                {!pageData.isSwiggyPresent || !pageData.isSwiggyAvailable && (
                    <SwiggyError
                        heading="Location unserviceable"
                        caption="We don't have any services here till now. Try changing the location."
                        showButton={true}
                        buttonText="Change Location"
                        buttonOnClick={() => console.log("object")}
                    />
                )}

                {/* Page Content */}
                {!showShimmer && !showError && pageData.isSwiggyPresent && pageData.isSwiggyAvailable && pageData.success && (
                    <div className="flex flex-col gap-10">

                        {/* Banner */}
                        {pageData.banner && (
                            <div className="flex gap-4 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                {pageData.banner?.map(slide => (
                                    <img key={slide?.id} className="w-[80%] rounded-xl" src={CONSTANTS.IMG_CDN + slide?.imageId} alt={slide?.accessibility?.altText} />
                                ))}
                            </div>
                        )}

                        {/* What's on mind */}
                        {pageData.mind && (
                            <div className="">
                                <p className="font-bold text-lg pb-4">What's on your mind?</p>
                                <div className="grid grid-cols-[repeat(10,80px)] gap-2 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                    {pageData.mind?.map(option => (
                                        <img key={option?.id} className="min-w-[80px] w-[22%] rounded-xl" src={CONSTANTS.IMG_CDN + option?.imageId} alt={option?.accessibility?.altText} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="divider -mt-[10px] border-b border-zinc-300 dark:border-zinc-800"></div>

                        {/* Top Restro */}
                        {pageData.mind && (
                            <div className="">
                                <p className="font-bold text-lg pb-4">Top restaurant chains in {userInfo.location.cityInfo.cityName}</p>
                                <div className="flex gap-[16px] items-start no-scrollbar overflow-x-scroll overflow-y-hidden">
                                    {pageData.topRestro?.map(restro => {

                                        const link = routePaths.restaurants + "/" + [restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

                                        return (
                                            <TopRestaurant
                                                key={restro.id}
                                                name={restro?.name}
                                                link={link}
                                                averageRating={restro?.avgRating}
                                                cuisines={restro?.cuisines}
                                                areaName={restro?.areaName}
                                                imageId={restro?.cloudinaryImageId}
                                                offerHeader={restro?.aggregatedDiscountInfoV3?.header}
                                                offerSubHeader={restro?.aggregatedDiscountInfoV3?.subHeader}
                                                className="min-w-[35%]"
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="divider -mt-[10px] border-b border-zinc-300 dark:border-zinc-800"></div>

                        {/* Online Restaurants */}
                        {pageData.onlineRestroTitle && pageData.onlineRestroLists && (
                            <div className="">
                                {/* Heading */}
                                <p className="title font-bold text-lg">{pageData?.onlineRestroTitle}</p>
                                {/* Filters */}
                                <div className="filters flex-wrap flex gap-2 mt-3 mb-6 items-center overflow-x-scroll overflow-y-hidden no-scrollbar">

                                    <FiltersButton disableClick={true} className={activeFilters > 0 ? "border-zinc-400 bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-600" : ""}>
                                        {activeFilters > 0 && (
                                            <div className="active-filters bg-primary rounded-full w-4 h-4 relative">
                                                <span className="text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 leading-none text-white">{activeFilters}</span>
                                            </div>
                                        )}
                                        Filters
                                        <IconAdjustmentsHorizontal className="text-zinc-700 dark:text-zinc-400" size={15} />
                                    </FiltersButton>

                                    <FiltersButton disableClick={true} className="relative">
                                        {sortFilterSelected}

                                        <div className="sa absolute top-0 left-0 w-full rounded-[15px] border-2 border-zinc-200 bg-white dark:border-zinc-800">
                                            <div className="flex flex-col gap-2 py-3 px-2">
                                                <div className="flex justify-between items-center gap-3">
                                                    <label htmlFor="">Relavance</label>
                                                    <input type="radio" name="" id="" />
                                                </div>
                                            </div>
                                            <button className="p-4 text-primary">Apply</button>
                                        </div>

                                        <IconChevronDown className="text-zinc-700 dark:text-zinc-400" size={16} />
                                    </FiltersButton>

                                    {pageData?.onlineRestroFilters
                                        ?.filter(filter => filter.id !== "catalog_cuisines")
                                        .map(filter => filter.facetInfo?.find(value => value?.openFilter === true)).map(filter => {
                                            return (
                                                <FiltersButton
                                                    onSelect={() => filterClickHandle(1)}
                                                    onDeSelect={() => filterClickHandle(-1)}
                                                    key={filter?.id}
                                                >
                                                    {filter?.label}
                                                </FiltersButton>
                                            )
                                        })
                                    }

                                </div>

                                {/* Restaurants */}
                                <div className="lists grid grid-cols-2 gap-x-4 gap-y-8">
                                    {pageData.onlineRestroLists?.map((restro: Api_Card) => {

                                        const link = routePaths.restaurants + "/" + [restro.info?.name, restro.info?.locality, restro.info?.areaName, userInfo.location.cityInfo.cityName, restro.info?.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

                                        return (
                                            <TopRestaurant
                                                key={restro?.info?.id}
                                                name={restro?.info?.name}
                                                link={link}
                                                averageRating={restro?.info?.avgRating}
                                                cuisines={restro?.info?.cuisines}
                                                areaName={restro?.info?.areaName}
                                                imageId={restro?.info?.cloudinaryImageId}
                                                offerHeader={restro?.info?.aggregatedDiscountInfoV3?.header}
                                                offerSubHeader={restro?.info?.aggregatedDiscountInfoV3?.subHeader}
                                                className="min-w-[35%]"
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>

        </Page>
    )
}

export default Restaurants