import { TypeRestaurantInformation } from "../../../../constants"
import RestroCardHorizontal from "../../../components/RestroCardHorizontal"
import { SearchResultLists } from "../SearchQuery"

interface RestroSearchResultProps {
    results: SearchResultLists[]
}
const RestroSearchResult = (props: RestroSearchResultProps) => {

    return (
        <div className=" flex flex-col gap-6 lg:-mx-4 lg:px-4 lg:bg-[#f5f6f8] lg:dark:bg-zinc-800 lg:grid lg:grid-cols-2 lg:gap-4 lg:py-3">
            {props.results.map(result => <RestroCardHorizontal className="lg:bg-white lg:dark:bg-neutral-900 lg:p-6 lg:rounded-2xl" key={result.info.id} restro={result.info as TypeRestaurantInformation}/>)}
        </div>
    )
}

export default RestroSearchResult