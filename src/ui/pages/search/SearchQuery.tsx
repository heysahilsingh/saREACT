import { useContext, useEffect, useState } from "react"
import SearchInput from "./SearchInput"
import CONSTANTS from "../../../constants"
import UserContext from "../../../context/UserContext"
import useDeviceDetect from "../../../hooks/useDeviceDetect"
import { useSearchParams } from "react-router-dom"
import SearchResultShimmer from "./searchResult/SearchResultShimmer"
import DefaultSearchResult, { DefaultSearchResultType } from "./searchResult/DefaultSearchResult"

type SearchNavType = {
    id: string,
    title: string,
    selected: boolean
}

type PageDataType = {
    initial: { id: string }[] | undefined,
    searched: DefaultSearchResultType[] | undefined
}

const SearchQuery = () => {

    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();
    const [searchParams] = useSearchParams();

    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("query") || "");
    const [selectedNavTab, setSelectedNavTab] = useState<string | undefined>(undefined);

    // Page Data
    const [pageData, setPageData] = useState<PageDataType | undefined>({
        initial: undefined,
        searched: undefined
    });

    // Load Initial Page Data
    useEffect(() => {
        fetchPageData("INITIAL", searchQuery)
    }, [])

    useEffect(() => {
        console.log(pageData);
        console.log(selectedNavTab);
    }, [selectedNavTab, pageData])

    // fetchData function
    const fetchPageData = async (dataType: "INITIAL" | "SEARCHED", query: string, navTabId?: string) => {
        setPageData(undefined)

        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng && query && query.trim() !== '') {
            try {
                if (dataType === "INITIAL") {
                    const URL = CONSTANTS.API_PAGE_SEARCH_SPECIFIC_RESULT.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob", query, (navTabId ? navTabId : undefined));

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const responseCards = responseData?.data?.cards;

                    if (responseCards) {
                        const navData = responseCards.find((card: { card: { card: { "@type": string } } }) => card?.card?.card["@type"] === "type.googleapis.com/swiggy.gandalf.widgets.v2.Navigation")?.card?.card?.tab;
                        const selectedNavData = navData?.find((nav: SearchNavType) => nav?.selected)?.id;
                        // const queryResultData = responseCards.find(card => card?.groupedCard?.cardGroupMap)?.groupedCard?.cardGroupMap;

                        setPageData(prev => ({
                            initial: selectedNavData ? selectedNavData : prev?.initial,
                            searched: undefined
                        }))

                        setSelectedNavTab(prev => (
                            selectedNavData ? selectedNavData : prev
                        ))
                    }
                }
                else if (dataType === "SEARCHED") {
                    const URL = CONSTANTS.API_PAGE_SEARCH_DEFAULT_RESULT.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob", query);

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const results = responseData?.data?.suggestions;

                    if (results) {
                        setPageData({
                            initial: undefined,
                            searched: results
                        });
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div className="flex flex-col lg:max-w-[800px] lg:mx-auto">
            <div className="search-input flex flex-col gap-4 sticky top-0 p-4 pb-4 lg:py-8 bg-white dark:bg-neutral-950">
                <SearchInput showBackButton={true} inputValue={searchQuery} searchFunction={inputValue => {
                    setSearchQuery(inputValue),
                        fetchPageData("SEARCHED", inputValue)
                }} />
                {pageData?.initial && (
                    <div className="flex gap-2">
                        {[{ id: "RESTAURANT", title: "Restaurants" }, { id: "DISH", title: "Dishes" }].map(nav => (
                            <div
                                className={`${selectedNavTab === nav.id && "text-white bg-[#3e4152] dark:bg-primary"} font-semibold border border-zinc-200 dark:border-zinc-800 rounded-full leading-none py-2.5 px-4`}
                                onClick={() => {
                                    setSelectedNavTab(nav.id)
                                    fetchPageData("INITIAL", searchQuery, nav.id)
                                }}
                                key={nav.id}>
                                {nav.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="results flex flex-col gap-6 px-4 py-6 border-t-8 border-zinc-200 dark:border-zinc-800">
                {/* Shimmer */}
                {!pageData && <SearchResultShimmer />}

                {/* Page Data */}
                {pageData && (
                    <>
                        {pageData.searched && <DefaultSearchResult results={pageData.searched} />}
                    </>
                )}
            </div>
        </div>
    )
}

export default SearchQuery