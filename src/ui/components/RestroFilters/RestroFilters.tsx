import { useEffect, useState } from "react"


type FilterInfo = {
    id: string | undefined,
    label: string | undefined,
    subLabel: string | undefined,
    openFilter: boolean | undefined,
    selected: boolean | undefined,
    selectionType: "SELECT_TYPE_MULTISELECT" | "SELECT_TYPE_SINGLESELECT" | undefined,
}

type FilterOption = {
    id: string | undefined,
    label: string | undefined,
    openFilter: boolean | undefined,
}

type FilterType = {
    filterInfo: FilterInfo | undefined,
    filterOptions: FilterOption[] | undefined,
}

interface FiltersInterface {
    sortBy: FilterType | undefined,
    deliveryTime: FilterType | undefined,
    // cuisines: FilterType | undefined,
    // explore: FilterType | undefined,
    // ratings: FilterType | undefined,
    // vegNonveg: FilterType | undefined,
    // offers: FilterType | undefined,
    // costForTwo: FilterType | undefined
}

interface RestroFiltersProps {
    data: {
        sortConfigs: { key: string, title: string }[],
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

    // Filters Data
    const [filters, setFilters] = useState<FiltersInterface>({
        sortBy: undefined,
        deliveryTime: undefined,
        // cuisines: undefined,
        // explore: undefined,
        // ratings: undefined,
        // vegNonveg: undefined,
        // offers: undefined,
        // costForTwo: undefined

    })

    useEffect(() => {

        const deliveryFilter = props?.data?.facetList?.find(filter => filter.id === "deliveryTime");
        const cuisinesFilter = props?.data?.facetList?.find(filter => filter.id === "catalog_cuisines");
        const exploreFilter = props?.data?.facetList?.find(filter => filter.id === "explore");
        const ratingsFilter = props?.data?.facetList?.find(filter => filter.id === "rating");
        const isVegFilter = props?.data?.facetList?.find(filter => filter.id === "isVeg");
        const offersFilter = props?.data?.facetList?.find(filter => filter.id === "restaurantOfferMultiTd");
        const costForTwoFilter = props?.data?.facetList?.find(filter => filter.id === "costForTwo");


        setFilters({
            sortBy: {
                filterOptions: props?.data?.sortConfigs?.map(value => {
                    return {
                        id: value?.key,
                        label: value?.title,
                        openFilter: undefined
                    }
                }),
                filterInfo: {
                    id: undefined,
                    label: "Sort by",
                    subLabel: "Sort by",
                    openFilter: undefined,
                    selected: undefined,
                    selectionType: "SELECT_TYPE_SINGLESELECT"
                }
            },
            deliveryTime: {
                filterInfo: {
                    id: deliveryFilter?.id,
                    label: deliveryFilter?.label,
                    subLabel: deliveryFilter?.subLabel,
                    openFilter: false,
                    selected: false,
                    selectionType: deliveryFilter?.selection
                },
                filterOptions: deliveryFilter?.facetInfo?.map(v => {
                    return {
                        id: v?.id,
                        label: v?.label,
                        openFilter: v?.openFilter
                    }
                })
            }
        })

        console.log(filters);

        console.log(


        );

        // console.log(props?.data?.sortConfigs);

    }, [props.data])


    return (
        <div className="">Rstro FIlters</div>
    )
}

export default RestroFIlters