import { useContext, useEffect, useState, useRef } from 'react';
import { routePaths } from '../../Ui';
import CONSTANTS, { TypeRestroCard, TypeRestroFilterAPIBody } from '../../../constants';
import RestroCard, { RestroCardShimmer } from '../RestroCard';
import UserContext from '../../../context/UserContext';
import FilteredRestroFilters from './FilteredRestroFilters/FilteredRestroFilters';
import FilteredRestroFiltersShimmer from './FilteredRestroFilters/FilteredRestroFiltersShimmer';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import FilterableRestroAPIBodyContext, { FilterableRestroAPIBodyContextProvider } from '../../../context/FilterableRestroAPIBodyContext';

export type FilterInfo = {
    id: "deliveryTime" | "catalog_cuisines" | "explore" | "rating" | "isVeg" | "restaurantOfferMultiTd" | "costForTwo" | "sortAttribute" | undefined,
    label: string | undefined,
    subLabel: string | undefined,
    selection: "SELECT_TYPE_MULTISELECT" | "SELECT_TYPE_SINGLESELECT" | undefined,
}

export type FilterOption = {
    id: string | undefined,
    label: string | undefined,
    openFilter: boolean | undefined,
    selected: boolean | undefined,
}

export type FiltersProp = {
    sortConfigs: { key: string, title: string, selected: boolean }[],
    facetList: (FilterInfo & {
        facetInfo: FilterOption[]
    })[]
} | undefined

export type RestrosProp = { info: TypeRestroCard }[] | undefined

interface FilteredRestroProps {
    filters: FiltersProp,
    restros: RestrosProp,
    nextRestrosOffset: string,
    restrosLoadType: "INFINITE" | "ON_CLICK"
}

const FilteredRestro = (props: FilteredRestroProps) => {

    const { APIBody, updateAPIBody } = useContext(FilterableRestroAPIBodyContext);

    useEffect(() => console.log(APIBody), [APIBody])

    useEffect(() => {

        updateAPIBody(
            {
                ...APIBody,
                lat: 1000,
                lng: 2000,
            }
        )

    }, [])

    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();

    const [showRestrosShimmer, setShowRestrosShimmer] = useState<boolean>(false);

    const [restros, setRestros] = useState<TypeRestroCard[] | undefined>(undefined);
    const [filters, setFilters] = useState<FiltersProp | undefined>(undefined);
    const [nextRestrosOffset, setNextRestrosOffset] = useState<string>("10");
    const loadMoreRestrosBtnRef = useRef<HTMLButtonElement | null>(null)

    // Set the restros, filters and nextRestrosOffset
    useEffect(() => {
        setRestros(props?.restros?.map(restro => restro?.info))
        setFilters(props.filters)
        setNextRestrosOffset(props.nextRestrosOffset ? props.nextRestrosOffset : "10")
    }, [props.restros, props.filters, props.nextRestrosOffset])

    // Assign Intersection Observer to Load more button
    useEffect(() => {
        // const observer = new IntersectionObserver(entries => {
        //     if (entries[0]?.isIntersecting && nextRestrosOffset !== "") updateAPICall("LOAD_MORE", APIRequestBody)
        // });

        // const btn = loadMoreRestrosBtnRef?.current;
        // if (btn) observer.observe(btn);

        // return () => {
        //     if (btn) observer.unobserve(btn);
        // };

    }, []);

    const updateAPICall = async (method: "UPDATE" | "LOAD_MORE", requestBody: TypeRestroFilterAPIBody) => {
        if (nextRestrosOffset === "") return

        try {
            const URL = device.isDesk ? CONSTANTS.API_RESTRO_UPDATE.desk : CONSTANTS.API_RESTRO_UPDATE.mob

            // Request options
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(requestBody)
            };

            if (method === "LOAD_MORE") {

                // Show restros shimmer
                setShowRestrosShimmer(true)

                // Send the request
                const response = await fetch(URL, requestOptions);
                const responseData = await response.json();

                // Add more retros to restros state
                setRestros(responseData?.data?.cards?.find((value: { card: { card: { id: string } } }) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: { info: object }) => restro?.info));

                // Update nextOffset
                setNextRestrosOffset(responseData?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo)

                // Hide restros shimmer
                setShowRestrosShimmer(false)
            }
            else {
                setFilters(undefined)
                setRestros(undefined)

                // Send the request
                const response = await fetch(URL, requestOptions);
                const responseData = await response.json();

                setFilters(responseData?.data?.cards?.find((value: { card: { card: { facetList: [] } } }) => value.card?.card?.facetList)?.card?.card);

                setRestros(responseData?.data?.cards?.find((value: { card: { card: { id: string } } }) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: { info: object }) => restro?.info));

                setNextRestrosOffset(responseData?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo)
            }

        } catch (error) {
            console.warn("Error:", error);
        }
    }

    return (
        <div className="container flex flex-col px-4">

            <button onClick={() => updateAPICall("UPDATE",)}>10</button>
            {/* <button onClick={() => updateAPICall("LOAD_MORE", APIRequestBody)}>20</button>
            <button onClick={() => updateAPICall("LOAD_MORE", APIRequestBody)}>40</button> */}

            {/* Filters */}
            <FilterableRestroAPIBodyContextProvider>
                {!filters ? <FilteredRestroFiltersShimmer /> : <FilteredRestroFilters filters={filters} />}
            </FilterableRestroAPIBodyContextProvider>

            {/* Restros */}
            <div className="restros lists grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5 no-scrollbar overflow-x-scroll overflow-y-hidden">
                {/* Restros Shimmer */}
                {!restros && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v: number) => <RestroCardShimmer key={v} />)}

                {(restros && restros?.length > 0) && restros?.map(restro => {
                    const link = `${routePaths.restaurants}/${[restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase()}`;

                    return (
                        <RestroCard
                            key={restro.id + restro.name + Math.random()}
                            imageId={restro.cloudinaryImageId}
                            offerHeader={restro.aggregatedDiscountInfoV3?.header ? restro.aggregatedDiscountInfoV3?.header : restro.aggregatedDiscountInfoV2?.header}
                            offerSubHeader={restro.aggregatedDiscountInfoV3?.subHeader}
                            name={restro.name}
                            avgRating={restro.avgRating}
                            cuisines={restro.cuisines}
                            areaName={restro.areaName}
                            link={link}
                        />
                    )
                })}

                {/* Restros Shimmer on load more */}
                {showRestrosShimmer && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v: number) => <RestroCardShimmer key={v} />)}
            </div>

            <button ref={loadMoreRestrosBtnRef} className='w-full lg:max-w-[300px] mt-[40px] mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 p-3'>Show More</button>
        </div>
    )
}

export default FilteredRestro