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
import SearchResults, { SearchResultsType } from './SearchResults';

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
    const [searchedQuery, setSearchedQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResultsType[] | undefined>(undefined);

    // Handle searching
    const handleSearch = async (keyword: string) => {
        if (!clearSearch) setClearSearch(true)

        // If input is empty
        if (keyword.trim() === '') {
            setSearchResults(undefined);
            setClearSearch(false)
        } else {
            const userLat = userInfo.location.cityInfo.latitude;
            const userLng = userInfo.location.cityInfo.longitude;

            if (userLat && userLng) {
                try {
                    const URL = CONSTANTS.API_PAGE_SEARCH_QUERY.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob", keyword);

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const results = responseData?.data?.suggestions;

                    if (results) setSearchResults(results)

                } catch (error) {
                    console.log(error);
                }
            }
        }

    }

    if (searchParams.get("query")) return <SearchQuery />
    else {
        return (
            <Page pageName='search'>
                <div className="flex flex-col lg:max-w-[800px] lg:mx-auto">
                    <div className="search-input sticky top-0 p-4 pb-6 lg:py-8 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-950">
                        <SearchInput searchFunction={(e) => handleSearch(e)}/>
                    </div>
                    {/* Pre Search */}
                    {!searchResults && (
                        <div className="pre-search flex gap-3 lg:gap-5 flex-col bg-[#f5f6f8] dark:bg-zinc-900">
                            {InitialpageData.popularInstamart && (
                                <div className="cuisines py-5 px-4 bg-white dark:bg-neutral-950">
                                    <h2 className="font-bold text-xl mb-4 lg:mb-3 lg:mt-6">Popular on <span className='text-[#982160] font-black'>Instamart</span></h2>
                                    <div className="items flex no-scrollbar overflow-y-scroll">
                                        {InitialpageData.popularInstamart.map(cuisine => {
                                            return (
                                                <div className="min-w-[25%] lg:min-w-[15%]" key={cuisine.id}>
                                                    <img src={CONSTANTS.IMG_CDN + cuisine.imageId} alt="" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                            {InitialpageData.popularCuisines && (
                                <div className="cuisines py-5 px-4 bg-white dark:bg-neutral-950">
                                    <h2 className="font-bold text-xl mb-4 lg:mb-3 lg:mt-6">Popular Cuisines</h2>
                                    <div className="items flex no-scrollbar overflow-y-scroll">
                                        {InitialpageData.popularCuisines.map(cuisine => {
                                            return (
                                                <div className="min-w-[25%] lg:min-w-[15%]" key={cuisine.id}>
                                                    <img src={CONSTANTS.IMG_CDN + cuisine.imageId} alt="" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Search Results */}
                    {searchResults && <SearchResults results={searchResults}/>}
                </div>
            </Page>
        )
    }
}

export default Search