import { useContext, useEffect, useState, useRef } from 'react';
import CONSTANTS, { TypeRestroCard } from '../../../constants';
import { RestroCardShimmer } from '../RestroCard';
import { FilterableRestroProps, FiltersProp } from './FilterableRestro';
import Filters from './filters/Filters';
import FiltersShimmer from './filters/FiltersShimmer';
import Restros from './restros/Restros';
import FilterableRestroAPIBodyContext from '../../../context/FilterableRestroAPIBodyContext';
import useDeviceDetect from '../../../hooks/useDeviceDetect';

const FilterableRestroMain = (props: FilterableRestroProps) => {

    console.log("FilterableRestroMain");


    const device = useDeviceDetect();

    const { APIBody, updateAPIBody } = useContext(FilterableRestroAPIBodyContext);
    const [fetchingAPIData, setFetchingAPIData] = useState(false);
    useEffect(() => console.log(APIBody.filters), [APIBody])

    const [restros, setRestros] = useState<TypeRestroCard[] | undefined>(props.restros?.map(restro => restro?.info));
    const [filters, setFilters] = useState<FiltersProp | undefined>(props.filters);

    const [isMoreRestrosLoading, setIsMoreRestrosLoading] = useState<boolean>(false);
    const moreRestroLoadBtnRef = useRef<HTMLButtonElement | null>(null);

    // Assign Intersection Observer to Load more button
    useEffect(() => {
        if (props.restrosListLoadType === "INFINITE" && !fetchingAPIData) {
            const observer = new IntersectionObserver(entries => {
                if (entries[0]?.isIntersecting) {
                    if (APIBody.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo !== "") {
                        setFetchingAPIData(true);
                        fetchAPIData("LOAD_MORE").finally(() => setFetchingAPIData(false));
                    }
                }
            });

            const btn = moreRestroLoadBtnRef?.current;
            if (btn) observer.observe(btn);

            return () => {
                if (btn) observer.unobserve(btn);
            };
        }
    }, [props.restrosListLoadType, fetchingAPIData]);

    // Fetch API Data Function
    const fetchAPIData = async (method: "UPDATE" | "LOAD_MORE") => {
        console.log("fetchAPIData function called");

        if (APIBody.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo === "") return

        updateAPIBody({
            ...APIBody,
            filters: {
                ...APIBody.filters,
                sortAttribute: "modelBasedRatingDesc"
            }
        })

        try {
            const URL = device.isDesk ? CONSTANTS.API_RESTRO_UPDATE.desk : CONSTANTS.API_RESTRO_UPDATE.mob

            // Request options
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(APIBody)
            };

            if (method === "LOAD_MORE") {
                setIsMoreRestrosLoading(true)

                // Send the request
                const response = await fetch(URL, requestOptions);
                const responseData = await response.json();

                const moreRestros = responseData?.data?.cards?.find((value: { card: { card: { id: string } } }) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: { info: object }) => restro?.info);

                const nextPageOffset = responseData?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo || "10";

                // Add more retros to restros state
                setRestros((prev) => {
                    if (prev === undefined || moreRestros.length < 1) {
                        return moreRestros;
                    } else {
                        return [
                            ...prev,
                            ...moreRestros
                        ];
                    }
                });

                // Update APIBody's nextPageOffset
                updateAPIBody({
                    ...APIBody,
                    widgetOffset: {
                        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: nextPageOffset
                    }
                })

                setIsMoreRestrosLoading(false)
            }
            else {
                setFilters(undefined)
                setRestros(undefined)

                // Send the request
                const response = await fetch(URL, requestOptions);
                const responseData = await response.json();

                const newRestros = responseData?.data?.cards?.find((value: { card: { card: { id: string } } }) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: { info: object }) => restro?.info);

                const newFilters = responseData?.data?.cards?.find((value: { card: { card: { facetList: [] } } }) => value.card?.card?.facetList)?.card?.card;

                const nextPageOffset = responseData?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo || "10";

                // Update restros state
                setRestros((prev) => {
                    if (prev === undefined || newRestros.length < 1) {
                        return newRestros;
                    } else {
                        return [
                            ...prev,
                            ...newRestros
                        ];
                    }
                });

                // Update filters state
                setFilters(newFilters)

                // Update APIBody's nextPageOffset
                updateAPIBody({
                    ...APIBody,
                    widgetOffset: {
                        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: nextPageOffset
                    }
                })
            }

        } catch (error) {
            console.warn("Error:", error);
        }
    }

    return (
        <div className="container flex flex-col px-4">

            <button onClick={() => fetchAPIData("UPDATE")} className='fixed bg-primary text-white py-3 px-5 border z-50 bottom-4 right-40'>UPDATE</button>
            <button onClick={() => fetchAPIData("LOAD_MORE")} className='fixed bg-primary text-white py-3 px-5 border z-50 bottom-4 right-4'>LOAD MORE</button>

            {/* Filters */}
            {!filters ? <FiltersShimmer /> : <Filters filters={filters} fetchFunction={fetchAPIData} />}

            {/* Restros */}
            <div className="restros lists grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5 no-scrollbar overflow-x-scroll overflow-y-hidden">
                {/* Restros Shimmer */}
                {!restros && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => <RestroCardShimmer key={Math.random()} />)}

                {(restros && restros?.length > 0) && <Restros restros={restros} />}

                {isMoreRestrosLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => <RestroCardShimmer key={Math.random()} />)}
            </div>

            <button ref={moreRestroLoadBtnRef} onClick={() => fetchAPIData("LOAD_MORE")} className='w-full lg:max-w-[300px] mt-[40px] mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 p-3'>Show More</button>
        </div>
    )
}

export default FilterableRestroMain