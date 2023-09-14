import { useEffect, useState } from "react"
import { FilterOption, FilterType } from "./RestroFilters"
import OpenFiltersButton from "./OpenFilterButton"
import { IconChevronDown } from "@tabler/icons-react"
import LightBox from "../LightBox"

interface SortByFilterProps {
    sortFilter: FilterType | undefined,
    onApply: (selectedOption: FilterOption | undefined) => void
}

const SortByFilter = (props: SortByFilterProps) => {

    const [sortFilterText, setSortFilterText] = useState<string | undefined>("Sort by");
    const [showFilterContainer, setShowFilterContainer] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<FilterOption | undefined>(undefined);

    useEffect(() => {
        setSelectedOption(
            props.sortFilter?.filterOptions?.find(option => option.selected === true)
        )
    }, [props.sortFilter])

    const handleOptionSelection = (selection: FilterOption) => setSelectedOption(selection)

    const handleApply = () => {
        selectedOption?.id !== "relevance" ? setSortFilterText(selectedOption?.label) : setSortFilterText("Sort by")
        props.onApply && props.onApply(selectedOption)
        setShowFilterContainer(false)
    }

    return (
        <>
            {showFilterContainer && props.sortFilter && (
                <LightBox
                    onClose={() => setShowFilterContainer(false)}
                    wrapperClasses="flex items-center justify-center z-20 h-full w-full p-10"
                    closeBtnClasses="top-3 right-3 lg:top-8 lg:right-8 text-white"
                >
                    <div className="shadow-xl w-max rounded-[15px] border-2 border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 flex flex-col z-10 text-left">
                        <div className="flex leading-[120%] flex-col gap-6 py-6 px-4">
                            {props.sortFilter?.filterOptions?.map(option => {
                                return (
                                    <div key={option.id} className="flex justify-between items-center gap-6">
                                        <label className="grow" htmlFor={option.id}>{option.label}</label>
                                        <input
                                            type={props.sortFilter?.filterInfo?.selection === "SELECT_TYPE_MULTISELECT" ? "checkbox" : "radio"}
                                            id={option.id}
                                            name="sortBy"
                                            checked={selectedOption?.id === option.id}
                                            onChange={() => handleOptionSelection(option)}
                                        />
                                    </div>

                                )
                            })}
                        </div>
                        <button onClick={() => handleApply()} className="p-4 text-primary border-t-2 border-zinc-200 dark:border-zinc-800">Apply</button>
                    </div>

                </LightBox>
            )}

            <OpenFiltersButton isPreSelected={false} onClick={() => setShowFilterContainer(true)} isSelectable={false}>
                {sortFilterText}
                <IconChevronDown className="text-zinc-700 dark:text-zinc-400" size={16} />
            </OpenFiltersButton>
        </>
    )
}

export default SortByFilter