import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { useEffect } from 'react';
import CONSTANTS from '../../../constants';
import Page from '../Page';
import { useSearchParams } from 'react-router-dom';
import SearchQuery from './SearchQuery';
import SearchInput from './SearchInput';
import DefaultSearchResult, { DefaultSearchResultType } from './searchResult/DefaultSearchResult';
import SearchResultShimmer from './searchResult/SearchResultShimmer';

type InitialPageData = {
    popularCuisines: {
        entityId: string,
        id: string,
        imageId: string
    }[] | undefined,
    popularInstamart: {
        entityId: string,
        id: string,
        imageId: string
    }[] | undefined,
}

const Search = () => {

    const [searchParams] = useSearchParams();

    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();

    const [InitialpageData, setInitialPageData] = useState<InitialPageData>({
        popularCuisines: undefined,
        popularInstamart: undefined
    });
    // Load InitialpageData at first
    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng) {
            const fetchData = async () => {
                try {
                    const URL = CONSTANTS.API_PAGE_SEARCH.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob");

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const responseCards = responseData?.data?.cards?.map((card: { card: { card: object } }) => card.card.card);

                    if (responseCards) {
                        setInitialPageData({
                            popularCuisines: responseCards.find((card: { id: string }) => card.id === "PopularCuisinessearchpage")?.gridElements?.infoWithStyle?.info,
                            popularInstamart: responseCards.find((card: { id: string }) => card.id === "PopularCategoriessearchpage")?.gridElements?.infoWithStyle?.info
                        })
                    }

                } catch (error) {
                    console.log(error)
                }
            }

            fetchData()
        }

    }, [])

    const [clearSearch, setClearSearch] = useState(false);
    const [fetchingSearchResults, setFetchingSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState<DefaultSearchResultType[] | undefined>(undefined);

    // Handle searching
    const handleSearch = async (keyword: string) => {
        if (!clearSearch) setClearSearch(true)

        // If input is empty
        if (keyword.trim() === '') {
            setSearchResults(undefined);
            setClearSearch(false)
        } else {
            setFetchingSearchResults(true)
            const userLat = userInfo.location.cityInfo.latitude;
            const userLng = userInfo.location.cityInfo.longitude;

            if (userLat && userLng) {
                try {
                    const URL = CONSTANTS.API_PAGE_SEARCH_DEFAULT_RESULT.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob", keyword);

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const results = responseData?.data?.suggestions;

                    if (results) setSearchResults(results)

                    setFetchingSearchResults(false)

                } catch (error) {
                    console.log(error);
                }
            }
        }

    }

    // Render popular searches
    const popularSearches = (heading: "Instamart" | "Cuisines", popularSearches: { id: string, imageId: string }[]) => {
        return (
            <div className="cuisines bg-white dark:bg-neutral-950">
                <h2 className="font-bold text-xl mb-4 lg:mb-3 lg:mt-6">Popular {
                    heading === "Cuisines" ? "Cuisines" : <span>on <span className='text-[#982160] font-black'>Instamart</span></span>
                }</h2>
                <div className="items flex no-scrollbar overflow-y-scroll">
                    {popularSearches.map(cuisine => {
                        return (
                            <div className="min-w-[25%] lg:min-w-[15%]" key={cuisine.id}>
                                <img className='rounded-md overflow-hidden aspect-[1/1.4] bg-zinc-200 dark:bg-zinc-900' src={CONSTANTS.IMG_CDN + cuisine.imageId} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    if (searchParams.get("query")) return <SearchQuery />
    else {
        return (
            <Page pageName='search'>
                <div className="flex flex-col lg:max-w-[800px] lg:mx-auto">
                    <div className="search-input sticky top-0 p-4 pb-6 lg:py-8 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-950">
                        <SearchInput showBackButton={false} inputValue={""} searchFunction={inputValue => handleSearch(inputValue)} />
                    </div>
                    <div className="search-results flex flex-col gap-6 px-4 py-6">
                        {/* Pre Search */}
                        {(!searchResults && !fetchingSearchResults) && (
                            <>
                                {/* Pre Search Shimmer */}
                                {(!InitialpageData.popularCuisines && !InitialpageData.popularInstamart) && <SearchResultShimmer />}

                                {/* Pre Search */}
                                {(InitialpageData.popularCuisines || InitialpageData.popularInstamart) && (
                                    <div className="pre-search flex gap-3 lg:gap-5 flex-col bg-[#f5f6f8] dark:bg-zinc-900">
                                        {InitialpageData.popularInstamart && popularSearches("Instamart", InitialpageData.popularInstamart)}
                                        {InitialpageData.popularCuisines && popularSearches("Cuisines", InitialpageData.popularCuisines)}
                                    </div>
                                )}
                            </>
                        )}

                        {/* Search Results Shimmer */}
                        {fetchingSearchResults && <SearchResultShimmer />}

                        {/* Search Results */}
                        {searchResults && !fetchingSearchResults && <DefaultSearchResult results={searchResults} />}
                    </div>
                </div>
            </Page>
        )
    }
}

export default Search