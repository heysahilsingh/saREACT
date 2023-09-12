

type FilterInfo = {
    id: string,
    label: string,
    subLabel: string,
    openFIlter: boolean,
    selected: boolean,
    selectionType: "SELECT_TYPE_MULTISELECT" | "SELECT_TYPE_SINGLESELECT"
}

type FilterOption = {
    id: string,
    label: string,
    openFilter: boolean
}

type FilterType = {
    FilterInfo: FilterInfo,
    FilterOptions: FilterOption[]
}

interface FiltersInterface {
   sortBy: FilterType,
//    seliveryTime: FilterType,
//    cuisines : FilterType,
//    explore: FilterType,
//    ratings: FilterType,
//    vegNonveg: FilterType,
//    offers: FilterType,
//    costForTwo: FilterType
}

interface RestroFiltersProps {
    data: object
}

const RestroFIlters = (props: RestroFiltersProps) => {

    console.log(props?.data);

    return (
        <div className="">Rstro FIlters</div>
    )
}

export default RestroFIlters