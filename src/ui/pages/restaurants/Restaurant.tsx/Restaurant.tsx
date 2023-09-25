import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../../../../context/UserContext";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import CONSTANTS, { TypeMenuItem, TypeRestaurantInformation } from "../../../../constants";
import Page from "../../Page";
import RestaurantShimmer from "./RestaurantShimmer";
import ErrorComp from "../../../components//Errors/NetworkError";
import { IconArrowNarrowLeft, IconBike, IconCaretDownFilled, IconInfoCircleFilled, IconMapPinFilled, IconSearch, IconStarFilled } from "@tabler/icons-react";
import TopPicks from "./TopPicks";
import MenuCategory from "./MenuCategory";
import MultiOutlet from "./MultiOutlet";
import Offers from "./Offers";
import SearchItem from "./SearchItem";

type PageData = {
    restroInfo: {
        info: TypeRestaurantInformation,
        legalInfo: {
            imageId: string,
            type: string,
            text: string[]
        },
    } | undefined
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

    const [showOnlyVegItems, setShowOnlyVegItems] = useState(false);

    const [showMultiOutlets, setShowMultiOutlets] = useState(false);

    const [searchItem, setSearchItem] = useState(false);

    // Get MultiOutlets
    const getMultiOutlets = () => {
        setShowMultiOutlets(true)
    }

    const [restroInfoCrossed, setRestroInfoCrossed] = useState<boolean>(false);
    const refRestroInfo = useRef<HTMLDivElement | null>(null);

    // For refRestroInfo
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

                        const dataRestroLegalInfo = responseDataCards
                            .find((card: { groupedCard: object }) => card.groupedCard)
                            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                                (card: { card: { card: { "@type": string } } }) =>
                                    card.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
                            )?.find((card: { card: { card: object } }) => card.card.card)?.card?.card;

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
                            restroInfo: {
                                info: dataRestroInfo,
                                legalInfo: dataRestroLegalInfo
                            },
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

    return (
        <Page pageName="restaurant">
            <div className="flex flex-col max-w-[800px] mx-auto">
                {/* Shimmer */}
                {showShimmer && <RestaurantShimmer />}

                {/* Error */}
                {showError && <ErrorComp />}

                {/* Page Content */}
                {!showShimmer && !showError && pageData.restroInfo?.info.id && (
                    <>
                        {/* Header */}
                        <div className={`${restroInfoCrossed && "border-b border-zinc-200 dark:border-zinc-800"} r-header flex justify-center items-center gap-4 py-2 px-4 sticky top-0 z-20 bg-white text-black dark:bg-neutral-950 dark:text-slate-200`}>
                            <IconArrowNarrowLeft onClick={() => navigate(-1)} size={35} stroke={0.7} className="-ml-1" />
                            {restroInfoCrossed && (
                                <div className="r-name-d-time flex gap-1 flex-col leading-none w-[70%]">
                                    <span className="font-bold text-[13px] overflow-hidden whitespace-nowrap text-ellipsis">{pageData.restroInfo.info.name}</span>
                                    <span className="text-xs text-zinc-500 dark:text-slate-400">{pageData.restroInfo.info.sla.deliveryTime} min</span>
                                </div>
                            )}
                            <div className="grow flex items-center justify-end">
                                <IconSearch onClick={() => setSearchItem(true)} size={22} stroke={1} />
                            </div>
                        </div>

                        {/* Search Item */}
                        {searchItem && <SearchItem restaurantInfo={pageData.restroInfo.info} onClose={() => setSearchItem(false)}/>}


                        {/* Content */}
                        <div className="r-content flex gap-6 flex-col px-4 pt-4">
                            {/* Restro Information */}
                            <div ref={refRestroInfo} className="r-info flex flex-col gap-5 text-zinc-500 dark:text-slate-400">
                                <div className="flex">
                                    <div className="col1 grow flex flex-col items-start text-xs ">
                                        <p className="font-bold text-xl text-zinc-950 dark:text-zinc-100">{pageData.restroInfo.info.name}</p>
                                        <p className=" mt-2 mb-1">{pageData.restroInfo.info.cuisines.join(", ")}</p>
                                        <div className="flex gap-2 items-center">
                                            <p>{pageData.restroInfo.info.areaName}</p>
                                            <p>{pageData.restroInfo.info.sla.lastMileTravelString}</p>
                                            {pageData.restroInfo.info.multiOutlet && (
                                                <IconCaretDownFilled onClick={getMultiOutlets} className="text-primary" size={10} />
                                            )}
                                        </div>
                                    </div>
                                    {pageData.restroInfo.info.avgRating && (
                                        <div className="col2 min-w-fit border flex flex-col items-center border-zinc-200 dark:border-zinc-800 rounded-lg font-bold leading-none px-3 pt-2 pb-2.5 h-fit">
                                            <div className="flex items-center text-green-600">
                                                <div className="rating flex gap-2 items-center">
                                                    <IconStarFilled size={15} />
                                                    <p className="lg:text-xm text-[14px]">{pageData.restroInfo.info.avgRating}</p>
                                                </div>
                                            </div>
                                            <hr className="w-full bg-zinc-200 dark:bg-zinc-800 border-0 h-[1px] my-2" />
                                            <p className="text-[11px] opacity-60 tracking-tight">{pageData.restroInfo.info.totalRatingsString}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="r-d-detail flex items-center gap-2 w-full">
                                    {pageData.restroInfo.info.sla.longDistance === "LONG_DISTANCE_IT_IS_LONG_DISTANCE"
                                        ? <IconInfoCircleFilled size={17} className="text-primary" />
                                        : <IconBike size={17} stroke={2.5} />
                                    }
                                    <p className="text-[14px]">{pageData.restroInfo.info.feeDetails.message}</p>
                                </div>
                            </div>

                            <hr className="w-full bg-zinc-300 dark:bg-zinc-700 h-[1px] border-0" />

                            {/* Offers */}
                            {pageData.offers && (
                                <div className="r-offers flex flex-col">
                                    <Offers offers={pageData.offers} restroInfo={pageData.restroInfo} />
                                </div>
                            )}

                            {/* Veg Only FIlter */}
                            <div className="r-veg-filter">
                                <div className="flex gap-2 items-center pt-4">
                                    <p className="font-semibold">Veg Only</p>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input onChange={() => setShowOnlyVegItems(prev => !prev)} type="checkbox" value="" className="sr-only peer" />
                                        <div className="w-[40px] h-[20px] rounded bg-gray-200 peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:rounded after:left-[2px] after:bg-white dark:after:bg-gray-500 after:h-[16px] after:w-[18px] after:transition-all peer-checked:bg-[#008000] peer-checked:after:bg-white peer-checked:before:translate-x-[18px] peer-checked:before:opacity-100 before:opacity-0 before:content-[''] before:absolute before:top-[2px] before:rounded-full before:left-[2px] before:bg-[#008000] before:h-[8px] before:w-[8px] before:my-[4px] before:mx-[5px] before:transition-all before:z-10"></div>
                                    </label>

                                </div>
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

                            {/* Menu Categories */}
                            {pageData.menuCategories && (pageData.menuCategories || []).length > 0 && (
                                <div className="r-menu-categories -mx-4 flex flex-col">
                                    {pageData.menuCategories.map(category =>
                                        <MenuCategory
                                            key={category.title}
                                            title={category.title}
                                            itemCards={
                                                showOnlyVegItems ? category.itemCards.filter(card => card.card.info.itemAttribute.vegClassifier === "VEG") : category.itemCards
                                            }
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Restro Legal Info */}
                        <div className="py-5 px-4 bg-slate-200 dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 text-[14px] mt-16">
                            <div className="licence flex items-center gap-6">
                                <img className="w-[60px] dark:invert" src={CONSTANTS.IMG_CDN + pageData.restroInfo.legalInfo.imageId} alt={pageData.restroInfo.legalInfo.type} />
                                <p className="licence-number">{pageData.restroInfo.legalInfo.text[0]}</p>
                            </div>
                            <hr className="border-slate-400 dark:border-zinc-600 my-6" />
                            <div className="info">
                                <p className="font-semibold">{pageData.restroInfo.info.name}</p>
                                <p>Outlet: {pageData.restroInfo.info.areaName}</p>
                                <div className="flex gap-2 mt-2">
                                    <IconMapPinFilled className="min-w-[14px] translate-y-[3px]" size={14} />
                                    <p>{pageData.restroInfo.info.labels.find(label => label.title === "Address")?.message}</p>
                                </div>
                            </div>
                        </div>

                        {/* Multi Outlets */}
                        {(showMultiOutlets && pageData.restroInfo.info) && (
                            <MultiOutlet restroInfo={pageData.restroInfo.info} onClose={() => setShowMultiOutlets(false)} />
                        )}
                    </>
                )}
            </div>
        </Page>
    )
}

export default Restaurant