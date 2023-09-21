import { TypeRestaurantInformation } from "../../../constants"
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

export type RestrosProp = { info: TypeRestaurantInformation }[] | undefined

export interface FilterableRestroProps {
    filters: FiltersProp,
    restros: RestrosProp,
    filtersClasses?: string,
    restrosClasses?: string,
    restrosListLoadType: "INFINITE" | "ON_CLICK"
}

const FilterableRestro = (props: FilterableRestroProps) => {
    if (props.filters && props.restros) {
        return (
            <FilterableRestroAPIBodyContextProvider>
                <FilterableRestroMain
                    filters={props.filters}
                    restros={props.restros}
                    filtersClasses={props.filtersClasses && props.filtersClasses} 
                    restrosClasses={props.restrosClasses && props.restrosClasses}
                    restrosListLoadType={props.restrosListLoadType}
                />
            </FilterableRestroAPIBodyContextProvider>
        )
    }
}

export default FilterableRestro