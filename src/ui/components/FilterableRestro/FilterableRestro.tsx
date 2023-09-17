import { TypeRestroCard } from "../../../constants"
import { FilterableRestroAPIBodyContextProvider } from "../../../context/FilterableRestroAPIBodyContext"
import FilterableRestroMain from "./FilterableRestroMain"

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

export interface FilterableRestroProps {
    filters: FiltersProp,
    restros: RestrosProp,
    restrosListLoadType: "INFINITE" | "ON_CLICK"
}

const FilterableRestro = (props: FilterableRestroProps) => {
    // console.log("FilterableRestro");


    if (props.filters && props.restros) {
        return (
            <FilterableRestroAPIBodyContextProvider>
                <FilterableRestroMain
                    filters={props.filters}
                    restros={props.restros}
                    restrosListLoadType={"INFINITE"}
                />
            </FilterableRestroAPIBodyContextProvider>
        )
    }
}

export default FilterableRestro