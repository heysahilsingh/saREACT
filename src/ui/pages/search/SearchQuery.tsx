import SearchInput from "./SearchInput"
import SearchResults from "./SearchResults"

const SearchQuery = () => {

    return (
        <>
            <SearchInput searchFunction={(e) => console.log(e)} />
            <SearchResults results={undefined}/>
        </>
    )
}

export default SearchQuery