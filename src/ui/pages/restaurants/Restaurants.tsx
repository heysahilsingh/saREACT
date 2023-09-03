import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import UserContext from "../../../context/UserContext";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import CONSTANTS from "../../../constants";
import RestaurantsShimmer from "./RestaurantsShimmer";
import ErrorComp from "../../components/ErrorComp";
import Page from "../Page";
import TopHeader from "../../components/TopHeader";

type Api_Response_Card = {
    gridWidget: {
        id: string,
        gridElements: {
            infoWithStyle: {
                info: [],
                restaurants: []
            }
        }
    }
}

type Api_Response_Card_Info = [
    {
        id: string,
        accessibility: {
            altText: "RESTAURANT" | "INSTAMART",
            altTextCta: string
        },
        imageId: string,
    }
]

type Api_Response_Card_Restaurants = [
    {
        info: {
            id: string,
            cloudinaryImageId: string,
            aggregatedDiscountInfoV3: {
                header: string,
                subHeader: string
            },
            name: string,
            sla: {
                deliveryTime: number
            },
            promoted: boolean,
            avgRating: string,
            costForTwo: string,
            cuisines: string[],
            locality: string,
            areaName: string
        }
    }
]

type PageData = {
    success: boolean,

    banner: {} | null,

    mind: {} | null,

    topRestro: {} | null,

    onlineRestroTitle: {} | null,

    onlineRestroFilters: {} | null,

}

const Restaurants = () => {
    const { userInfo } = useContext(UserContext);

    const device = useDeviceDetect();

    const slug = useParams()
    const restroId = slug?.restaurantSlug?.split("-").slice(-1)[0];

    const API_URL = device.isDesk ? CONSTANTS.API_PAGE_RESTAURANTS.desk : CONSTANTS.API_PAGE_RESTAURANTS.mob;

    // Shimmer
    const [showShimmer, setShowShimmer] = useState<boolean>(true)

    // Error
    const [showError, setShowError] = useState<boolean>(false)

    // Page Data
    const [pageData, setPageData] = useState<PageData>({
        success: false,
        banner: null,
        mind: null,
        topRestro: null,
        onlineRestroTitle: null,
        onlineRestroFilters: null
    });

    useEffect(() => {
        async function fetchData() {
            try {
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
                        banner: findCard(["topical_banner"])?.info,
                        mind: findCard(["whats_on_your_mind"])?.info,
                        topRestro: findCard(["top_brands_for_you"])?.restaurants?.map((restro: { info: [] }) => restro?.info) || null,
                        onlineRestroFilters: findCard(["topical_banner"])?.info,
                        onlineRestroTitle: findCard(["topical_banner"])?.info,
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

                {/* Page Content */}
                {!showShimmer && !showError && pageData.success && (
                    <div>Data has been loaded successfully.</div>
                )}
            </div>

        </Page>
    )
}

export default Restaurants