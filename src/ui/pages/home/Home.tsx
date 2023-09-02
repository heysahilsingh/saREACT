import { useContext, useEffect, useState } from "react";
import CONSTANTS from "../../../constants";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import TopHeader from "../../components/TopHeader"
import Page from "../Page";
import UserContext from "../../../context/UserContext";
import RestroInstaWidget from "./RestroInstaWidget";
import TopPicks from "./TopPicks";
import { IconThumbUp, IconToolsKitchen } from '@tabler/icons-react';
import RestroNearBy from "./RestroNearBy";
import { routePaths } from "../../Ui";
import { Link } from "react-router-dom";
import HomeShimmer from "./HomeShimmer";

const Home = () => {
    const device = useDeviceDetect();

    const { userInfo } = useContext(UserContext);

    // Error Message
    const [showShimmer, setShowShimmer] = useState<boolean>(false)

    // Page Data
    const [pageData, setPageData] = useState<object[]>([]);

    // API Call
    useEffect(() => {
        async function fetchData() {
            try {
                // Show Shimmer
                setShowShimmer(true)

                const response = await fetch(CONSTANTS.API_PAGE_HOME.mob + "lat=" + userInfo?.location?.cityInfo?.latitude + "&lng=" + userInfo?.location?.cityInfo?.longitude);
                const responseData = await response.json();

                setPageData(responseData?.data?.success?.cards)

                // Hide Shimmer
                setShowShimmer(false)

                console.log(responseData?.data?.success?.cards);

            } catch (error) {
                setShowShimmer(true);
            }
        }

        if (!device.isDesk) fetchData();
    }, [userInfo]);

    if (device.isDesk) return
    else {
        return (
            <Page pageName="home">
                {/* Sticky Header */}
                <TopHeader className="sticky top-0" />

                {/* Error message */}
                {showShimmer && <HomeShimmer />}

                {/* Data */}
                {!showShimmer && (
                    <div className="flex flex-col gap-12 px-4 pt-4">
                        {/* Restaurants and Instamart Banner */}
                        <div className="flex items-center justify-between gap-4">
                            {pageData?.at(0)?.gridWidget?.gridElements?.infoWithStyle?.info.map((card, index) => (
                                <RestroInstaWidget
                                    key={card.id}
                                    type={card?.accessibility?.altText}
                                    imgId={index}
                                    imgAlt={card?.accessibility?.altTextCta}
                                />
                            ))
                            }
                        </div>

                        {/* Top Picks Setion */}
                        <div className="">
                            <div className="flex gap-2 pb-4 items-center">
                                <IconThumbUp size="22" />
                                <p className="font-bold text-lg">Top Picks For You</p>
                            </div>
                            <div className="restro no-scrollbar flex items-start justify-start gap-[3%] overflow-x-scroll overflow-y-hidden">
                                {pageData?.at(1)?.gridWidget?.gridElements?.infoWithStyle?.restaurants?.map(restro => (
                                    <TopPicks
                                        key={restro.info?.id}
                                        imgSrc={restro.info?.cloudinaryImageId}
                                        offerHeading={restro.info?.aggregatedDiscountInfoV3?.header}
                                        offerSubHeading={restro.info?.aggregatedDiscountInfoV3?.subHeader}
                                        restroName={restro.info?.name}
                                        deliveryTime={restro.info?.sla?.deliveryTime}
                                        link={restro.info?.id}
                                        isPromoted={restro.info?.promoted}
                                        className="min-w-[80px]"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Offer Slider */}
                        <div className="flex gap-4 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                            {pageData?.at(2)?.gridWidget?.gridElements?.infoWithStyle?.info?.map(slide => (
                                <img key={slide.id} className="w-[80%] rounded-xl" src={CONSTANTS.IMG_CDN + slide.imageId} alt={slide.accessibility?.altText} />
                            ))}
                        </div>

                        {/* Offer Slider */}
                        <div className="">
                            <p className="font-bold text-lg pb-4">Offers For You</p>
                            <div className="flex gap-2 items-center no-scrollbar overflow-x-scroll overflow-y-hidden">
                                {pageData?.at(3)?.gridWidget?.gridElements?.infoWithStyle?.info?.map(slide => (
                                    <img key={slide.id} className="w-[35%] rounded-xl" src={CONSTANTS.IMG_CDN + slide.imageId} alt={slide.accessibility?.altText} />
                                ))}
                            </div>
                        </div>

                        {/* Restro Nearby */}
                        <div className="">
                            <div className="flex flex-col pb-4 items-start justify-start">
                                <div className="flex gap-2 items-center">
                                    <IconToolsKitchen size="22" />
                                    <p className="font-bold text-lg">All Restaurants Nearby</p>
                                </div>
                                <p className="opacity-80">Discover unique tastes near you</p>
                            </div>

                            <div className="restro no-scrollbar flex flex-col items-start justify-start gap-8 overflow-x-scroll overflow-y-hidden">
                                {pageData?.at(1)?.gridWidget?.gridElements?.infoWithStyle?.restaurants?.map(restro => (
                                    <RestroNearBy
                                        key={restro.info?.id}
                                        imgSrc={restro.info?.cloudinaryImageId}
                                        offerHeading={restro.info?.aggregatedDiscountInfoV3?.header}
                                        offerSubHeading={restro.info?.aggregatedDiscountInfoV3?.subHeader}
                                        restroName={restro.info?.name}
                                        deliveryTime={restro.info?.sla?.deliveryTime}
                                        link={restro.info?.id}
                                        isPromoted={restro.info?.promoted}
                                        cuisines={restro.info?.cuisines}
                                        averageRating={restro.info?.avgRating}
                                        costForTwo={restro.info?.costForTwo}
                                        className="min-w-[80px]"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* See All Restro */}
                        <Link to={routePaths.restaurants} className="bg-primary text-white font-bold rounded-lg flex items-center justify-center text-center px-4 py-6 leading-none">See all restaurants</Link>

                    </div>
                )}
            </Page>
        )
    }
}

export default Home