import { useSearchParams } from "react-router-dom";
import SearchInput from "./SearchInput"

interface SearchQueryProps {
    query?: string
}

const SearchQuery = (props: SearchQueryProps) => {

    const [query] = useSearchParams();

    console.log(query.get("query"));

    return (
        <div className="flex flex-col lg:max-w-[800px] lg:mx-auto">
            <div className="search-input sticky top-0 p-4 pb-6 lg:py-8 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-950">
                <SearchInput showBackButton={true} inputValue={props.query ? props.query : ""} searchFunction={inputValue => console.log(inputValue)} />
            </div>
            <div className="results flex flex-col gap-6 px-4 py-6">
                <div className="text-2xl font-bold">{query.get("query")}</div>
            </div>
        </div>
    )
}

export default SearchQuery