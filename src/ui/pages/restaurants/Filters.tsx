import { useState } from "react";

type FilterOptions = {
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

interface FiltersProps {
    data: {
        facetList: FilterOptions[],
        sortConfigs: FilterOptions[]
    } | null,
    onApply: () => void,
}

const Filters = (props: FiltersProps) => {
    const [filterCaption, setFilterCaption] = useState("Sort by");

    const [filterOptions, setFilterOptions] = useState<FilterOptionsFunction>({
        options: props?.data?.sortConfigs ?? [],
        input: "RADIO"
    });

    const printFilterOptions = (arg: FilterOptionsFunction) => {
        console.log(arg);

        const { options, input } = arg;

        const inputType = input === "CHECKBOX" ? "checkbox" : "radio";

        return (
            <div className="overflow-scroll no-scrollbar flex flex-col gap-[16px] justify-start items-start h-full">
                {options?.map((option) => (
                    <span className="flex gap-2 items-center" key={(option?.key) || (option?.id + option?.label)}>
                        <input className="appearance-none checked:bg-blue-500" type={inputType} name="filteroptions" value={option?.title || option?.label} id={(option?.key) || option?.id} />
                        <label htmlFor={(option?.key) || option?.id}>{option?.title || option?.label}</label>
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="filters flex flex-col w-full max-h-[inherit]">
            <div className="heading border-b py-4 px-6 font-bold text-xl dark:border-zinc-800">Filters</div>
            <div className="flex min-h-[50px] grow">
                <div className="headings flex flex-col border-r dark:border-zinc-800 w-[45%] lg:w-[30%]">
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
        </div>
    )
}

export default Filters