import { useContext, useEffect, useState } from "react"
import OpenFiltersButton from "./OpenFilterButton"
import { IconAdjustmentsHorizontal } from "@tabler/icons-react"
import MasterFilters from "./MasterFilters"
import SortByFilter from "./SortByFilter"
import CONSTANTS from "../../../constants"
import UserContext from "../../../context/UserContext"


type FilterInfo = {
    id: string | undefined,
    label: string | undefined,
    subLabel: string | undefined,
    selectionType: "SELECT_TYPE_MULTISELECT" | "SELECT_TYPE_SINGLESELECT" | undefined,
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
    sortBy: FilterType | undefined,
    deliveryTime: FilterType | undefined,
    cuisines: FilterType | undefined,
    explore: FilterType | undefined,
    ratings: FilterType | undefined,
    vegNonveg: FilterType | undefined,
    offers: FilterType | undefined,
    costForTwo: FilterType | undefined
}

interface RestroFiltersProps {
    data: {
        sortConfigs: { key: string, title: string, selected: boolean }[],
        facetList: {
            id: string | undefined,
            label: string | undefined,
            subLabel: string | undefined,
            selection: "SELECT_TYPE_MULTISELECT" | "SELECT_TYPE_SINGLESELECT" | undefined,
            facetInfo: FilterOption[]
        }[],
    }
}

const RestroFIlters = (props: RestroFiltersProps) => {

    const { userInfo } = useContext(UserContext);

    // ActiveFilters
    const ActiveFilters: FilterOption[] = [];

    // Filters Data
    const [filters, setFilters] = useState<FiltersInterface>({
        sortBy: undefined,
        deliveryTime: undefined,
        cuisines: undefined,
        explore: undefined,
        ratings: undefined,
        vegNonveg: undefined,
        offers: undefined,
        costForTwo: undefined

    })

    const [showMasterFilter, setShowMasterFilter] = useState<boolean>(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

    useEffect(() => {

        const deliveryFilter = props?.data?.facetList?.find(filter => filter.id === "deliveryTime");
        const cuisinesFilter = props?.data?.facetList?.find(filter => filter.id === "catalog_cuisines");
        const exploreFilter = props?.data?.facetList?.find(filter => filter.id === "explore");
        const ratingsFilter = props?.data?.facetList?.find(filter => filter.id === "rating");
        const vegNonVegFilter = props?.data?.facetList?.find(filter => filter.id === "isVeg");
        const offersFilter = props?.data?.facetList?.find(filter => filter.id === "restaurantOfferMultiTd");
        const costForTwoFilter = props?.data?.facetList?.find(filter => filter.id === "costForTwo");


        setFilters({
            sortBy: {
                filterOptions: props?.data?.sortConfigs?.map(value => {
                    return {
                        id: value?.key,
                        label: value?.title,
                        openFilter: undefined,
                        selected: value.selected ? true : false
                    }
                }),
                filterInfo: {
                    id: "sortAttribute",
                    label: "Sort by",
                    subLabel: "Sort by",
                    selectionType: "SELECT_TYPE_SINGLESELECT"
                }
            },
            deliveryTime: {
                filterInfo: {
                    id: deliveryFilter?.id,
                    label: deliveryFilter?.label,
                    subLabel: deliveryFilter?.subLabel,
                    selectionType: deliveryFilter?.selection
                },
                filterOptions: deliveryFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: false
                    }
                })
            },
            cuisines: {
                filterInfo: {
                    id: cuisinesFilter?.id,
                    label: cuisinesFilter?.label,
                    subLabel: cuisinesFilter?.subLabel,
                    selectionType: cuisinesFilter?.selection
                },
                filterOptions: cuisinesFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: false
                    }
                })
            },
            explore: {
                filterInfo: {
                    id: exploreFilter?.id,
                    label: exploreFilter?.label,
                    subLabel: exploreFilter?.subLabel,
                    selectionType: exploreFilter?.selection
                },
                filterOptions: exploreFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: false
                    }
                })
            },
            ratings: {
                filterInfo: {
                    id: ratingsFilter?.id,
                    label: ratingsFilter?.label,
                    subLabel: ratingsFilter?.subLabel,
                    selectionType: ratingsFilter?.selection
                },
                filterOptions: ratingsFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: false
                    }
                })
            },
            vegNonveg: {
                filterInfo: {
                    id: vegNonVegFilter?.id,
                    label: vegNonVegFilter?.label,
                    subLabel: vegNonVegFilter?.subLabel,
                    selectionType: vegNonVegFilter?.selection
                },
                filterOptions: vegNonVegFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: false
                    }
                })
            },
            offers: {
                filterInfo: {
                    id: offersFilter?.id,
                    label: offersFilter?.label,
                    subLabel: offersFilter?.subLabel,
                    selectionType: offersFilter?.selection
                },
                filterOptions: offersFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: false
                    }
                })
            },
            costForTwo: {
                filterInfo: {
                    id: costForTwoFilter?.id,
                    label: costForTwoFilter?.label,
                    subLabel: costForTwoFilter?.subLabel,
                    selectionType: costForTwoFilter?.selection
                },
                filterOptions: costForTwoFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter,
                        selected: false
                    }
                })
            },
        })

    }, [props?.data])


    // Handle activeFilterCount
    const handleActiveFiltersCount = (count: number) => {
        setActiveFiltersCount(prev => prev + count)
    }

    // Return Filtered Restro List
    const filterRestro = async () => {
        try {
            console.log(ActiveFilters);

            // https://www.swiggy.com/api/seo/getListing?lat=28.65420&lng=77.23730

            const URL = `${CONSTANTS.API_RESTRO_FILTERED}lat=${userInfo.location.cityInfo.latitude}&lng=${userInfo.location.cityInfo.longitude}`;

            const response = await fetch(URL,)

            const responseData = await response.json();




            console.log(responseData);

        } catch (error) {
            console.log(error);
        }
    }

    if (filters.sortBy) {
        return (
            <div className="filters sticky lg:top-0 top-[64px] z-10 bg-white dark:bg-neutral-950 py-3 lg:py-6">
                <div className="flex gap-2 items-center no-scrollbar overflow-scroll">

                    {/* Master Filter */}
                    {showMasterFilter && (
                        <MasterFilters filters={filters} onClose={() => setShowMasterFilter(false)} />
                    )}

                    {/* Master Filter Button */}
                    <OpenFiltersButton
                        isSelectable={false}
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
                        filters={filters}
                        onApply={(data) => console.log(data)}
                    />

                    {/* Open Filters */}
                    {Object.keys(filters).map((filterKey) => {
                        if (filterKey !== "cuisines") {
                            const openFilter = filters[filterKey as keyof FiltersInterface]?.filterOptions?.filter(option => option.openFilter === true);
                            return openFilter?.map(filter => {
                                return (
                                    <OpenFiltersButton
                                        isSelectable={true}
                                        key={filter?.id}
                                        onSelect={() => { handleActiveFiltersCount(1); filterRestro() }}
                                        onDeSelect={() => { handleActiveFiltersCount(-1); filterRestro() }}
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

export default RestroFIlters