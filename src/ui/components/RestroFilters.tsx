import { useState } from "react";

export type FilterOptions = {
    id: string,
    key: string,
    label: string,
    subLabel: string,
    title: string,
    selected: boolean,
    selection: string,
    defaultSelection: boolean,
    openFilter: boolean,
    facetInfo: FilterOptions[]
}

type FilterOptionsFunction = {
    options: FilterOptions[],
    input: "CHECKBOX" | "RADIO"
}

interface RestroFiltersProps {
    data: {
        facetList: FilterOptions[],
        sortConfigs: FilterOptions[]
    } | null,
    onApply: () => void,
}

const RestroFilters = (props: RestroFiltersProps) => {
    const [applyFilters, setApplyFilters] = useState<boolean>(false)

    const [filterCaption, setFilterCaption] = useState("Sort by");

    const [filterOptions, setFilterOptions] = useState<FilterOptionsFunction>({
        options: props?.data?.sortConfigs ?? [],
        input: "RADIO"
    });

    const printFilterOptions = (arg: FilterOptionsFunction) => {

        const { options, input } = arg;

        const inputType = input === "CHECKBOX" ? "checkbox" : "radio";

        return (
            <div className="overflow-scroll no-scrollbar flex flex-col gap-[16px] justify-start items-start h-full pl-1">
                {options?.map((option) => (
                    <span onClick={() => setApplyFilters(true)} className="flex gap-2 items-center" key={(option?.key) || (option?.id + option?.label)}>
                        <input type={inputType} name="filteroptions" value={option?.title || option?.label} id={(option?.key) || option?.id} />
                        <label htmlFor={(option?.key) || option?.id}>{option?.title || option?.label}</label>
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="filters flex flex-col w-full max-h-[inherit]">
            <div className="border-b py-4 px-6 font-bold text-xl dark:border-zinc-800">Filters</div>
            <div className="flex min-h-[50px] grow">
                <div className="headings heading no-scrollbar overflow-scroll flex flex-col border-r dark:border-zinc-800 w-[45%] lg:w-[30%]">
                    <ul>
                        <li
                            className="cursor-pointer font-bold text-zinc-500 py-[18px] px-[24px]"
                            onClick={() => {
                                setFilterOptions({
                                    options: props?.data?.sortConfigs ?? [],
                                    input: "RADIO"
                                })

                                setFilterCaption("Sort by")
                            }}
                        >Sort by</li>

                        {props?.data?.facetList?.map((filter: FilterOptions) => {
                            return (
                                <li
                                    className="cursor-pointer font-bold text-zinc-500 py-[18px] px-[24px]"
                                    key={filter?.id}
                                    onClick={() => {
                                        setFilterOptions({
                                            options: filter?.facetInfo,
                                            input: filter?.selection === "SELECT_TYPE_MULTISELECT" ? "CHECKBOX" : "RADIO"
                                        })

                                        setFilterCaption(filter?.subLabel)
                                    }}
                                >{filter?.label}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="content flex flex-col px-[12px] pb-[24px] grow text-[14px] lg:px-[20px]">
                    <p className="uppercase mt-[15px] mb-[12px]">{filterCaption}</p>
                    <div className="options h-[-webkit-fill-available]">
                        {printFilterOptions({ options: filterOptions.options, input: filterOptions.input })}
                    </div>
                </div>
            </div>
            {applyFilters && (
                <div className="apply flex gap-6 font-bold bg-white dark:bg-zinc-800 w-full justify-end py-3 px-5 shadow-[0_0px_10px_0px_rgba(40,44,63,0.1)]">
                    <button onClick={() => setApplyFilters(false)} className="text-primary">Clear Filters</button>
                    <button onClick={() => props?.onApply && props.onApply()} className="text-white bg-primary rounded-xl py-2.5 px-6">Apply</button>
                </div>
            )}
        </div>
    )
}

export default RestroFilters