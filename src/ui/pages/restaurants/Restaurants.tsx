import { useContext, useState, useEffect, FormEvent } from "react";
import UserContext from "../../../context/UserContext";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import CONSTANTS from "../../../constants";
import RestaurantsShimmer from "./RestaurantsShimmer";
import NetworkError from "../../components/NetworkError";
import Page from "../Page";
import TopHeader from "../../components/TopHeader";
import TopRestaurant from "./TopRestaurant";
import SwiggyError from "../../components/SwiggyError";
import { routePaths } from "../../Ui";
import FiltersButton from "./FiltersButton";
import { IconAdjustmentsHorizontal, IconChevronDown } from '@tabler/icons-react';
import LightBox from "../../components/LightBox";
import Filters from "./Filters";
import OnlineRestroShimmer from "./OnlineRestroShimmer";

export type Api_Card = {
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
    }],
    facetList: string,
    key: string,
    title: string,
    selected: boolean
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
    onlineRestroFilters: { facetList: Api_Card[], sortConfigs: Api_Card[] } | null,
}

type OnlineRestroData = {
    onlineRestroLists: Api_Card[] | null,
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
        banner: null,
        mind: null,
        topRestro: null,
        onlineRestroLists: null,
        onlineRestroTitle: null,
        onlineRestroFilters: null
    });
    const [onlineRestroData, setOnlineRestroData] = useState<Partial<OnlineRestroData>>({
        onlineRestroLists: null,
    })

    // Filters
    const filterAPICall = () => {
        console.log("Filtered Restro API Called")
        setOnlineRestroData({})

        setTimeout(() => {
            setOnlineRestroData({
                onlineRestroLists: pageData?.onlineRestroLists
            })
        }, 1000)
    };

    const [showFilters, setShowFilters] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

    const [sortCount, setSortCount] = useState(0);
    const [sortFilterText, setSortFilterText] = useState<string>("Sort by");
    const [showSortFilterContainer, setShowSortFilterContainer] = useState<boolean>(false);
    const [sortFilterSelectedOption, setSortFilterSelectedOption] = useState({
        id: "relevance",
        value: "Relevance (Default)"
    });

    const sortFilterSubmission = (e: FormEvent) => {
        e.preventDefault();

        if (sortFilterSelectedOption.id !== "relevance") {
            setSortFilterText(sortFilterSelectedOption.value);
            if (sortCount === 0) {
                setSortCount(1)
                filterClickHandle(1);
            }
        }
        else {
            setSortFilterText("Sort by");
            setSortCount(0)
            if (sortCount === 1) filterClickHandle(-1)
        }

        setShowSortFilterContainer(false);
        // Call Updattion API
        filterAPICall()
    }

    const filterClickHandle = (count: number) => {
        setActiveFiltersCount(prev => prev + count),

            // Call Updattion API
            filterAPICall()
    }

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
                        onlineRestroFilters: data.find((card: { facetList: [] }) => card.facetList) || null,
                        onlineRestroTitle: data.find((card: { id: string }) => card.id === "popular_restaurants_title")?.title || null,
                    });

                    setOnlineRestroData({
                        onlineRestroLists: findCard(["restaurant_grid_listing"])?.restaurants || null,
                    })

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

                <button onClick={() => console.log(pageData)}>Load Page Data</button>

                {/* Shimmer */}
                {showShimmer && <RestaurantsShimmer />}

                {/* Error */}
                {showError && <NetworkError />}

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

                {/* LightBox Filter Options */}
                {showFilters && pageData?.onlineRestroFilters?.facetList && (
                    <LightBox
                        onCLose={() => setShowFilters(false)}
                        wrapperClasses="flex items-center justify-center z-20 mt-auto mb-0 max-h-[70vh] w-full rounded p-10 bg-white dark:bg-neutral-950"
                        closeBtnClasses="top-3 right-3 lg:top-8 lg:right-8 text-white"
                    >
                        <Filters data={pageData?.onlineRestroFilters} onApply={filterAPICall} />

                    </LightBox>
                )}

                {/* LightBox Filter Sort By Options */}
                {showSortFilterContainer && pageData?.onlineRestroFilters?.sortConfigs && (
                    <LightBox
                        onCLose={() => setShowSortFilterContainer(false)}
                        wrapperClasses="flex items-center justify-center z-20 h-full w-full p-10"
                        closeBtnClasses="top-3 right-3 lg:top-8 lg:right-8 text-white"
                    >
                        <form onSubmit={sortFilterSubmission} className="shadow-xl w-max rounded-[15px] border-2 border-zinc-200 bg-white dark:bg-neutral-950 dark:border-zinc-800 flex flex-col z-10 text-left">
                            <div className="flex leading-[120%] flex-col gap-6 py-6 px-4">
                                {pageData?.onlineRestroFilters?.sortConfigs?.map(config => {
                                    return (
                                        <div key={config?.key} className="flex justify-between items-center gap-6">
                                            <label htmlFor={config?.key}>{config?.title}</label>
                                            <input
                                                type="radio"
                                                id={config?.key}
                                                value={config?.title}
                                                name="sortBy"
                                                checked={sortFilterSelectedOption?.id === config?.key}
                                                onChange={(e) => setSortFilterSelectedOption(
                                                    {
                                                        id: e.target.id,
                                                        value: e.target.value,
                                                    }
                                                )}
                                                className="relative h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            />
                                        </div>

                                    )
                                })}
                            </div>
                            <button type="submit" className="p-4 text-primary border-t-2 border-zinc-200 dark:border-zinc-800">Apply</button>
                        </form>

                    </LightBox>
                )}

                {/* Page Content */}
                {!showShimmer && !showError && pageData.isSwiggyPresent && pageData.isSwiggyAvailable && pageData.success && (
                    <div className="flex flex-col gap-10 lg:gap-14">

                        {/* Banner */}
                        {pageData.banner && (
                            <div className="flex gap-4 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                {pageData.banner?.map(slide => (
                                    <img key={slide?.id} className="w-[80%] lg:w-[40%] rounded-xl" src={CONSTANTS.IMG_CDN + slide?.imageId} alt={slide?.accessibility?.altText} />
                                ))}
                            </div>
                        )}

                        {/* What's on mind */}
                        {pageData.mind && (
                            <div>
                                <p className="font-bold text-lg pb-4 lg:pb-8 lg:text-2xl">What's on your mind?</p>
                                <div className="grid grid-cols-[repeat(10,80px)] gap-2 items-center lg:flex no-scrollbar overflow-x-scroll overflow-y-hidden">
                                    {pageData.mind?.map(option => (
                                        <img key={option?.id} className="min-w-[80px] w-[22%] lg:w-[14.5%] lg:min-w-[14.5%] rounded-xl" src={CONSTANTS.IMG_CDN + option?.imageId} alt={option?.accessibility?.altText} />
                                    ))}
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
                                                    className="min-w-[35%] lg:min-w-[27%] "
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Online Restaurants */}
                        {pageData.onlineRestroTitle && pageData.onlineRestroFilters && (
                            <>
                                <div className="divider -mt-[10px] border-b border-zinc-300 dark:border-zinc-800"></div>
                                <div>

                                    {/* Heading */}
                                    <p className="title font-bold text-lg lg:text-2xl">{pageData?.onlineRestroTitle}</p>

                                    {/* Filters */}
                                    <div className="filters sticky lg:top-0 top-[64px] z-10 bg-white dark:bg-neutral-950 py-3 lg:py-6">
                                        <div className="flex gap-2 items-center no-scrollbar overflow-scroll">

                                            <div onClick={() => setShowFilters(true)} className={`min-w-fit flex items-center gap-2 py-2.5 px-3.5 text-[15px] leading-none border-2 rounded-full ${(activeFiltersCount > 0 ? "border-zinc-400 bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-600" : "border-zinc-200 bg-transparent dark:border-zinc-800")}`}>
                                                {activeFiltersCount > 0 && (
                                                    <div className="active-filters bg-primary rounded-full w-4 h-4 relative">
                                                        <span className="text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 leading-none text-white">{activeFiltersCount}</span>
                                                    </div>
                                                )}
                                                Filters
                                                <IconAdjustmentsHorizontal className="text-zinc-700 dark:text-zinc-400" size={15} />
                                            </div>

                                            <div onClick={() => setShowSortFilterContainer(true)} className="cursor-pointer min-w-fit flex items-center gap-2 py-2.5 px-3.5 text-[15px] leading-none border-2 rounded-full border-zinc-200 bg-transparent dark:border-zinc-800">
                                                {sortFilterText}
                                                <IconChevronDown className="text-zinc-700 dark:text-zinc-400" size={16} />
                                            </div>

                                            {pageData?.onlineRestroFilters?.facetList?.filter(filter => filter.id !== "catalog_cuisines")
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
                                    </div>

                                    {!onlineRestroData?.onlineRestroLists && <OnlineRestroShimmer />}

                                    {onlineRestroData?.onlineRestroLists && (
                                        <>
                                            {/* Restaurants */}
                                            <div className="lists grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5 no-scrollbar overflow-x-scroll overflow-y-hidden">
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
                                                            className="min-w-[35% lg:min-w-[27%]"
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </>
                                    )}

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