import { useEffect, useState } from "react"
import OpenFiltersButton from "./OpenFilterButton"
import { IconAdjustmentsHorizontal } from "@tabler/icons-react"
import MasterFilters from "./MasterFilters"
import SortByFilter from "./SortByFilter"
import useDeviceDetect from "../../../../hooks/useDeviceDetect"
import CONSTANTS, { TypeRestroCard } from "../../../../constants"
import { FiltersProp } from "../FilteredRestro"


type FilterInfo = {
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

export type FilterType = {
    filterInfo: FilterInfo | undefined,
    filterOptions: FilterOption[] | undefined,
}

export interface FiltersInterface {
    sortAttribute: FilterType | undefined,
    deliveryTime: FilterType | undefined,
    catalog_cuisines: FilterType | undefined,
    explore: FilterType | undefined,
    rating: FilterType | undefined,
    isVeg: FilterType | undefined,
    restaurantOfferMultiTd: FilterType | undefined,
    costForTwo: FilterType | undefined
}

interface FilteredRestroFiltersProps {
    filters: FiltersProp | undefined,
    setFilters: (filters: FiltersProp | undefined) => void,
    setRestro: (restros: TypeRestroCard[] | undefined) => void,
}

const FilteredRestroFilters = (props: FilteredRestroFiltersProps) => {

    const device = useDeviceDetect();

    // Filters Data
    const [filters, setFilters] = useState<FiltersInterface>({
        sortAttribute: undefined,
        deliveryTime: undefined,
        catalog_cuisines: undefined,
        explore: undefined,
        rating: undefined,
        isVeg: undefined,
        restaurantOfferMultiTd: undefined,
        costForTwo: undefined

    })

    // const [filterfetchBody]

    const [showMasterFilter, setShowMasterFilter] = useState<boolean>(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

    useEffect(() => {

        const deliveryFilter = props.filters?.facetList?.find(filter => filter.id === "deliveryTime");
        const cuisinesFilter = props.filters?.facetList?.find(filter => filter.id === "catalog_cuisines");
        const exploreFilter = props.filters?.facetList?.find(filter => filter.id === "explore");
        const ratingsFilter = props.filters?.facetList?.find(filter => filter.id === "rating");
        const vegNonVegFilter = props.filters?.facetList?.find(filter => filter.id === "isVeg");
        const offersFilter = props.filters?.facetList?.find(filter => filter.id === "restaurantOfferMultiTd");
        const costForTwoFilter = props.filters?.facetList?.find(filter => filter.id === "costForTwo");


        setFilters({
            sortAttribute: {
                filterOptions: props.filters?.sortConfigs?.map(value => {
                    return {
                        id: value?.key,
                        label: value?.title,
                        openFilter: false,
                        selected: value.selected ? true : false
                    }
                }),
                filterInfo: {
                    id: "sortAttribute",
                    label: "Sort by",
                    subLabel: "Sort by",
                    selection: "SELECT_TYPE_SINGLESELECT"
                }
            },
            deliveryTime: {
                filterInfo: {
                    id: deliveryFilter?.id,
                    label: deliveryFilter?.label,
                    subLabel: deliveryFilter?.subLabel,
                    selection: deliveryFilter?.selection
                },
                filterOptions: deliveryFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: v?.selected
                    }
                })
            },
            catalog_cuisines: {
                filterInfo: {
                    id: cuisinesFilter?.id,
                    label: cuisinesFilter?.label,
                    subLabel: cuisinesFilter?.subLabel,
                    selection: cuisinesFilter?.selection
                },
                filterOptions: cuisinesFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: v?.selected
                    }
                })
            },
            explore: {
                filterInfo: {
                    id: exploreFilter?.id,
                    label: exploreFilter?.label,
                    subLabel: exploreFilter?.subLabel,
                    selection: exploreFilter?.selection
                },
                filterOptions: exploreFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: v?.selected
                    }
                })
            },
            rating: {
                filterInfo: {
                    id: ratingsFilter?.id,
                    label: ratingsFilter?.label,
                    subLabel: ratingsFilter?.subLabel,
                    selection: ratingsFilter?.selection
                },
                filterOptions: ratingsFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: v?.selected
                    }
                })
            },
            isVeg: {
                filterInfo: {
                    id: vegNonVegFilter?.id,
                    label: vegNonVegFilter?.label,
                    subLabel: vegNonVegFilter?.subLabel,
                    selection: vegNonVegFilter?.selection
                },
                filterOptions: vegNonVegFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: v?.selected
                    }
                })
            },
            restaurantOfferMultiTd: {
                filterInfo: {
                    id: offersFilter?.id,
                    label: offersFilter?.label,
                    subLabel: offersFilter?.subLabel,
                    selection: offersFilter?.selection
                },
                filterOptions: offersFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: v?.selected
                    }
                })
            },
            costForTwo: {
                filterInfo: {
                    id: costForTwoFilter?.id,
                    label: costForTwoFilter?.label,
                    subLabel: costForTwoFilter?.subLabel,
                    selection: costForTwoFilter?.selection
                },
                filterOptions: costForTwoFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: v?.selected
                    }
                })
            },
        })

    }, [props.filters])

    // Handle Active Filter Count
    useEffect(() => {

        // Function to set ActiveFilterCount
        function handleActiveFilterCount(obj: FiltersInterface) {

            for (const key in obj) {
                const filterOptions = obj[key as keyof FiltersInterface]?.filterOptions;
                if (filterOptions) {
                    if (filterOptions.some(option => option.selected && option.id !== "relevance")) {
                        setActiveFiltersCount(prev => prev + 1)
                    }
                }
            }
        }

        handleActiveFilterCount(filters);

    }, [filters])


    // Return Filtered Restro List
    const FilterApplied = async (count: number) => {
        try {

            props.setFilters(undefined)
            props.setRestro(undefined)

            const URL = device.isDesk ? CONSTANTS.API_RESTRO_UPDATE.desk : CONSTANTS.API_RESTRO_UPDATE.mob

            const requestBody = {
                "filters": {
                    "isFiltered": true,
                    "facets": {
                        "deliveryTime": [
                        ],
                        "isVeg": [
                            {
                                "value": "isVegfacetquery2"
                            }
                        ],
                        "restaurantOfferMultiTd": [
                            {
                                "value": "restaurantOfferMultiTdfacetquery3"
                            }
                        ],
                        "costForTwo": [
                            {
                                "value": "costForTwofacetquery5"
                            }
                        ],
                        "rating": [
                            {
                                "value": "ratingfacetquery4"
                            }
                        ],
                        "catalog_cuisines": [
                            {
                                "value": "query_biryani"
                            },
                            {
                                "value": "query_barbecue"
                            },
                            {
                                "value": "query_beverages"
                            },
                            {
                                "value": "query_chinese"
                            },
                            {
                                "value": "query_desserts"
                            }
                        ]
                    },
                    "sortAttribute": "deliveryTimeAsc"
                },
                "lat": 28.410492,
                "lng": 77.0463719,
                "widgetOffset": {
                    "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": `${count}`,
                },
            }

            // Request options
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(requestBody)
            };

            // Send the request
            const response = await fetch(URL, requestOptions);
            const responseData = await response.json();

            props.setFilters(responseData?.data?.cards?.find((value: {card: {card: {facetList: []}}}) => value.card?.card?.facetList)?.card?.card);
            props.setRestro(responseData?.data?.cards?.find((value: {card: {card: {id: string}}}) => value.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restro: {info: object}) => restro?.info));

        } catch (error) {
            console.error("Error:", error);
        }
    };

    if ((filters?.sortAttribute?.filterOptions || []).length > 0) {
        return (
            <div className="filters sticky lg:top-0 top-[0] z-10 bg-white dark:bg-neutral-950 py-3 lg:py-6">
                <div className="flex gap-2 items-center no-scrollbar overflow-scroll">

                    <button onClick={() => FilterApplied(13)}>First: 13</button>
                    <button onClick={() => FilterApplied(25)}>Next: 25</button>

                    {/* Master Filter */}
                    {showMasterFilter && (
                        <MasterFilters filters={filters} onClose={() => setShowMasterFilter(false)} />
                    )}

                    {/* Master Filter Button */}
                    <OpenFiltersButton
                        isSelectable={false}
                        isPreSelected={false}
                        onClick={() => setShowMasterFilter(true)}
                        className={`${activeFiltersCount > 0 ? "border-zinc-400 bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-600" : "border-zinc-200 bg-transparent dark:border-zinc-800"}`}>
                        {activeFiltersCount > 0 && (
                            <div className="active-filters bg-primary rounded-full w-4 h-4 relative">
                                <span className="text-[10px] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 leading-none text-white">{activeFiltersCount}</span>
                            </div>
                        )}
                        Filters
                        <IconAdjustmentsHorizontal className="text-zinc-700 dark:text-zinc-400" size={15} />
                    </OpenFiltersButton>

                    {/* Sort by FIlter */}
                    <SortByFilter
                        sortFilter={filters?.sortAttribute}
                        onApply={(data) => console.log(data)}
                    />

                    {/* Open Filters */}
                    {Object.keys(filters).map((filterKey) => {
                        if (filterKey !== "catalog_cuisines") {
                            const openFilter = filters[filterKey as keyof FiltersInterface]?.filterOptions?.filter(option => option.openFilter === true);
                            return openFilter?.map(filter => {
                                return (
                                    <OpenFiltersButton
                                        isSelectable={true}
                                        isPreSelected={filter.selected ? true : false}
                                        key={filter?.id}
                                        onSelect={() => FilterApplied(13)}
                                        onDeSelect={() => FilterApplied(25)}
                                    >
                                        {filter?.label}
                                    </OpenFiltersButton>
                                )
                            });
                        }
                        return null;
                    })}

                </div>
            </div>
        )
    }
}

export default FilteredRestroFilters