import { useContext, useEffect, useState } from "react";
import CONSTANTS, { TypeRestaurantInformation } from "../../../constants";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import TopHeader from "../../components/TopHeader"
import Page from "../Page";
import UserContext from "../../../context/UserContext";
import RestroInstaWidget from "./RestroInstaWidget";
import TopPicks from "./TopPicks";
import { IconThumbUp, IconToolsKitchen } from '@tabler/icons-react';
import { routePaths } from "../../Ui";
import { Link } from "react-router-dom";
import HomeShimmer from "./HomeShimmer";
import NetworkError from "../../components/Errors/NetworkError";
import SwiggyError from "../../components/Errors/SwiggyError";
import SwiggyNotAvailableImg from "../../../assets/images/swiggy-not-available.jpeg";
import Restaurants from "../restaurants/Restaurants";
import RestroCardHorizontal from "../../components/RestroCardHorizontal";

type Api_Card = {
    id: string,
    entityId: string,
    name: string,
    cloudinaryImageId: string,
    aggregatedDiscountInfoV3: {
        header: string,
        subHeader: string
    }
    sla: {
        deliveryTime: number
    },
    promoted: boolean,
    locality: string,
    areaName: string,
    cuisines: string[],
    avgRating: string,
    costForTwo: string,

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
    banner: Api_Card[] | null,
    bigOffer: Api_Card[] | null,
    offer: Api_Card[] | null,
    restro: TypeRestaurantInformation[] | null,
    topPicks: Api_Card[] | null,
}

const Home = () => {
    const device = useDeviceDetect();

    const { userInfo } = useContext(UserContext);
    
    useEffect(() => console.log("sasasasasobject"), [])

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
        bigOffer: null,
        offer: null,
        restro: null,
        topPicks: null,
    });

    // API Call
    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng && !device.isDesk) {
            const fetchData = async () => {
                try {
                    setShowShimmer(true)

                    const URL = CONSTANTS.API_PAGE_HOME.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob");

                    const response = await fetch(URL);

                    const responseData = await response.json();

                    if (responseData?.data?.success?.cards) {

                        const data = responseData?.data?.success?.cards.map((card: { gridWidget: object }) => card.gridWidget);

                        const findCard = (cardIds: string[]) => {
                            for (const cardId of cardIds) {
                                const card = data.find((card: { id: string }) => card.id === cardId);
                                if (card) {
                                    return card.gridElements?.infoWithStyle || null;
                                }
                            }
                            return null;
                        };

                        // Set Data
                        setPageData({
                            success: responseData?.data?.success ? true : false,
                            isSwiggyPresent: findCard(["SwiggyNotPresent_Widget"]) ? false : true,
                            isSwiggyAvailable: findCard(["BlackZone_Widget"]) ? false : true,
                            banner: findCard(["ScrollNavSplitP2_latebinding", "ScrollNavFullBleedP2_latebinding"])?.info || null,
                            bigOffer: findCard(["Homepage_Version4_Topical_Fullbleed"])?.info || null,
                            offer: findCard(["Home_P2_Food_Offerwidget_MainComponent_Scrollcards"])?.info || null,
                            topPicks: findCard(["Updated_4_favourites_SimRestoRelevance"])?.restaurants?.map((restro: { info: [] }) => restro?.info) || null,
                            restro: findCard(["restaurantCollectionDeliveringNowTheme"])?.restaurants?.map((restro: { info: [] }) => restro?.info) || null
                        })

                        // Hide Shimmer
                        setShowShimmer(false)

                        // Hide Error
                        setShowError(false)

                    } else {
                        throw new Error(responseData?.data?.statusMessage)
                    }


                } catch (error) {
                    setShowError(true);
                    setShowShimmer(false);
                }
            }

            fetchData();
        }

    }, [userInfo, device]);

    // if (device.isDesk) navigate(routePaths.restaurants);

    if (device.isDesk) return <Restaurants />;

    else {
        return (
            <Page pageName="home">
                {/* Sticky Header */}
                <TopHeader className="sticky top-0" />

                {/* Page Content */}
                <div className="flex flex-col px-4 pt-4">
                    {/* Shimmer */}
                    {showShimmer && <HomeShimmer />}

                    {/* Error */}
                    {showError && <NetworkError />}

                    {/* If Swiggy Not Present */}
                    {!pageData.isSwiggyPresent && (
                        <SwiggyError
                            heading={"Swiggy not present in " + (userInfo.location.cityInfo.cityName || userInfo.location.cityInfo.stateName)}
                            caption="We don't have any services here till now. Try changing the location."
                            showButton={true}
                            buttonText="Change Location"
                            buttonOnClick={() => console.log("object")}
                        />
                    )}

                    {/* If Swiggy Not Available */}
                    {!pageData.isSwiggyAvailable && (
                        <SwiggyError
                            image={SwiggyNotAvailableImg}
                            heading={"Due to operational exigencies, we are temporarily unserviceable"}
                            caption="Some restaurants around you are not serviceable due to operational exigencies. Please bear with us."
                            showButton={true}
                            buttonText="Change Location"
                            buttonOnClick={() => console.log("object")}
                        />
                    )}

                    {/* Page Content */}
                    {!showShimmer && !showError && pageData.isSwiggyPresent && pageData.isSwiggyAvailable && pageData.success && (
                        <div className="flex flex-col gap-12">
                            {/* Restaurants and Instamart Banner */}
                            {pageData.banner && (
                                <div className="banner flex items-center justify-between gap-4">
                                    {pageData.banner?.map(card => (
                                        <RestroInstaWidget
                                            key={card.id}
                                            type={card?.accessibility?.altText}
                                            imgAlt={card?.accessibility?.altTextCta}
                                        />
                                    ))
                                    }
                                </div>
                            )}

                            {/* Top Picks Setion */}
                            {pageData.topPicks && (
                                <div className="top-picks">
                                    <div className="flex gap-2 pb-4 items-center">
                                        <IconThumbUp size="22" />
                                        <p className="font-bold text-lg">Top Picks For You</p>
                                    </div>
                                    <div className="restro no-scrollbar flex items-start justify-start gap-[3%] overflow-x-scroll overflow-y-hidden">
                                        {pageData.topPicks?.map((restro: Api_Card) => {

                                            const link = routePaths.restaurants + "/" + [restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

                                            return (
                                                <TopPicks
                                                    key={restro?.id}
                                                    imgSrc={restro?.cloudinaryImageId}
                                                    offerHeading={restro?.aggregatedDiscountInfoV3?.header}
                                                    offerSubHeading={restro?.aggregatedDiscountInfoV3?.subHeader}
                                                    restroName={restro?.name}
                                                    deliveryTime={restro?.sla?.deliveryTime}
                                                    link={link}
                                                    isPromoted={restro?.promoted}
                                                    className="min-w-[80px]"
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Big Offers Slider */}
                            {pageData.bigOffer && (
                                <div className="flex gap-4 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                    {pageData.bigOffer?.map(slide => {
                                        const link = `${routePaths.collections}?collection_id=${slide.entityId}`;

                                        return (
                                            <div key={slide.id} className="min-w-[80%] rounded-xl">
                                                <Link to={link}>
                                                    <img className="bg-zinc-200 dark:bg-zinc-900" src={CONSTANTS.IMG_CDN + slide.imageId} alt={slide.accessibility?.altText} />
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            {/* Offer Slider */}
                            {pageData.offer && (
                                <div className="">
                                    <p className="font-bold text-lg pb-4">Offers For You</p>
                                    <div className="flex gap-2 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                        {pageData.offer?.map(slide => {
                                            const link = `${routePaths.collections}?collection_id=${slide.entityId}`;

                                            return (
                                                <div key={slide.id} className="min-w-[35%] rounded-xl">
                                                    <Link to={link}>
                                                        <img className="bg-zinc-200 dark:bg-zinc-900" src={CONSTANTS.IMG_CDN + slide.imageId} alt={slide.accessibility?.altText} />
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Restro Nearby */}
                            {pageData.restro && (
                                <div className="">
                                    <div className="flex flex-col pb-4 items-start justify-start">
                                        <div className="flex gap-2 items-center">
                                            <IconToolsKitchen size="22" />
                                            <p className="font-bold text-lg">All Restaurants Nearby</p>
                                        </div>
                                        <p className="opacity-80">Discover unique tastes near you</p>
                                    </div>

                                    <div className="restro no-scrollbar flex flex-col items-start justify-start gap-8 overflow-x-scroll overflow-y-hidden">
                                        {pageData.restro?.map((restro: TypeRestaurantInformation) => <RestroCardHorizontal restro={restro} key={restro.id} className="min-w-[80px]"/>)}
                                    </div>
                                </div>
                            )}

                            {/* See All Restro */}
                            <Link to={routePaths.restaurants} className="bg-primary text-white font-bold rounded-lg flex items-center justify-center text-center px-4 py-6 leading-none">See all restaurants</Link>

                        </div>
                    )}
                </div>
            </Page>
        )
    }
}

export default Home