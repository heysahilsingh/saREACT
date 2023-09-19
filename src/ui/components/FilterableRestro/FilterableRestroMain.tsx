import { useContext, useEffect, useState, useRef } from 'react';
import CONSTANTS, { TypeRestroCard, TypeRestroFilterAPIBody } from '../../../constants';
import { RestroCardShimmer } from '../RestroCard';
import { FilterableRestroProps, FiltersProp } from './FilterableRestro';
import Filters from './filters/Filters';
import FiltersShimmer from './filters/FiltersShimmer';
import Restros from './restros/Restros';
import FilterableRestroAPIBodyContext from '../../../context/FilterableRestroAPIBodyContext';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { IconChevronDown } from '@tabler/icons-react';

const FilterableRestroMain = (props: FilterableRestroProps) => {
    const device = useDeviceDetect();

    const { APIBody } = useContext(FilterableRestroAPIBodyContext);
    const [isFetchingAPIData, setIsFetchingAPIData] = useState(false);

    const [restros, setRestros] = useState<TypeRestroCard[] | undefined>(props.restros?.map(restro => restro?.info));
    const [restroPH, setRestroPH] = useState<TypeRestroCard[] | undefined>(restros);
    const [filters, setFilters] = useState<FiltersProp | undefined>(props.filters);
    const [nextPageOffset, setNextPageOffset] = useState("10");

    const [isMoreRestrosLoading, setIsMoreRestrosLoading] = useState<boolean>(false);
    const [canFetchRestros, setCanFetchRestros] = useState<boolean>(true);
    const moreRestroLoadBtnRef = useRef<HTMLButtonElement | null>(null);
    const parentDivRef = useRef<HTMLDivElement | null>(null);

    // Assign an Intersection Observer to Load more button
    useEffect(() => {
        if (props.restrosListLoadType === "INFINITE" && !isFetchingAPIData && canFetchRestros) {
            const observer = new IntersectionObserver(entries => {
                if (entries[0]?.isIntersecting) {
                    if (APIBody.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo !== "") {
                        setIsFetchingAPIData(true);
                        fetchAPIData("LOAD_MORE", APIBody).finally(() => setIsFetchingAPIData(false));
                    }
                }
            });

            const btn = moreRestroLoadBtnRef?.current;
            if (btn) observer.observe(btn);

            return () => {
                if (btn) observer.unobserve(btn);
            };
        }
    }, [props.restrosListLoadType, isFetchingAPIData, APIBody]);

    // Fetch API Data Function
    const fetchAPIData = async (method: "UPDATE" | "LOAD_MORE", APIBody: TypeRestroFilterAPIBody) => {
        if (APIBody.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo === "") return

        try {
            const URL = device.isDesk ? CONSTANTS.API_RESTRO_UPDATE.desk : CONSTANTS.API_RESTRO_UPDATE.mob

            // Request options
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    ...APIBody,
                    widgetOffset: {
                        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: nextPageOffset,
                    }
                })
            };

            if (method === "LOAD_MORE" && canFetchRestros) {
                setIsMoreRestrosLoading(true)

                // Send the request
                const response = await fetch(URL, requestOptions);
                const responseData = await response.json();

                const responseMoreRestros = responseData?.data?.cards?.find((value: { card: { card: { id: string } } }) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: { info: object }) => restro?.info);

                const responseNextPageOffset = responseData?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo || "10";

                // Add more retros to restros state
                if (responseMoreRestros) {
                    setRestros((prev) => {
                        if (prev === undefined || responseMoreRestros.length < 1) {
                            return responseMoreRestros;
                        } else {
                            return [
                                ...prev,
                                ...responseMoreRestros
                            ];
                        }
                    });

                    if(!canFetchRestros) setCanFetchRestros(true)
                } else{
                    setCanFetchRestros(false)
                }

                // Update nextPageOffset
                setNextPageOffset(responseNextPageOffset)

                setIsMoreRestrosLoading(false)
            }
            else {
                // Scroll to parent Div
                if(parentDivRef.current) parentDivRef.current.scrollIntoView();

                setFilters(undefined)
                setRestros(undefined)

                // Send the request
                const response = await fetch(URL, requestOptions);
                const responseData = await response.json();

                const responseNewRestros = responseData?.data?.cards?.find((value: { card: { card: { id: string } } }) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: { info: object }) => restro?.info);

                const responseNewFilters = responseData?.data?.cards?.find((value: { card: { card: { facetList: [] } } }) => value.card?.card?.facetList)?.card?.card;

                const responseNextPageOffset = responseData?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo || "10";

                if (responseNewRestros) {
                    // Update restros state
                    setRestros((prev) => {
                        if (prev === undefined || responseNewRestros.length < 1) {
                            return responseNewRestros;
                        } else {
                            return [
                                ...prev,
                                ...responseNewRestros
                            ];
                        }
                    });

                    setRestroPH(responseNewRestros)
                } else {
                    setRestros(restroPH)
                }

                // Update filters state
                setFilters(responseNewFilters)

                // Update nextPageOffset
                setNextPageOffset(responseNextPageOffset)
            }

        } catch (error) {
            console.warn("Error:", error);
        }
    }

    return (
        <div ref={parentDivRef} className="container flex flex-col">
            {/* Filters */}
            {!filters ? <FiltersShimmer /> : <Filters filters={filters} fetchAPIData={fetchAPIData} filtersClasses={props.filtersClasses && props.filtersClasses} />}

            {/* Restros */}
            <div className={`${props.restrosClasses && props.restrosClasses} restros lists grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5 no-scrollbar overflow-x-scroll overflow-y-hidden`}>
                {/* Restros Shimmer */}
                {!restros && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => <RestroCardShimmer key={Math.random()} />)}

                {(restros && restros?.length > 0) && <Restros restros={restros} />}

                {isMoreRestrosLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(() => <RestroCardShimmer key={Math.random()} />)}
            </div>

            <button ref={moreRestroLoadBtnRef} onClick={() => fetchAPIData("LOAD_MORE", APIBody)} className='w-full lg:max-w-[300px] mt-[40px] mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 flex items-center justify-center gap-1 font-medium'>
                Show More
                <IconChevronDown />
            </button>
        </div>
    )
}

export default FilterableRestroMain