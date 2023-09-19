import { useContext, useEffect, useState } from "react";
import CONSTANTS from "../../../constants";
import UserContext from "../../../context/UserContext";
import {useNavigate, useSearchParams } from "react-router-dom";
import Page from "../Page";
import NetworkError from "../../components/Errors/NetworkError";
import CollectionsShimmer from "./CollectionsShimmer";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import FilterableRestro, { FiltersProp, RestrosProp } from "../../components/FilterableRestro/FilterableRestro";

type pageData = {
    header: {
        imageId: string,
        title: string
    } | undefined,
    restros: RestrosProp,
    filters: FiltersProp
}

type ResponseCard = {
    "@type": string
}

const Collections = () => {
    const [params] = useSearchParams();
    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();

    const navigate = useNavigate();

    const [showError, setShowError] = useState<boolean>(false);
    const [showShimmer, setShowShimmer] = useState<boolean>(true);

    const [pageData, setPageData] = useState<pageData>({
        header: undefined,
        filters: undefined,
        restros: undefined
    })

    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng) {
            const fetchData = async () => {
                if (showError) setShowError(false)
                if (!showShimmer) setShowShimmer(true)

                try {
                    const collectionId = params.get('collection_id') || "92870";

                    const URL = CONSTANTS.API_PAGE_COLLECTIONS.getURL(userLat, userLng, collectionId, device.isDesk ? "desk" : "mob");

                    const response = await fetch(URL);
                    const responseData = await response.json();

                    if (responseData?.data) {

                        const cards = responseData?.data?.cards?.map((card: { card: { card: ResponseCard[] } }) => card.card.card);

                        const headerCard = cards.find((card: ResponseCard) => card["@type"] === "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead");

                        const filtersCard = cards.find((card: ResponseCard) =>
                            card["@type"] === "type.googleapis.com/swiggy.gandalf.widgets.v2.FilterSortWidget" ||
                            card["@type"] === "type.googleapis.com/swiggy.gandalf.widgets.v2.InlineViewFilterSortWidget"
                        );

                        const restrosCard = cards.filter((card: ResponseCard) => card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant");

                        setPageData({
                            header: headerCard,
                            filters: filtersCard,
                            restros: restrosCard
                        })

                        setShowShimmer(false)
                    }
                    else {
                        setShowShimmer(false)
                        setShowError(true)
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            fetchData()
        }
    }, [userInfo, device])

    return (
        <Page pageName="collection">
            {/* Show error if exists */}
            {showError && <NetworkError />}

            {/* Show shimmer if */}
            {showShimmer && <CollectionsShimmer />}

            {/* Page Data */}
            {(!showShimmer && !showError && pageData.restros) && (
                <div className="wrapper lg:px-4 lg:pt-16">
                    <div className="header w-full aspect-[1/1] mb-8 lg:mb-12 lg:aspect-auto lg:bg-transparent relative bg-zinc-200 dark:bg-zinc-900">
                        {!device.isDesk && (
                            <>
                                <img className="absolute top-0 left-0 object-cover w-full h-[auto]" src={CONSTANTS.IMG_CDN + pageData.header?.imageId} alt="" />
                                <IconArrowNarrowLeft onClick={() =>  navigate(-1)} className="text-white absolute top-4 left-3 drop-shadow-md" size={40} stroke={1} />
                            </>
                        )}

                        {device.isDesk && (
                            <div className="flex gap-3 items-center">
                                <IconArrowNarrowLeft onClick={() =>  navigate(-1)} size={60} stroke={1} />
                                <h1 className="text-[2.5rem] leading-[120%] font-bold">{pageData.header?.title}</h1>
                            </div>
                        )}
                    </div>
                    <div className="restros px-4">
                        <FilterableRestro
                            restros={pageData.restros}
                            filters={pageData.filters}
                            restrosListLoadType="INFINITE"
                            filtersClasses="sticky top-0"
                        />
                    </div>
                </div>
            )}
        </Page>
    )
}

export default Collections