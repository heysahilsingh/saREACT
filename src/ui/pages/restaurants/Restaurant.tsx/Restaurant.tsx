import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../../../../context/UserContext";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import CONSTANTS, { TypeMenuItem, TypeRestaurantInformation } from "../../../../constants";
import Page from "../../Page";
import RestaurantShimmer from "./RestaurantShimmer";
import ErrorComp from "../../../components//Errors/NetworkError";
import { IconArrowNarrowLeft, IconBike, IconCaretDownFilled, IconCoinRupee, IconDiscount2, IconInfoCircleFilled, IconSearch, IconStarFilled } from "@tabler/icons-react";
import TopPicks from "./TopPicks";
import MenuCategory from "./MenuCategory";

type PageData = {
    restroInfo: TypeRestaurantInformation | undefined
    offers: {
        couponCode: string,
        header: string,
        description: string,
        offerLogo: string,
        offerTag: string,
        offerTagColor: string,
        offerType: string,
        restId: string
    }[] | undefined,
    topPicks: {
        title: string,
        carousel: {
            bannerId: string,
            creativeId: string,
            description: string,
            title: string,
            dish: {
                info: TypeMenuItem
            }
        }[]
    } | undefined,
    menuCategories: {
        title: string,
        itemCards: {
            card: {
                info: TypeMenuItem,
                hideRestaurantDetails: boolean
            }
        }[]
    }[] | undefined,
}

const Restaurant = () => {
    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();

    const slug = useParams()
    const navigate = useNavigate();
    const restroId = slug?.restaurantSlug?.split("-").slice(-1)[0];

    // Shimmer
    const [showShimmer, setShowShimmer] = useState<boolean>(true)

    // Error
    const [showError, setShowError] = useState<boolean>(false)

    // Page Data
    const [pageData, setPageData] = useState<PageData>({
        restroInfo: undefined,
        offers: undefined,
        menuCategories: undefined,
        topPicks: undefined
    });

    const [restroInfoCrossed, setRestroInfoCrossed] = useState<boolean>(false);
    const refRestroInfo = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (refRestroInfo.current) {
                const divBTop = refRestroInfo.current.getBoundingClientRect().top;
                setRestroInfoCrossed(divBTop <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // API Call
    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng && restroId) {
            const fetchData = async () => {
                try {
                    if (showError) setShowError(false)
                    if (!showShimmer) setShowShimmer(true)

                    const URL = CONSTANTS.API_PAGE_RESTAURANT.getUrl(userLat, userLng, restroId, device.isDesk ? "desk" : "mob");

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const responseDataCards = responseData?.data?.cards;

                    if (responseDataCards) {
                        const dataRestroInfo = responseDataCards
                            .find((card: { card: { card: { "@type": string } } }) =>
                                card.card?.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
                            )?.card?.card?.info;

                        const dataOffers = responseDataCards
                            .find((card: { card: { card: { id: string } } }) =>
                                card.card?.card.id === "offerCollectionWidget"
                            )?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
                                (offer: { info: [] }) => offer.info
                            );

                        const dataTopPicks = responseDataCards
                            .find((card: { groupedCard: object }) => card.groupedCard)
                            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
                                (card: { card: { card: { "@type": string } } }) =>
                                    card.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel"
                            )?.card?.card;

                        const dataMenuCategories = responseDataCards
                            .find((card: { groupedCard: object }) => card.groupedCard)
                            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                                (card: { card: { card: { "@type": string } } }) =>
                                    card.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                            )?.map((card: { card: { card: object } }) => card.card.card);

                        setPageData({
                            restroInfo: dataRestroInfo,
                            offers: dataOffers,
                            topPicks: dataTopPicks,
                            menuCategories: dataMenuCategories,
                        });

                        // Hide Shimmer
                        setShowShimmer(false);
                    }

                    else {
                        throw new Error(responseData?.statusMessage);
                    }

                } catch (error) {
                    setShowError(true)
                    setShowShimmer(false)
                }
            }

            fetchData();
        }

    }, [userInfo]);

    useEffect(() => {
        if (pageData?.restroInfo?.id) console.log(pageData);
    }, [pageData])


    return (
        <Page pageName="restaurant">
            <div className="flex flex-col max-w-[800px] mx-auto">
                {/* Shimmer */}
                {showShimmer && <RestaurantShimmer />}

                {/* Error */}
                {showError && <ErrorComp />}

                {/* Page Content */}
                {!showShimmer && !showError && pageData.restroInfo?.id && (
                    <>
                        {/* Header */}
                        <div className={`${restroInfoCrossed && "border-b border-zinc-200 dark:border-zinc-800"} r-header flex justify-center items-center gap-4 py-2 px-4 sticky top-0 z-20 bg-white text-black dark:bg-neutral-950 dark:text-slate-200`}>
                            <IconArrowNarrowLeft onClick={() => navigate(-1)} size={35} stroke={0.7} className="-ml-1" />
                            {restroInfoCrossed && (
                                <div className="r-name-d-time flex flex-col leading-none w-[70%]">
                                    <span className="font-bold text-[13px] overflow-hidden whitespace-nowrap text-ellipsis">{pageData.restroInfo.name}</span>
                                    <span className="text-xs text-zinc-500 dark:text-slate-400">{pageData.restroInfo.sla.deliveryTime} min</span>
                                </div>
                            )}
                            <div className="grow flex items-center justify-end">
                                <IconSearch size={22} stroke={1} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="r-content flex gap-6 flex-col px-4 pt-4">
                            {/* Menu Categories */}
                            <hr className="w-full bg-zinc-300 dark:bg-zinc-700 h-[1px] border-0" />

                            <div className="r-menu-categories -mx-4 flex flex-col">
                                {pageData.menuCategories?.map(category => <MenuCategory key={category.title} title={category.title} itemCards={category.itemCards} />)}
                            </div>

                            {/* Restro Information */}
                            <div ref={refRestroInfo} className="r-info flex flex-col gap-5 text-zinc-500 dark:text-slate-400">
                                <div className="flex">
                                    <div className="col1 grow flex flex-col items-start text-xs ">
                                        <p className="font-bold text-xl text-zinc-950 dark:text-zinc-100">{pageData.restroInfo.name}</p>
                                        <p className=" mt-2 mb-1">{pageData.restroInfo.cuisines.join(", ")}</p>
                                        <div className="flex gap-2 items-center">
                                            <p>{pageData.restroInfo.areaName}</p>
                                            <p>{pageData.restroInfo.sla.lastMileTravelString}</p>
                                            <IconCaretDownFilled className="text-primary" size={10} />
                                        </div>
                                    </div>
                                    {pageData.restroInfo.avgRating && (
                                        <div className="col2 min-w-fit border flex flex-col items-center border-zinc-200 dark:border-zinc-800 rounded-lg font-bold leading-none px-3 pt-2 pb-2.5 h-fit">
                                            <div className="flex items-center text-green-600">
                                                <div className="rating flex gap-2 items-center">
                                                    <IconStarFilled size={15} />
                                                    <p className="lg:text-xm text-[14px]">{pageData.restroInfo.avgRating}</p>
                                                </div>
                                            </div>
                                            <hr className="w-full bg-zinc-200 dark:bg-zinc-800 my-2" />
                                            <p className="text-[11px] opacity-60 tracking-tight">{pageData.restroInfo.totalRatingsString}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="r-d-detail flex items-center gap-2 w-full">
                                    {pageData.restroInfo.sla.longDistance === "LONG_DISTANCE_IT_IS_LONG_DISTANCE"
                                        ? <IconInfoCircleFilled size={17} className="text-primary" />
                                        : <IconBike size={17} stroke={2.5} />
                                    }
                                    <p className="text-[14px]">{pageData.restroInfo.feeDetails.message}</p>
                                </div>
                            </div>

                            <hr className="w-full bg-zinc-300 dark:bg-zinc-700 h-[1px] border-0" />

                            {/* Offers */}
                            <div className="r-offers flex flex-col">
                                <div className="r-d-time-c-t">
                                    <ul className="flex items-center gap-6">
                                        <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-400">
                                            <svg className="RestaurantTimeCost_icon__8UdT4" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <circle r="8.35" transform="matrix(-1 0 0 1 9 9)" stroke="currentColor" strokeWidth="1.3"></circle>
                                                <path d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z" fill="currentColor"></path>
                                            </svg>
                                            <p className="font-bold">{pageData.restroInfo.sla.deliveryTime} MIN</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-400">
                                            <IconCoinRupee />
                                            <p className="font-bold">{pageData.restroInfo.costForTwoMessage}</p>
                                        </li>
                                    </ul>
                                </div>
                                {(pageData.offers || []).length > 0 && (pageData.offers?.some(offer => offer.couponCode)) && (
                                    <ul className="flex gap-3 mt-4 no-scrollbar overflow-x-scroll overflow-y-hidden text-[14px]">
                                        {pageData.offers?.map(offer => {
                                            return (
                                                <li key={offer.restId + offer.header + offer.description} className="relative min-w-fit flex items-center py-2.5 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase">
                                                    {offer.offerTag && (
                                                        <div className="flex flex-col gap-1 items-center justify-center h-fit -rotate-90 -ml-[16px]">
                                                            <span className="font-bold text-[10px] text-primary">{offer.offerTag}</span>
                                                            <hr className="w-full bg-zinc-200 dark:bg-zinc-800 h-[1px] border-0" />
                                                        </div>
                                                    )}
                                                    <div className="grow flex flex-col">
                                                        <div className="head flex items-center gap-1.5">
                                                            <IconDiscount2 size={20} stroke={3} className="text-[#8B554E]" />
                                                            <p className="font-bold">{offer.header}</p>
                                                        </div>
                                                        <p className="text-zinc-900 dark:text-zinc-400">{offer.couponCode} | {offer.description}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>

                            {/* Top Picks */}
                            {pageData.topPicks?.title && (
                                <>
                                    <hr className="w-full bg-zinc-300 dark:bg-zinc-700 h-[1px] border-0" />

                                    <div className="r-top-picks flex flex-col gap-4">
                                        <p className="font-bold text-xl text-zinc-950 dark:text-zinc-100">{pageData.topPicks.title}</p>
                                        <div className="flex gap-3 lg:gap-6 no-scrollbar overflow-x-scroll overflow-y-hidden">
                                            {pageData.topPicks.carousel?.map(slide => <TopPicks key={slide.bannerId} topPick={slide} className="min-w-[90%] lg:min-w-[300px]" />)}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </Page>
    )
}

export default Restaurant