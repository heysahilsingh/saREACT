import { useContext, useState } from "react"
import LightBox from "../../LightBox"
import { FilterType, FiltersInterface } from "./Filters"
import FilterableRestroAPIBodyContext from "../../../../context/FilterableRestroAPIBodyContext"

interface MasterFiltersProps {
    filters: FiltersInterface,
    onApply: (APIFilters: object) => void,
    onClose: () => void
}

const MasterFilters = (props: MasterFiltersProps) => {

    // Default Filter
    const [defaultFilter, setDefaultFilter] = useState(props.filters.sortAttribute);

    const { APIBody } = useContext(FilterableRestroAPIBodyContext);

    const [APIFilters, setAPIFilters] = useState({ ...APIBody.filters });


    const handleFilterSelection = (args: { parentId: string, childId: string, target: "SORT_ATTR" | "FACET" }) => {
        let updateFilters = {};

        // If arg's target is "SORT_ATTR"
        if (args.target === "SORT_ATTR") {
            updateFilters = { sortAttribute: args.childId };
        }

        // If arg's target is "FACET"
        else if (args.target === "FACET") {
            const updatedFacets: Record<string, Array<{ value: string }>> = { ...APIBody.filters.facets };

            // Add filter if not exists in APIBody's filters
            if (!(args.parentId in updatedFacets)) {
                updatedFacets[args.parentId] = [];
            }

            // Find filter's array
            const parentArray = updatedFacets[args.parentId];
            // find filter option in filter
            const foundIndex = parentArray.findIndex(option => option.value === args.childId);

            // If filter option already in filter's array, remove that option
            if (foundIndex !== -1) parentArray.splice(foundIndex, 1);
            // Else add that option
            else parentArray.push({ value: args.childId });

            updateFilters = { facets: updatedFacets };
        }

        // Update API Body
        setAPIFilters({
            ...APIFilters,
            ...updateFilters,
        });
    };

    // On Apply
    const onApplyHandler = () => {
        props.onClose()
        props.onApply(APIFilters)
    }

    // Print Filters Option for Master Filter
    const printFilterOptions = (filter: FilterType | undefined) => {
        const filterInputType = filter?.filterInfo?.selection === "SELECT_TYPE_MULTISELECT" ? "checkbox" : "radio";

        return (
            <div className="content flex flex-col px-[12px] pb-[24px] grow text-[14px] lg:px-[20px]">
                <p className="uppercase mt-[15px] mb-[12px]">{filter?.filterInfo?.subLabel}</p>
                <div className="options h-[100px] grow">
                    <div className="overflow-scroll no-scrollbar flex flex-col gap-[16px] justify-start items-start h-full pl-1">
                        {filter?.filterOptions?.map(option => (
                            <span className="flex gap-2 items-center" key={option.id}>
                                <input
                                    type={filterInputType}
                                    name="filteroptions"
                                    id={option.id}
                                    defaultChecked={(() => {
                                        if (filter.filterInfo?.id) {
                                            if (filter.filterInfo.id === "sortAttribute") {
                                                if (option.id === APIFilters.sortAttribute) return true
                                            }
                                            else {
                                                if (APIFilters.facets[filter.filterInfo.id].some(optn => optn.value === option.id)) return true
                                            }
                                        }
                                    })()}

                                    onChange={() => {
                                        if (filter.filterInfo?.id && option.id) {
                                            handleFilterSelection({
                                                parentId: filter.filterInfo?.id,
                                                childId: option.id,
                                                target: filter.filterInfo.id === "sortAttribute" ? "SORT_ATTR" : "FACET"
                                            })
                                        }
                                    }}
                                />
                                <label htmlFor={option.id}>{option.label}</label>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (props.filters.sortAttribute) {
        return (
            <LightBox
                wrapperClasses="flex items-end justify-start lg:items-center lg:justify-center z-20 w-full overflow-hidden"
                closeBtnClasses="top-[5vw] right-[5vw] h-[35px] w-[35px] text-black bg-white opacity-80 rounded-full shadow-md p-1.5 leading-none lg:top-[19%] lg:right-[23%] dark:bg-zinc-900 dark:text-zinc-400"
                onClose={props.onClose}
            >
                <div className="filters flex flex-col w-full max-h-[75vh] h-[75vh] rounded-t-[25px] overflow-hidden bg-white dark:bg-zinc-900 lg:m-auto lg:rounded-[25px] lg:w-[55vw] lg:max-h-[65vh] lg-h-[65vh]">
                    {/* Heading */}
                    <div className="border-b py-4 px-6 font-bold text-xl dark:border-zinc-800">Filters</div>

                    {/* Filters */}
                    <div className="flex min-h-[50px] grow">
                        <div className="headings heading no-scrollbar overflow-scroll flex flex-col border-r dark:border-zinc-800 w-[45%] lg:w-[30%]">
                            <ul>
                                {Object.keys(props.filters).map(filterKey => {

                                    const filter = props.filters[filterKey as keyof FiltersInterface];

                                    if ((filter?.filterInfo?.id && filter?.filterOptions?.length) ?? 0 > 0) {
                                        return (
                                            <li
                                                className="cursor-pointer font-bold text-zinc-500 py-[18px] px-[24px]"
                                                key={filter?.filterInfo?.id}
                                                onClick={() => setDefaultFilter(filter)}
                                            >{filter?.filterInfo?.label}</li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                        {printFilterOptions(defaultFilter)}
                    </div>

                    {/* Apply Filters Button */}
                    <div className="apply flex gap-6 font-bold bg-white dark:bg-zinc-800 w-full justify-end py-3 px-5 shadow-[0_0px_10px_0px_rgba(40,44,63,0.1)]">
                        <button onClick={onApplyHandler} className="text-primary">Clear Filters</button>
                        <button onClick={onApplyHandler} className="text-white bg-primary rounded-xl py-2.5 px-6">Apply</button>
                    </div>
                </div>
            </LightBox>
        )
    }
}

export default MasterFilters