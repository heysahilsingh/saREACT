import { useContext, useEffect, useState } from "react";
import CONSTANTS from "../../../constants";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import TopHeader from "../../components/TopHeader"
import Page from "../Page";
import UserContext from "../../../context/UserContext";
import RestroInstaWidget from "./RestroInstaWidget";
import TopPicks from "./TopPicks";

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
                {showShimmer && <div className="text-center">Loading data</div>}

                {/* Data */}
                {!showShimmer && (
                    <div className="flex flex-col px-4 pt-4">
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
                        <div className="no-scrollbar flex items-start justify-start gap-[3%] overflow-x-scroll overflow-y-hidden">
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
                                    className="min-w-[21%]"
                                />
                            ))}
                        </div>

                    </div>
                )}
            </Page>
        )
    }
}

export default Home