import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import UserContext from "../../../../context/UserContext";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import CONSTANTS, { TypeMenuItem, TypeRestaurantInformation } from "../../../../constants";
import Page from "../../Page";
import RestaurantShimmer from "./RestaurantShimmer";
import ErrorComp from "../../../components//Errors/NetworkError";

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
    menuCarousel: {
        title: string,
        itemCards: {
            card: {
                info: TypeMenuItem,
                hideRestaurantDetails: boolean
            }
        }[]
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
    } | undefined
}

const Restaurant = () => {
    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();
    const slug = useParams()
    const restroId = slug?.restaurantSlug?.split("-").slice(-1)[0];
   
    // Shimmer
    const [showShimmer, setShowShimmer] = useState<boolean>(true)

    // Error
    const [showError, setShowError] = useState<boolean>(false)

    // Page Data
    const [pageData, setPageData] = useState<PageData>({
        restroInfo: undefined,
        offers: undefined,
        menuCarousel: undefined,
        topPicks: undefined
    });

    // API Call
    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng && restroId) {
            const fetchData = async () => {
                try {
                    if(showError) setShowError(false)
                    if(!showShimmer) setShowShimmer(true)

                    const URL = CONSTANTS.API_PAGE_RESTAURANT.getUrl(userLat, userLng, restroId, device.isDesk ? "desk" : "mob");

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const responseDataCards = responseData.data.cards;
    
                    if (responseData?.data?.cards) {

                        const restroInfo = responseDataCards.find(card => card.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")?.card?.card?.info

                        console.log(responseDataCards);

                        console.log(
                            responseDataCards.find(card => card.card.card.id === "offerCollectionWidget")?.card?.card
                        );
    
                        // Hide Shimmer
                        setShowShimmer(false)
                    } else {
                        throw new Error(responseData?.statusMessage);
                    }
    
                } catch (error) {
                    setShowError(true)
                    setShowShimmer(false)
                }
            }
    
            fetchData();
        }

    }, [userInfo, device]);

    return (
        <Page pageName="restaurant">
            <div className="flex flex-col px-4 pt-4">
                {/* Shimmer */}
                {showShimmer && <RestaurantShimmer />}

                {/* Error */}
                {showError && <ErrorComp />}

                {/* Page Content */}
                {!showShimmer && !showError && (
                    <div>Data has been loaded successfully.</div>
                )}
            </div>
        </Page>
    )
}

export default Restaurant